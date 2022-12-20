import { getGearIDs, getItemOptionIDs } from "maplegear-resource";
import { Gear, Potential } from "../src";

test("check all gears in resource", () => {
  for(const id of getGearIDs()) {
    try {
      expect(Gear.createFromID(Number(id))).not.toBeUndefined();
    }
    catch(e) {
      throw Error(`Error on gear id: ${id}\nReason: ${e}`);
    }
  }
});

test("check all item options in resource", () => {
  for(const id of getItemOptionIDs()) {
    try {
      expect(Potential.createFromID(id, 10)).not.toBeUndefined();
    }
    catch(e) {
      throw Error(`Error on item option id: ${id}\nReason: ${e}`);
    }
  }
});