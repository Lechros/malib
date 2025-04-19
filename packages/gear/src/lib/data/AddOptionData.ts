/**
 * 추가 옵션 종류
 */
export enum AddOptionType {
  /** STR */
  str = 'str',
  /** DEX */
  dex = 'dex',
  /** INT */
  int = 'int',
  /** LUK */
  luk = 'luk',
  /** STR, DEX */
  str_dex = 'str,dex',
  /** STR, INT */
  str_int = 'str,int',
  /** STR, LUK */
  str_luk = 'str,luk',
  /** DEX, INT */
  dex_int = 'dex,int',
  /** DEX, LUK */
  dex_luk = 'dex,luk',
  /** INT, LUK */
  int_luk = 'int,luk',
  /** 최대 HP */
  maxHp = 'maxHp',
  /** 최대 MP */
  maxMp = 'maxMp',
  /** 공격력 */
  attackPower = 'attackPower',
  /** 마력 */
  magicPower = 'magicPower',
  /** 방어력 */
  armor = 'armor',
  /** 이동속도 */
  speed = 'speed',
  /** 점프력 */
  jump = 'jump',
  /** 보스 공격 시 데미지 증가(%) */
  bossDamage = 'bossDamage',
  /** 데미지(%) */
  damage = 'damage',
  /** 올스탯(%) */
  allStat = 'allStat',
  /** 착용 레벨 감소 */
  reqLevelDecrease = 'reqLevelDecrease',
}

/**
 * 추가 옵션 단계
 */
export type AddOptionGrade = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * 추가 옵션 정보
 */
export interface AddOptionData {
  /** 추가 옵션 종류 */
  type: AddOptionType;
  /** 추가 옵션 단계 */
  grade: AddOptionGrade;
  /** 추가 옵션 수치 */
  value: number;
}
