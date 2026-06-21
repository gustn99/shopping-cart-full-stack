import { productHandlers } from "./products";
import { cartHandlers } from "./carts";

export const handlers = [...productHandlers, ...cartHandlers];
