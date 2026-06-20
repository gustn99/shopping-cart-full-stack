import info from "@assets/info.svg";
import x from "@assets/x.svg";
import CouponItem from "@components/feature/CouponItem";
import Button from "@components/common/shared/Button";
import Flex from "@components/common/shared/Flex";
import Spacing from "@components/common/shared/Spacing";
import Text from "@components/common/shared/Text";
import styled from "@emotion/styled";
import useCheckedItems from "@hooks/useCheckedItems.ts";
import { COLOR_PALETTE } from "@styles/colorPalette.ts";

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
    <CouponModalContainer ref={modalRef} onClick={handleBackdropClick} aria-label="쿠폰">
      <Flex justify="space-between" align="center">
        <Text typograph="heading2" as="h3">
          쿠폰을 선택해 주세요
        </Text>
        <CloseButton src={x} iconOnly size="md" variant="ghost" onClick={handleClose} aria-label="닫기" />
      </Flex>
      <Spacing size={2} />

      <Flex gap={4} align="center">
        <InfoIcon src={info} alt="정보" />
        <Text typograph="caption" as="span">
          쿠폰은 최대 2개까지 사용할 수 있습니다.
        </Text>
      </Flex>
      <Spacing size={1} />

      <CouponList as="ul" direction="column" gap={12} aria-label="쿠폰 리스트">
        {[0, 1, 2, 3, 4, 5].map((id) => (
          <CouponItem
            key={id}
            disabled={isDisabled(id)}
            checked={isChecked(id)}
            onSelect={() => handleCouponToggle(id)}
          />
        ))}
      </CouponList>
      <Spacing size={1.25} />
      <Button fullWidth rounded size="md" intent="secondary" onClick={handleClose}>
        쿠폰 사용
      </Button>
    </CouponModalContainer>
  );
}

const CouponModalContainer = styled.dialog`
  width: 382px;
  height: 614px;
  padding: 24px 32px;
  border-radius: 8px;
  margin: auto;
  border: none;

  ::backdrop {
    background-color: ${COLOR_PALETTE.dimmed};
  }

  &[open] {
    display: flex;
    flex-direction: column;
  }
`;

const CloseButton = styled(Button)<{ src: string }>`
  background-image: url("${({ src }) => src}");
  background-repeat: no-repeat;
  background-position: center;
`;

const InfoIcon = styled.img`
  width: 0.875rem;
  aspect-ratio: 1/1;
`;

const CouponList = styled(Flex)`
  flex: 1;
  overflow-y: auto;
`;
