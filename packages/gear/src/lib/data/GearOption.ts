/**
 * 장비 옵션
 */
export type GearOption = {
  /** STR */
  str: number;
  /** DEX */
  dex: number;
  /** INT */
  int: number;
  /** LUK */
  luk: number;
  /** STR(%) */
  strRate: number;
  /** DEX(%) */
  dexRate: number;
  /** INT(%) */
  intRate: number;
  /** LUK(%) */
  lukRate: number;
  /** 최대 HP */
  maxHp: number;
  /** 최대 MP */
  maxMp: number;
  /** 최대 HP(%) */
  maxHpRate: number;
  /** 최대 MP(%) */
  maxMpRate: number;
  /** 공격력 */
  attackPower: number;
  /** 마력 */
  magicPower: number;
  /** 공격력(%) */
  attackPowerRate: number;
  /** 마력(%) */
  magicPowerRate: number;
  /** 방어력 */
  armor: number;
  /** 방어력(%) */
  armorRate: number;
  /** 이동속도 */
  speed: number;
  /** 점프력 */
  jump: number;
  /** 보스 공격 시 데미지 증가(%) */
  bossDamage: number;
  /** 몬스터 방어율 무시(%) */
  ignoreMonsterArmor: number;
  /** 올스탯(%) */
  allStat: number;
  /** 데미지(%) */
  damage: number;
  /** 착용 레벨 감소 */
  reqLevelDecrease: number;
  /** 크리티컬 확률(%) */
  criticalRate: number;
  /** 크리티컬 데미지(%) */
  criticalDamage: number;
  /** 재사용 대기시간 감소 (초) */
  cooltimeReduce: number;
  /** 캐릭터 기준 9레벨 당 STR */
  strLv: number;
  /** 캐릭터 기준 9레벨 당 DEX */
  dexLv: number;
  /** 캐릭터 기준 9레벨 당 INT */
  intLv: number;
  /** 캐릭터 기준 9레벨 당 LUK */
  lukLv: number;
};
