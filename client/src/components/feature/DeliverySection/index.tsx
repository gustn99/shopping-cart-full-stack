import Flex from "@components/common/shared/Flex";
import Text from "@components/common/shared/Text";
import Spacing from "@components/common/shared/Spacing";
import CheckBox from "@components/common/shared/CheckBox";
import useOrderQuery from "@/hooks/useOrderQuery";

interface DeliverySectionProps {
  orderId: number;
}

export default function DeliverySection({ orderId }: DeliverySectionProps) {
  const { data: order } = useOrderQuery(orderId);

  return (
    <div>
      <Text typograph="heading2" as="h3">
        배송 정보
      </Text>
      <Spacing direction="vertical" size={1} />
      <Flex as="label" align="center">
        <CheckBox checked={order.isRemoteArea} />
        <Spacing direction="horizontal" size={0.5} />
        <Text typograph="caption" as="span">
          제주도 및 도서 산간 지역
        </Text>
      </Flex>
    </div>
  );
}
