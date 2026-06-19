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
import { useRef } from "react";

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

        <Spacing size={7} />
      </PageLayout>

      <CouponModal modalRef={modalRef} />
    </>
  );
}
