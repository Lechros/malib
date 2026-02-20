/**
 * 캐릭터 장비 추가 옵션 정보
 */
export interface ItemEquipmentAddOption {
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

  /**
   * 보스 공격 시 데미지 증가(%)
   */
  boss_damage: string;

  /**
   * 데미지(%)
   */
  damage: string;

  /**
   * 올스탯(%)
   */
  all_stat: string;

  /**
   * 착용 레벨 감소
   */
  equipment_level_decrease: number;
}
