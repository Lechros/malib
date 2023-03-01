import { Gear } from "./gear";
import { GearPropType } from "./gearproptype";
import { GearType } from "./geartype";

/**
 * 잠재옵션
 */
export class Potential {
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
    const types = [...this.option.keys()];
    types.sort((a, b) => GearPropType[b].length - GearPropType[a].length);
    let summary = this.summary;
    for (const type of types) {
      summary = summary.replace(
        `#${GearPropType[type]}`,
        (this.option.get(type) ?? 0).toString()
      );
    }
    return summary;
  }

  /**
   * 장비의 착용 가능 레벨로부터 잠재옵션의 레벨을 계산합니다.
   * @param gearReqLevel 장비의 착용 가능 레벨
   * @returns 잠재옵션 레벨 (1~20)
   */
  static getPotentialLevel(gearReqLevel: number): number {
    if (gearReqLevel <= 0) return 1;
    else if (gearReqLevel >= 200) return 20;
    else return Math.floor((gearReqLevel + 9) / 10);
  }

  /**
   * 잠재옵션 분류와 장비 분류를 비교합니다.
   * @param optionType 잠재옵션 분류
   * @param gearType 장비 분류
   * @returns 잠재옵션 분류가 장비 분류에 적용 가능한 경우 `true`; 아닌 경우 `false`
   */
  static checkOptionType(optionType: number, gearType: GearType): boolean {
    switch (optionType) {
      case 0:
        return true;
      case 10:
        return (
          Gear.isWeapon(gearType) ||
          Gear.isSubWeapon(gearType) ||
          gearType === GearType.emblem
        );
      case 11:
        return !Potential.checkOptionType(10, gearType);
      case 20:
        return (
          Gear.isSubWeapon(gearType) ||
          gearType === GearType.cap ||
          gearType === GearType.coat ||
          gearType === GearType.longcoat ||
          gearType === GearType.pants ||
          gearType === GearType.shoes ||
          gearType === GearType.glove ||
          gearType === GearType.cape ||
          gearType === GearType.belt ||
          gearType === GearType.shoulder
        );
      case 40:
        return (
          gearType === GearType.faceAccessory ||
          gearType === GearType.eyeAccessory ||
          gearType === GearType.earrings ||
          gearType === GearType.ring ||
          gearType === GearType.pendant
        );
      case 51:
        return gearType === GearType.cap;
      case 52:
        return gearType === GearType.coat || gearType === GearType.longcoat;
      case 53:
        return gearType === GearType.pants;
      case 54:
        return gearType === GearType.glove;
      case 55:
        return gearType === GearType.shoes;
      default:
        return false;
    }
  }
}
