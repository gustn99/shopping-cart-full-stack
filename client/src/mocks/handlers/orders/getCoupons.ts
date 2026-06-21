import { http, HttpResponse } from "msw";
import { coupons } from "@/mocks/datas/orders";
import type { ServerGetCouponsResponse } from "@/apis/orders/dto";

export const getCoupons = http.get("/api/orders/:orderId/coupons", () => {
  // Return available coupons
  return HttpResponse.json<ServerGetCouponsResponse>({ coupons }, { status: 200 });
});
