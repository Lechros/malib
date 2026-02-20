/**
 * 캐릭터 장비 특별 옵션 정보
 */
export interface ItemEquipmentExceptionalOption {
  /**
   * STR
   */
  str: string;

  /**
   * DEX
   */
  dex: string;

  /**
   * INT
   */
  int: string;

  /**
   * LUK
   */
  luk: string;

  /**
   * 최대 HP
   */
  max_hp: string;

  /**
   * 최대 MP
   */
  max_mp: string;

  /**
   * 공격력
   */
  attack_power: string;

  /**
   * 마력
   */
  magic_power: string;

  /**
   * 익셉셔널 강화 적용 횟수
   */
  exceptional_upgrade: number;
}
