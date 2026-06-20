import useCheckedItems from "@hooks/useCheckedItems.ts";
import Button from "@components/common/shared/Button";

interface ModalProps extends React.ComponentProps<"dialog"> {
  modalRef: React.RefObject<HTMLDialogElement | null>;
}

export default function Modal({ modalRef, children, ...props }: ModalProps) {
  const handleClose = () => modalRef.current?.close();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <dialog ref={modalRef} onClick={handleBackdropClick} {...props}>
      {children}
    </dialog>
  );
}

interface CouponModalProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  onConfirm: (checkedIds: number[]) => void;
}

export function CouponModal({ modalRef, onConfirm }: CouponModalProps) {
  const { checkedItems, select, unselect } = useCheckedItems<number>();
  const isChecked = (id: number) => checkedItems.includes(id);
  const canCheckMore = checkedItems.length < 2;

  const handleCouponToggle = (id: number) => {
    if (isChecked(id)) return unselect(id);
    select(id);
  };

  const handleClose = () => modalRef.current?.close();

  const handleConfirm = () => {
    onConfirm(checkedItems); // id 기반으로 mutation
  };

  return (
    <Modal modalRef={modalRef} aria-label="쿠폰">
      <h2>쿠폰</h2>
      <button onClick={handleClose} aria-label="닫기">
        X
      </button>
      <ul aria-label="쿠폰 리스트">
        {[0, 1, 2].map((id, index) => (
          <li key={id}>
            <label>
              <input
                type="checkbox"
                disabled={!canCheckMore && !isChecked(id)}
                checked={isChecked(id)}
                onChange={() => handleCouponToggle(id)}
              />
              쿠폰{index + 1}
            </label>
          </li>
        ))}
      </ul>
      <Button onClick={handleConfirm}>쿠폰 사용</Button>
    </Modal>
  );
}
