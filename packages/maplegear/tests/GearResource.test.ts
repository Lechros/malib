import { getGearIDs } from "maplegear-resource";
import { Gear } from "../src";

test("check all gears in gear resource", () => {
  for(const gearID of getGearIDs()) {
    try {
      expect(Gear.createFromID(Number(gearID))).not.toBeUndefined();
    }
    catch (e) {
      throw Error(`Error on gearID: ${gearID}\nReason: ${e}`);
    }
  }
});
