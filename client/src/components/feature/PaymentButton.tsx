import useOrderCompleteNavigate from "@hooks/useOrderCompleteNavigate.ts";
import Button from "@components/common/shared/Button";

interface PaymentButtonProps {
  orderId: number;
}

export default function PaymentButton({ orderId }: PaymentButtonProps) {
  const { navigate } = useOrderCompleteNavigate();

  return (
    <Button fullWidth onClick={() => navigate({ productCount: 2, totalQuantity: 3, totalAmount: 70000 })}>
      결제하기
    </Button>
  );
}
