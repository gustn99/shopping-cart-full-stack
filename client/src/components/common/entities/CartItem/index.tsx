import minus from "@assets/minus.svg";
import plus from "@assets/plus.svg";
import ProductImg from "@components/common/entities/ProductImg";
import Flex from "@components/common/shared/Flex";
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
      <Flex justify="space-between" align="center">
        <CheckBox checked={checked} onChange={onSelect} />
        <DeleteButton onClick={onDelete}>삭제</DeleteButton>
      </Flex>
      <Spacing size={0.75} />

      <Flex gap={24} align="center">
        <ProductImg src={image} alt={name} />
        <Flex direction="column" gap={24}>
          <Flex direction="column" gap={4}>
            <Text typograph="caption" as="p">
              {name}
            </Text>
            <Text typograph="heading1" as="p">
              {price.toLocaleString()}원
            </Text>
          </Flex>
          <Flex gap={8} align="center">
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
          </Flex>
        </Flex>
      </Flex>
    </CartItemContainer>
  );
}

const CartItemContainer = styled.li``;

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
