import type { Cart, Product } from "@/types/cartProduct";

export interface ServerProduct {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

export interface ServerCartResponse {
  status: number;
  data: {
    id: number;
    products: (ServerProduct & { quantity: number })[];
  };
}

export interface ServerUpdateCartItemQuantityResponse {
  status: number;
  data: ServerProduct & { quantity: number };
}

export const mapServerProductToProduct = (
  serverProduct: ServerProduct,
): Product => ({
  id: serverProduct.id,
  name: serverProduct.name,
  price: serverProduct.price,
  image: serverProduct.imgUrl,
});

export const mapServerCartToCarts = (
  serverCartResponse: ServerCartResponse,
): Cart[] => {
  return serverCartResponse.data.products.map((item) => ({
    product: mapServerProductToProduct(item),
    quantity: item.quantity,
  }));
};

export const mapServerCartItemToCart = (
  serverUpdateResponse: ServerUpdateCartItemQuantityResponse,
): Cart => ({
  product: mapServerProductToProduct(serverUpdateResponse.data),
  quantity: serverUpdateResponse.data.quantity,
});
