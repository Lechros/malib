import { getItemOptionNode } from "./resource";
import Gear from "./Gear";
import GearPropType from "./GearPropType";
import GearType from "./GearType";
import { asEnum } from "./util";

/**
 * 잠재옵션
 */
export default class Potential {
  /** 잠재옵션 ID */
  code = 0;
  /**
   * 잠재옵션 분류
   *
   * 잠재옵션을 적용 가능한 장비 분류를 나타냅니다.
   */
  optionType = 0;
  /** 장비의 최소 착용 가능 레벨 */
  reqLevel = 0;
  /** 장비에 표시되는 문자열의 원본 */
  summary = "";
  /** 잠재옵션 옵션 */
  option: Map<GearPropType, number> = new Map();

  /**
   * 장비에 표시되는 문자열
   */
  get convertSummary(): string {
    const types: GearPropType[] = [...this.option.keys()];
    types.sort((a, b) => GearPropType[b].length - GearPropType[a].length);
    let summary = this.summary;
    for(const type of types) {
      summary = summary.replace("#" + GearPropType[type], (this.option.get(type) ?? 0).toString());
    }
    return summary;
  }

  /**
   * 잠재옵션 ID로부터 잠재옵션을 생성합니다.
   *
   * - `incDAMr` 속성과 `boss` 속성이 있을 경우 `incBDR` 속성으로 대체됩니다.
   * @param code 잠재옵션 ID
   * @param potentialLevel 장비의 착용 가능 레벨로 계산되는 잠재옵션 레벨. `getPotentialLevel`로 계산 가능
   * @returns 잠재옵션; 존재하지 않을 경우 `undefined`
   */
  static createFromID(code: number, potentialLevel: number): Potential | undefined {
    const data = getItemOptionNode(code);
    if(!data) {
      return undefined;
    }

    const potential = new Potential();
    potential.code = code;
    potential.optionType = data.optionType ?? 0;
    potential.reqLevel = data.reqLevel ?? 0;
    potential.summary = data.string;
    for(const [key, value] of Object.entries(data.level[potentialLevel])) {
      const type = asEnum(key, GearPropType);
      if(typeof value === "number") {
        potential.option.set(type, value);
      }
    }
    const incDAMr = potential.option.get(GearPropType.incDAMr) ?? 0;
    if(incDAMr > 0 && (potential.option.get(GearPropType.boss) ?? 0) > 0) {
      potential.option.delete(GearPropType.incDAMr);
      potential.option.delete(GearPropType.boss);
      potential.option.set(GearPropType.incBDR, incDAMr);
      potential.summary = potential.summary.replace("#incDAMr", "#incBDR");
    }
    return potential;
  }

  /**
   * 장비의 착용 가능 레벨로부터 잠재옵션의 레벨을 계산합니다.
   * @param gearReqLevel 장비의 착용 가능 레벨
   * @returns 잠재옵션 레벨 (1~20)
   */
  static getPotentialLevel(gearReqLevel: number): number {
    if(gearReqLevel <= 0) return 1;
    else if(gearReqLevel >= 200) return 20;
    else return Math.floor((gearReqLevel + 9) / 10);
  }

  /**
   * 잠재옵션 분류와 장비 분류를 비교합니다.
   * @param optionType 잠재옵션 분류
   * @param gearType 장비 분류
   * @returns 잠재옵션 분류가 장비 분류에 적용 가능한 경우 `true`; 아닌 경우 `false`
   */
  static checkOptionType(optionType: number, gearType: GearType): boolean {
    switch(optionType) {
      case 0: return true;
      case 10:
        return Gear.isWeapon(gearType) ||
                    Gear.isSubWeapon(gearType) ||
                    gearType === GearType.emblem;
      case 11:
        return !Potential.checkOptionType(10, gearType);
      case 20:
        return Gear.isSubWeapon(gearType) ||
                    gearType === GearType.pants ||
                    gearType === GearType.shoes ||
                    gearType === GearType.cap ||
                    gearType === GearType.coat ||
                    gearType === GearType.longcoat ||
                    gearType === GearType.glove ||
                    gearType === GearType.cape ||
                    gearType === GearType.belt ||
                    gearType === GearType.shoulderPad;
      case 40:
        return gearType === GearType.faceAccessory ||
                    gearType === GearType.eyeAccessory ||
                    gearType === GearType.ring ||
                    gearType === GearType.earrings ||
                    gearType === GearType.pendant;
      case 51: return gearType === GearType.cap;
      case 52: return gearType === GearType.coat || gearType === GearType.longcoat;
      case 53: return gearType === GearType.pants;
      case 54: return gearType === GearType.glove;
      case 55: return gearType === GearType.shoes;
      default: return false;
    }
  }
}
