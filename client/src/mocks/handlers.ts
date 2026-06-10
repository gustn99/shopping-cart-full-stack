import { http, HttpResponse } from "msw";

// 상품 (Products)

const products = [
  {
    id: 1,
    imgUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    name: "무선 헤드폰",
    price: 129000,
  },
  {
    id: 2,
    imgUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    name: "러닝화",
    price: 89000,
  },
  {
    id: 3,
    imgUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    name: "스마트 워치",
    price: 215000,
  },
];

const carts = [
  {
    id: 1,
    name: "무선 헤드폰",
    price: 129000,
    imgUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    quantity: 1,
  },
  {
    id: 2,
    name: "러닝화",
    price: 89000,
    imgUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    quantity: 2,
  },
];

export const handlers = [
  // 상품 목록 조회
  http.get("/api/products", () => {
    return HttpResponse.json(
      {
        status: 200,
        data: products,
      },
      { status: 200 },
    );
  }),

  // 상품 추가
  http.post("/api/products", () => {
    return HttpResponse.json(
      {
        status: 201,
        data: {
          id: 4,
          imgUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
          name: "새 상품",
          price: 10000,
        },
      },
      { status: 201 },
    );
  }),

  // 상품 삭제
  http.delete("/api/products/:id", () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // 장바구니 상품 목록 조회
  http.get("/api/carts/:cartId", ({ params }) => {
    const { cartId } = params;
    return HttpResponse.json(
      {
        status: 200,
        data: {
          id: Number(cartId),
          products: carts,
        },
      },
      { status: 200 },
    );
  }),

  // 장바구니 상품 수량 변경
  http.patch("/api/carts/:cartId/products/:productId", ({ params }) => {
    const { productId } = params;
    const product = products.find((p) => p.id === Number(productId));

    return HttpResponse.json(
      {
        status: 200,
        data: {
          ...product,
          quantity: 3,
        },
      },
      { status: 200 },
    );
  }),

  // 장바구니 상품 제거
  http.delete("/api/carts/:cartId/products/:productId", () => {
    return new HttpResponse(null, { status: 204 });
  }),
];

