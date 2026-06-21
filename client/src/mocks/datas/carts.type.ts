import type { ServerProduct } from "@/apis/carts/dto";

export type ServerCartProduct = ServerProduct & { quantity: number };

export interface ServerCart {
  id: number;
  products: ServerCartProduct[];
}
