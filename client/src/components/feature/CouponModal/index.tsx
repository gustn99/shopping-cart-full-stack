import CouponItem from "@components/feature/CouponItem";
import useCheckedItems from "@hooks/useCheckedItems.ts";

interface CouponModalProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
}

export default function CouponModal({ modalRef }: CouponModalProps) {
  const { checkedItems, select, unselect } = useCheckedItems<number>();
  const canCheckMore = checkedItems.length < 2;
  const isChecked = (id: number) => checkedItems.includes(id);
  const isDisabled = (id: number) => !canCheckMore && !isChecked(id);

  const handleCouponToggle = (id: number) => {
    if (isDisabled(id)) return;
    if (isChecked(id)) return unselect(id);
    select(id);
  };

  const handleClose = () => modalRef.current?.close();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <dialog ref={modalRef} onClick={handleBackdropClick} aria-label="쿠폰">
      <h2>쿠폰</h2>
      <button onClick={handleClose} aria-label="닫기">
        X
      </button>
      <ul aria-label="쿠폰 리스트">
        {[0, 1, 2].map((id) => (
          <CouponItem
            key={id}
            disabled={isDisabled(id)}
            checked={isChecked(id)}
            onSelect={() => handleCouponToggle(id)}
          />
        ))}
      </ul>
      <button onClick={handleClose}>쿠폰 사용</button>
    </dialog>
  );
}
