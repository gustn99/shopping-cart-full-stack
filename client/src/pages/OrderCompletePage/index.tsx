import PageLayout from "@components/common/shared/PageLayout";
import Header from "@components/common/shared/Header";
import PositionBottom from "@components/common/shared/PositionBottom";
import Button from "@components/common/shared/Button";
import OrderConfirmSection from "@components/feature/OrderConfirm";

export default function OrderCompletePage() {
  return (
    <PageLayout>
      <Header />
      <OrderConfirmSection />

      <PositionBottom>
        <Button fullWidth>장바구니로 돌아가기</Button>
      </PositionBottom>
    </PageLayout>
  );
}
