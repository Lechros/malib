import { Gear, GearPropType, GearType, Potential, PotentialGrade } from "../..";
import { createPotentialFromCode } from "./create-potential";
import { GearData, GearDataJson } from "./interfaces/gear";
import gearJson from "../../res/gear.json";

/**
 * KMS 장비 정보를 제공합니다.
 *
 * 이 객체를 수정할 경우 관련 함수의 작동이 변경될 수 있습니다.
 */
export const gearData: GearDataJson = gearJson;

/**
 * 장비 정보로부터 장비를 생성합니다.
 * @param node 장비 정보 노드.
 * @param id 장비 아이템 ID.
 * @param getPotentialFunc 코드에 해당하는 잠재능력을 반환하는 함수.
 * @returns 아이템 정보에 해당하는 장비.
 */
export function createGearFromNode(
  node: GearData,
  id: number,
  getPotentialFunc: (
    code: number,
    potentialLevel: number
  ) => Potential | undefined
): Gear {
  const gear: Gear = new Gear();
  gear.itemID = id;
  gear.type = Gear.getGearType(id);
  gear.name = node.name;
  gear.desc = node.desc ?? "";
  gear.icon = {
    id: node.icon,
  };
  gear.totalUpgradeCount = node.tuc ?? 0;
  gear.exceptionalTotalUpgradeCount = node.etuc ?? 0;
  if (node.req) {
    gear.req = {
      level: node.req.level ?? 0,
      str: node.req.str ?? 0,
      luk: node.req.luk ?? 0,
      dex: node.req.dex ?? 0,
      int: node.req.int ?? 0,
      job: node.req.job ?? 0,
      specJob: node.req.specJob ?? 0,
    };
  }
  if (node.options) {
    for (const [key, value] of Object.entries(node.options)) {
      const type = GearPropType[key as keyof typeof GearPropType];
      gear.option(type).base = value;
    }
  }
  if (node.props) {
    for (const [key, value] of Object.entries(node.props)) {
      const type = GearPropType[key as keyof typeof GearPropType];
      gear.props.set(type, value);
    }
  }
  if (node.pots) {
    gear.potentials = node.pots
      .map((ol) => getPotentialFunc(ol.option, ol.level))
      .filter((pot): pot is Potential => pot !== undefined);
  }

  if (gear.totalUpgradeCount > 0) {
    gear.canPotential = true;
  } else if (
    specialCanPotential(gear.type) ||
    Gear.isSubWeapon(gear.type) ||
    gear.getBooleanValue(GearPropType.tucIgnoreForPotential) ||
    eventRingCanPotential(gear.itemID)
  ) {
    gear.canPotential = true;
  }
  if (Gear.isMechanicGear(gear.type) || Gear.isDragonGear(gear.type)) {
    gear.canPotential = false;
  }
  if (gear.getBooleanValue(GearPropType.noPotential)) {
    gear.canPotential = false;
  }

  let value: number;
  if ((value = gear.getPropValue(GearPropType.fixedGrade))) {
    switch (value) {
      case 2:
        gear.grade = PotentialGrade.rare;
        break;
      case 3:
        gear.grade = PotentialGrade.epic;
        break;
      case 5:
        gear.grade = PotentialGrade.unique;
        break;
      case 7:
        gear.grade = PotentialGrade.legendary;
        break;
      default:
        gear.grade = value - 1;
        break;
    }
  }
  if (
    gear.potentials.some((opt) => opt !== undefined) &&
    gear.grade === PotentialGrade.normal
  ) {
    gear.grade = PotentialGrade.rare;
  }

  if (gear.type === GearType.demonShield) {
    value = gear.option(GearPropType.incMMP).base;
    if (value > 0) {
      gear.option(GearPropType.incMDF).base = value;
      gear.option(GearPropType.incMMP).base = 0;
    }
  }

  gear.maxStar = Gear.getMaxStar(gear);
  const preStar = gear.getPropValue(GearPropType.incCHUC);
  if (preStar > 0) {
    gear.star = preStar;
  }
  return gear;
}

/**
 * 아이템 ID로부터 장비를 생성합니다.
 * @param id 장비 아이템 ID.
 * @returns 아이템 ID에 해당하는 장비. 장비가 존재하지 않을 경우 `undefined`를 반환합니다.
 */
export function createGearFromId(id: number): Gear | undefined {
  if (!(id in gearData)) {
    return undefined;
  }

  return createGearFromNode(gearData[id], id, createPotentialFromCode);
}

function specialCanPotential(type: GearType): boolean {
  switch (type) {
    case GearType.soulShield:
    case GearType.demonShield:
    case GearType.katara:
    case GearType.magicArrow:
    case GearType.card:
    case GearType.orb:
    case GearType.dragonEssence:
    case GearType.soulRing:
    case GearType.magnum:
    case GearType.emblem:
      return true;
    default:
      return false;
  }
}

function eventRingCanPotential(id: number): boolean {
  switch (id) {
    case 1113231:
    case 1114302:
    case 1114305:
      return true;
    default:
      return false;
  }
}
