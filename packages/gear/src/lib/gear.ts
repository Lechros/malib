import { GearOption } from "./gearoption";
import { GearPropType } from "./gearproptype";
import { GearReq } from "./gearreq";
import { GearType } from "./geartype";
import { Potential } from "./potential";
import { PotentialGrade } from "./potentialgrade";
import { SoulSlot } from "./soul";

/**
 * 장비
 */
export class Gear {
  /** 장비 ID */
  itemID = 0;
  /** 장비명 */
  name = "";
  /** 설명 */
  desc = "";
  /** 아이콘 */
  icon = 0;
  /** 아이콘 오프셋 */
  origin: [number, number] = [0, 0];
  /** 장비 분류 */
  type: GearType = 0;
  /** 장비 착용 제한 */
  req: GearReq = new GearReq();

  /** 장비 속성 */
  props: Map<GearPropType, number> = new Map();

  /**
   * 장비 옵션
   *
   * 접근할 때는 `options` 대신 `option`을 사용하는 것이 권장됩니다.
   */
  options: Map<GearPropType, GearOption> = new Map();

  /** 최대 업그레이드 가능 횟수 */
  totalUpgradeCount = 0;
  /** 업그레이드 횟수 */
  upgradeCount = 0;
  /** 복구 가능 횟수 */
  upgradeFailCount = 0;
  /** 황금망치 횟수 */
  hammerCount = 0;

  /** 최대 장비 강화 수치 */
  maxStar = 0;
  /** 장비 강화 수치 */
  star = 0;
  /** 놀라운 장비 강화 적용 여부 */
  amazing = false;

  /** 잠재능력 설정 가능 여부 */
  canPotential = false;

  /** 잠재능력 등급 */
  grade: PotentialGrade = PotentialGrade.normal;
  /** 잠재옵션 목록 */
  potentials: Potential[] = [];
  /** 에디셔널 잠재능력 등급 */
  additionalGrade: PotentialGrade = PotentialGrade.normal;
  /** 에디셔널 잠재옵션 목록 */
  additionalPotentials: Potential[] = [];

  /** 소울 */
  soulSlot: SoulSlot = new SoulSlot();

  /**
   * 업그레이드 가능 횟수
   */
  get upgradeCountLeft(): number {
    return (
      this.totalUpgradeCount +
      this.hammerCount -
      this.upgradeCount -
      this.upgradeFailCount
    );
  }

  /**
   * 현재 옵션과 기본 옵션의 차이를 가중치를 포함하여 계산합니다.
   * @returns 가중치가 적용된 옵션 차이의 합
   */
  get diff(): number {
    let diff = 0;
    for (const [type, option] of this.options) {
      diff += Math.floor(option.diff / Gear.getPropTypeWeight(type));
    }
    return diff;
  }

