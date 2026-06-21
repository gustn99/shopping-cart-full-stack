import CouponModal from "@components/feature/CouponModal";
import Button from "@components/common/shared/Button";
import { useModal } from "@hooks/useModal.ts";

export default function CouponApplyButton() {
  const modal = useModal();

  return (
    <Button
      fullWidth
      rounded
      variant="outline"
      size="md"
      onClick={async () => {
        const result = await modal.open<number[]>("couponModal", CouponModal);
        if (result.status === "canceled") return;

        const selectedCouponIds = result.data;
        console.log(selectedCouponIds);
      }}
    >
      쿠폰 적용
    </Button>
  );
}
