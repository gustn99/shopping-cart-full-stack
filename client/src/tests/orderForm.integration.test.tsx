import { screen, within } from "@testing-library/react";
import { renderCartsApp } from "./setup/renderCartsApp";
import { ROUTES } from "@constants/routes";

describe("OrderFormPage", () => {
  describe("진입 및 렌더링", () => {
    it("/carts에서 주문 확인 클릭 시 /order-form으로 이동하고 상품 목록과 주문 summary를 렌더링한다", async () => {
      const { user } = renderCartsApp(ROUTES.CARTS);

      // 장바구니 로드 대기
      await screen.findByText("무선 헤드폰");

      const confirmButton = screen.getByRole("button", { name: "주문 확인" });
      await user.click(confirmButton);

      // /order-form 이동 확인 및 렌더링 확인
      expect(
        screen.getByRole("list", { name: /상품 리스트/ }),
      ).toBeInTheDocument();
      expect(screen.getByTestId("order-summary")).toBeInTheDocument();
    });
  });

  describe("쿠폰 모달", () => {
    it("쿠폰 적용 버튼 클릭 시 쿠폰 모달이 렌더링된다", async () => {
      const { user } = renderCartsApp(ROUTES.ORDER_FORM);

      const couponButton = screen.getByRole("button", { name: /쿠폰 적용/ });
      await user.click(couponButton);

      expect(screen.getByRole("dialog", { name: /쿠폰/ })).toBeVisible();
    });

    it("쿠폰 아이템 클릭 시 checked 상태가 변경된다", async () => {
      const { user } = renderCartsApp(ROUTES.ORDER_FORM);
      await user.click(screen.getByRole("button", { name: /쿠폰 적용/ }));

      const couponList = screen.getByRole("list", { name: /쿠폰 리스트/ });
      const couponCheckbox = within(couponList).getAllByRole("checkbox")[0];

      await user.click(couponCheckbox);
      expect(couponCheckbox).toBeChecked();

      await user.click(couponCheckbox);
      expect(couponCheckbox).not.toBeChecked();
    });

    it("쿠폰 아이템이 2개 checked된 경우 다른 checkbox는 disabled된다", async () => {
      const { user } = renderCartsApp(ROUTES.ORDER_FORM);
      await user.click(screen.getByRole("button", { name: /쿠폰 적용/ }));

      const couponList = screen.getByRole("list", { name: /쿠폰 리스트/ });
      const checkboxes = within(couponList).getAllByRole(
        "checkbox",
      ) as HTMLInputElement[];

      if (checkboxes.length >= 2) {
        await user.click(checkboxes[0]);
        await user.click(checkboxes[1]);

        checkboxes.forEach((checkbox) => {
          if (!checkbox.checked) {
            expect(checkbox).toBeDisabled();
          }
        });
      }
    });

    it("쿠폰 사용 버튼 클릭 시 쿠폰 모달이 닫힌다", async () => {
      const { user } = renderCartsApp(ROUTES.ORDER_FORM);
      await user.click(screen.getByRole("button", { name: /쿠폰 적용/ }));

      const useButton = screen.getByRole("button", { name: /쿠폰 사용/ });
      await user.click(useButton);

      expect(screen.queryByRole("dialog", { name: /쿠폰/ })).not.toBeVisible();
    });

    it("모달 내 x 버튼 클릭 시 모달이 닫힌다", async () => {
      const { user } = renderCartsApp(ROUTES.ORDER_FORM);
      await user.click(screen.getByRole("button", { name: /쿠폰 적용/ }));

      const closeButton = screen.getByRole("button", { name: /닫기/ });
      await user.click(closeButton);

      expect(screen.queryByRole("dialog", { name: /쿠폰/ })).not.toBeVisible();
    });

    it("esc 입력 시 모달이 닫힌다", async () => {
      const { user } = renderCartsApp(ROUTES.ORDER_FORM);
      await user.click(screen.getByRole("button", { name: /쿠폰 적용/ }));

      await user.keyboard("{Escape}");

      expect(screen.queryByRole("dialog", { name: /쿠폰/ })).not.toBeVisible();
    });

    it("모달 외부 클릭 시 모달이 닫힌다", async () => {
      const { user } = renderCartsApp(ROUTES.ORDER_FORM);
      await user.click(screen.getByRole("button", { name: /쿠폰 적용/ }));

      // dialog 외부(body 등) 클릭
      await user.click(document.body);

      expect(screen.queryByRole("dialog", { name: /쿠폰/ })).not.toBeVisible();
    });
  });

  describe("배송 정보", () => {
    it("도서 산간 지역 클릭 시 checked 상태가 변경된다", async () => {
      const { user } = renderCartsApp(ROUTES.ORDER_FORM);

      const checkbox = screen.getByRole("checkbox", {
        name: /도서 산간 지역/,
      });

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
  });

  describe("결제", () => {
    it("결제하기 클릭 시 결제 확인 페이지로 리다이렉트된다", async () => {
      const { user } = renderCartsApp(ROUTES.ORDER_FORM);

      const payButton = screen.getByRole("button", { name: /결제/ });
      await user.click(payButton);

      expect(await screen.findByText(/결제 확인/)).toBeInTheDocument();
    });
  });
});
