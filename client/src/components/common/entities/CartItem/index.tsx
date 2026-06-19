import minus from "@assets/minus.svg";
import plus from "@assets/plus.svg";
import Spacing from "@components/common/shared/Spacing";
import CheckBox from "@components/common/shared/CheckBox";
import Divider from "@components/common/shared/Divider";
import Text from "@components/common/shared/Text";
import styled from "@emotion/styled";
import { COLOR_PALETTE } from "@styles/colorPalette";

interface QuantityRange {
  min: number;
  max: number;
}

interface CartItemProps {
  name: string;
  image: string;
  price: number;
  quantity: number;
  checked: boolean;
  quantityRange: QuantityRange;
  onSelect: () => void;
  onDelete: () => void;
  onChangeQuantity: (quantity: number) => void;
}

export default function CartItem({
  name,
  image,
  price,
  quantity,
  checked,
  onSelect,
  onDelete,
  quantityRange,
  onChangeQuantity,
}: CartItemProps) {
  return (
    <CartItemContainer>
      <Divider />
      <Spacing size={0.75} />
      <ActionButtonWrapper>
        <CheckBox checked={checked} onChange={onSelect} />
        <DeleteButton onClick={onDelete}>삭제</DeleteButton>
      </ActionButtonWrapper>
      <Spacing size={0.75} />
      <CartItemInfoContainer>
        <CartItemImg src={image} alt={name} />
        <CartItemInfoWrapper>
          <ProductInfoWrapper>
            <Text typograph="caption" as="p">
              {name}
            </Text>
            <Text typograph="heading1" as="p">
              {price.toLocaleString()}원
            </Text>
          </ProductInfoWrapper>
          <QuantityWrapper>
            <QuantityButton
              src={minus}
              disabled={quantity <= quantityRange.min}
              onClick={() => onChangeQuantity(Math.max(1, quantity - 1))}
            />
            <Quantity>
              <Text typograph="caption" as="span">
                {quantity}
              </Text>
            </Quantity>
            <QuantityButton
              src={plus}
              disabled={quantity >= quantityRange.max}
              onClick={() => onChangeQuantity(quantity + 1)}
            />
          </QuantityWrapper>
        </CartItemInfoWrapper>
      </CartItemInfoContainer>
    </CartItemContainer>
  );
}

const CartItemContainer = styled.li``;

const ActionButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid ${COLOR_PALETTE.border};
  background-color: ${COLOR_PALETTE.white};
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 0.9375rem;

  :active {
    background-color: ${COLOR_PALETTE.border};
  }
`;

const CartItemInfoContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const CartItemImg = styled.img`
  width: 7rem;
  aspect-ratio: 1/1;
  border-radius: 0.5rem;
  border: none;
  background-color: ${COLOR_PALETTE["image-placeholder"]};
  object-fit: cover;
`;

const CartItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const QuantityWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const QuantityButton = styled.button<{ src: string }>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${COLOR_PALETTE.border};
  background-color: ${COLOR_PALETTE.white};
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1rem;
  background-image: url("${(props) => props.src}");
  background-repeat: no-repeat;
  background-position: center;

  :active {
    background-color: ${COLOR_PALETTE.border};
  }

  :disabled {
    opacity: 0.2;
  }
`;

const Quantity = styled.div`
  width: 1.5rem;
  text-align: center;
`;
