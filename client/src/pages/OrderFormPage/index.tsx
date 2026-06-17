import { useState } from "react";

export default function OrderFormPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 상품 리스트 */}
      <ul aria-label="상품 리스트">
        <li>상품 이름, 가격, 수량</li>
        <li>상품 이름, 가격, 수량</li>
      </ul>

      {/* 쿠폰 적용 버튼 */}
      <button onClick={() => setIsOpen(true)}>쿠폰 적용</button>

      {/* 배송 정보 */}
      <label>
        <input type="checkbox" />
        제주도 및 도서 산간 지역
      </label>

      {/* 주문 summary */}
      <div data-testid="order-summary">결제 금액</div>

      {/* 결제하기 버튼 */}
      <button>결제하기</button>

      {/* 쿠폰 모달 */}
      <dialog open={isOpen} onClose={() => setIsOpen(false)} aria-label="쿠폰">
        <h2>쿠폰</h2>
        <button onClick={() => setIsOpen(false)} aria-label="닫기">
          X
        </button>
        <ul aria-label="쿠폰 리스트">
          <li>
            <label>
              <input type="checkbox" />
              쿠폰1
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              쿠폰2
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              쿠폰3
            </label>
          </li>
        </ul>
        <button onClick={() => setIsOpen(false)}>쿠폰 사용</button>
      </dialog>
    </>
  );
}
