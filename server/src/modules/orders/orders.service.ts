import * as ordersRepository from './orders.repository.ts';
import * as productsRepository from '../products/products.repository.ts';
import {ServiceError} from '../../common/error.ts';
import type {OrderProduct, CreateOrderRequest, UpdateOrderRequest} from './orders.dto.ts';
import {rawCoupons as COUPONS} from '../../raw/raw.coupons.ts';

const checkOrderExpired = (createdAt: Date) => {
	const now = new Date();
	const diffMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);
	if (diffMinutes >= 10) {
		throw new ServiceError('ORDER_EXPIRED', '주문이 만료되었습니다.');
	}
};

const getOrderTotalAndBogoTarget = (products: OrderProduct[]) => {
	let totalAmount = 0;
	let bogoTargetId: number | null = null;
	let maxBogoPrice = 0;

	for (const p of products) {
		const productDef = productsRepository.findById(p.id);
		if (!productDef) {
			throw new ServiceError('OUT_OF_STOCK', '품절된 상품이 포함되어 있습니다.');
		}
		totalAmount += productDef.price * p.quantity;

		if (p.quantity >= 2 && productDef.price > maxBogoPrice) {
			maxBogoPrice = productDef.price;
			bogoTargetId = p.id;
		}
	}

	return {totalAmount, bogoTargetId, maxBogoPrice};
};

const getValidCoupons = (totalAmount: number, bogoTargetId: number | null, currentHour: number) => {
	return COUPONS.filter(coupon => {
		if (coupon.minOrderAmount !== undefined && totalAmount < coupon.minOrderAmount) {
			return false;
		}
		if (coupon.availableHours) {
			const [startStr, endStr] = coupon.availableHours.split('-');
			const startHour = parseInt(startStr.split(':')[0], 10);
			const endHour = parseInt(endStr.split(':')[0], 10);
			if (currentHour < startHour || currentHour >= endHour) {
				return false;
			}
		}
		if (coupon.id === 2 && bogoTargetId === null) {
			return false;
		}
		return true;
	});
};

const getMaxDiscountCouponIds = (totalAmount: number, bogoTargetId: number | null, currentHour: number, isRemoteArea: boolean = false) => {
	// bogo는 할인 금액으로 포함하지 않으므로, 조합 대상에서 제외
	const validCoupons = getValidCoupons(totalAmount, bogoTargetId, currentHour).filter(c => c.id !== 2);

	let maxDiscount = -1;
	let bestCombination: number[] = [];

	const combinations = [[] as typeof COUPONS[0][]];
	for (let i = 0; i < validCoupons.length; i++) {
		combinations.push([validCoupons[i]]);
		for (let j = i + 1; j < validCoupons.length; j++) {
			combinations.push([validCoupons[i], validCoupons[j]]);
		}
	}

	for (const combo of combinations) {
		let discountAmount = 0;
		let remainingTotal = totalAmount;

		if (combo.find(c => c.id === 1)) {
			discountAmount += 5000;
			remainingTotal = Math.max(0, remainingTotal - 5000);
		}
		if (combo.find(c => c.id === 4)) {
			discountAmount += remainingTotal * 0.3;
		}
		if (combo.find(c => c.id === 3)) {
			let feeBeforeCoupon = totalAmount >= 100000 ? 0 : 3000;
			if (isRemoteArea) feeBeforeCoupon += 3000;
			discountAmount += feeBeforeCoupon;
		}

		if (discountAmount > maxDiscount) {
			maxDiscount = discountAmount;
			bestCombination = combo.map(c => c.id);
		}
	}

	return bestCombination;
};

export const createOrder = (req: CreateOrderRequest) => {
	if (!req.products || req.products.length === 0) {
		throw new ServiceError('MISSING_FIELD', '필수값이 누락되었습니다.', [{type: 'products', errorCode: 'MISSING_FIELD_PRODUCTS'}]);
	}

	// Validate types
	for (const p of req.products) {
		if (typeof p.id !== 'number' || typeof p.quantity !== 'number') {
			throw new ServiceError('TYPE_MISMATCH', '타입이 일치하지 않습니다.');
		}
	}

	const {totalAmount, bogoTargetId, maxBogoPrice} = getOrderTotalAndBogoTarget(req.products);
	const currentHour = new Date().getHours();

	// Calculate highest discount combination
	const validCouponIds = getMaxDiscountCouponIds(totalAmount, bogoTargetId, currentHour, false);

	const order = ordersRepository.create(req.products, validCouponIds);
	const baseFee = totalAmount >= 100000 ? 0 : 3000;
	order.deliveryFee = validCouponIds.includes(3) ? 0 : baseFee;
	return {orderId: order.id};
};

