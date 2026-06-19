import Text from "@components/common/shared/Text";
import Spacing from "@components/common/shared/Spacing";
import CheckBox from "@components/common/shared/CheckBox";
import styled from "@emotion/styled";

export default function DeliverySection() {
  // 배송 정보 조회 및 변경

  return (
    <div>
      <Text typograph="heading2" as="h3">
        배송 정보
      </Text>
      <Spacing direction="vertical" size={1} />
      <DeliveryCheckLabel>
        <CheckBox />
        <Spacing direction="horizontal" size={0.5} />
        <Text typograph="caption" as="span">
          제주도 및 도서 산간 지역
        </Text>
      </DeliveryCheckLabel>
    </div>
  );
}

const DeliveryCheckLabel = styled.label`
  display: flex;
  align-items: center;
`;
