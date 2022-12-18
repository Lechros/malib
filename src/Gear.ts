import { makeAutoObservable } from "mobx";
import Addition from "./Addition";
import AdditionType from "./AdditionType";
import GearPropType, { asGearPropType } from "./GearPropType";
import GearType from "./GearType";
import Potential from "./Potential";
import PotentialGrade from "./PotentialGrade";
import { getGearDataNode } from "./resource";
import Soul from "./Soul";

export class ImageOrigin {
  /** 아이콘 장비 ID */
  icon: number;
  /** 아이콘의 origin 벡터 */
  origin: [number, number];

  constructor();
  constructor(icon: number, origin: [number, number]);
  constructor(imageOrigin: { icon: number, origin: [number, number] });
  constructor(imageOrigin: ImageOrigin);
  constructor(icon: number | ImageOrigin | { icon: number, origin: [number, number] } = 0, origin: [number, number] = [0, 0]) {
    if(typeof icon === "number") {
      this.icon = icon;
      this.origin = [...origin];
    }
    else if(icon) {
      this.icon = icon.icon;
      this.origin = [...icon.origin];
    }
    else {
      this.icon = icon;
      this.origin = [...origin];
    }
  }

  static createFromID(gearID: number): ImageOrigin | undefined {
    const data = getGearDataNode(gearID);
    if(!data) {
      return undefined;
    }
    return new ImageOrigin(data.icon, data.origin);
  }
}

export class GearOption {
  /** 기본 수치 */
  base: number;
  /** 추가옵션 수치 */
  bonus: number;
  /** 주문서 강화 수치 */
  upgrade: number;
  /** 장비 강화 수치 */
  enchant: number;

  /** 기본 수치 대비 변화량 */
  get diff(): number {
    return this.bonus + this.upgrade + this.enchant;
  }
}

export default class Gear {
  /** 장비 ID */
  itemID = 0;
  /** 장비명 */
  name = "";
  /** 설명 */
  desc = "";
  /** 아이콘 */
  icon: ImageOrigin;
  /** 장비 분류 */
  type: GearType = 0;
  /** 캐시 아이템 여부 */
  cash = false;

  /** addition */
  additions: Addition[];
  /** 장비 속성 */
  props: Map<GearPropType, number> = new Map();

  /** 장비 옵션 */
  options: Map<GearPropType, GearOption> = new Map();

  /** 최대 업그레이드 가능 횟수 */
  totalUpgradeCount = 0;
  /** 업그레이드 횟수 */
  upgradeCount = 0;
  /** 복구 가능 횟수 */
  failCount = 0;
  /** 황금망치 횟수 */
  hammerCount = 0;

  /** 최대 장비 강화 수치 */
  maxStar = 0;
  /** 장비 강화 수치 */
  star = 0;

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
  soul: Soul | undefined;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /**
     * 속성의 값을 반환합니다.
     * @param propType 장비 속성
     * @returns 속성의 값; 존재하지 않을 경우 `0`
     */
  getPropValue(propType: GearPropType): number {
    return this.props.get(propType) ?? 0;
  }

  /**
   * 속성의 값을 `boolean`으로 반환합니다.
   * @param propType 장비 속성
   * @returns 속성이 존재하고 값이 `0`이 아닐 경우 `true`; 이 외의 경우 `false`
   */
  getBooleanValue(propType: GearPropType): boolean {
    return Boolean(this.props.get(propType));
  }

  /**
   * 장비의 최대 강화 수치를 계산합니다.
   * @returns 장비의 최대 강화 수치
   */
  getMaxStar(): number {
    if(this.totalUpgradeCount <= 0) {
      return 0;
    }
    if(this.getBooleanValue(GearPropType.onlyUpgrade)) {
      return 0;
    }
    if(Gear.isMechanicGear(this.type) || Gear.isDragonGear(this.type)) {
      return 0;
    }

    const starData = [
      [0, 5, 3],
      [95, 8, 5],
      [110, 10, 8],
      [120, 15, 10],
      [130, 20, 12],
      [140, 25, 15],
    ];
    let data!: number[];
    const reqLevel: number = this.getPropValue(GearPropType.reqLevel);
    for(const item of starData) {
      if(reqLevel >= item[0]) {
        data = item;
      }
      else {
        break;
      }
    }
    if(data.length === 0) {
      return 0;
    }
    return data[this.getBooleanValue(GearPropType.superiorEqp) ? 2 : 1];
  }