export const getOrder = (orderId: number) => {
	const order = ordersRepository.findById(orderId);
	if (!order) throw new ServiceError('RESOURCE_NOT_FOUND', 'Order not found');

	checkOrderExpired(order.createdAt);

	const {bogoTargetId} = getOrderTotalAndBogoTarget(order.products);

	const hasBogoApplied = order.couponIds.includes(2) && bogoTargetId !== null;

	const productsResponse = order.products.map(p => {
		const productDef = productsRepository.findById(p.id)!;
		return {
			id: p.id,
			name: productDef.name,
			price: productDef.price,
			imgUrl: productDef.imgUrl,
			quantity: p.quantity,
			hasGift: hasBogoApplied && p.id === bogoTargetId,
		};
	});

	return {
		products: productsResponse,
		coupons: order.couponIds,
		isRemoteArea: order.isRemoteArea,
		deliveryFee: order.deliveryFee,
	};
};

export const updateOrder = (orderId: number, req: UpdateOrderRequest) => {
	const order = ordersRepository.findById(orderId);
	if (!order) throw new ServiceError('RESOURCE_NOT_FOUND', 'Order not found');

	checkOrderExpired(order.createdAt);

	const {totalAmount, bogoTargetId} = getOrderTotalAndBogoTarget(order.products);

	if (req.couponId !== undefined) {
		if (!Array.isArray(req.couponId)) {
			throw new ServiceError('TYPE_MISMATCH', '타입이 일치하지 않습니다.');
		}
		if (req.couponId.length > 2) {
			throw new ServiceError('BAD_REQUEST', '쿠폰은 최대 2개까지 선택 가능합니다.');
		}
		const currentHour = new Date().getHours();
		const validCoupons = getValidCoupons(totalAmount, bogoTargetId, currentHour);
		const validIds = validCoupons.map(c => c.id);

		for (const cid of req.couponId) {
			if (!COUPONS.find(c => c.id === cid)) {
				throw new ServiceError('RESOURCE_NOT_FOUND', 'Invalid coupon id');
			}
			if (!validIds.includes(cid)) {
				throw new ServiceError('COUPON_EXPIRED', '만료된 쿠폰입니다.'); // Used as a catch-all for invalid/expired coupon
			}
		}
		order.couponIds = req.couponId;
	}

	if (req.isRemoteArea !== undefined) {
		if (typeof req.isRemoteArea !== 'boolean') {
			throw new ServiceError('TYPE_MISMATCH', '타입이 일치하지 않습니다.');
		}
		order.isRemoteArea = req.isRemoteArea;
	}

	// Recalculate delivery fee based on current state
	const feeBeforeCoupon = (totalAmount >= 100000 ? 0 : 3000) + (order.isRemoteArea ? 3000 : 0);
	order.deliveryFee = order.couponIds.includes(3) ? 0 : feeBeforeCoupon;

	const response: any = {};
	if (req.couponId !== undefined) {
		response.couponId = order.couponIds;
	}
	if (req.isRemoteArea !== undefined) {
		response.isRemoteArea = order.isRemoteArea;
		response.deliveryFee = order.deliveryFee;
	}

	return response;
};

export const getDiscount = (orderId: number, couponIds: number[]) => {
	if (!Array.isArray(couponIds)) {
		throw new ServiceError('TYPE_MISMATCH', '타입이 일치하지 않습니다.');
	}

	const order = ordersRepository.findById(orderId);
	if (!order) throw new ServiceError('RESOURCE_NOT_FOUND', 'Order not found');

	const {totalAmount} = getOrderTotalAndBogoTarget(order.products);
	let discountAmount = 0;
	let remainingTotal = totalAmount;

	// FIXED5000
	if (couponIds.includes(1)) {
		discountAmount += 5000;
		remainingTotal = Math.max(0, remainingTotal - 5000);
	}

	// MIRACLESALE
	if (couponIds.includes(4)) {
		discountAmount += remainingTotal * 0.3;
	}

	return {discountAmount};
};

export const getCoupons = (orderId: number) => {
	const order = ordersRepository.findById(orderId);
	if (!order) throw new ServiceError('RESOURCE_NOT_FOUND', 'Order not found');

	const {totalAmount, bogoTargetId} = getOrderTotalAndBogoTarget(order.products);
	const currentHour = new Date().getHours();
	const validCoupons = getValidCoupons(totalAmount, bogoTargetId, currentHour);
	const validIds = validCoupons.map(c => c.id);

	return {
		coupons: COUPONS.map(c => ({
			id: c.id,
			name: c.name,
			expirationDate: c.expirationDate,
			minOrderAmount: c.minOrderAmount,
			availableHours: c.availableHours,
			isCouponUsable: validIds.includes(c.id),
		})),
	};
};
