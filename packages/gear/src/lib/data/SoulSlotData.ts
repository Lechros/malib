import { GearOption } from './GearOption';
import { PotentialData } from './PotentialData';
import { PotentialGrade } from './PotentialGrade';

/**
 * 소울 웨폰 정보
 */
export interface SoulSlotData {
  /** 소울웨폰 여부 */
  enchanted?: boolean;
  /** 소울 아이템 */
  soul?: SoulData;
  /** 소울 증폭 단계 */
  amplificationLevel?: number;
  /** 소울 잠재능력 등급 */
  potentialGrade?: PotentialGrade;
  /** 소울 잠재능력 목록 */
  potentials?: PotentialData[];
}

/**
 * 소울 정보
 */
export interface SoulData {
  /** 소울 명 */
  name: string;
  /** 소울 추가 능력치 */
  option: Partial<SoulOption>;
  /** 소울 증폭 가능 여부 */
  canAmplify?: boolean;
}

/**
 * 소울 정보 (읽기 전용)
 */
export type ReadonlySoulData = Readonly<
  Omit<Required<SoulData>, 'option'> & { option: Readonly<SoulOption> }
>;

/**
 * 소울 상시 적용 옵션
 */
export type SoulBaseOption = Pick<GearOption, 'attackPower' | 'magicPower'>;

/**
 * 소울 옵션
 */
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
