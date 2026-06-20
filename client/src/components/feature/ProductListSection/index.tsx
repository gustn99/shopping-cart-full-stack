import ProductImg from "@components/common/entities/ProductImg";
import Divider from "@components/common/shared/Divider";
import Flex from "@components/common/shared/Flex";
import Spacing from "@components/common/shared/Spacing";
import Text from "@components/common/shared/Text";
import styled from "@emotion/styled";

export default function ProductListSection() {
  // 상품 리스트 조회

  return (
    <OrderList as="ul" direction="column" gap={20} aria-label="상품 리스트">
      {[
        { id: 1, name: "ㅁㄴㅇㄹ", price: 10000, quantity: 2, image: "" },
        { id: 2, name: "ㅂㅈㄷㄱ", price: 10000, quantity: 2, image: "" },
      ].map(({ id, name, price, quantity, image }) => (
        <OrderItemContainer key={id}>
          <Divider />
          <Spacing size={0.75} />
          <Flex gap={24} align="center">
            <ProductImg src={image} alt={name} />
            <Flex direction="column" gap={24}>
              <Flex direction="column" gap={4}>
                <Text typograph="caption" as="p">
                  {name}
                </Text>
                <Text typograph="heading1" as="p">
                  {price.toLocaleString()}원
                </Text>
              </Flex>
              <Quantity gap={8} align="center">
                <Text typograph="caption" as="span">
                  {quantity}개
                </Text>
              </Quantity>
            </Flex>
          </Flex>
        </OrderItemContainer>
      ))}
    </OrderList>
  );
}

const OrderList = styled(Flex)``;

const OrderItemContainer = styled.li``;

const Quantity = styled(Flex)`
  width: 1.5rem;
  text-align: center;
`;
