import CouponModal from "@components/feature/CouponModal";
import Button from "@components/common/shared/Button";
import { useModal } from "@hooks/useModal.ts";
import useOrderUpdateMutation from "@/hooks/useOrderUpdateMutation";

interface CouponApplyButtonProps {
  orderId: number;
}

export default function CouponApplyButton({ orderId }: CouponApplyButtonProps) {
  const modal = useModal();
  const { mutate: updateOrder } = useOrderUpdateMutation(orderId);

  return (
    <Button
      fullWidth
      rounded
      variant="outline"
      size="md"
      onClick={async () => {
        const result = await modal.open<number[], { orderId: number }>("couponModal", CouponModal, { orderId });
        if (result.status === "canceled") return;

        const selectedCouponIds = result.data;
        updateOrder({ couponId: selectedCouponIds });
      }}
    >
      쿠폰 적용
    </Button>
  );
}
