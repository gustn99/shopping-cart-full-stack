import Button from "@components/common/shared/Button";
import Header from "@components/common/shared/Header";
import PageLayout from "@components/common/shared/PageLayout";
import PositionBottom from "@components/common/shared/PositionBottom";
import Spacing from "@components/common/shared/Spacing";
import CouponModal from "@components/feature/CouponModal";
import DeliverySection from "@components/feature/DeliverySection";
import GoBackButton from "@components/feature/GoBackButton";
import OrderFormHeading from "@components/feature/OrderFormHeading";
import OrderSummarySection from "@components/feature/OrderSummarySection";
import PaymentButton from "@components/feature/PaymentButton.tsx";
import ProductListSection from "@components/feature/ProductListSection";
import styled from "@emotion/styled";
import { useModal } from "@hooks/useModal.ts";

export default function OrderFormPage() {
  const modal = useModal();

  return (
    <>
      <PageLayout>
        <Header LeftComponent={<GoBackButton />} />

        <OrderFormPageWrapper>
          <Spacing size={2.25} />
          <OrderFormHeading />
          <Spacing size={2.25} />

          <ProductListSection />
          <Spacing size={2} />
          <Button
            fullWidth
            rounded
            variant="outline"
            size="md"
            onClick={async () => {
              const selectedCouponIds = await modal.open<number[]>("couponModal", CouponModal);
              console.log(selectedCouponIds);
            }}
          >
            쿠폰 적용
          </Button>
          <Spacing size={2} />
          <DeliverySection />
          <Spacing size={2} />
          <OrderSummarySection />
        </OrderFormPageWrapper>

        <PositionBottom>
          <PaymentButton />
        </PositionBottom>
        <Spacing size={7} />
      </PageLayout>
    </>
  );
}

const OrderFormPageWrapper = styled.div`
  padding-inline: 24px;
`;
