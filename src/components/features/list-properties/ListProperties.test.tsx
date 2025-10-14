import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ListProperties } from "./ListProperties";
import { Property } from "@/services/repositories/real-estate.repository";
import Providers from "@/components/prooviders/providers";

jest.mock("lottie-react", () => jest.fn(() => <div data-testid="lottie-mock" />));

const mockGetPropertiesFilter = jest.fn();
jest.mock("@/hooks/use-realestate-repository", () => () => ({
  getPropertiesFilter: mockGetPropertiesFilter
}));

describe("ListProperties Component", () => {
  const dummyData: Property[] = [
    { _id: "1", name: "Casa A", priceProperty: 100000, addressProperty: "Addr A", image: "", idOwner: "owner1" } as Property,
    { _id: "2", name: "Casa B", priceProperty: 200000, addressProperty: "Addr B", image: "", idOwner: "owner2" } as Property
  ];

  const setup = () => render(
    <Providers>
      <ListProperties initialData={dummyData} />
    </Providers>
  );

  it("should render container, header and filters", () => {
    setup();
    expect(screen.getByText("Based on your location")).toBeInTheDocument();
    expect(screen.getByText("Some of our picked properties near you location.")).toBeInTheDocument();
  });

  it("should render ArtProperty for each property in initialData", () => {
    setup();
    const allNames = screen.getAllByRole("heading", { level: 3 });
    expect(allNames).toHaveLength(dummyData.length);
    expect(screen.getByText("Casa A")).toBeInTheDocument();
    expect(screen.getByText("Casa B")).toBeInTheDocument();
  });

  it("should render NoResults if data is empty", () => {
    jest.mock("@tanstack/react-query", () => ({
      useQuery: () => ({
        data: [],
        isLoading: false,
        isError: false
      })
    }));
    render(
      <Providers >
        <ListProperties initialData={[]} />
      </Providers>);
    expect(screen.getByText("No hay resultados que coincidan con tu búsqueda.")).toBeInTheDocument();
  });

  it("should update priceRange when PriceRangeSelector is clicked", async () => {
    const user = userEvent.setup();
    setup();
    const btn = screen.getByText("Price range 💰");
    await user.click(btn);
    
    const [minInput, maxInput] = screen.getAllByRole("slider");
    
    // Act
    fireEvent.change(maxInput, { target: { value: "20000" } });
    fireEvent.change(minInput, { target: { value: "10000" } });
    
    const btnApply = screen.getByText("To apply");
    await user.click(btnApply);
  
    // Assert
    expect(mockGetPropertiesFilter).toHaveBeenCalled();
  });

  it("should update search when typing in InputSearch", async () => {
    const user = userEvent.setup();
    setup();
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    await user.type(input, "Test");
    expect(input.value).toBe("Test");
  });
});
