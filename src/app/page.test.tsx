import { render } from "@testing-library/react";
import PropertiesPage, { generateMetadata } from "./page";
import { repositoryContainer } from "@/services/inversify.conf";
import { TYPES } from "@/services/types";
import RootLayout from "./layout";

jest.mock("@/services/inversify.conf", () => ({
  repositoryContainer: {
    get: jest.fn().mockReturnValue({
      getPropertiesFilter: jest.fn().mockReturnValue([{ _id: '1223', image: '/house.jpg', addressProperty: 'Calle', idOwner: '1223', name: 'House A', priceProperty: 12000 }]),
    }),
  },
}));
jest.mock("lottie-react", () => jest.fn(() => <div data-testid="lottie-mock" />));

describe("PropertiesPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the ListProperties component with fetched data", async () => {
    const page = await PropertiesPage();
    const { getByText } = render(<RootLayout>
        {page}
      </RootLayout>);

    // Assert
    expect(repositoryContainer.get).toHaveBeenCalledWith(TYPES.REAL_ESTATE_REPOSITORY);
    expect(getByText('House A')).toBeDefined();
  });

  it("should return correct metadata", async () => {
    // Act
    const metadata:any = await generateMetadata();

    // Assert
    expect(metadata.title).toBe("Propiedades en venta - Million Real Estate");
    expect(metadata.openGraph?.images?.[0]).toBe("/og-image.jpg");
  });
});
