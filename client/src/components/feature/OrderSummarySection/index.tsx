import info from "@assets/info.svg";
import OrderSummaryRow from "@components/common/entities/OrderSummaryRow";
import Text from "@components/common/shared/Text";
import Spacing from "@components/common/shared/Spacing";
import Divider from "@components/common/shared/Divider";
import Flex from "@components/common/shared/Flex";
import styled from "@emotion/styled";

interface OrderSummarySectionProps {
  orderId: number;
}

export default function OrderSummarySection({ orderId }: OrderSummarySectionProps) {
  // summary 정보 조회

  return (
    <OrderSummarySectionContainer data-testid="order-summary">
      <Flex gap={4}>
        <InfoIcon src={info} alt="정보" />
        <Text typograph="caption" as="span">
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </Text>
      </Flex>

      <Spacing size={0.75} />
      <Divider />
      <Spacing size={0.75} />

      <OrderSummaryRow label="총 주문 금액" value={10000} />
      <Spacing size={0.5} />
      <OrderSummaryRow label="쿠폰 할인 금액" value={-3000} />
      <Spacing size={0.5} />
      <OrderSummaryRow label="배송비" value={3000} />

      <Spacing size={0.75} />
      <Divider />
      <Spacing size={0.75} />

      <OrderSummaryRow label="총 결제 금액" value={10000} />
    </OrderSummarySectionContainer>
  );
}

const OrderSummarySectionContainer = styled.div``;

const InfoIcon = styled.img`
  width: 0.875rem;
  aspect-ratio: 1/1;
`;
