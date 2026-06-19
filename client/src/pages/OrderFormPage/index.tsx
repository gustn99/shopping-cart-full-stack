import Button from "@components/common/shared/Button";
import CheckBox from "@components/common/shared/CheckBox";
import Header from "@components/common/shared/Header";
import PageLayout from "@components/common/shared/PageLayout";
import PositionBottom from "@components/common/shared/PositionBottom";
import CouponModal from "@components/feature/CouponModal";
import GoBackButton from "@components/feature/GoBackButton";
import useOrderCompleteNavigate from "@hooks/useOrderCompleteNavigate.ts";
import { useRef } from "react";
import Text from "@components/common/shared/Text";
import styled from "@emotion/styled";
import Divider from "@components/common/shared/Divider";
import Spacing from "@components/common/shared/Spacing";
import { COLOR_PALETTE } from "@styles/colorPalette.ts";

export default function OrderFormPage() {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <PageLayout>
        <Header LeftComponent={<GoBackButton />} />

        <OrderFormHeading />
        <ProductListSection />

        <Button fullWidth rounded variant="outline" size="md" onClick={() => modalRef.current?.showModal()}>
          쿠폰 적용
        </Button>

        <DeliverySection />
        <OrderSummarySection />

        <PositionBottom>
          <PaymentButton />
        </PositionBottom>
      </PageLayout>

      <CouponModal modalRef={modalRef} />
    </>
  );
}

export function OrderFormHeading() {
  // 주문 조회

  return (
    <OrderFormHeadingContainer>
      <Text typograph="heading1" as="h2">
        주문 확인
      </Text>
      <Text typograph="caption" as="p">
        총 1종류의 상품 2개를 주문합니다.
        <br />
        최종 결제 금액을 확인해 주세요.
      </Text>
    </OrderFormHeadingContainer>
  );
}

const OrderFormHeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

function ProductListSection() {
  // 상품 리스트 조회

  return (
    <ul aria-label="상품 리스트">
      {[
        { id: 1, name: "ㅁㄴㅇㄹ", price: 10000, quantity: 2, image: "" },
        { id: 2, name: "ㅂㅈㄷㄱ", price: 10000, quantity: 2, image: "" },
      ].map(({ id, name, price, quantity, image }) => (
        <CartItemContainer key={id}>
          <Divider />
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
                <Quantity>
                  <Text typograph="caption" as="span">
                    {quantity}개
                  </Text>
                </Quantity>
              </QuantityWrapper>
            </CartItemInfoWrapper>
          </CartItemInfoContainer>
        </CartItemContainer>
      ))}
    </ul>
  );
}

const CartItemContainer = styled.li``;

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

const Quantity = styled.div`
  width: 1.5rem;
  text-align: center;
`;

function DeliverySection() {
  // 배송 정보 조회 및 변경

  return (
    <div>
      <h3>배송 정보</h3>
      <label>
        <CheckBox />
        제주도 및 도서 산간 지역
      </label>
    </div>
  );
}

function OrderSummarySection() {
  // summary 정보 조회

  return <div data-testid="order-summary"></div>;
}

function PaymentButton() {
  const { navigate } = useOrderCompleteNavigate();

  return (
    <Button fullWidth onClick={() => navigate()}>
      결제하기
    </Button>
  );
}