  /**
   * 현재 속성과 기본 속성의 차이를 계산합니다.
   * @returns 스탯 별 가중치가 적용된 차이
   */
  get diff(): number {
    let diff = 0;
    for(const [type, option] of this.options) {
      diff += Math.floor(option.diff / Gear.getPropTypeWeight(type));
    }
    return diff;
  }

  /**
   * 장비의 아이콘을 입력한 장비 ID의 아이콘으로 설정합니다.
   * @param gearID 아이콘 장비 ID
   * @returns 입력한 장비 ID가 존재할 경우 `true`; 아닐 경우 `false`
   */
  setIconOrigin(gearID: number): boolean {
    const iconOrigin = ImageOrigin.createFromID(gearID);
    if(!iconOrigin) {
      return false;
    }
    this.icon = iconOrigin;

    return true;
  }

  /**
   * 장비 ID로부터 장비를 생성합니다.
   * @param gearID 장비 ID
   * @returns 장비; 존재하지 않을 경우 `undefined`
   */
  static createFromID(gearID: number): Gear | undefined {
    const data = getGearDataNode(gearID);
    if(!data) {
      return undefined;
    }

    const gear: Gear = new Gear();
    gear.itemID = gearID;
    gear.type = Gear.getGearType(gearID);
    gear.name = data.name ?? "(장비 이름 없음)";
    gear.desc = data.desc ?? "";
    gear.setIconOrigin(gearID);
    if(data.info) {
      for(const [key, subNode] of Object.entries(data.info)) {
        const type = asGearPropType(key);
        gear.props.set(type, subNode);
      }
    }
    if(data.addition) {
      for(const [typeStr, addiNode] of Object.entries(data.addition)) {
        gear.additions.push(Addition.createFromNode(AdditionType[typeStr as keyof typeof AdditionType], addiNode));
      }
    }
    if(data.option) {
      for(let i = 0; i < Object.keys(data.option).length; i++) {
        const opt = data.option[i as 0 | 1 | 2];
        if(!opt) {
          break;
        }
        const pot = Potential.createFromID(opt.option, opt.level);
        if(!pot) {
          break;
        }
        gear.potentials.push(pot);
      }
    }

    if(gear.getPropValue(GearPropType.tuc) > 0) {
      gear.canPotential = true;
    }
    else if(Gear.specialCanPotential(gear.type) ||
        Gear.isSubWeapon(gear.type) ||
        gear.getBooleanValue(GearPropType.tucIgnoreForPotential)
    ) {
      gear.canPotential = true;
    }
    if(Gear.isMechanicGear(gear.type) || Gear.isDragonGear(gear.type)) {
      gear.canPotential = false;
    }

    let value: number;
    if((value = gear.getPropValue(GearPropType.fixedGrade))) {
      switch(value) {
        case 2: gear.grade = PotentialGrade.rare; break;
        case 3: gear.grade = PotentialGrade.epic; break;
        case 5: gear.grade = PotentialGrade.unique; break;
        case 7: gear.grade = PotentialGrade.legendary; break;
        default: gear.grade = value - 1; break;
      }
    }

    if(gear.potentials.some(opt => opt !== undefined) && gear.grade === PotentialGrade.normal) {
      gear.grade = PotentialGrade.rare;
    }

    if(gear.type === GearType.demonShield) {
      if((value = gear.getPropValue(GearPropType.incMMP))) {
        gear.props.delete(GearPropType.incMMP);
        gear.props.set(GearPropType.incMDF, value);
      }
    }

    gear.maxStar = gear.getMaxStar();
    const preStar = gear.getPropValue(GearPropType.incCHUC);
    if(preStar > 0) {
      gear.star = preStar;
    }
    return gear;
  }

  /**
   * 장비가 주무기인지 여부를 나타내는 `boolean`값을 반환합니다. 블레이드(katara)는 포함되지 않습니다.
   * @param gearType 장비 분류
   * @returns 주무기일 경우 `true`; 아닐 경우 `false`
   */
  static isWeapon(gearType: GearType): boolean {
    return this.isLeftWeapon(gearType) || this.isDoubleHandWeapon(gearType);
  }

  /**
   * 장비가 한손무기인지 여부를 나타내는 `boolean`값을 반환합니다. 블레이드(katara)는 포함되지 않습니다.
   * @param gearType 장비 분류
   * @returns 한손무기일 경우 `true`; 아닐 경우 `false`
   */
  static isLeftWeapon(gearType: GearType): boolean {
    return gearType >= 121 && gearType <= 139 && gearType !== GearType.katara ||
        Math.floor(gearType / 10) === 121;
  }

