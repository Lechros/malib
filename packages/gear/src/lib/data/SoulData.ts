import { GearOption } from './GearOption';

export type SoulData = {
  /** 소울 명 */
  name: string;
  /** 장비 명 상단에 표시되는 이름 */
  title: string;
  /** 소울 옵션 */
  option: Partial<SoulOption>;
  /** 소울 옵션 설명 */
  optionDesc: string;
  /** 소울 스킬 명 */
  skillName: string;
};

export type SoulOption = Pick<
  GearOption,
  | 'str'
  | 'dex'
  | 'int'
  | 'luk'
  | 'strRate'
  | 'dexRate'
  | 'intRate'
  | 'lukRate'
  | 'attackPower'
  | 'magicPower'
  | 'attackPowerRate'
  | 'magicPowerRate'
  | 'maxHp'
  | 'maxMp'
  | 'criticalRate'
  | 'ignoreMonsterArmor'
  | 'bossDamage'
>;
