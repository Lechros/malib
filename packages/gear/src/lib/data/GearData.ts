import { AddOptionData } from './AddOptionData';
import { GearAttributeData } from './GearAttributeData';
import { GearOption } from './GearOption';
import { GearType } from './GearType';
import { PotentialData } from './PotentialData';
import { PotentialGrade } from './PotentialGrade';
import { SoulSlotData } from './SoulSlotData';

/**
 * 장비 정보
 */
export interface GearData {
  /** 장비 메타데이터 */
  meta: GearMetadata;
  /** 장비명 */
  name: string;
  /** 장비 아이콘 */
  icon?: string;
  /** 장비 설명 */
  desc?: string;
  /** 장비 외형 */
  shape?: GearShapeData;
  /** 장비 분류 */
  type: GearType;
  /** 장비 착용 제한 */
  req: GearReqData;
  /** 장비 속성 */
  attributes: GearAttributeData;

  /** 장비 기본 옵션 */
  baseOption?: Partial<GearBaseOption>;
  /** 장비 추가 옵션 */
  addOption?: Partial<GearAddOption>;
  /** 장비 주문서 강화 옵션 */
  upgradeOption?: Partial<GearUpgradeOption>;
  /** 장비 스타포스 옵션 */
  starforceOption?: Partial<GearStarforceOption>;

  /** 추가 옵션 목록 */
  addOptions?: AddOptionData[];

  /** 업그레이드 횟수 */
  scrollUpgradeCount?: number;
  /** 복구 가능 횟수 */
  scrollResilienceCount?: number;
  /** 업그레이드 가능 횟수 */
  scrollUpgradeableCount?: number;

  /** 강화 단계 */
  star?: number;
  /** 놀라운 장비 강화 주문서 사용 여부 */
  starScroll?: boolean;

  /** 소울 웨폰 정보 */
  soulSlot?: SoulSlotData;

  /** 잠재능력 등급 */
  potentialGrade?: PotentialGrade;
  /** 잠재능력 목록 */
  potentials?: PotentialData[];
  /** 에디셔널 잠재능력 등급 */
  additionalPotentialGrade?: PotentialGrade;
  /** 에디셔널 잠재능력 목록 */
  additionalPotentials?: PotentialData[];

  /** 장비 익셉셔널 옵션 */
  exceptionalOption?: Partial<GearExceptionalOption>;
  /** 익셉셔널 강화 횟수 */
  exceptionalUpgradeCount?: number;
  /** 익셉셔널 강화 가능 횟수 */
  exceptionalUpgradeableCount?: number;
}

/**
 * 장비 메타데이터
 *
 * 사용자는 메타데이터에 커스텀 속성을 추가할 수 있습니다.
 * 커스텀 속성은 해당 라이브러리가 임의로 변경하지 않습니다.
 * 충돌을 방지하기 위해 커스텀 속성명은 하나의 `_`으로 시작해야 합니다.
 */
export interface GearMetadata {
  /** 아이템 ID */
  id: number;
  /** 장비 정보 버전 */
  version: 1;
}

/**
 * 장비 외형 정보
 */
export interface GearShapeData {
  /** 장비 외형 이름 */
  name: string;
  /** 장비 외형 아이콘 */
  icon: string;
}

/**
 * 장비 착용 제한 정보
 */
export interface GearReqData {
  /** 착용 가능 레벨 */
  level?: number;
  /** 착용 가능 직업 분류 */
  job?: number;
  /** 착용 가능 직업 */
  class?: number;
}

/**
 * 장비 기본 옵션
 */
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
  | 'maxDemonForce'
  | 'attackPower'
  | 'magicPower'
  | 'armor'
  | 'speed'
  | 'jump'
  | 'knockback'
  | 'bossDamage'
  | 'ignoreMonsterArmor'
  | 'allStat'
  | 'damage'
  | 'reqLevelDecrease'
>;

/**
 * 장비 추가 옵션
 */
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
  | 'allStat'
  | 'damage'
  | 'reqLevelDecrease'
>;

/**
 * 장비 주문서 옵션
 */
export type GearUpgradeOption = Pick<
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

/**
 * 장비 스타포스 옵션
 */
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

/**
 * 장비 익셉셔널 옵션
 */
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
