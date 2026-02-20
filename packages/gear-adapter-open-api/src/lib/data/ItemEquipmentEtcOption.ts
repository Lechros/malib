/**
 * 캐릭터 장비 기타 옵션 정보
 */
export interface ItemEquipmentEtcOption {
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
   * 방어력
   */
  armor: string;

  /**
   * 이동속도
   */
  speed: string;

  /**
   * 점프력
   */
  jump: string;
}
