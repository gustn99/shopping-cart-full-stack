import PositionBottom from "@components/common/shared/PositionBottom";
import Button from "@components/common/shared/Button";

export default function GoCartButton() {
  // navigation hook 호출

  return (
    <PositionBottom>
      <Button fullWidth>장바구니로 돌아가기</Button>
    </PositionBottom>
  );
}
