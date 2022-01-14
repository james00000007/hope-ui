import { HopeTheme } from "@/theme/index";

export const defaultTheme: HopeTheme = {
  components: {
    Button: {
      variant: "filled",
      color: "primary",
      size: "sm",
      radius: "sm",
      loaderPosition: "left",
      compact: false,
      uppercase: false,
      fullWidth: false,
    },
    Container: {
      centered: true,
    },
    IconButton: {
      variant: "filled",
      color: "primary",
      size: "sm",
      radius: "sm",
      compact: false,
    },
    Paper: {
      padding: "sm",
      radius: "sm",
      shadow: "sm",
      withBorder: false,
    },
    Tag: {
      variant: "light",
      color: "primary",
      size: "sm",
      radius: "full",
    },
  },
};