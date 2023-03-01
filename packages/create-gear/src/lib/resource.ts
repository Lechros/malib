import { GearDataJson } from "./interfaces/gear";
import { ItemOptionJson } from "./interfaces/itemoption";
import { SoulDataJson } from "./interfaces/soul";
import gears from "./resources/gear.json";
import itemoptions from "./resources/itemoption.json";
import souls from "./resources/soul.json";

// @ts-expect-error ts(2322): assign number[] to [number, number] type
const gearJson: GearDataJson = gears;
const itemOptionJson: ItemOptionJson = itemoptions;
const soulJson: SoulDataJson = souls;

export { gearJson, itemOptionJson, soulJson };
