import Text from "@components/common/shared/Text";
import styled from "@emotion/styled";

export default function OrderFormHeading() {
  // 주문 조회

  return (
    <OrderFormHeadingContainer>
      <Text typograph="heading1" as="h2">
        주문 확인
      </Text>
      <Text typograph="caption" as="p">
        총 1종류의 상품 2개를 주문합니다.
        <br />
        최종 결제 금액을 확인해 주세요.
      </Text>
    </OrderFormHeadingContainer>
  );
}

const OrderFormHeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
