import React from "react";
import { styled } from "@mui/material/styles";

export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
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
  inline?: boolean;
  /**
   * Default: "row"
   *
   * **Syntax**: "row" | "row-reverse" | "column" | "column-reverse";
   */
  direction?: FlexDirection;
  /**
   * Default: "nowrap"
   *
   * **Syntax**: "nowrap" | "wrap" | "wrap-reverse";
   */
  wrap?: FlexWrap;
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
   * Default: "auto"
   */
  basis?: string;
  margin?: string;
  padding?: string;
  width?: string;
  height?: string;
}

const StyledFlex = styled("div")<FlexProps>(
  ({
    inline,
    direction,
    wrap,
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
    style,
  }) => ({
    display: inline ? "inline-flex" : "flex",
    minWidth: 0,
    minHeight: 0,
    flexDirection: direction ?? "row",
    flexWrap: wrap ?? "nowrap",
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
    ...style,
  })
);

export default function Flex({
  children,
  inline = false,
  direction = "row",
  wrap = "nowrap",
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
  style = {},
  ...rest
}: React.PropsWithChildren<FlexProps>) {
  return (
    <StyledFlex
      inline={inline}
      direction={direction}
      wrap={wrap}
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
      style={style}
      {...rest}
    >
      {children}
    </StyledFlex>
  );
}
