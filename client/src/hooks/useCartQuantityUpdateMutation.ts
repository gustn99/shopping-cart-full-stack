import { updateCartItemQuantity } from "@/apis/carts/[id]/products/[id]";
import { queryStore } from "@/queries/instance";
import useMutation from "@/queries/useMutation";
import { CART_QUERY_KEY } from "./useCartQuery";

const DEFAULT_CART_ID = 1;

export default function useCartQuantityUpdateMutation() {
  return useMutation({
    mutateFn: (productId: number, quantity: number) =>
      updateCartItemQuantity(DEFAULT_CART_ID, productId, quantity),
    onSuccess: () => {
      queryStore.invalidate([CART_QUERY_KEY]);
    },
  });
}
