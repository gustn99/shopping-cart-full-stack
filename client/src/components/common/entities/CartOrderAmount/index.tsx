import Divider from "@components/common/shared/Divider";
import info from "@assets/info.svg";
import Spacing from "@components/common/shared/Spacing";
import Text from "@components/common/shared/Text";
import styled from "@emotion/styled";

interface CartOrderAmountProps {
  orderAmount: number;
  deliveryFee: number;
  totalAmount: number;
}

export default function CartOrderAmount({ orderAmount, deliveryFee, totalAmount }: CartOrderAmountProps) {
  return (
    <CartOrderAmountContainer>
      <OrderAmountInfoWrapper>
        <InfoIcon src={info} alt="정보" />
        <Text typograph="caption" as="span">
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </Text>
      </OrderAmountInfoWrapper>
      <Spacing size={0.75} />
      <Divider />
      <Spacing size={0.75} />
      <CartOrderAmountInfoContainer>
        <Text typograph="body1" as="span">
          총 주문 금액
        </Text>
        <Text typograph="heading1" as="span">
          {orderAmount.toLocaleString()}원
        </Text>
      </CartOrderAmountInfoContainer>
      <Spacing size={0.5} />
      <CartOrderAmountInfoContainer>
        <Text typograph="body1" as="span">
          배송비
        </Text>
        <Text typograph="heading1" as="span">
          {deliveryFee.toLocaleString()}원
        </Text>
      </CartOrderAmountInfoContainer>
      <Spacing size={0.75} />
      <Divider />
      <Spacing size={0.75} />
      <CartOrderAmountInfoContainer>
        <Text typograph="body1" as="span">
          총 결제 금액
        </Text>
        <Text typograph="heading1" as="span">
          {totalAmount.toLocaleString()}원
        </Text>
      </CartOrderAmountInfoContainer>
    </CartOrderAmountContainer>
  );
}

const CartOrderAmountContainer = styled.div``;

const OrderAmountInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const InfoIcon = styled.img`
  width: 0.875rem;
  aspect-ratio: 1/1;
`;

const CartOrderAmountInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
`;
