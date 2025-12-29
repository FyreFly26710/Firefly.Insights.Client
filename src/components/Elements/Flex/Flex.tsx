import React from "react";
import { styled } from "@mui/material/styles";

export type Overflow = "visible" | "hidden" | "clip" | "scroll" | "auto";
export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
export type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";
export type AlignItems =
  | "flex-start"
  | "flex-end"
  | "center"
  | "stretch"
  | "baseline";

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Default: "row"
   *
   * **Syntax**: "row" | "row-reverse" | "column" | "column-reverse";
   */
  direction?: FlexDirection;

  /**
   * Default: "flex-start"
   *
   * **Syntax**: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
   */
  justify?: JustifyContent;
  /**
   * Default: "stretch"
   *
   * **Syntax**: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
   */
  align?: AlignItems;
  gap?: number | string;
  /**
   * Default: false (no grow)
   */
  grow?: boolean | number;
  /**
   * Default: true (shrink)
   */
  shrink?: boolean | number;
  /**
   * Default: "visible"
   *
   * **Syntax**: "visible" | "hidden" | "clip" | "scroll" | "auto";
   */
  overflow?: Overflow;
  basis?: string;
  margin?: string;
  padding?: string;
  width?: string;
  height?: string;
}

const StyledFlex = styled("div")<FlexProps>(
  ({
    direction,
    justify,
    align,
    gap,
    grow,
    shrink,
    basis,
    margin,
    padding,
    width,
    height,
    overflow,
  }) => ({
    display: "flex",
    minWidth: 0,
    minHeight: 0,
    flexDirection: direction ?? "row",
    justifyContent: justify ?? "flex-start",
    alignItems: align ?? "stretch",
    gap,
    flexGrow: typeof grow === "boolean" ? (grow ? 1 : 0) : grow,
    flexShrink: typeof shrink === "boolean" ? (shrink ? 1 : 0) : shrink,
    flexBasis: basis,
    margin,
    padding,
    width,
    height,
    overflow,
  })
);

export default function Flex({
  children,
  direction = "row",
  justify = "flex-start",
  align = "stretch",
  gap = 0,
  grow = false,
  shrink = true,
  basis = "auto",
  margin = "0",
  padding = "0",
  width = "auto",
  height = "auto",
  overflow = "visible",
  ...rest
}: React.PropsWithChildren<FlexProps>) {
  return (
    <StyledFlex
      {...rest}
      direction={direction}
      justify={justify}
      align={align}
      gap={gap}
      grow={grow}
      shrink={shrink}
      basis={basis}
      margin={margin}
      padding={padding}
      width={width}
      height={height}
      overflow={overflow}
    >
      {children}
    </StyledFlex>
  );
}