  /**
   * 장비가 두손무기인지 여부를 나타내는 `boolean`값을 반환합니다.
   * @param gearType 장비 분류
   * @returns 두손무기일 경우 `true`; 아닐 경우 `false`
   */
  static isDoubleHandWeapon(gearType: GearType): boolean {
    return (gearType >= 140 && gearType <= 149) ||
        (gearType >= 152 && gearType <= 159);
  }

  /**
   * 장비가 보조무기인지 여부를 나타내는 `boolean`값을 반환합니다. 블레이드(katara), 방패류가 포함됩니다.
   * @param gearType 장비 분류
   * @returns 보조무기일 경우 `true`; 아닐 경우 `false`
   */
  static isSubWeapon(gearType: GearType): boolean {
    switch(gearType) {
      case GearType.katara:
      case GearType.shield:
      case GearType.demonShield:
      case GearType.soulShield:
        return true;

      default:
        if(Math.floor(gearType / 1000) === 135) {
          return true;
        }
        return false;
    }
  }

  /**
   * 장비가 방패인지 여부를 나타내는 `boolean`값을 반환합니다.
   * @param gearType 장비 분류
   * @returns 방패일 경우 `true`; 아닐 경우 `false`
   */
  static isShield(gearType: GearType): boolean {
    switch(gearType) {
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
   * @param gearType 장비 분류
   * @returns 방어구일 경우 `true`; 아닐 경우 `false`
   */
  static isArmor(gearType: GearType): boolean {
    return (gearType === 100) ||
        (gearType >= 104 && gearType <= 110);
  }

  /**
   * 장비가 장신구인지 여부를 나타내는 `boolean`값을 반환합니다.
   * @param gearType 장비 분류
   * @returns 장신구일 경우 `true`; 아닐 경우 `false`
   */
  static isAccessory(gearType: GearType): boolean {
    return (gearType >= 101 && gearType <= 103) ||
        (gearType >= 111 && gearType <= 113) ||
        (gearType === 115);
  }

  /**
   * 장비가 메카닉 장비인지 여부를 나타내는 `boolean`값을 반환합니다.
   * @param gearType 장비 분류
   * @returns 메카닉 장비일 경우 `true`; 아닐 경우 `false`
   */
  static isMechanicGear(gearType: GearType): boolean {
    return gearType >= 161 && gearType <= 165;
  }

  /**
   * 장비가 에반 드래곤 장비인지 여부를 나타내는 `boolean`값을 반환합니다.
   * @param gearType 장비 분류
   * @returns 에반 드래곤 장비일 경우 `true`; 아닐 경우 `false`
   */
  static isDragonGear(gearType: GearType): boolean {
    return gearType >= 194 && gearType <= 197;
  }

  static specialCanPotential(gearType: GearType): boolean {
    switch(gearType) {
      case GearType.soulShield:
      case GearType.demonShield:
      case GearType.katara:
      case GearType.magicArrow:
      case GearType.card:
      case GearType.orb:
      case GearType.novaMarrow:
      case GearType.soulBangle:
      case GearType.mailin:
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
    switch(Math.floor(gearID / 1000)) {
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
    }
    if(Math.floor(gearID / 10000) === 135) {
      switch(Math.floor(gearID / 100)) {
        case 13522:
        case 13528:
        case 13529:
        case 13540:
          return Math.floor(gearID / 10);
        default:
          return Math.floor(gearID / 100) * 10;
      }
    }
    if(Math.floor(gearID / 100) === 11902) {
      return Math.floor(gearID / 10);
    }
    return Math.floor(gearID / 10000);
  }

  static GetGender(gearID: number): number {
    const type: GearType = this.getGearType(gearID);
    switch(type) {
      case GearType.emblem:
      case GearType.powerSource:
        //case 3:
        return 2;
    }

    return Math.floor(gearID / 1000 % 10);
  }

  private static getPropTypeWeight(type: GearPropType): number {
    if(type < 100) {
      switch(type) {
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
        case GearPropType.incPDD_incMDD:
        case GearPropType.incPDD:
          return 10;
        case GearPropType.incPAD_incMAD:
        case GearPropType.incAD:
          return 2;
        case GearPropType.incMHP_incMMP:
          return 200;
      }
    }
    return Number.MAX_SAFE_INTEGER;
  }
}
