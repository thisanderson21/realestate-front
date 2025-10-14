import axiosIntance from "@/core/axios-config";
import { RealEstateRepositoryService } from "./real-estate.repository.service";
import { objectToQueryString } from "@/helpers/object-to-query";

jest.mock("@/core/axios-config", () => ({
  get: jest.fn(),
}));

jest.mock("@/helpers/object-to-query", () => ({
  objectToQueryString: jest.fn(),
}));

describe("RealEstateRepositoryService", () => {
  let repository: RealEstateRepositoryService;

  beforeEach(() => {
    repository = new RealEstateRepositoryService();
    jest.clearAllMocks();
  });

  it("should call axios with correct URL and return properties", async () => {
    // Arrange
    const mockQuery = { name: "House A" };
    const mockQueryString = "?name=House%20A";
    const mockResponse = {
      data: [
        { _id: "1", name: "House A", addressProperty: "Street 1", priceProperty: 100000 },
      ],
    };

    (objectToQueryString as jest.Mock).mockReturnValue(mockQueryString);
    (axiosIntance.get as jest.Mock).mockResolvedValue(mockResponse);

    // Act
    const result = await repository.getPropertiesFilter(mockQuery);

    // Assert
    expect(objectToQueryString).toHaveBeenCalledWith(mockQuery);
    expect(axiosIntance.get).toHaveBeenCalledWith(`/api/Properties${mockQueryString}`);
    expect(result).toEqual(mockResponse.data);
  });

  it("should handle empty query object correctly", async () => {
    // Arrange
    const mockQuery = {};
    const mockQueryString = "";
    const mockResponse = {
      data: [
        { _id: "2", name: "House B", addressProperty: "Street 2", priceProperty: 200000 },
      ],
    };

    (objectToQueryString as jest.Mock).mockReturnValue(mockQueryString);
    (axiosIntance.get as jest.Mock).mockResolvedValue(mockResponse);

    // Act
    const result = await repository.getPropertiesFilter(mockQuery);

    // Assert
    expect(objectToQueryString).toHaveBeenCalledWith(mockQuery);
    expect(axiosIntance.get).toHaveBeenCalledWith("/api/Properties");
    expect(result).toEqual(mockResponse.data);
  });

  it("should throw an error if axios fails", async () => {
    // Arrange
    const mockQuery = { name: "ErrorHouse" };
    const mockQueryString = "?name=ErrorHouse";
    const mockError = new Error("Network Error");

    (objectToQueryString as jest.Mock).mockReturnValue(mockQueryString);
    (axiosIntance.get as jest.Mock).mockRejectedValue(mockError);

    await expect(repository.getPropertiesFilter(mockQuery)).rejects.toThrow("Network Error");
    expect(axiosIntance.get).toHaveBeenCalledWith(`/api/Properties${mockQueryString}`);
  });
});
