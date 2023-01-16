import { createGearFromId } from "..";
import { gearJson } from "../lib/resource";

test("create all gears in resource", () => {
  for (const id of Object.keys(gearJson)) {
    expect(createGearFromId(Number(id))).not.toBeUndefined();
  }
});
