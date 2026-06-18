import { COLOR_PALETTE } from "@/styles/colorPalette";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const TYPOGRAPHY = {
  heading1: css`
    font-weight: 700;
    font-size: 24px;
    line-height: 100%;
  `,
  heading2: css`
    font-weight: 700;
    font-size: 18px;
    line-height: 100%;
  `,
  body1: css`
    font-weight: 700;
    font-size: 16px;
    line-height: 100%;
  `,
  body2: css`
    font-weight: 700;
    font-size: 15px;
    line-height: 100%;
  `,
  caption: css`
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
  `,
} as const;

export type TypographyVariant = keyof typeof TYPOGRAPHY;

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  typograph?: TypographyVariant;
  color?: keyof typeof COLOR_PALETTE | (string & {});
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export default function Text({ children, as, typograph = "body1", color = "black", ...props }: TextProps) {
  const Component = as || "span";

  return (
    <StyledText as={Component} typograph={typograph} color={color} {...props}>
      {children}
    </StyledText>
  );
}

const StyledText = styled.span<{
  typograph: TypographyVariant;
  color: string;
}>`
  ${({ typograph }) => TYPOGRAPHY[typograph]}
  color: ${({ color }) => COLOR_PALETTE[color as keyof typeof COLOR_PALETTE] || color};
  vertical-align: middle;
`;
