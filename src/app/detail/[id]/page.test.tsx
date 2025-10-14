import { render } from "@testing-library/react";
import PropertyPage, {
  generateStaticParams,
  generateMetadata,
} from "./page";
import { repositoryContainer } from "@/services/inversify.conf";
import { TYPES } from "@/services/types";
import { RepositoryIocProvider } from "@/services/context";
import Providers from "@/components/prooviders/providers";
import { notFound } from "next/navigation";

jest.mock("lottie-react", () => jest.fn(() => <div data-testid="lottie-mock" />));

jest.mock("@/services/inversify.conf", () => ({
  repositoryContainer: {
    get: jest.fn().mockReturnValue({
      getPropertiesFilter: jest.fn().mockResolvedValue([
        {
          _id: "123",
          idOwner: "O1",
          name: "Casa A",
          image: "/house.jpg",
          addressProperty: "Calle 10 #12-34",
          priceProperty: 120000,
        },
        {
          _id: "456",
          idOwner: "O2",
          name: "Casa B",
          image: "/house2.jpg",
          addressProperty: "Av Siempre Viva 742",
          priceProperty: 250000,
        },
      ])
    }),
  },
}));

// 🧩 Mock de next/navigation.notFound para espiar llamadas
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

describe("PropertyPage (detalle de propiedad)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the PropertyDetail component with the correct property", async () => {
    // Arrange
    const params = Promise.resolve({ id: "123" });

    // Act
    const page = await PropertyPage({ params });
    const { getByText } = render(
      <RepositoryIocProvider>
        <Providers>{page}</Providers>
      </RepositoryIocProvider>
    );

    // Assert
    expect(repositoryContainer.get).toHaveBeenCalledWith(TYPES.REAL_ESTATE_REPOSITORY);
    // expect(mockGetPropertiesFilter).toHaveBeenCalledWith({});
    expect(getByText("Casa A")).toBeInTheDocument();
    expect(getByText(/120,000/i)).toBeInTheDocument(); // formato USD
  });

  it("should call notFound if property does not exist", async () => {
    // Arrange
    const params = Promise.resolve({ id: "999" });

    // Act
    await PropertyPage({ params });

    // Assert
    expect(notFound).toHaveBeenCalled();
  });

  it("should generate static params correctly", async () => {
    // Act
    const params = await generateStaticParams();

    // Assert
    expect(params).toEqual([{ id: "123" }, { id: "456" }]);
    // expect(mockGetPropertiesFilter).toHaveBeenCalledTimes(1);
  });

  it("should return proper metadata when property exists", async () => {
    // Arrange
    const params = Promise.resolve({ id: "123" });

    // Act
    const metadata:any = await generateMetadata({ params });

    // Assert
    expect(metadata.title).toBe("Casa A - Million Real Estate");
    expect(metadata.openGraph?.images?.[0]).toMatchObject({
      url: "/house.jpg",
      alt: "Casa A",
    });
  });

  it("should return fallback metadata when property is not found", async () => {
    // Arrange
    const params = Promise.resolve({ id: "999" });

    // Act
    const metadata = await generateMetadata({ params });

    // Assert
    expect(metadata.title).toBe("Propiedad no encontrada");
  });
});
