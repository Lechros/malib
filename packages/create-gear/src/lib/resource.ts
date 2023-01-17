import { IGearDataJson } from "./interfaces/gear";
import { IItemOptionJson } from "./interfaces/itemoption";
import gears from "./resources/gear.json";
import itemoptions from "./resources/itemoption.json";

// @ts-expect-error ts(2322): assign number[] to [number, number] type
const gearJson: IGearDataJson = gears;
const itemOptionJson: IItemOptionJson = itemoptions;

export { gearJson, itemOptionJson };
