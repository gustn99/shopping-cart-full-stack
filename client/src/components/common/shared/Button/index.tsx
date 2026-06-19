import styled from "@emotion/styled";
import { COLOR_PALETTE } from "@styles/colorPalette";
import Text from "@components/common/shared/Text";

interface ButtonStyleProps {
  fullWidth?: boolean;
  rounded?: boolean;
  variant?: "solid" | "outline";
  size?: "md" | "lg";
}

interface ButtonProps extends React.ComponentProps<"button">, ButtonStyleProps {}

const TYPOGRAPH_MAP = {
  lg: "body1",
  md: "body2",
} as const;

const TEXT_COLOR_MAP = {
  solid: COLOR_PALETTE.white,
  outline: COLOR_PALETTE.gray,
} as const;

const BG_COLOR_MAP = {
  solid: COLOR_PALETTE.black,
  outline: COLOR_PALETTE.white,
} as const;

const BORDER_COLOR_MAP = {
  solid: COLOR_PALETTE.black,
  outline: COLOR_PALETTE.border,
} as const;

const PADDING_MAP = {
  lg: "1.5rem",
  md: "1rem",
} as const;

export default function Button({
  fullWidth = false,
  variant = "solid",
  rounded = false,
  size = "lg",
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonWrapper fullWidth={fullWidth} variant={variant} rounded={rounded} size={size} {...props}>
      <Text
        typograph={TYPOGRAPH_MAP[size]}
        color={TEXT_COLOR_MAP[variant]}
      >
        {children}
      </Text>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<Required<ButtonStyleProps>>`
  background-color: ${({ variant }) => BG_COLOR_MAP[variant]};
  color: ${COLOR_PALETTE.white};
  font-weight: 700;
  font-size: 1rem;
  line-height: 1rem;
  padding-block: ${({ size }) => PADDING_MAP[size]};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  border: 1px solid ${({ variant }) => BORDER_COLOR_MAP[variant]};
  border-radius: ${({ rounded }) => (rounded ? "5px" : 0)};

  :disabled {
    background-color: ${COLOR_PALETTE.disabled};
    border: none;
  }
`;
