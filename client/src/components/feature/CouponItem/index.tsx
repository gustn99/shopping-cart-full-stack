import CheckBox from "@components/common/shared/CheckBox";
import Text from "@components/common/shared/Text";
import Flex from "@components/common/shared/Flex";
import Spacing from "@components/common/shared/Spacing";
import Divider from "@components/common/shared/Divider";
import styled from "@emotion/styled";

interface CouponItemProps {
  disabled: boolean;
  checked: boolean;
  onSelect: () => void;
}

export default function CouponItem({ disabled, checked, onSelect }: CouponItemProps) {
  return (
    <CouponItemContainer disabled={disabled}>
      <Divider />
      <Spacing size={0.75} />
      <Flex gap={8} align="center">
        <CheckBox disabled={disabled} checked={checked} onChange={onSelect} />
        <CouponItemText typograph="body1" as="h4" disabled={disabled}>
          5,000원 할인 쿠폰
        </CouponItemText>
      </Flex>
      <Spacing size={0.75} />
      <Flex direction="column" gap={4}>
        <CouponItemText typograph="caption" disabled={disabled}>
          만료일: 2024년 11월 30일
        </CouponItemText>
        <CouponItemText typograph="caption" disabled={disabled}>
          최소 주문 금액: 100,000원
        </CouponItemText>
      </Flex>
      <Spacing size={0.75} />
    </CouponItemContainer>
  );
}

const CouponItemContainer = styled.label<Pick<CouponItemProps, "disabled">>`
  cursor: pointer;
  ${({ disabled }) => disabled && "pointer-events: none"};
`;

const CouponItemText = styled(Text)<Pick<CouponItemProps, "disabled">>`
  opacity: ${({ disabled }) => (disabled ? 0.25 : 1)};
`;
