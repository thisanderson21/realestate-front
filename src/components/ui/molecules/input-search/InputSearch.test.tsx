import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputSearch } from "./InputSearch";
import styles from "./InputSearch.module.scss";

describe("InputSearch Component", () => {
  const setup = (props?: Partial<React.ComponentProps<typeof InputSearch>>) => {
    const defaultProps = {
      search: "",
      setSearch: jest.fn(),
      onSearch: jest.fn(),
      ...props,
    };
    render(<InputSearch {...defaultProps} />);
    return defaultProps;
  };

  describe("Rendering", () => {
    it("should render the input field and icon", () => {
      // Arrange & Act
      setup();
      
      // Assert
      const input = screen.getByPlaceholderText("Search...");
      const icon = screen.getByAltText("Casa en renta en Palm Harbor, Beverly Springfield");
      
      expect(input).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });

    it("should have the input value from props", () => {
      setup({ search: "Palm Harbor" });
      const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
      expect(input.value).toBe("Palm Harbor");
    });
  });

  describe("Interactions", () => {
    it("should call setSearch on input change", async () => {
      // Arrange
      const user = userEvent.setup();
      const props = setup();
      const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;

      // Act
      await user.type(input, "Hello");

      // Assert
      expect(props.setSearch).toHaveBeenCalledTimes(5); // 'Hello' tiene 5 letras
      expect(props.setSearch).toHaveBeenCalledWith("H");
      expect(props.setSearch).toHaveBeenCalledWith("e");
      expect(props.setSearch).toHaveBeenCalledWith("l");
    });
  });
});
