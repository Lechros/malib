import { GearOption } from './GearOption';
import { PotentialData } from './PotentialData';
import { PotentialGrade } from './PotentialGrade';
import { SoulData } from './SoulData';

type GearType = number;

/**
 * 장비 정보
 */
export type GearData = {
  /** 아이템 ID */
  id: number;
  /** 장비명 */
  name: string;
  /** 장비 아이콘 */
  icon: string;
  /** 장비 설명 */
  desc: string;
  /** 장비 외형 */
  shapeName: string;
  /** 장비 외형 아이콘 */
  shapeIcon: string;
  /** 장비 분류 */
  type: GearType;
  /** 장비 착용 제한 */
  req: GearReq;
  /** 착용 레벨 증가 */
  reqLevelIncrease: number;

  /** 장비 기본 옵션 */
  baseOption: Partial<GearBaseOption>;
  /** 장비 추가 옵션 */
  addOption: Partial<GearAddOption>;
  /** 장비 주문서 옵션 */
  scrollOption: Partial<GearScrollOption>;
  /** 장비 스타포스 옵션 */
  starforceOption: Partial<GearStarforceOption>;

  /** 업그레이드 횟수 */
  scrollUpgradeCount: number;
  /** 복구 가능 횟수 */
  scrollResilienceCount: number;
  /** 업그레이드 가능 횟수 */
  scrollUpgradeableCount: number;
  /** 황금 망치 재련 적용 */
  goldenHammer: number;

  /** 가위 사용 가능 횟수 (교환 불가 장비, 가위 횟수가 없는 교환 가능 장비는 `undefined`) */
  cuttableCount?: number;

  /** 강화 단계 */
  star: number;
  /** 최대 강화 단계 */
  maxStar: number;
  /** 놀라운 장비 강화 주문서 사용 여부 */
  starScroll: boolean;

  /** 소울 인챈트 */
  soulEnchanted: boolean;
  /** 소울 */
  soul?: SoulData;
  /** 소울 충전량 */
  soulCharge: number;
  /** 소울 충전 옵션 */
  soulChargeOption: Partial<SoulChargeOption>;

  /** 잠재능력 등급 */
  potentialGrade: PotentialGrade;
  /** 잠재능력 목록 */
  potentials: [
    PotentialData | null,
    PotentialData | null,
    PotentialData | null,
  ];
  /** 에디셔널 잠재능력 등급 */
  additionalPotentialGrade: PotentialGrade;
  /** 에디셔널 잠재능력 목록 */
  additionalPotentials: [
    PotentialData | null,
    PotentialData | null,
    PotentialData | null,
  ];

  /** 장비 익셉셔널 옵션 */
  exceptionalOption: Partial<GearExceptionalOption>;
  /** 익셉셔널 강화 횟수 */
  exceptionalUpgradeCount: number;
  /** 익셉셔널 강화 가능 횟수 */
  exceptionalUpgradeableCount: number;

  /** 성장 경험치 */
  growthExp: number;
  /** 성장 레벨 */
  growthLevel: number;
  /** 장비 유효 기간(KST) */
  dateExpire: string;
};

export type GearReq = {
  /** 착용 가능 레벨 */
  level: number;
  /** 착용 가능 STR */
  str: number;
  /** 착용 가능 LUK */
  luk: number;
  /** 착용 가능 DEX */
  dex: number;
  /** 착용 가능 INT */
  int: number;
  /** 착용 가능 직업 분류 */
  job: number;
  /** 착용 가능 직업 */
  class: number;
};

export type GearBaseOption = Pick<
  GearOption,
  | 'str'
  | 'dex'
  | 'int'
  | 'luk'
  | 'maxHp'
  | 'maxMp'
  | 'maxHpRate'
  | 'maxMpRate'
  | 'attackPower'
  | 'magicPower'
  | 'armor'
  | 'speed'
  | 'jump'
  | 'bossDamage'
  | 'ignoreMonsterArmor'
  | 'allStat'
  | 'damage'
  | 'reqLevelDecrease'
>;

export type GearAddOption = Pick<
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
  | 'allStat'
  | 'damage'
  | 'reqLevelDecrease'
>;

export type GearScrollOption = Pick<
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
>;

export type GearStarforceOption = Pick<
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
>;

export type GearExceptionalOption = Pick<
  GearBaseOption,
  | 'str'
  | 'dex'
  | 'int'
  | 'luk'
  | 'maxHp'
  | 'maxMp'
  | 'attackPower'
  | 'magicPower'
>;

export type SoulChargeOption = Pick<GearOption, 'attackPower' | 'magicPower'>;
