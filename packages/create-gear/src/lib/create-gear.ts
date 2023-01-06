import {
  Gear,
  GearPropType,
  GearReq,
  GearType,
  Potential,
  PotentialGrade,
} from "@malib/gear";
import { IGearData, IItemOption } from "@malib/resource";
import { asEnum } from "./util";

/**
 * 잠재옵션 코드로부터 잠재옵션을 생성합니다.
 * - `incDAMr` 속성과 `boss` 속성이 있을 경우 `incBDR` 속성으로 대체됩니다.
 * @param node 잠재옵션 정보
 * @param code 잠재옵션 코드
 * @param potentialLevel 장비의 착용 가능 레벨로 계산되는 잠재옵션 레벨. (`Potential.getPotentialLevel`로 계산)
 * @returns 잠재옵션
 */
export function createPotentialFromNode(
  node: IItemOption,
  code: number,
  potentialLevel: number
): Potential {
  const potential = new Potential();
  potential.code = code;
  potential.optionType = node.optionType ?? 0;
  potential.reqLevel = node.reqLevel ?? 0;
  potential.summary = node.string;
  for (const [key, value] of Object.entries(node.level[potentialLevel])) {
    const type = asEnum(key, GearPropType);
    if (typeof value === "number") {
      potential.option.set(type, value);
    }
  }
  const incDAMr = potential.option.get(GearPropType.incDAMr) ?? 0;
  if (incDAMr > 0 && (potential.option.get(GearPropType.boss) ?? 0) > 0) {
    potential.option.delete(GearPropType.incDAMr);
    potential.option.delete(GearPropType.boss);
    potential.option.set(GearPropType.incBDR, incDAMr);
    potential.summary = potential.summary.replace("#incDAMr", "#incBDR");
  }
  return potential;
}

/**
 * 장비 정보로부터 장비를 생성합니다.
 * @param node 장비 정보
 * @param id 장비 아이템 ID
 * @param getItemOptionNodeFunc 코드에 해당하는 잠재옵션 정보를 반환하는 함수
 * @returns 장비
 */
export function createGearFromNode(
  node: IGearData,
  id: number,
  getItemOptionNodeFunc: (code: number) => IItemOption
): Gear {
  const gear: Gear = new Gear();
  gear.itemID = id;
  gear.type = Gear.getGearType(id);
  gear.name = node.name;
  gear.desc = node.desc ?? "";
  gear.icon = node.icon;
  gear.origin = node.origin;
  gear.totalUpgradeCount = node.tuc ?? 0;
  if (node.req) {
    const req = new GearReq();
    req.level = node.req.level ?? 0;
    req.str = node.req.str ?? 0;
    req.luk = node.req.luk ?? 0;
    req.dex = node.req.dex ?? 0;
    req.int = node.req.int ?? 0;
    req.job = node.req.job ?? 0;
    req.specJob = node.req.specJob ?? 0;
    gear.req = req;
  }
  if (node.options) {
    for (const [key, value] of Object.entries(node.options)) {
      const type = asEnum(key, GearPropType);
      gear.option(type).base = value;
    }
  }
  if (node.props) {
    for (const [key, value] of Object.entries(node.props)) {
      const type = asEnum(key, GearPropType);
      gear.props.set(type, value);
    }
  }
  if (node.pots) {
    gear.potentials = node.pots.map((ol) =>
      createPotentialFromNode(
        getItemOptionNodeFunc(ol.option),
        ol.option,
        ol.level
      )
    );
  }

  if (gear.totalUpgradeCount > 0) {
    gear.canPotential = true;
  } else if (
    Gear.specialCanPotential(gear.type) ||
    Gear.isSubWeapon(gear.type) ||
    gear.getBooleanValue(GearPropType.tucIgnoreForPotential)
  ) {
    gear.canPotential = true;
  }
  if (Gear.isMechanicGear(gear.type) || Gear.isDragonGear(gear.type)) {
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

  gear.maxStar = gear.getMaxStar();
  const preStar = gear.getPropValue(GearPropType.incCHUC);
  if (preStar > 0) {
    gear.star = preStar;
  }
  return gear;
}
