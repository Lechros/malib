import { GearPropType, Soul } from "@malib/gear";
import { SoulData } from "./interfaces/soul";
import { soulJson } from "./resource";
import { asEnum } from "./util";

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
 * 소울 정보로부터 장비를 생성합니다.
 * @param node 소울 정보
 * @param type 위대한 소울일 경우 옵션 종류; 기본값 `PAD`
 * @returns 소울
 */
export function createSoulFromNode(
  node: SoulData,
  type = MagnificentSoulOptionType.PAD
): Soul {
  const soul = new Soul();
  soul.name = node.name;
  soul.skill = node.skill;
  soul.multiplier = node.multiplier;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const optionNode = node.magnificent ? node.options![type] : node.option!;
  for (const [key, value] of Object.entries(optionNode)) {
    const type = asEnum(key, GearPropType);
    soul.option.set(type, value);
  }
  return soul;
}

/**
 * 소울 ID로부터 소울를 생성합니다.
 * @param id 소울 ID
 * @param type 위대한 소울일 경우 옵션 종류; 기본값 `PAD`
 * @returns 소울; 존재하지 않을 경우 `undefined`
 */
export function createSoulFromId(
  id: number,
  type = MagnificentSoulOptionType.PAD
): Soul | undefined {
  if (!(id in soulJson)) {
    return undefined;
  }

  return createSoulFromNode(soulJson[id], type);
}
