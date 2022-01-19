import {
  ColorProps,
  DisplayProps,
  FlexboxAndGridProps,
  FlexboxProps,
  GridProps,
  MarginProps,
  PaddingProps,
  BorderRadiusProps,
  ShadowProps,
  SizeProps,
} from "./styleProps";

/*
 * Hack to get all styles prop names in sync with they related prop types.
 * Here we don't care about the value, only the object keys.
 * With this, when a value change in the prop type we get an error here.
 */

type PropConfig<T> = Record<keyof T, true>;

/**
 * Style prop names for display property
 */
export const displayPropConfig: PropConfig<DisplayProps> = {
  // Display
  display: true,
};

/**
 * Style prop names for color related properties
 */
export const colorPropConfig: PropConfig<ColorProps> = {
  color: true,
  bg: true,
};

/**
 * Style prop names for border-radius properties
 */
export const borderRadiusPropConfig: PropConfig<BorderRadiusProps> = {
  borderRadius: true,
};

/**
 * Style prop names for shadows properties
 */
export const shadowPropConfig: PropConfig<ShadowProps> = {
  boxShadow: true,
};

/**
 * Style prop names for margin properties
 */
export const marginPropConfig: PropConfig<MarginProps> = {
  m: true,
  mx: true,
  my: true,
  mt: true,
  mr: true,
  mb: true,
  ml: true,
};

/**
 * Style prop names for padding properties
 */
export const paddingPropConfig: PropConfig<PaddingProps> = {
  p: true,
  px: true,
  py: true,
  pt: true,
  pr: true,
  pb: true,
  pl: true,
};

/**
 * Style prop names for sizes properties
 */
export const sizePropConfig: PropConfig<SizeProps> = {
  w: true,
  minW: true,
  maxW: true,
  h: true,
  minH: true,
  maxH: true,
  boxSize: true,
};

/**
 * Style prop names used in flexbox based components
 */
export const flexboxPropConfig: PropConfig<FlexboxProps> = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: true,
  justifySelf: true,
  alignSelf: true,
  order: true,
};

/**
 * Style prop names used in CSS grid based components
 */
export const gridPropConfig: PropConfig<GridProps> = {
  gridColumnStart: true,
  gridRowStart: true,
  gridRowEnd: true,
  gridTemplate: true,
  gridColumnEnd: true,
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true,
};

/**
 * Style prop names used in flexbox and CSS grid based components
 */
export const flexboxAndGridPropConfig: PropConfig<FlexboxAndGridProps> = {
  gap: true,
  rowGap: true,
  columnGap: true,
  placeContent: true,
  placeItems: true,
  placeSelf: true,
};

/**
 * Get the common keys between two objects
 * @param obj The object to check if it contains some keys of the reference object.
 * @param reference The reference object to look for.
 * @returns An array of the common keys.
 */
export function getIntersectionKeys<R = Record<string, unknown>>(
  obj: Record<string, unknown>,
  reference: R
) {
  return Object.keys(obj).filter(key => key in reference) as Array<keyof R>;
}