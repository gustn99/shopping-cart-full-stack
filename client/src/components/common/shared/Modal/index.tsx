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
    <ModalWrapper onClick={handleBackdropClick} {...props}>
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
