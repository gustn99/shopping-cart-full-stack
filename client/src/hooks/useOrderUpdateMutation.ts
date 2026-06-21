import { patchOrder } from "@/apis/orders/[orderId]";
import { queryStore } from "@/queries/instance";
import useMutation from "@/queries/useMutation";
import { ORDER_QUERY_KEY } from "./useOrderQuery";
import type { PatchOrderRequest } from "@/types/order";

export default function useOrderUpdateMutation(orderId: number) {
  return useMutation({
    mutateFn: (body: PatchOrderRequest) => patchOrder(orderId, body),
    onSuccess: () => {
      queryStore.invalidate(`${ORDER_QUERY_KEY}-${orderId}`);
    },
  });
}
