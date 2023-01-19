import { dogpig } from "../lib/dogpig";

describe("dogpig", () => {
  it("should work", () => {
    expect(dogpig()).toEqual("dogpig");
  });
});
