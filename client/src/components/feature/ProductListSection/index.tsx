import Flex from "@components/common/shared/Flex";
import styled from "@emotion/styled";
import OrderItem from "@components/common/entities/OrderItem";

export default function ProductListSection() {
  // 상품 리스트 조회

  return (
    <OrderList as="ul" direction="column" gap={20} aria-label="상품 리스트">
      {[
        { id: 1, name: "ㅁㄴㅇㄹ", price: 10000, quantity: 2, image: "" },
        { id: 2, name: "ㅂㅈㄷㄱ", price: 10000, quantity: 2, image: "" },
      ].map((item) => (
        <OrderItem key={item.id} {...item} />
      ))}
    </OrderList>
  );
}

const OrderList = styled(Flex)``;
