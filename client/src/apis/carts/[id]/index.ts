import fetcher from "@apis/instance";
import { mapServerCartToCarts } from "@apis/carts/dto";
import type { ServerCartResponse } from "@apis/carts/dto";

const CARTS_API = "/carts";

export const getCart = async (cartId: number) => {
  const response = await fetcher.get<ServerCartResponse>(
    `${CARTS_API}/${cartId}`,
  );
  return mapServerCartToCarts(response);
};
