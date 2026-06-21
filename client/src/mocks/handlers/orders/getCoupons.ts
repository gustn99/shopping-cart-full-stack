import { http, HttpResponse } from "msw";
import { coupons } from "@/mocks/datas/orders";

export const getCoupons = http.get("/api/orders/:orderId/coupons", () => {
  // Return available coupons
  return HttpResponse.json({ coupons }, { status: 200 });
});
