import fetcher from "@apis/instance";
import type { GetOrderResponse, PatchOrderRequest, PatchOrderResponse } from "@/types/order";
import {
  mapPatchOrderRequestToServer,
  mapServerGetOrderResponseToResponse,
  mapServerPatchOrderResponseToResponse,
} from "../dto";
import type { ServerGetOrderResponse, ServerPatchOrderResponse } from "../dto";

const ORDERS_API = "/orders";

export const getOrder = async (orderId: number): Promise<GetOrderResponse> => {
  const response = await fetcher.get<ServerGetOrderResponse>(`${ORDERS_API}/${orderId}`);
  return mapServerGetOrderResponseToResponse(response);
};

export const patchOrder = async (orderId: number, body: PatchOrderRequest): Promise<PatchOrderResponse> => {
  const serverReq = mapPatchOrderRequestToServer(body);
  const response = await fetcher.patch<ServerPatchOrderResponse>(
    `${ORDERS_API}/${orderId}`,
    serverReq,
  );
  return mapServerPatchOrderResponseToResponse(response);
};
