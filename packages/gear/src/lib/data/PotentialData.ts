import { GearOption } from './GearOption';

export type PotentialData = {
  /** 장비에 표시되는 이름 */
  title: string;
  /** 잠재능력 옵션 */
  option: Partial<PotentialOption>;
};

export type PotentialOption = Pick<
  GearOption,
  | 'str'
  | 'dex'
  | 'int'
  | 'luk'
  | 'strRate'
  | 'dexRate'
  | 'intRate'
  | 'lukRate'
  | 'maxHp'
  | 'maxMp'
  | 'maxHpRate'
  | 'maxMpRate'
  | 'attackPower'
  | 'magicPower'
  | 'attackPowerRate'
  | 'magicPowerRate'
  | 'armor'
  | 'armorRate'
  | 'speed'
  | 'jump'
  | 'bossDamage'
  | 'ignoreMonsterArmor'
  | 'damage'
  | 'criticalRate'
  | 'criticalDamage'
  | 'cooltimeReduce'
  | 'strLv'
  | 'dexLv'
  | 'intLv'
  | 'lukLv'
>;
