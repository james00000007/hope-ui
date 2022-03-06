import { mergeProps, splitProps } from "solid-js";

import { useComponentStyleConfigs } from "@/theme/provider";
import { classNames, createClassSelector } from "@/utils/css";

import { Icon, IconProps } from "../icon/icon";
import { IconCheckCircle } from "../icons/IconCheckCircle";
import { IconCrossCircle } from "../icons/IconCrossCircle";
import { IconExclamationTriangle } from "../icons/IconExclamationTriangle";
import { IconInfoCircle } from "../icons/IconInfoCircle";
import { ElementType } from "../types";
import { alertIconStyles } from "./alert.styles";
import { useAlertContext } from "./alert-provider";

export type AlertIconProps<C extends ElementType = "svg"> = IconProps<C>;

const hopeAlertIconClass = "hope-alert-icon";

export function AlertIcon<C extends ElementType = "svg">(props: AlertIconProps<C>) {
  const theme = useComponentStyleConfigs().Alert;
  const { status } = useAlertContext();

  const defaultProps: IconProps<"svg"> = {
    boxSize: "$6",
  };

  const propsWithDefault: IconProps<"svg"> = mergeProps(defaultProps, props);
  const [local, others] = splitProps(propsWithDefault, ["as", "class"]);

  const classes = () => classNames(local.class, hopeAlertIconClass, alertIconStyles());

  const icon = () => {
    if (local.as) {
      return local.as as ElementType;
    }

    switch (status()) {
      case "success":
        return IconCheckCircle;
        break;
      case "info":
        return IconInfoCircle;
        break;
      case "warning":
        return IconExclamationTriangle;
        break;
      case "danger":
        return IconCrossCircle;
        break;
    }
  };

  return <Icon as={icon()} class={classes()} __baseStyle={theme?.baseStyle?.icon} {...others} />;
}

AlertIcon.toString = () => createClassSelector(hopeAlertIconClass);
