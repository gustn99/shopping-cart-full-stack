import CouponModal from "@components/feature/CouponModal";
import { ROUTES } from "@constants/routes.ts";
import { useRef } from "react";
import { useNavigate } from "react-router";

export default function OrderFormPage() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  return (
    <>
      {/* 상품 리스트 */}
      <ul aria-label="상품 리스트">
        <li>상품 이름, 가격, 수량</li>
        <li>상품 이름, 가격, 수량</li>
      </ul>

      {/* 쿠폰 적용 버튼 */}
      <button onClick={() => modalRef.current?.showModal()}>쿠폰 적용</button>

      {/* 배송 정보 */}
      <label>
        <input type="checkbox" />
        제주도 및 도서 산간 지역
      </label>

      {/* 주문 summary */}
      <div data-testid="order-summary">결제 금액</div>

      {/* 결제하기 버튼 */}
      <button onClick={() => navigate(ROUTES.ORDER_COMPLETE)}>결제하기</button>

      {/* 쿠폰 모달 */}
      <CouponModal modalRef={modalRef} />
    </>
  );
}
