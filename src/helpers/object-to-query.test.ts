import { objectToQueryString } from "./object-to-query";


describe("objectToQueryString", () => {

  it("should convert a simple object to a query string", () => {
    // Arrange
    const params = { name: "John", age: 30 };

    // Act
    const result = objectToQueryString(params);

    // Assert
    expect(result).toBe("?name=John&age=30");
  });

  it("should encode special characters correctly", () => {
    // Arrange
    const params = { search: "React hooks & testing" };

    // Act
    const result = objectToQueryString(params);

    // Assert
    expect(result).toBe("?search=React%20hooks%20%26%20testing");
  });

  it("should filter out undefined, null, empty string and zero values", () => {
    // Arrange
    const params = {
      a: "test",
      b: undefined,
      c: null,
      d: "",
      e: 0,
      f: false, // ojo: false sí debería pasar
    };

    // Act
    const result = objectToQueryString(params);

    // Assert
    expect(result).toBe("?a=test&f=false");
  });

  it("should return an empty string if all params are invalid", () => {
    // Arrange
    const params = { a: "", b: null, c: undefined, d: 0 };

    // Act
    const result = objectToQueryString(params);

    // Assert
    expect(result).toBe("");
  });

  it("should handle an empty object", () => {
    // Arrange
    const params = {};

    // Act
    const result = objectToQueryString(params);

    // Assert
    expect(result).toBe("");
  });
});
