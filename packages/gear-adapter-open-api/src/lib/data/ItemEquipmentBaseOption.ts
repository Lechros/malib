/**
 * 캐릭터 장비 기본 옵션 정보
 */
export interface ItemEquipmentBaseOption {
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
   * 몬스터 방어율 무시(%)
   */
  ignore_monster_armor: string;

  /**
   * 올스탯(%)
   */
  all_stat: string;

  /**
   * 최대 HP(%)
   */
  max_hp_rate: string;

  /**
   * 최대 MP(%)
   */
  max_mp_rate: string;

  /**
   * 기본 착용 레벨
   */
  base_equipment_level: number;
}
