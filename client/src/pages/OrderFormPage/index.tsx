import { useState } from "react";

export default function OrderFormPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 상품 리스트 */}
      <ul>
        <li>상품 이름, 가격, 수량</li>
      </ul>

      {/* 쿠폰 적용 버튼 */}
      <button onClick={() => setIsOpen(true)}>쿠폰 적용</button>

      {/* 배송 정보 */}
      <label>
        <input type="checkbox" />
        제주도 및 도서 산간 지역
      </label>

      {/* 결제하기 버튼 */}
      <button>결제하기</button>

      {/* 쿠폰 모달 */}
      <dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <h2>쿠폰</h2>
        <ul>
          <li>
            <label>
              <input type="checkbox" />
              쿠폰1
            </label>
          </li>
        </ul>
        <button onClick={() => setIsOpen(false)}>쿠폰 사용하기</button>
      </dialog>
    </>
  );
}
