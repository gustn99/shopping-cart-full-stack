import Header from "@components/common/shared/Header";
import PageLayout from "@components/common/shared/PageLayout";
import PositionBottom from "@components/common/shared/PositionBottom";
import Spacing from "@components/common/shared/Spacing";
import DeliverySection from "@components/feature/DeliverySection";
import GoBackButton from "@components/feature/GoBackButton";
import OrderFormHeading from "@components/feature/OrderFormHeading";
import OrderSummarySection from "@components/feature/OrderSummarySection";
import PaymentButton from "@components/feature/PaymentButton.tsx";
import ProductListSection from "@components/feature/ProductListSection";
import styled from "@emotion/styled";
import CouponApplyButton from "@components/feature/CouponApplyButton";

export default function OrderFormPage() {
  return (
    <PageLayout>
      <Header LeftComponent={<GoBackButton />} />

      <OrderFormPageWrapper>
        <Spacing size={2.25} />
        <OrderFormHeading />
        <Spacing size={2.25} />

        <ProductListSection />
        <Spacing size={2} />
        <CouponApplyButton />
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
  );
}

const OrderFormPageWrapper = styled.div`
  padding-inline: 24px;
`;
