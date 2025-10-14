import React from "react";
import { render, screen } from "@testing-library/react";
import { LottieAnimation } from "./LottieAnimation";


// Mock de Lottie para no renderizar la animación real
jest.mock("lottie-react", () => jest.fn(() => <div data-testid="lottie-mock" />));

describe("LottieAnimation Component", () => {
  const dummyAnimationData = { v: "5.7.6" };

  beforeEach(() => {
    jest.clearAllMocks(); // Limpia todos los mocks antes de cada test
  });
  
  const setup = (props = {}) => {
    return render(<LottieAnimation animationData={dummyAnimationData} {...props} />);
  };

  describe("Rendering", () => {
    it("should render Lottie component", () => {
      // Arrange & Act
      setup();
      const lottie = screen.getByTestId("lottie-mock");

      // Assert
      expect(lottie).toBeInTheDocument();
    });
  })
});
