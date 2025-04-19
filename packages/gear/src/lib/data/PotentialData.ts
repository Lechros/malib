import { GearOption } from './GearOption';
import { PotentialGrade } from './PotentialGrade';

/**
 * 잠재옵션 정보
 */
export interface PotentialData {
  /** 잠재능력 등급 */
  grade: PotentialGrade;
  /** 장비에 표시되는 이름 */
  summary: string;
  /** 잠재능력 옵션 */
  option: Partial<PotentialOption>;
}

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
  | 'normalDamage'
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
