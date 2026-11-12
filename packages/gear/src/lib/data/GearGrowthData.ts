import { GearBaseOption } from './GearData';

/**
 * 장비 성장 정보
 */
export interface GearGrowthData {
  /** 성장 출처 */
  source: 'growth' | 'scroll';
  /** 단계별 성장 정보. 가장 높은 레벨에 1을 더한 값이 최대 성장 레벨입니다. */
  levels: Record<number, GearGrowthLevelData>;
}

/**
 * 장비 성장 단계 정보
 */
export interface GearGrowthLevelData {
  /** 성장 경험치 값 */
  exp?: number;
  /** 해당 단계에서 다음 단계로 성장할 때 증가하는 옵션 범위 */
  option?: Partial<Record<keyof GearGrowthOption, [min: number, max: number]>>;
}

/**
 * 장비 성장 옵션
 */
export type GearGrowthOption = Pick<
  GearBaseOption,
  | 'str'
  | 'dex'
  | 'int'
  | 'luk'
  | 'maxHp'
  | 'maxMp'
  | 'attackPower'
  | 'magicPower'
  | 'armor'
  | 'speed'
  | 'jump'
  | 'bossDamage'
  | 'ignoreMonsterArmor'
>;

/**
 * 장비 성장 단계 정보 (읽기 전용)
 */
export type ReadonlyGearGrowthLevelData = Readonly<
  Omit<GearGrowthLevelData, 'exp' | 'option'> & {
    exp: number;
    option?: Readonly<
      Partial<
        Record<keyof GearGrowthOption, readonly [min: number, max: number]>
      >
    >;
  }
>;

/**
 * 장비 성장 정보 (읽기 전용)
 */
export type ReadonlyGearGrowthData = Readonly<
  Omit<GearGrowthData, 'levels'> & {
    levels: Readonly<Record<number, ReadonlyGearGrowthLevelData>>;
  }
>;
