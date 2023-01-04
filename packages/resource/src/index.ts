import { IGearDataJson } from "./lib/interfaces/gear";
import { IItemOptionJson } from "./lib/interfaces/itemoption";
import gears from "./lib/gear.json";
import itemoptions from "./lib/itemoption.json";

// @ts-expect-error ts(2322): assign number[] to [number, number] type
const gearJson: IGearDataJson = gears;
const itemOptionJson: IItemOptionJson = itemoptions;

export { gearJson, itemOptionJson };
