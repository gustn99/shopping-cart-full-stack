import type { Product } from "@/types/cartProduct";
import CartHeading from "@components/common/entities/CartHeading";
import CartList from "@components/common/entities/CartList";
import CartOrderAmount from "@components/common/entities/CartOrderAmount";
import Button from "@components/common/shared/Button";
import PositionBottom from "@components/common/shared/PositionBottom";
import Spacing from "@components/common/shared/Spacing";
import styled from "@emotion/styled";
import useCartItemDeleteMutation from "@hooks/useCartItemDeleteMutation";
import useCartQuantityUpdateMutation from "@hooks/useCartQuantityUpdateMutation";
import useCartQuery from "@hooks/useCartQuery";
import useCheckedItems from "@hooks/useCheckedItems";
import useOrderConfirmNavigate from "@hooks/useOrderConfirmNavigate";
import {
  getCheckedItemsFromLocalStorage,
  removeCheckedItemsFromLocalStorage,
  setCheckedItemsToLocalStorage,
} from "./libs/localStorage";
import {
  calcDeliveryFee,
  calcOrderAmount,
  calcTotalAmount,
  makeCheckedItem,
} from "./libs/carts";

export default function CartsSection() {
  const { data } = useCartQuery();
  const { mutate: quantityMutate } = useCartQuantityUpdateMutation();
  const { mutate: deleteMutate } = useCartItemDeleteMutation();
  const { navigate } = useOrderConfirmNavigate();

	const isSavedCheckedItemsExist =  getCheckedItemsFromLocalStorage().length === 0
  const initialCheckedItems = isSavedCheckedItemsExist ? makeCheckedItem(data) : getCheckedItemsFromLocalStorage();

	// 상품을 선택/해제하는 로직을 가져온다.
  const { checkedItems, select, unselect, unselectAll } =
    useCheckedItems<Product["id"]>(initialCheckedItems);

  const isAllChecked = checkedItems.length === data.length;
  const isChecked = (id: number) => checkedItems.includes(id);

	// 선택된 상품을 기준으로 주문 금액, 배송비, 총 결제 금액을 계산한다.
  const orderAmount = calcOrderAmount(data, checkedItems);
  const deliveryFee = calcDeliveryFee(orderAmount);
  const totalAmount = calcTotalAmount(orderAmount, deliveryFee);

	// 전체 상품을 선택/해제하고, localStorage에 동기화한다.
  const handleSelectAll = () => {
    if (isAllChecked) {
      removeCheckedItemsFromLocalStorage();
      return unselectAll();
    }

    setCheckedItemsToLocalStorage(makeCheckedItem(data));
    data.forEach(({ product }) => select(product.id));
  };

	// 개별 상품을 선택/해제하고, localStorage에 동기화한다.
  const handleSelect = (id: number) => {
    if (isChecked(id)) {
      setCheckedItemsToLocalStorage(checkedItems.filter((item) => item !== id));
      return unselect(id);
    }

    setCheckedItemsToLocalStorage([...checkedItems, id]);
    select(id);
  };

	// 상품 수량을 변경한다.
  const handleQuantityChange = (id: number, quantity: number) => {
    quantityMutate(id, quantity);
  };

	// 상품을 삭제한다.
  const handleDelete = (id: number) => {
    deleteMutate(id);
    setCheckedItemsToLocalStorage(checkedItems.filter((item) => item !== id));
    unselect(id);
  };

	// 페이지를 전환한다.
  const handleConfirm = () => {
    navigate({
      totalAmount,
      products: data.filter(({ product }) => isChecked(product.id)),
    });
  };

  return (
    <ContentContainer>
      <Spacing size={2.25} />
      <CartHeading productCount={data.length} />
      <Spacing size={2.25} />
      {data.length !== 0 ? (
        <>
          <CartList
            cartProducts={data}
            checkedItems={checkedItems}
            onSelectAll={handleSelectAll}
            onSelect={handleSelect}
            quantityRange={{ min: 1, max: 99 }}
            onChangeQuantity={handleQuantityChange}
            onDelete={handleDelete}
          />
          <CartOrderAmount
            orderAmount={orderAmount}
            deliveryFee={deliveryFee}
            totalAmount={totalAmount}
          />
        </>
      ) : (
        <EmptyCartContainer>
          <EmptyCartText>장바구니에 담은 상품이 없습니다.</EmptyCartText>
        </EmptyCartContainer>
      )}
      <PositionBottom>
        <Button
          fullWidth
          disabled={checkedItems.length === 0}
          onClick={handleConfirm}
        >
          주문 확인
        </Button>
      </PositionBottom>
    </ContentContainer>
  );
}

const ContentContainer = styled.section`
  width: 100%;
  padding-inline: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
`;

const EmptyCartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const EmptyCartText = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
`;
