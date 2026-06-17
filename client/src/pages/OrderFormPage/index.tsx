import Button from "@components/common/shared/Button";
import CheckBox from "@components/common/shared/CheckBox";
import Header from "@components/common/shared/Header";
import PageLayout from "@components/common/shared/PageLayout";
import PositionBottom from "@components/common/shared/PositionBottom";
import CouponModal from "@components/feature/CouponModal";
import GoBackButton from "@components/feature/GoBackButton";
import useOrderCompleteNavigate from "@hooks/useOrderCompleteNavigate.ts";
import { useRef } from "react";

export default function OrderFormPage() {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <PageLayout>
        <Header LeftComponent={<GoBackButton />} />

        <OrderFormHeading />
        <ProductListSection />

        <Button onClick={() => modalRef.current?.showModal()}>쿠폰 적용</Button>

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

function OrderFormHeading() {
  // 상품 리스트 조회

  return (
    <div>
      <h2>주문 확인</h2>
      <p>총 1종류의 상품 2개를 주문합니다.</p>
      <p>최종 결제 금액을 확인해 주세요.</p>
    </div>
  );
}

function ProductListSection() {
  // 상품 리스트 조회

  return (
    <ul aria-label="상품 리스트">
      {[0, 1, 2].map((id) => (
        <li key={id}>상품 이름, 가격, 수량</li>
      ))}
    </ul>
  );
}

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
