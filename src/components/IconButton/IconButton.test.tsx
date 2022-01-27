import { cleanup, screen } from "solid-testing-library";

import { IconUser } from "@/icons/IconUser";
import { defaultTheme } from "@/theme/defaultTheme";
import { renderWithHopeProvider } from "@/utils/renderWithHopeProvider";

import { buttonStyles, iconButtonStyles } from "../Button/Button.styles";
import { IconButtonOptions } from ".";
import { IconButton } from "./IconButton";

describe("IconButton", () => {
  afterEach(cleanup);

  it("should render", () => {
    // act
    renderWithHopeProvider(() => <IconButton aria-label="User" icon={<IconUser />} />);
    const button = screen.getByRole("button");

    // assert
    expect(button).toBeInTheDocument();
  });

  it("should render <button> tag by default", () => {
    // act
    renderWithHopeProvider(() => <IconButton aria-label="User" icon={<IconUser />} />);
    const button = screen.getByRole("button");

    // assert
    expect(button).toBeInstanceOf(HTMLButtonElement);
  });

  it("should render tag provided with the as prop", () => {
    // act
    renderWithHopeProvider(() => <IconButton as="a" aria-label="User" icon={<IconUser />} />);
    const button = screen.getByRole("button");

    // assert
    expect(button).toBeInstanceOf(HTMLAnchorElement);
  });

  it("should have type=button", () => {
    // act
    renderWithHopeProvider(() => <IconButton aria-label="User" icon={<IconUser />} />);
    const button = screen.getByRole("button");

    // assert
    expect(button).toHaveAttribute("type", "button");
  });

  it("should have role=button", () => {
    // act
    renderWithHopeProvider(() => <IconButton aria-label="User" icon={<IconUser />} />);
    const button = screen.getByRole("button");

    // assert
    expect(button).toHaveAttribute("role", "button");
  });

  it("should have class from class prop", () => {
    // arrange
    const stubClass = "stub";

    // act
    renderWithHopeProvider(() => (
      <IconButton class={stubClass} aria-label="User" icon={<IconUser />} />
    ));
    const button = screen.getByRole("button");

    // assert
    expect(button).toHaveClass(stubClass);
  });

  it("should have class from className prop", () => {
    // arrange
    const stubClass = "stub";

    // act
    renderWithHopeProvider(() => (
      <IconButton className={stubClass} aria-label="User" icon={<IconUser />} />
    ));
    const button = screen.getByRole("button");

    // assert
    expect(button).toHaveClass(stubClass);
  });

  it("should have class from classList prop", () => {
    // arrange
    const stubClass = "stub";

    // act
    renderWithHopeProvider(() => (
      <IconButton classList={{ [stubClass]: true }} aria-label="User" icon={<IconUser />} />
    ));
    const button = screen.getByRole("button");

    // assert
    expect(button).toHaveClass(stubClass);
  });

  it("should have stitches generated class from iconButtonStyles", () => {
    // arrange
    const iconButtonClass = iconButtonStyles();

    // act
    renderWithHopeProvider(() => <IconButton aria-label="User" icon={<IconUser />} />);
    const button = screen.getByRole("button");

    // assert
    expect(button).toHaveClass(iconButtonClass.className);
  });

  it("should have stitches generated class from Button theme by default", () => {
    // arrange
    const buttonClass = buttonStyles(defaultTheme.components.Button);

    // act
    renderWithHopeProvider(() => <IconButton aria-label="User" icon={<IconUser />} />);
    const button = screen.getByRole("button");

    // assert
    expect(button).toHaveClass(buttonClass.className);
  });

  it("should have stitches generated class from variants prop", () => {
    // arrange
    const variantProps: Omit<IconButtonOptions, "aria-label" | "icon"> = {
      variant: "light",
      color: "success",
      size: "lg",
      radius: "md",
      compact: true,
      loading: false,
    };
    const buttonClass = buttonStyles(variantProps);

    // act
    renderWithHopeProvider(() => (
      <IconButton {...variantProps} aria-label="User" icon={<IconUser />} />
    ));
    const button = screen.getByRole("button");

    // assert
    expect(button).toHaveClass(buttonClass.className);
  });

  it("should have stitches generated class from css prop", () => {
    // arrange
    const customCSS = { bg: "red" };
    const buttonClass = buttonStyles({ css: customCSS });

    // act
    renderWithHopeProvider(() => (
      <IconButton css={customCSS} aria-label="User" icon={<IconUser />} />
    ));
    const button = screen.getByRole("button");

    // assert
    expect(button).toHaveClass(buttonClass.className);
  });
});
