import styled from "@emotion/styled";
import { COLOR_PALETTE } from "@styles/colorPalette.ts";
import { useEffect } from "react";

interface ModalProps extends React.ComponentProps<"dialog"> {
  shouldLockBackgroundScroll?: boolean;
  closeOnBackdropClick?: boolean;
  onClose?: () => void;
}

export default function Modal({
  shouldLockBackgroundScroll,
  closeOnBackdropClick,
  onClose,
  children,
  ...props
}: ModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (!closeOnBackdropClick) return;

    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  // TODO: 모달a가 닫히면 바로 모달b가 뜨는 상황에 scroll이 default로 돌아가진 않을지?
  useEffect(() => {
    if (shouldLockBackgroundScroll) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      if (shouldLockBackgroundScroll) {
        document.body.style.overflowY = "";
      }
    };
  }, [shouldLockBackgroundScroll]);

  return (
    <ModalWrapper onClick={handleBackdropClick} onClose={onClose} {...props}>
      {children}
    </ModalWrapper>
  );
}

const ModalWrapper = styled.dialog`
  margin: auto;
  border: none;

  ::backdrop {
    background-color: ${COLOR_PALETTE.dimmed};
  }
`;
