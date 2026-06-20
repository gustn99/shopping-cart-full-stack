import CartItem from "@components/common/entities/CartItem";
import CheckBox from "@components/common/shared/CheckBox";
import Flex from "@components/common/shared/Flex";
import Text from "@components/common/shared/Text";
import type { Cart, Product, QuantityRange } from "@/types/cartProduct";
import Spacing from "@components/common/shared/Spacing";

interface CartListProps {
  cartProducts: Cart[];
  checkedItems: Product["id"][];
  onSelectAll: () => void;
  onSelect: (id: Product["id"]) => void;
  quantityRange: QuantityRange;
  onChangeQuantity: (id: Product["id"], quantity: number) => void;
  onDelete: (id: Product["id"]) => void;
}

export default function CartList({
  cartProducts,
  checkedItems,
  onDelete,
  quantityRange,
  onChangeQuantity,
  onSelect,
  onSelectAll,
}: CartListProps) {
  return (
    <Flex direction="column">
      <Flex as="label" gap={8} align="center">
        <CheckBox checked={checkedItems.length === cartProducts.length} onChange={() => onSelectAll()} />
        <Text typograph="caption">전체선택</Text>
      </Flex>
      <Spacing size={1.25} />
      <Flex as="ul" direction="column" gap={20}>
        {cartProducts.map(({ product, quantity }) => (
          <CartItem
            key={product.id}
            {...product}
            quantity={quantity}
            checked={checkedItems.includes(product.id)}
            onSelect={() => onSelect(product.id)}
            onDelete={() => onDelete(product.id)}
            quantityRange={quantityRange}
            onChangeQuantity={(newQuantity) => onChangeQuantity(product.id, newQuantity)}
          />
        ))}
      </Flex>
      <Spacing size={3.25} />
    </Flex>
  );
}
