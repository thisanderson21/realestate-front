import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PriceRangeSelector } from "./PriceRange";

describe("PriceRangeSelector Component", () => {
  const setup = (onChangeFilter = jest.fn()) => {
    render(<PriceRangeSelector onChangeFilter={onChangeFilter} />);
    return { onChangeFilter };
  };

  describe("Rendering", () => {
    it("should render toggle button", () => {
      // Arrange & Act
      setup();
      
      // Assert
      expect(screen.getByRole("button", { name: /price range/i })).toBeInTheDocument();
    });

    it("should not render range box initially", () => {
      // Arrange & Act
      setup();

      // Assert
      expect(screen.queryByText(/min:/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/max:/i)).not.toBeInTheDocument();
    });
  });

  describe("Toggle range box", () => {
    it("should show range box when toggle clicked", async () => {
      // Arrange
      const user = userEvent.setup();
      setup();
      const toggle = screen.getByRole("button", { name: /price range/i });

      // Act
      await user.click(toggle);

      // Assert
      expect(screen.getByText(/min:/i)).toBeInTheDocument();
      expect(screen.getByText(/max:/i)).toBeInTheDocument();
    });

    it("should hide range box when toggle clicked again", async () => {
      // Arrange
      const user = userEvent.setup();
      setup();
      const toggle = screen.getByRole("button", { name: /price range/i });
      await user.click(toggle); // abrir

      // Act
      await user.click(toggle); // cerrar

      // Assert
      expect(screen.queryByText(/min:/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/max:/i)).not.toBeInTheDocument();
    });
  });

  describe("Changing range values", () => {
    it("should update min and max values on input change", async () => {
      // Arrange
      const user = userEvent.setup();
      setup();
      const toggle = screen.getByRole("button", { name: /price range/i });
      await user.click(toggle);
      const inputs = screen.getAllByRole("slider") as HTMLInputElement[];

      // Act
      await userEvent.type(inputs[0], "{arrowup}{arrowup}{arrowup}");
      await userEvent.type(inputs[1], "{arrowdown}{arrowdown}");

      // Assert
      expect(screen.getByText(/Min:\s*\$1,000/)).toBeInTheDocument();
      expect(screen.getByText(/Max:\s*\$3,000/)).toBeInTheDocument();
    });
  });

  describe("Buttons", () => {
    it("should call onChangeFilter with [0,0] when Clear clicked", async () => {
      // Arrange
      const user = userEvent.setup();
      const { onChangeFilter } = setup();
      const toggle = screen.getByRole("button", { name: /price range/i });
      await user.click(toggle);

      const clearButton = screen.getByRole("button", { name: /clear/i });

      // Act
      await user.click(clearButton);

      // Assert
      expect(onChangeFilter).toHaveBeenCalledWith([0, 0]);
      expect(screen.queryByText(/min:/i)).not.toBeInTheDocument();
    });

    it("should call onChangeFilter with selected range when To apply clicked", async () => {
      // Arrange
      const user = userEvent.setup();
      const { onChangeFilter } = setup();
      const toggle = screen.getByRole("button", { name: /price range/i });
      await user.click(toggle);
      const applyButton = screen.getByRole("button", { name: /to apply/i });

      // Act
      await user.click(applyButton);

      // Assert
      expect(onChangeFilter).toHaveBeenCalledWith([1000, 3000]);
      expect(screen.queryByText(/min:/i)).not.toBeInTheDocument();
    });
  });
});
