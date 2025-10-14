import React from "react";
import { render, screen } from "@testing-library/react";
import { ArtProperty } from "./ArtProperty";
import { Property } from "@/services/repositories/real-estate.repository";
import { DEFAULT_IMAGE } from "@/constants/images";


describe("ArtProperty Component", () => {
  const dummyProperty: Property = {
    _id: "123",
    name: "Casa de prueba",
    priceProperty: 100000,
    addressProperty: "123 Main St",
    image: "/test-image.jpg",
  } as Property;

  const setup = (property?: Property) => {
    render(<ArtProperty property={property || dummyProperty} />);
  };

  describe("Rendering", () => {
    it("should render the article with correct class", () => {
      setup();
      const article = screen.getByRole("article");
      expect(article).toHaveClass("card");
    });

    it("should render Link with correct href", () => {
      setup();
      const link = screen.getByRole("link", { name: `Ver detalles de ${dummyProperty.name}` });
      expect(link).toHaveAttribute("href", `/detail/${dummyProperty._id}`);
    });

    it("should display the property name, price and address", () => {
      setup();
      expect(screen.getByText(dummyProperty.name)).toBeInTheDocument();
      expect(screen.getByText(/\$100,000/)).toBeInTheDocument(); // formateado con formatToUSD
      expect(screen.getByText(dummyProperty.addressProperty)).toBeInTheDocument();
    });

    it("should render the property image", () => {
      setup();
      const img = screen.getByAltText(`Propiedad ${dummyProperty.name} en ${dummyProperty.addressProperty}`) as HTMLImageElement;
      expect(img.src).toContain(encodeURIComponent('test-image.jpg'));
    });

    it("should render the property DEFAULT_IMAGE", () => {
      setup({ ...dummyProperty, image: null });
      const imgDefault = screen.getByAltText(`Propiedad ${dummyProperty.name} en ${dummyProperty.addressProperty}`) as HTMLImageElement;

      expect(imgDefault.src).toContain(encodeURIComponent(DEFAULT_IMAGE));
    });
  });

  describe("Metadata", () => {
    it("should render correct meta tags", () => {
      setup();
      expect(screen.getByRole("article").querySelector(`meta[itemprop="availability"]`)).toHaveAttribute("content", "https://schema.org/InStock");
      expect(screen.getByRole("article").querySelector(`meta[itemprop="description"]`)).toHaveAttribute("content", `Propiedad en venta: ${dummyProperty.name}`);
      expect(screen.getByRole("article").querySelector(`meta[itemprop="propertyID"]`)).toHaveAttribute("content", dummyProperty._id);
    });
  });
});
