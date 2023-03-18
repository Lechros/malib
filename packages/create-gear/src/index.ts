export type {
  ItemData,
  GearData,
  GearDataJson,
  GearReqData,
  SpecialOptionData,
  ItemOption,
  ItemOptionJson,
  SoulData,
  SoulDataJson,
  SoulOption,
  MagnificentSoulOption,
} from "./internal";
export {
  // create
  createGearFromId,
  createGearFromNode,
  createPotentialFromCode,
  createPotentialFromNode,
  createSoulFromId,
  createSoulFromNode,
  ItemIndex,
  MagnificentSoulOptionType,
  // json
  gearJson,
  itemOptionJson,
  soulJson,
} from "./internal";
