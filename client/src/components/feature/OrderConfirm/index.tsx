import Text from "@components/common/shared/Text";
import Spacing from "@components/common/shared/Spacing";
import styled from "@emotion/styled";
import Flex from "@components/common/shared/Flex";

export default function OrderConfirmSection() {
  // router로부터 state 읽기 or 추후에는 결제 api 응답을 뿌릴 듯

  return (
    <Wrapper direction="column" align="center">
      <Text typograph="heading1" as="h2">
        결제 확인
      </Text>
      <Spacing size={1.5} />
      <Text typograph="caption" as="p">
        총 1종류의 상품 2개를 주문했습니다.
        <br />
        최종 결제 금액을 확인해 주세요.
      </Text>
      <Spacing size={1.5} />
      <Text typograph="heading2">총 결제 금액</Text>
      <Spacing size={0.75} />
      <Text typograph="heading1">70,000원</Text>
      <Spacing size={7} />
    </Wrapper>
  );
}

const Wrapper = styled(Flex)`
  height: 100%;
  margin: auto;
`;
