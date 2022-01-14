import { mergeProps, Show, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { ElementType } from "@/components";
import { TagContextValue, TagProvider } from "@/components/Tag/TagContext";
import { useHopeTheme } from "@/contexts";

import { TagProps } from "./types";

export function Tag<C extends ElementType = "span">(props: TagProps<C>) {
  const tagTheme = useHopeTheme().components.Tag;

  const defaultProps: TagProps<"span"> = {
    as: "span",
    variant: tagTheme.variant,
    color: tagTheme.color,
    size: tagTheme.size,
    radius: tagTheme.radius,
  };

  const propsWithDefault = mergeProps(defaultProps, props);
  const [local, others] = splitProps(propsWithDefault, [
    "as",
    "class",
    "className",
    "classList",
    "variant",
    "color",
    "size",
    "radius",
    "leftSection",
    "rightSection",
    "children",
  ]);

  const rootClassList = () => ({
    "h-tag": true,
    "h-tag--with-left-section": local.leftSection,
    "h-tag--with-right-section": local.rightSection,
    [`h-tag--variant-${local.variant}`]: true,
    [`h-tag--size-${local.size}`]: true,
    [`h-tag--radius-${local.radius}`]: true,
    [`h-tag--color-${local.color}`]: true,
    [local.class || ""]: true,
    [local.className || ""]: true,
    ...local.classList,
  });

  const shouldWrapChildrenInSpan = () => {
    return local.leftSection || local.rightSection;
  };

  const tagContextValue: TagContextValue = {
    variant: local.variant ?? tagTheme.variant,
    color: local.color ?? tagTheme.color,
    size: local.size ?? tagTheme.size,
    radius: local.radius ?? tagTheme.radius,
  };

  return (
    <TagProvider tagContextValue={tagContextValue}>
      <Dynamic component={local.as} classList={rootClassList()} {...others}>
        <Show when={local.leftSection}>{local.leftSection}</Show>
        <Show when={shouldWrapChildrenInSpan()} fallback={local.children}>
          <span>{local.children}</span>
        </Show>
        <Show when={local.rightSection}>{local.rightSection}</Show>
      </Dynamic>
    </TagProvider>
  );
}