  /**
   * 장비 옵션을 반환합니다. 존재하지 않는 옵션은 장비에 추가됩니다.
   * @param type 장비 옵션 종류
   * @returns 장비 옵션 객체
   */
  option(type: GearPropType): GearOption {
    if (!this.options.has(type)) {
      this.options.set(type, new GearOption());
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.options.get(type)!;
  }

  /**
   * 장비 속성의 값을 반환합니다.
   * @param type 장비 속성
   * @returns 속성의 값; 존재하지 않을 경우 `0`
   */
  getPropValue(type: GearPropType): number {
    return this.props.get(type) ?? 0;
  }

  /**
   * 장비 속성의 값을 `boolean` 형식으로 반환합니다.
   * @param type 장비 속성
   * @returns 속성이 존재하고 값이 `0` 이상일 경우 `true`; 아닐 경우 `false`
   */
  getBooleanValue(type: GearPropType): boolean {
    return Boolean(this.props.get(type));
  }

  /**
   * 장비가 주무기인지 여부를 나타내는 `boolean`값을 반환합니다. 블레이드(katara)는 포함되지 않습니다.
   * @param type 장비 분류
   * @returns 주무기일 경우 `true`; 아닐 경우 `false`
   */
  static isWeapon(type: GearType): boolean {
    return this.isLeftWeapon(type) || this.isDoubleHandWeapon(type);
  }

  /**
   * 장비가 한손무기인지 여부를 나타내는 `boolean`값을 반환합니다. 블레이드(katara)는 포함되지 않습니다.
   * @param type 장비 분류
   * @returns 한손무기일 경우 `true`; 아닐 경우 `false`
   */
  static isLeftWeapon(type: GearType): boolean {
    return (
      (type >= 121 && type <= 139 && type !== GearType.katara) ||
      Math.floor(type / 10) === 121
    );
  }

  /**
   * 장비가 두손무기인지 여부를 나타내는 `boolean`값을 반환합니다.
   * @param type 장비 분류
   * @returns 두손무기일 경우 `true`; 아닐 경우 `false`
   */
  static isDoubleHandWeapon(type: GearType): boolean {
    return (
      (type >= 140 && type <= 149) ||
      (type >= 152 && type <= 159) ||
      Math.floor(type / 10) === 140
    );
  }

  /**
   * 장비가 보조무기인지 여부를 나타내는 `boolean`값을 반환합니다. 블레이드(katara), 방패류가 포함됩니다.
   * @param type 장비 분류
   * @returns 보조무기일 경우 `true`; 아닐 경우 `false`
   */
  static isSubWeapon(type: GearType): boolean {
    switch (type) {
      case GearType.katara:
      case GearType.shield:
      case GearType.demonShield:
      case GearType.soulShield:
        return true;
      default:
        if (Math.floor(type / 1000) === 135) {
          return true;
        }
        return false;
    }
  }

  /**
   * 장비가 방패인지 여부를 나타내는 `boolean`값을 반환합니다.
   * @param type 장비 분류
   * @returns 방패일 경우 `true`; 아닐 경우 `false`
   */
  static isShield(type: GearType): boolean {
    switch (type) {
      case GearType.shield:
      case GearType.demonShield:
      case GearType.soulShield:
        return true;
      default:
        return false;
    }
  }

  /**
   * 장비가 방어구인지 여부를 나타내는 `boolean`값을 반환합니다. 방패가 포함됩니다.
   * @param type 장비 분류
   * @returns 방어구일 경우 `true`; 아닐 경우 `false`
   */
  static isArmor(type: GearType): boolean {
    return type === 100 || (type >= 104 && type <= 110);
  }

  /**
   * 장비가 장신구인지 여부를 나타내는 `boolean`값을 반환합니다.
   * @param type 장비 분류
   * @returns 장신구일 경우 `true`; 아닐 경우 `false`
   */
  static isAccessory(type: GearType): boolean {
    return (
      (type >= 101 && type <= 103) ||
      (type >= 111 && type <= 113) ||
      type === 115
    );
  }

  /**
   * 장비가 메카닉 장비인지 여부를 나타내는 `boolean`값을 반환합니다.
   * @param type 장비 분류
   * @returns 메카닉 장비일 경우 `true`; 아닐 경우 `false`
   */
  static isMechanicGear(type: GearType): boolean {
    return type >= 161 && type <= 165;
  }

  /**
   * 장비가 에반 드래곤 장비인지 여부를 나타내는 `boolean`값을 반환합니다.
   * @param type 장비 분류
   * @returns 에반 드래곤 장비일 경우 `true`; 아닐 경우 `false`
   */
  static isDragonGear(type: GearType): boolean {
    return type >= 194 && type <= 197;
  }

  static specialCanPotential(type: GearType): boolean {
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

  /**
   * 장비 ID로부터 장비 분류를 계산합니다.
   * @param gearID 장비 ID
   * @returns 장비 분류
   */
  static getGearType(gearID: number): GearType {
    switch (Math.floor(gearID / 1000)) {
      case 1098:
        return GearType.soulShield;
      case 1099:
        return GearType.demonShield;
      case 1212:
        return GearType.shiningRod;
      case 1213:
        return GearType.tuner;
      case 1214:
        return GearType.breathShooter;
      case 1404:
        return GearType.chakram;
    }
    if (Math.floor(gearID / 10000) === 135) {
      switch (Math.floor(gearID / 100)) {
        case 13522:
        case 13528:
        case 13529:
        case 13540:
          return Math.floor(gearID / 10);
        default:
          return Math.floor(gearID / 100) * 10;
      }
    }
    if (Math.floor(gearID / 10000) === 119) {
      switch (Math.floor(gearID / 100)) {
        case 11902:
          return Math.floor(gearID / 10);
      }
    }
    return Math.floor(gearID / 10000);
  }

  static GetGender(gearID: number): number {
    const type = this.getGearType(gearID);
    switch (type) {
      case GearType.emblem:
      case GearType.powerSource:
        //case 3:
        return 2;
    }

    return Math.floor(gearID / 1000) % 10;
  }

  /**
   * 장비의 최대 강화 수치를 계산합니다.
   * @returns 최대 장비 강화 수치
   */
  static getMaxStar(gear: Gear): number {
    if (gear.totalUpgradeCount <= 0) {
      return 0;
    }
    if (gear.getBooleanValue(GearPropType.onlyUpgrade)) {
      return 0;
    }
    if (Gear.isMechanicGear(gear.type) || Gear.isDragonGear(gear.type)) {
      return 0;
    }

    let data: readonly [number, number, number] | undefined;
    const reqLevel = gear.req.level;
    for (const item of Gear.starData) {
      if (reqLevel >= item[0]) {
        data = item;
      } else {
        break;
      }
    }
    if (data === undefined) {
      return 0;
    }
    return gear.getBooleanValue(GearPropType.superiorEqp) ? data[2] : data[1];
  }

  private static readonly starData = [
    [0, 5, 3],
    [95, 8, 5],
    [110, 10, 8],
    [120, 15, 10],
    [130, 20, 12],
    [140, 25, 15],
  ] as const;

  private static getPropTypeWeight(type: GearPropType): number {
    if (type < 100) {
      switch (type) {
        case GearPropType.incSTR:
        case GearPropType.incDEX:
        case GearPropType.incINT:
        case GearPropType.incLUK:
        case GearPropType.incPAD:
        case GearPropType.incMAD:
        case GearPropType.incSpeed:
        case GearPropType.incJump:
          return 1;
        case GearPropType.incMHP:
        case GearPropType.incMMP:
          return 100;
        case GearPropType.incPDD:
          return 10;
        case GearPropType.incAD:
          return 2;
      }
    }
    return Number.MAX_VALUE;
  }
}
