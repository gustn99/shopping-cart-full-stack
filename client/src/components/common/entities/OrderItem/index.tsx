import ProductImg from "@components/common/entities/ProductImg";
import Divider from "@components/common/shared/Divider";
import Flex from "@components/common/shared/Flex";
import Spacing from "@components/common/shared/Spacing";
import Text from "@components/common/shared/Text";
import styled from "@emotion/styled";

interface OrderItemProps {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export default function OrderItem({ name, image, price, quantity }: OrderItemProps) {
  // 상품 리스트 조회

  return (
    <OrderItemWrapper>
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
    </OrderItemWrapper>
  );
}

const OrderItemWrapper = styled.li``;

const Quantity = styled(Flex)`
  width: 1.5rem;
  text-align: center;
`;
