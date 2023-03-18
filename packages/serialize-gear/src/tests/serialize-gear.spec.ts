import { serializeGear } from "../lib/serialize-gear";

describe("serializeGear", () => {
  it("should work", () => {
    expect(serializeGear()).toEqual("serialize-gear");
  });
});
