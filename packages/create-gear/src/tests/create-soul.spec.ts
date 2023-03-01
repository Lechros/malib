import { createSoulFromId } from "..";
import { soulJson } from "../lib/resource";

test("create all souls in resource", () => {
  for (const id of Object.keys(soulJson)) {
    const soul = createSoulFromId(Number(id));
    expect(soul).not.toBeUndefined();
  }
});
