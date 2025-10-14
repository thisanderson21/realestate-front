import React from "react";
import { render, screen } from "@testing-library/react";
import { PropertyDetail } from "./PropertyDetail";
import { DEFAULT_IMAGE } from "@/constants/images";

describe("PropertyDetail Component", () => {
  const dummyProperty = {
    _id: "123",
    name: "Casa Moderna",
    addressProperty: "Calle 45 #12-34",
    priceProperty: 250000,
    image: "/casa.jpg",
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render property information correctly", () => {
    // Arrange
    // Act
    render(<PropertyDetail property={dummyProperty} />);

    // Assert
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Casa Moderna");
    expect(screen.getByText("Calle 45 #12-34")).toBeInTheDocument();
    expect(screen.getByText("$250,000")).toBeInTheDocument();
    expect(screen.getByText(/USD/i)).toBeInTheDocument();
  });

  it("should render default image if no image is provided", () => {
    const propertyWithoutImage = { ...dummyProperty, image: "" };
    render(<PropertyDetail property={propertyWithoutImage} />);
    const img = screen.getByAltText(dummyProperty.name) as HTMLImageElement;;

    expect(img.src).toContain(encodeURIComponent(DEFAULT_IMAGE));
  });

  it("should render default image", () => {
    const propertyWithoutImage = { ...dummyProperty };
    render(<PropertyDetail property={propertyWithoutImage} />);
    const img = screen.getByAltText(dummyProperty.name) as HTMLImageElement;;

    expect(img.src).toContain(encodeURIComponent(dummyProperty.image));
  });

  it("should render badges for virtual tour and best deal", () => {
    render(<PropertyDetail property={dummyProperty} />);
    expect(screen.getByText("Virtual home tour")).toBeInTheDocument();
    expect(screen.getByText("Find the best deal")).toBeInTheDocument();
  });

  it("should render the CTA button", () => {
    render(<PropertyDetail property={dummyProperty} />);
    expect(screen.getByRole("button", { name: /see more/i })).toBeInTheDocument();
  });
});
