import fetcher from "@apis/instance";
import { mapServerCartItemToCart } from "@apis/carts/dto";
import type { ServerUpdateCartItemQuantityResponse } from "@apis/carts/dto";

const CARTS_API = "/carts";

export const updateCartItemQuantity = async (
  cartId: number,
  productId: number,
  quantity: number,
) => {
  const response = await fetcher.patch<ServerUpdateCartItemQuantityResponse>(
    `${CARTS_API}/${cartId}/products/${productId}`,
    { quantity },
  );
  return mapServerCartItemToCart(response);
};

export const deleteCartItem = async (cartId: number, productId: number) => {
  await fetcher.delete(`${CARTS_API}/${cartId}/products/${productId}`);
};
