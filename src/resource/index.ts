import IGearDataJson, { IGearData } from "../interfaces/IGearData";
import GearDataJson from "./gear.json";

// @ts-expect-error(2322): all origin is in [number, number] form, but ts thinks it's number[]
export const GearData: IGearDataJson = GearDataJson;

export function getGearDataNode(gearID: number): IGearData | undefined {
    return GearData[gearID];
}

import IItemOptionJson, { IItemOption } from "../interfaces/IItemOption";
import ItemOptionsJson from "./item_option.json";

const ItemOptionData: IItemOptionJson = ItemOptionsJson;

export function getItemOptionNode(code: number): IItemOption | undefined {
    return ItemOptionData[code];
}


import ISetItemJson, { ISetItem } from "../interfaces/ISetItem";
import SetItemJson from "./set_item.json";

const SetItemData: ISetItemJson = SetItemJson;

export function getSetItemNode(setItemID: number): ISetItem | undefined {
    return SetItemData[setItemID];
}


import ITitleJson, { ITitle } from "../interfaces/ITitle";
import TitleJson from "./title.json";

const TitleData: ITitleJson = TitleJson;

export function getTitleNode(titleID: number): ITitle | undefined {
    return TitleData[titleID];
}


import IExclusiveEquipJson, { IExclusiveEquip } from "../interfaces/IExclusiveEquip";
import ExclusiveEquipJson from "./exclusive_equip.json";

const ExclusiveEquipData: IExclusiveEquipJson = ExclusiveEquipJson;

export function getExclusiveEquipList(): IExclusiveEquipJson {
    return ExclusiveEquipData;
}

export function getExclusiveEquipNode(exclusiveEquipID: number): IExclusiveEquip | undefined {
    return ExclusiveEquipData[exclusiveEquipID];
}
