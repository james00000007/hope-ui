import { createSignal, createUniqueId, JSX, mergeProps, Show, splitProps } from "solid-js";

import { useThemeComponentStyles } from "@/theme";
import { classNames, createClassSelector } from "@/utils/css";
import { callAllHandlers } from "@/utils/function";

import { Box } from "../box/box";
import { ElementType, HopeComponentProps } from "../types";
import {
  switchContainerStyles,
  SwitchContainerVariants,
  switchControlStyles,
  SwitchControlVariants,
  switchInputStyles,
  switchLabelStyles,
} from "./switch.styles";

export type ThemeableSwitchOptions = SwitchContainerVariants & SwitchControlVariants;

interface SwitchOptions extends ThemeableSwitchOptions {
  /**
   * The ref to be passed to the internal <input> tag.
   */
  ref?: HTMLInputElement | ((el: HTMLInputElement) => void);

  /**
   * The name of the input field in a switch
   * (Useful for form submission).
   */
  name?: string;

  /**
   * The value to be used in the switch input.
   * This is the value that will be returned on form submission.
   */
  value?: string | number;

  /**
   * If `true`, the switch will be checked.
   * You'll need to pass `onChange` to update its value (since it is now controlled)
   */
  checked?: boolean;

  /**
   * If `true`, the switch will be initially checked.
   */
  defaultChecked?: boolean;

  /**
   * If `true`, the switch input is marked as required,
   * and `required` attribute will be added
   */
  required?: boolean;

  /**
   * If `true`, the switch will be disabled
   */
  disabled?: boolean;

  /**
   * If `true`, the switch will be readonly
   */
  readOnly?: boolean;

  /**
   * If `true`, the input will have `aria-invalid` set to `true`
   */
  invalid?: boolean;

  /**
   * The callback invoked when the checked state of the `Switch` changes.
   */
  onChange?: JSX.EventHandlerUnion<HTMLInputElement, Event>;

  /**
   * The callback invoked when the switch is focused
   */
  onFocus?: JSX.EventHandlerUnion<HTMLInputElement, FocusEvent>;

  /**
   * The callback invoked when the switch is blurred (loses focus)
   */
  onBlur?: JSX.EventHandlerUnion<HTMLInputElement, FocusEvent>;
}

export type SwitchProps<C extends ElementType = "label"> = HopeComponentProps<C, SwitchOptions>;

const hopeSwitchClass = "hope-switch";
const hopeSwitchInputClass = "hope-switch__input";
const hopeSwitchControlClass = "hope-switch__control";
const hopeSwitchLabelClass = "hope-switch__label";

export function Switch<C extends ElementType = "label">(props: SwitchProps<C>) {
  const theme = useThemeComponentStyles().Switch;

  const defaultProps: SwitchProps<"label"> = {
    as: "label",
    id: `hope-switch-${createUniqueId()}`,
    variant: theme?.defaultProps?.variant ?? "filled",
    colorScheme: theme?.defaultProps?.colorScheme ?? "primary",
    size: theme?.defaultProps?.size ?? "md",
    labelPosition: theme?.defaultProps?.labelPosition ?? "left",
  };

  const propsWithDefaults: SwitchProps<"label"> = mergeProps(defaultProps, props);
  const [local, inputProps, variantProps, others] = splitProps(
    propsWithDefaults,
    ["checked", "defaultChecked", "invalid", "onChange", "class", "children"],
    [
      "ref",
      "id",
      "name",
      "value",
      "required",
      "disabled",
      "readOnly",
      "aria-label",
      "aria-labelledby",
      "aria-describedby",
      "tabIndex",
      "onFocus",
      "onBlur",
    ],
    ["variant", "colorScheme", "size", "labelPosition"]
  );

  // Internal state for uncontrolled switch.
  // eslint-disable-next-line solid/reactivity
  const [checkedState, setCheckedState] = createSignal(!!local.defaultChecked);

  const isControlled = () => local.checked !== undefined;
  const checked = () => (isControlled() ? local.checked : checkedState());

  // Input loose focus if this is placed in `dataAttrs()`
  const dataChecked = () => (checked() ? "" : undefined);

  const dataAttrs = () => ({
    "data-required": inputProps.required ? "" : undefined,
    "data-disabled": inputProps.disabled ? "" : undefined,
    "data-invalid": local.invalid ? "" : undefined,
    "data-readonly": inputProps.readOnly ? "" : undefined,
  });

  const ariaAttrs = () => ({
    "aria-required": inputProps.required ? true : undefined,
    "aria-disabled": inputProps.disabled ? true : undefined,
    "aria-invalid": local.invalid ? true : undefined,
    "aria-readonly": inputProps.readOnly ? true : undefined,
  });

  const containerClasses = () => {
    return classNames(local.class, hopeSwitchClass, switchContainerStyles(variantProps));
  };

  const inputClasses = () => classNames(hopeSwitchInputClass, switchInputStyles());

  const controlClasses = () => {
    return classNames(hopeSwitchControlClass, switchControlStyles(variantProps));
  };

  const labelClasses = () => classNames(hopeSwitchLabelClass, switchLabelStyles(variantProps));

  const onChange: JSX.EventHandlerUnion<HTMLInputElement, Event> = event => {
    if (inputProps.readOnly || inputProps.disabled) {
      event.preventDefault();
      return;
    }

    if (!isControlled()) {
      const target = event.target as HTMLInputElement;
      setCheckedState(target.checked);
    }

    callAllHandlers(local.onChange)(event);
  };

  return (
    <Box
      as="label"
      __baseStyle={theme?.baseStyle}
      class={containerClasses()}
      for={inputProps.id}
      data-checked={dataChecked()}
      {...dataAttrs}
      {...others}
    >
      <input
        type="checkbox"
        role="switch"
        class={inputClasses()}
        checked={checked()}
        onChange={onChange}
        {...inputProps}
        {...ariaAttrs}
      />
      <span aria-hidden={true} class={controlClasses()} data-checked={dataChecked()} {...dataAttrs} />
      <Show when={local.children}>
        <span class={labelClasses()} data-checked={dataChecked()} {...dataAttrs}>
          {local.children}
        </span>
      </Show>
    </Box>
  );
}

Switch.toString = () => createClassSelector(hopeSwitchClass);
