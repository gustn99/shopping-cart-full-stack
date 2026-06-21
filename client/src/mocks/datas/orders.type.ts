export interface ServerOrderProduct {
  id: number;
  title: string;
  price: number;
  imgUrl: string;
  quantity: number;
  hasGift?: boolean;
}

export interface ServerOrder {
  orderId: number;
  products: ServerOrderProduct[];
  coupons?: number[];
  isRemoteArea?: boolean;
  deliveryFee?: number;
}

export interface ServerCoupon {
  id: number; // API docs don't specify id for GET /coupons but we need it internally
  title: string;
  expirationDate: string;
  minOrderAmount?: number;
  availableHours?: string;
  isCouponUsable: boolean;
}
