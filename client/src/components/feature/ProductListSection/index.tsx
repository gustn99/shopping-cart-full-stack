import Divider from "@components/common/shared/Divider";
import Spacing from "@components/common/shared/Spacing";
import Text from "@components/common/shared/Text";
import styled from "@emotion/styled";
import { COLOR_PALETTE } from "@styles/colorPalette.ts";

export default function ProductListSection() {
  // 상품 리스트 조회

  return (
    <ul aria-label="상품 리스트">
      {[
        { id: 1, name: "ㅁㄴㅇㄹ", price: 10000, quantity: 2, image: "" },
        { id: 2, name: "ㅂㅈㄷㄱ", price: 10000, quantity: 2, image: "" },
      ].map(({ id, name, price, quantity, image }) => (
        <CartItemContainer key={id}>
          <Divider />
          <Spacing size={0.75} />
          <CartItemInfoContainer>
            <CartItemImg src={image} alt={name} />
            <CartItemInfoWrapper>
              <ProductInfoWrapper>
                <Text typograph="caption" as="p">
                  {name}
                </Text>
                <Text typograph="heading1" as="p">
                  {price.toLocaleString()}원
                </Text>
              </ProductInfoWrapper>
              <QuantityWrapper>
                <Quantity>
                  <Text typograph="caption" as="span">
                    {quantity}개
                  </Text>
                </Quantity>
              </QuantityWrapper>
            </CartItemInfoWrapper>
          </CartItemInfoContainer>
        </CartItemContainer>
      ))}
    </ul>
  );
}

const CartItemContainer = styled.li``;

const CartItemInfoContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const CartItemImg = styled.img`
  width: 7rem;
  aspect-ratio: 1/1;
  border-radius: 0.5rem;
  border: none;
  background-color: ${COLOR_PALETTE["image-placeholder"]};
  object-fit: cover;
`;

const CartItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const QuantityWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Quantity = styled.div`
  width: 1.5rem;
  text-align: center;
`;
