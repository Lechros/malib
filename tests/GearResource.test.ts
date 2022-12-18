import { Gear } from "../../src/maplegear"
import GearNameJson from "../../../resources/gear_name.json"

test("create all gears in gear resource", () => {
  for (const gearID of Object.keys(GearNameJson)) {
    try {
      expect(Gear.createFromID(gearID)).not.toBeUndefined()
    }
    catch (e) {
      throw Error(`Error on gearID: ${gearID}
Reason: ${e}`)
    }
  }
})
