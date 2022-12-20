import { expect, test } from "vitest";
import { Gear } from "../src";
import { GearData } from "../src/resource";

test("check all gears in gear resource", () => {
  for(const gearID of Object.keys(GearData)) {
    try {
      expect(Gear.createFromID(Number(gearID))).not.toBeUndefined();
    }
    catch (e) {
      throw Error(`Error on gearID: ${gearID}\nReason: ${e}`);
    }
  }
});
