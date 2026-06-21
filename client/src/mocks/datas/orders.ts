import type { ServerOrder, ServerCoupon } from "./orders.type";

export const DEFAULT_ORDERS: ServerOrder[] = [
  {
    orderId: 1,
    products: [
      {
        id: 1,
        imgUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        name: "무선 헤드폰",
        price: 129000,
        quantity: 1,
        hasGift: false,
      },
      {
        id: 2,
        imgUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        name: "러닝화",
        price: 89000,
        quantity: 2,
        hasGift: false,
      },
    ],
    coupons: [1, 2],
    isRemoteArea: false,
    deliveryFee: 3000,
  },
];

// Stateful orders store for testing
export let orders: ServerOrder[] = JSON.parse(JSON.stringify(DEFAULT_ORDERS));

export const seedOrders = (nextOrders: ServerOrder[] = DEFAULT_ORDERS) => {
  orders = JSON.parse(JSON.stringify(nextOrders));
};

export const coupons: ServerCoupon[] = [
  {
    id: 1,
    name: "5,000원 할인 (FIXED5000)",
    expirationDate: "2026-11-30T23:59:59Z",
    minOrderAmount: 100000,
    isCouponUsable: true,
  },
  {
    id: 2,
    name: "2+1 쿠폰 (BOGO)",
    expirationDate: "2026-05-30T23:59:59Z",
    isCouponUsable: false,
  },
  {
    id: 3,
    name: "무료 배송 (FREESHIPPING)",
    expirationDate: "2026-08-31T23:59:59Z",
    minOrderAmount: 50000,
    isCouponUsable: true,
  },
  {
    id: 4,
    name: "30% 시간제 할인 (MIRACLESALE)",
    expirationDate: "2026-07-31T23:59:59Z",
    availableHours: "04:00-07:00",
    isCouponUsable: true,
  },
];
