import useOrderCompleteNavigate from "@hooks/useOrderCompleteNavigate.ts";
import Button from "@components/common/shared/Button";

export default function PaymentButton() {
  const { navigate } = useOrderCompleteNavigate();

  return (
    <Button fullWidth onClick={() => navigate({ productCount: 2, totalQuantity: 3, totalAmount: 70000 })}>
      결제하기
    </Button>
  );
}
