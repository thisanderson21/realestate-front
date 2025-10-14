import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  it("should render the header with logo and text", () => {
    // Arrange
    render(<Header />);

    // Act
    const header = screen.getByRole("banner");
    const logoImage = screen.getByRole("img");
    const link = screen.getByRole("link", { name: /Million Real Estate - Ir al inicio/i });
    const logoText = screen.getByText(/MILLION/i);
    const accentText = screen.getByText(/REAL ESTATE/i);

    // Assert
    expect(header).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
    expect(logoImage).toHaveAttribute("src", "/logo_real_estate.svg");
    expect(logoText).toBeInTheDocument();
    expect(accentText).toBeInTheDocument();
  });

  it("should render the logo image with correct attributes", () => {
    // Arrange
    render(<Header />);

    // Act
    const image = screen.getByRole("img");

    // Assert
    expect(image).toHaveAttribute("width", "32");
    expect(image).toHaveAttribute("height", "32");
    expect(image).toHaveAttribute("alt", "");
  });
});
