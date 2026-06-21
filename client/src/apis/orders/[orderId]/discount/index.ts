import fetcher from "@apis/instance";
import type { GetDiscountRequest, GetDiscountResponse } from "@/types/order";
import { mapServerGetDiscountResponseToResponse } from "../../dto";
import type { ServerGetDiscountResponse } from "../../dto";

const ORDERS_API = "/orders";

export const getDiscount = async (orderId: number, params: GetDiscountRequest): Promise<GetDiscountResponse> => {
  const queryParams = new URLSearchParams();
  params.couponId?.forEach((id) => queryParams.append("couponId", id.toString()));

  const response = await fetcher.get<ServerGetDiscountResponse>(
    `${ORDERS_API}/${orderId}/discount?${queryParams.toString()}`,
  );
  return mapServerGetDiscountResponseToResponse(response);
};
