import { GearPropType, Soul } from "../..";
import { SoulData, SoulDataMap } from "./interfaces/soul";

/**
 * 위대한 소울 옵션 종류
 */
export enum MagnificentSoulOptionType {
  /** 공격력, 공격력% */
  PAD = "PAD",
  /** 마력, 마력% */
  MAD = "MAD",
  /** 올스탯, 올스탯% */
  allStat = "allStat",
  /** 최대 HP */
  MHP = "MHP",
  /** 크리티컬 확률 */
  cr = "cr",
  /** 보스 데미지 */
  bdR = "bdR",
  /** 방어율 무시 */
  imdR = "imdR",
}

/**
 * 소울 정보로부터 소울을 생성합니다.
 * @param node 소울 정보.
 * @param type 위대한 소울 옵션 종류. 기본값은 `PAD`입니다.
 * 위대한 소울이 아닐 경우 무시합니다.
 * @returns 정보에 해당하는 소울.
 */
export function createSoulFromNode(
  node: SoulData,
  type = MagnificentSoulOptionType.PAD
): Soul {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const optionNode = node.magnificent ? node.options![type] : node.option!;
  const option = new Map<GearPropType, number>();
  for (const [key, value] of Object.entries(optionNode)) {
    const type = GearPropType[key as keyof typeof GearPropType];
    option.set(type, value);
  }
  return {
    name: node.name,
    skill: node.skill,
    multiplier: node.multiplier,
    option,
  };
}

export interface ISoulRepository {
  ids(): number[];

  createSoulFromId(id: number, ...args: unknown[]): Soul | undefined;
}

export class SoulRepository implements ISoulRepository {
  /**
   * KMS 소울 정보
   */
  private souls: SoulDataMap;

  /**
   * @param souls KMS 소울 정보
   */
  constructor(souls: SoulDataMap) {
    this.souls = souls;
  }

  /**
   * 소울 ID 목록을 반환합니다.
   * @returns 소울 ID 목록
   */
  ids(): number[] {
    return Object.keys(this.souls).map((key) => Number(key));
  }

  /**
   * 소울 ID로부터 소울를 생성합니다.
   * @param id 소울 ID.
   * @param type 위대한 소울 옵션 종류. 기본값은 `PAD`입니다.
   * 위대한 소울이 아닐 경우 무시합니다.
   * @returns 정보에 해당하는 소울. 존재하지 않을 경우 `undefined`를 반환합니다.
   */
  createSoulFromId(
    id: number,
    type = MagnificentSoulOptionType.PAD
  ): Soul | undefined {
    if (!(id in this.souls)) {
      return undefined;
    }

    return createSoulFromNode(this.souls[id], type);
  }
}
