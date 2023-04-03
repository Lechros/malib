import { GearOption } from "./gearoption";
import { GearPropType } from "./gearproptype";
import { GearType } from "./geartype";
import { Potential } from "./potential";
import { PotentialGrade } from "./potentialgrade";
import { SoulWeapon } from "./soul";

/**
 * 장비 아이콘
 */
export interface GearIcon {
  /** 아이콘 ID */
  id: number;
  /** 아이콘 오프셋 */
  origin: [number, number];
}

/**
 * 장비 착용 제한
 */
export interface GearReq {
  /** 착용 가능 레벨 */
  level: number;
  /** 착용 가능 STR */
  str: number;
  /** 착용 가능 LUK */
  luk: number;
  /** 착용 가능 DEX */
  dex: number;
  /** 착용 가능 INT */
  int: number;
  /** 착용 가능 직업 분류 */
  job: number;
  /** 착용 가능 직업 */
  specJob: number;
}

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
  icon: GearIcon;
  /** 신비의 모루 아이콘 */
  anvilIcon: GearIcon | undefined;
  /** 신비의 모루 장비명 */
  anvilName: string | undefined;
  /** 장비 분류 */
  type: GearType = 0 as GearType;
  /** 장비 착용 제한 */
  req: GearReq;

  /** 장비 속성 */
  props: Map<GearPropType, number> = new Map();

  /**
   * 장비 옵션
   *
   * 개별 속성 접근 시 이 속성 대신 `option`을 사용하는 것이 권장됩니다.
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

  /**
   * 가위 사용 가능 횟수
   *
   * `0` 이상의 값; 카르마의 가위를 사용할 수 없는 장비는 `undefined`.
   */
  karma: number | undefined;
  /** 잠재능력 설정 가능 여부 */
  canPotential = false;

  /** 잠재능력 등급 */
  grade: PotentialGrade = PotentialGrade.normal;
  /** 잠재옵션 목록 */
  potentials: (Potential | undefined)[] = [];
  /** 에디셔널 잠재능력 등급 */
  additionalGrade: PotentialGrade = PotentialGrade.normal;
  /** 에디셔널 잠재옵션 목록 */
  additionalPotentials: (Potential | undefined)[] = [];

  /** 소울 */
  soulWeapon: SoulWeapon = new SoulWeapon(this);

  constructor() {
    this.icon = {
      id: 0,
      origin: [0, 0],
    };
    this.req = {
      level: 0,
      str: 0,
      dex: 0,
      int: 0,
      luk: 0,
      job: 0,
      specJob: 0,
    };
  }

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
   * 가중치를 포함하여 계산한 현재 옵션과 기본 옵션의 차이
   */
  get diff(): number {
    let diff = 0;
    for (const [type, option] of this.options) {
      diff += Math.floor(option.diff / Gear.getPropTypeWeight(type));
    }
    return diff;
  }

  /**
   * 장비를 처음 획득했을 때 추가옵션이 존재했는지 여부
   *
   * *일부 저레벨 장비의 경우 인게임과 차이가 있습니다.*
   *
   * 장비 아이콘 왼쪽 위의 원이 채워져있으면 `true`; 아니면 `false`입니다.
   */
  get isNewBonusType(): boolean {
    const anyBonus = [...this.options.values()].some((opt) => opt.bonus > 0);
    if (anyBonus && this.getPropValue(GearPropType.tradeAvailable) !== 1) {
      return true;
    }
    return false;
  }

  /**
   * 지정된 장비 옵션 종류과 연결된 옵션을 가져옵니다.
   * @param type 장비 옵션 종류.
   * @returns 장비 옵션 객체. 존재하지 않을 경우 장비에 추가한 뒤 반환합니다.
   */
  option(type: GearPropType): GearOption {
    if (!this.options.has(type)) {
      this.options.set(type, new GearOption());
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.options.get(type)!;
  }

  /**
   * 지정된 장비 속성 종류과 연결된 값을 가져옵니다.
   * @param type 장비 속성 종류.
   * @returns 속성의 값. 장비에 존재하지 않을 경우 추가하지 않고 `0`을 반환합니다.
   */
  getPropValue(type: GearPropType): number {
    return this.props.get(type) ?? 0;
  }

  /**
   * 지정된 장비 속성 종류과 연결된 `boolean` 값을 가져옵니다.
   * @param type 장비 속성 종류.
   * @returns 속성이 존재하고 값이 `0` 이상일 경우 `true`; 아닐 경우 `false`.
   */
  getBooleanValue(type: GearPropType): boolean {
    return (this.props.get(type) ?? 0) > 0;
  }

  /**
   * 장비에 신비의 모루 외형을 적용합니다.
   * @param icon 외형 아이콘
   * @param name 외형 장비명
   */
  setAnvil(icon: GearIcon, name: string): void {
    this.anvilIcon = icon;
    this.anvilName = name;
  }

  /**
   * 장비에 적용된 신비의 모루 외형을 제거합니다.
   */
  resetAnvil(): void {
    this.anvilIcon = undefined;
    this.anvilName = undefined;
  }

  /**
   * 장비 분류가 주무기인지 여부를 확인합니다. 블레이드(`katara`)는 포함되지 않습니다.
   * @param type 장비 분류.
   * @returns 주무기일 경우 `true`; 아닐 경우 `false`.
   */
  static isWeapon(type: GearType): boolean {
    return this.isLeftWeapon(type) || this.isDoubleHandWeapon(type);
  }

  /**
   * 장비 분류가 한손무기인지 여부를 확인합니다. 블레이드(`katara`)는 포함되지 않습니다.
   * @param type 장비 분류.
   * @returns 한손무기일 경우 `true`; 아닐 경우 `false`.
   */
  static isLeftWeapon(type: GearType): boolean {
    return (
      (type >= 121 && type <= 139 && type !== GearType.katara) ||
      Math.floor(type / 10) === 121
    );
  }

  /**
   * 장비 분류가 두손무기인지 여부를 확인합니다.
   * @param type 장비 분류.
   * @returns 두손무기일 경우 `true`; 아닐 경우 `false`.
   */
  static isDoubleHandWeapon(type: GearType): boolean {
    return (
      (type >= 140 && type <= 149) ||
      (type >= 152 && type <= 159) ||
      Math.floor(type / 10) === 140
    );
  }

  /**
   * 장비 분류가 보조무기인지 여부를 확인합니다. 블레이드(`katara`), 방패류가 포함됩니다.
   * @param type 장비 분류.
   * @returns 보조무기일 경우 `true`; 아닐 경우 `false`.
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
   * 장비 분류가 방패인지 여부를 확인합니다.
   * @param type 장비 분류.
   * @returns 방패일 경우 `true`; 아닐 경우 `false`.
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
   * 장비 분류가 방어구인지 여부를 확인합니다. 어깨장식이 포함되지 않고 방패가 포함됩니다.
   * @param type 장비 분류.
   * @returns 방어구일 경우 `true`; 아닐 경우 `false`.
   */
  static isArmor(type: GearType): boolean {
    return (
      type === 100 ||
      (type >= 104 && type <= 110) ||
      type === GearType.soulShield ||
      type === GearType.demonShield
    );
  }

  /**
   * 장비 분류가 장신구인지 여부를 확인합니다. 어깨장식이 포함됩니다.
   * @param type 장비 분류.
   * @returns 장신구일 경우 `true`; 아닐 경우 `false`.
   */
  static isAccessory(type: GearType): boolean {
    return (
      (type >= 101 && type <= 103) ||
      (type >= 111 && type <= 113) ||
      type === 115
    );
  }

  /**
   * 장비 분류가 메카닉 장비인지 여부를 확인합니다.
   * @param type 장비 분류.
   * @returns 메카닉 장비일 경우 `true`; 아닐 경우 `false`.
   */
  static isMechanicGear(type: GearType): boolean {
    return type >= 161 && type <= 165;
  }

  /**
   * 장비 분류가 에반 드래곤 장비인지 여부를 확인합니다.
   * @param type 장비 분류.
   * @returns 에반 드래곤 장비일 경우 `true`; 아닐 경우 `false`.
   */
  static isDragonGear(type: GearType): boolean {
    return type >= 194 && type <= 197;
  }

  /**
   * 장비 ID로부터 장비 분류를 계산합니다.
   * @param gearID 장비 ID.
   * @returns 장비 분류.
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

  /**
   * 장비의 최대 강화 수치를 계산합니다.
   * @param gear 계산할 장비.
   * @returns 장비의 최대 강화 수치.
   * 최대 업그레이드 가능 횟수가 `0`이거나 `onlyUpgrade` 속성이 존재하거나 메카닉 장비 또는 드래곤 장비일 경우 `0`입니다.
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
