import Flex from "@components/common/shared/Flex";
import styled from "@emotion/styled";
import OrderItem from "@components/common/entities/OrderItem";
import useOrderQuery from "@/hooks/useOrderQuery";

interface ProductListSectionProps {
  orderId: number;
}

export default function ProductListSection({ orderId }: ProductListSectionProps) {
  const { data: order } = useOrderQuery(orderId);

  return (
    <OrderList as="ul" direction="column" gap={20} aria-label="상품 리스트">
      {order.products.map((item) => (
        <OrderItem key={item.id} name={item.name} price={item.price} quantity={item.quantity} image={item.imgUrl} />
      ))}
    </OrderList>
  );
}

const OrderList = styled(Flex)``;
