import { type CartsErrorCode, CARTS_ERROR_MESSAGES } from "@/constants/errorMessages";
import type { Product } from "@/types/cartProduct";
import ApiError from "@apis/apiError.ts";
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
import useOrderFormNavigate from "@hooks/useOrderFormNavigate.ts";
import { getCheckedItemsFromLocalStorage, setCheckedItemsToLocalStorage } from "./libs/localStorage";
import { calcDeliveryFee, calcOrderAmount, calcTotalAmount, makeCheckedItem } from "./libs/carts";
import { useEffect } from "react";

export default function CartsSection() {
  const { data } = useCartQuery();
  const { mutate: quantityMutate, error: quantityMutateError } = useCartQuantityUpdateMutation();
  const { mutate: deleteMutate, error: deleteMutateError } = useCartItemDeleteMutation();
  const { navigate } = useOrderFormNavigate();

  const isCheckedItemsSaved = getCheckedItemsFromLocalStorage().length === 0;
  const initialCheckedItems = isCheckedItemsSaved ? makeCheckedItem(data) : getCheckedItemsFromLocalStorage();

  const { checkedItems, select, unselect, unselectAll } = useCheckedItems<Product["id"]>(initialCheckedItems);

  const isAllChecked = checkedItems.length === data.length;
  const isChecked = (id: number) => checkedItems.includes(id);

  const orderAmount = calcOrderAmount(data, checkedItems);
  const deliveryFee = calcDeliveryFee(orderAmount);
  const totalAmount = calcTotalAmount(orderAmount, deliveryFee);

  const handleSelectAll = () => {
    if (isAllChecked) {
      return unselectAll();
    }

    data.forEach(({ product }) => select(product.id));
  };

  const handleSelect = (id: number) => {
    if (isChecked(id)) {
      return unselect(id);
    }

    select(id);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    quantityMutate(id, quantity);
  };

  const handleDelete = (id: number) => {
    deleteMutate(id);
    setCheckedItemsToLocalStorage(checkedItems.filter((item) => item !== id));
    unselect(id);
  };

  const handleConfirm = () => {
    navigate({
      totalAmount,
      products: data.filter(({ product }) => isChecked(product.id)),
    });
  };

  useEffect(
    function persistCheckedItems() {
      setCheckedItemsToLocalStorage(checkedItems);
    },
    [checkedItems],
  );

  useEffect(
    function syncCartQuantityUpdateError() {
      if (!quantityMutateError) return;

      if (quantityMutateError instanceof ApiError) {
        const message = CARTS_ERROR_MESSAGES[quantityMutateError.code as CartsErrorCode] ?? quantityMutateError.message;
        alert(message);
      } else {
        alert(CARTS_ERROR_MESSAGES.DEFAULT);
      }
    },
    [quantityMutateError],
  );

  useEffect(
    function syncCartItemDeleteError() {
      if (!deleteMutateError) return;

      if (deleteMutateError instanceof ApiError) {
        const message = CARTS_ERROR_MESSAGES[deleteMutateError.code as CartsErrorCode] ?? deleteMutateError.message;
        alert(message);
      } else {
        alert(CARTS_ERROR_MESSAGES.DEFAULT);
      }
    },
    [deleteMutateError],
  );

  return (
    <ContentContainer>
      <Spacing size={2.25} />
      <CartHeading productCount={data.length} />
      <Spacing size={2.25} />
      {data.length !== 0 ? (
        <>
          <CartList cartProducts={data} checkedItems={checkedItems} onSelectAll={handleSelectAll} onSelect={handleSelect} quantityRange={{ min: 1, max: 99 }} onChangeQuantity={handleQuantityChange} onDelete={handleDelete} />
          <CartOrderAmount orderAmount={orderAmount} deliveryFee={deliveryFee} totalAmount={totalAmount} />
        </>
      ) : (
        <EmptyCartContainer>
          <EmptyCartText>장바구니에 담은 상품이 없습니다.</EmptyCartText>
        </EmptyCartContainer>
      )}
      <PositionBottom>
        <Button fullWidth disabled={checkedItems.length === 0} onClick={handleConfirm}>
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
