import { GearOption } from './GearOption';

/**
 * 소울 웨폰 정보
 */
export type SoulSlotData = {
  /** 소울 아이템 */
  soul?: SoulData;
  /** 소울 충전량 */
  charge?: number;
  /** 소울 충전 옵션 */
  chargeOption?: Partial<SoulChargeOption>;
};

/**
 * 소울 정보
 */
export type SoulData = {
  /** 소울 명 */
  name: string;
  /** 소울 스킬 명 */
  skill: string;
  /** 소울 옵션 */
  option: Partial<SoulOption>;

  /** 소울 충전 옵션 배율 */
  chargeFactor?: 1 | 2;
};

/**
 * 소울 정보 (읽기 전용)
 */
export type ReadonlySoulData = Readonly<
  Omit<SoulData, 'option'> & { option: Readonly<SoulOption> }
>;

/**
 * 소울 충전 옵션
 */
export type SoulChargeOption = Pick<GearOption, 'attackPower' | 'magicPower'>;

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
