import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";
import styles from "./Button.module.scss";

describe("Button Component", () => {

  const setup = (props: any, content: React.ReactNode) => {
    return render(<Button {...props} >{content}</Button>);
  }
  describe("Rendering", () => {
    it("should render button with children text", () => {
      // Arrange
      const buttonText = "Click me";

      // Act
      setup({}, buttonText)

      // Assert
      expect(screen.getByRole("button", { name: buttonText })).toBeInTheDocument();
    });

    it("should render button with default props", () => {
      // Arrange & Act
      setup({}, 'Default Button')
      const button = screen.getByRole("button");

      // Assert
      expect(button).toHaveAttribute("type", "button");
      expect(button).toHaveClass(styles.button, styles.primary, styles.medium);
      expect(button).not.toBeDisabled();
    });
  });

  describe("Variants", () => {
    it.each([
      ["primary", styles.primary],
      ["secondary", styles.secondary],
      ["danger", styles.danger],
      ["success", styles.success],
    ] as const)("should apply %s variant class", (variant, expectedClass) => {
      // Arrange & Act
      setup({variant: variant}, 'Button')
      const button = screen.getByRole("button");

      // Assert
      expect(button).toHaveClass(expectedClass);
    });
  });

  describe("Sizes", () => {
    it.each([
      ["small", styles.small],
      ["medium", styles.medium],
      ["large", styles.large],
    ] as const)("should apply %s size class", (size, expectedClass) => {
      // Arrange & Act
      setup({size: size}, 'Button')

      const button = screen.getByRole("button");

      // Assert
      expect(button).toHaveClass(expectedClass);
    });
  });

  describe("Type attribute", () => {
    it.each([
      ["button"],
      ["submit"],
      ["reset"],
    ] as const)("should render with type %s", (type) => {
      // Arrange & Act
      setup({type: type}, 'Button')
      const button = screen.getByRole("button");

      // Assert
      expect(button).toHaveAttribute("type", type);
    });
  });

  describe("Disabled state", () => {
    it("should be disabled when disabled prop is true", () => {
      // Arrange & Act
      setup({disabled: true}, 'Button')
      const button = screen.getByRole("button");

      // Assert
      expect(button).toBeDisabled();
    });

    it("should not call onClick when disabled", async () => {
      // Arrange
      const user = userEvent.setup();
      const handleClick = jest.fn();

      // Act
      setup({onClick: handleClick, disabled:true}, 'Disabled Button')
      const button = screen.getByRole("button");
      await user.click(button);

      // Assert
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Click interactions", () => {
    it("should call onClick handler when clicked", async () => {
      // Arrange
      const user = userEvent.setup();
      const handleClick = jest.fn();

      // Act
      setup({onClick: handleClick}, 'ButtonClickable Button')
      const button = screen.getByRole("button");
      await user.click(button);

      // Assert
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should call onClick multiple times on multiple clicks", async () => {
      // Arrange
      const user = userEvent.setup();
      const handleClick = jest.fn();

      // Act
      setup({onClick: handleClick}, 'Button')
      const button = screen.getByRole("button");
      await user.click(button);
      await user.click(button);
      await user.click(button);

      // Assert
      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe("Full width", () => {
    it("should apply fullWidth class when fullWidth prop is true", () => {
      // Arrange & Act
      setup({fullWidth: true}, 'Full Width Button')
      const button = screen.getByRole("button");

      // Assert
      expect(button).toHaveClass(styles.fullWidth);
    });
  })
});