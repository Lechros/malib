import IGearDataJson, { IGearData } from "./interfaces/IGearData";
import GearDataJson from "./resources/gear.json";
import IItemOptionJson, { IItemOption } from "./interfaces/IItemOption";
import ItemOptionsJson from "./resources/item-option.json";

// @ts-expect-error(2322): ts thinks it's number[], but all origin is in [number, number] form
const GearData: IGearDataJson = GearDataJson;
const gearIDs = Object.keys(GearData).map(id => Number(id));
const gearIDNames = Object.entries(GearData).map(e => [Number(e[0]), e[1].name]);
const ItemOptionData: IItemOptionJson = ItemOptionsJson;

/* resources */

export function getGearDataNode(gearID: number): IGearData | undefined {
  return GearData[gearID];
}

export function getGearIDs(): number[] {
  return gearIDs.slice();
}

export function getGearIDNames(): [number, string][] {
  return gearIDNames.map(e => e.slice() as [number, string]);
}

export function getItemOptionNode(code: number): IItemOption | undefined {
  return ItemOptionData[code];
}

/* interfaces */

export type { IGearData, IGearReq, ISpecialOption } from "./interfaces/IGearData";
export type { IItemOption } from "./interfaces/IItemOption";
