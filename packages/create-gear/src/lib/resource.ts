import { GearDataJson } from "./interfaces/gear";
import { ItemOptionJson } from "./interfaces/itemoption";
import gears from "./resources/gear.json";
import itemoptions from "./resources/itemoption.json";

// @ts-expect-error ts(2322): assign number[] to [number, number] type
const gearJson: GearDataJson = gears;
const itemOptionJson: ItemOptionJson = itemoptions;

export { gearJson, itemOptionJson };
