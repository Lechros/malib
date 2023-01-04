import { createGear } from "../lib/create-gear";

describe("createGear", () => {
  it("should work", () => {
    expect(createGear()).toEqual("create-gear");
  });
});
