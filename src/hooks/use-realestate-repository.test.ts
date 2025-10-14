import { renderHook } from "@testing-library/react";
import { useRepositoryIoc } from "@/services/context";
import { TYPES } from "@/services/types";
import { RealEstateRepository } from "@/services/repositories/real-estate.repository";
import useRealEstateRepository from "./use-realestate-repository";

jest.mock("@/services/context", () => ({
  useRepositoryIoc: jest.fn(),
}));

describe("useRealEstateRepository", () => {
  it("should return an instance of RealEstateRepository from the IoC container", () => {
    // Arrange
    const mockRepository = {} as RealEstateRepository;
    const mockContainer = {
      get: jest.fn().mockReturnValue(mockRepository),
    };
    
    (useRepositoryIoc as jest.Mock).mockReturnValue({ container: mockContainer });

    // Act
    const { result } = renderHook(() => useRealEstateRepository());

    // Assert
    expect(useRepositoryIoc).toHaveBeenCalledTimes(1);
    expect(mockContainer.get).toHaveBeenCalledWith(TYPES.REAL_ESTATE_REPOSITORY);
    expect(result.current).toBe(mockRepository);
  });
});
