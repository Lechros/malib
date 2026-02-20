import {
  GearOption,
  GearType,
  isSubWeapon,
  isWeapon,
  PotentialData,
  PotentialGrade,
} from '@malib/gear';
import { OpenApiValueError } from './exception';
import itemOptionJson from './resources/item-option.json';

interface LevelOption {
  string: string;
  option: Partial<GearOption>;
}

interface ItemOption {
  reqLevel?: number;
  optionType?: number;
  level: Record<number, LevelOption>;
}

const itemOptions = itemOptionJson as Record<number, ItemOption>;

export function resolvePotentialGrade(
  gradeName: string | null,
): PotentialGrade | undefined {
  switch (gradeName) {
    case null:
      return undefined;
    case '레어':
      return PotentialGrade.Rare;
    case '에픽':
      return PotentialGrade.Epic;
    case '유니크':
      return PotentialGrade.Unique;
    case '레전드리':
      return PotentialGrade.Legendary;
    default:
      throw new OpenApiValueError(`Unknown potential grade name: ${gradeName}`);
  }
}

export class PotentialOptionResolver {
  private readonly potentials: Record<string, [number, LevelOption]>;
  private readonly additionalPotentials: Record<string, [number, LevelOption]>;

  /**
   * @param gearReqLevel 장비 착용 레벨, 착용 레벨 증가 포함.
   * @param gearType 장비 분류, 잠재능력 옵션 타입 검사에 사용.
   */
  constructor(gearReqLevel: number, gearType: GearType) {
    this.potentials = {};
    this.additionalPotentials = {};
    const potentialLevel = getPotentialLevel(gearReqLevel);
    for (const [idStr, optionData] of Object.entries(itemOptions)) {
      // Check reqLevel
      if (optionData.reqLevel && optionData.reqLevel > gearReqLevel) {
        continue;
      }
      // Check optionType
      if (
        optionData.optionType &&
        !checkOptionType(optionData.optionType, gearType)
      ) {
        continue;
      }
      const levelOption = optionData.level[potentialLevel];
      const id = Number(idStr);
      const isAdditional = Math.floor(id / 1000) % 10 === 2;
      // Higher id(grade) will overwrite lower id.
      if (isAdditional) {
        this.additionalPotentials[levelOption.string] = [
          Number(id),
          levelOption,
        ];
      } else {
        this.potentials[levelOption.string] = [Number(id), levelOption];
      }
    }
  }

  resolvePotentialOption(optionName: string | null): PotentialData | null {
    if (optionName === null) {
      return null;
    }
    if (optionName in this.potentials) {
      const [id, levelOption] = this.potentials[optionName];
      return {
        id: id,
        grade: Math.floor(id / 10000) % 10,
        summary: levelOption.string,
        option: levelOption.option,
      };
    }
    return {
      id: undefined,
      grade: PotentialGrade.Rare,
      summary: optionName,
      option: {},
    };
  }

  resolveAdditionalPotentialOption(
    optionName: string | null,
  ): PotentialData | null {
    if (optionName === null) {
      return null;
    }
    if (optionName in this.additionalPotentials) {
      const [id, levelOption] = this.additionalPotentials[optionName];
      return {
        id: id,
        grade: Math.floor(id / 10000) % 10,
        summary: levelOption.string,
        option: levelOption.option,
      };
    }
    return {
      id: undefined,
      grade: PotentialGrade.Rare,
      summary: optionName,
      option: {},
    };
  }
}

function getPotentialLevel(gearReqLevel: number): number {
  if (gearReqLevel <= 0) return 1;
  else if (gearReqLevel >= 250) return 25;
  else return Math.floor((gearReqLevel + 9) / 10);
}

function checkOptionType(optionType: number, gearType: GearType): boolean {
  switch (optionType) {
    case 0:
      return true;
    case 10:
      return (
        isWeapon(gearType) ||
        isSubWeapon(gearType) ||
        gearType == GearType.shield
      );
    case 11:
      return !checkOptionType(10, gearType);
    case 20:
      return (
        isSubWeapon(gearType) ||
        gearType == GearType.pants ||
        gearType == GearType.shoes ||
        gearType == GearType.cap ||
        gearType == GearType.coat ||
        gearType == GearType.longcoat ||
        gearType == GearType.glove ||
        gearType == GearType.cape ||
        gearType == GearType.belt ||
        gearType == GearType.shoulder
      );
    case 40:
      return (
        gearType == GearType.faceAccessory ||
        gearType == GearType.eyeAccessory ||
        gearType == GearType.ring ||
        gearType == GearType.earrings ||
        gearType == GearType.pendant
      );
    case 51:
      return gearType == GearType.cap;
    case 52:
      return gearType == GearType.coat || gearType == GearType.longcoat;
    case 53:
      return gearType == GearType.pants;
    case 54:
      return gearType == GearType.glove;
    case 55:
      return gearType == GearType.shoes;
    default:
      return false;
  }
}
