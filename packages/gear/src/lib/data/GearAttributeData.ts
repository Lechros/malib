/**
 * 장비 속성 정보
 */
export interface GearAttributeData {
  /** 고유 아이템 */
  only?: boolean;
  /** 교환 가능 여부 */
  trade?: GearTrade;
  /** 고유장착 아이템 */
  onlyEquip?: boolean;
  /** 월드 내 나의 캐릭터 간 이동 가능 여부 */
  share?: GearShare;

  /** 슈페리얼 */
  superior?: boolean;
  /** 공격 속도 */
  attackSpeed?: number;

  /** 주문서 강화 가능 여부 */
  canScroll?: GearCapability;
  /** 스타포스 강화 가능 여부 */
  canStarforce?: GearCapability;
  /** 추가 옵션 설정 가능 여부 */
  canAddOption?: GearCapability;
  /** 잠재능력 설정 가능 여부 */
  canPotential?: GearCapability;
  /** 에디셔널 잠재능력 설정 가능 여부 */
  canAdditionalPotential?: GearCapability;
  /** 스페셜 아이템 여부 */
  specialGrade?: boolean;
  /** 최대 스타포스 강화 단계 */
  fixedMaxStar?: number;

  /** 카르마의 가위 사용 가능 여부 */
  cuttable?: GearCuttable;
  /** 가위 사용 가능 횟수 */
  cuttableCount?: number;
  /** 최대 가위 사용 가능 횟수 */
  totalCuttableCount?: number;
  /** 쉐어 네임 텍을 사용 가능 여부 */
  accountShareTag?: boolean;
  /** 훈장 신비의 모루 사용 불가 여부 */
  noShapeChange?: boolean;
  /** 세트 효과 ID */
  setItemId?: number;
  /** 럭키 아이템 */
  lucky?: boolean;
  /** 장착 시 획득 경험치 */
  incline?: Partial<GearIncline>;
  /** 보스 드롭 여부 */
  bossReward?: boolean;
  /** 사용 가능 스킬 */
  skills?: string[];

  /** 성장 경험치 */
  growthExp?: number;
  /** 성장 레벨 */
  growthLevel?: number;
  /** 장비 유효 기간(KST) */
  dateExpire?: string;
}

export enum GearTrade {
  /** 교환 가능 */
  Tradeable = 0,
  /** 교환 불가 */
  TradeBlock = 1,
  /** 장착 시 교환 불가 */
  EquipTradeBlock = 2,
  /** 1회 교환 가능 */
  TradeOnce = 3,
}

export enum GearShare {
  /** 없음 */
  None = 0,
  /** 월드 내 나의 캐릭터 간 이동 가능 */
  AccountSharable = 1,
  /** 월드 내 나의 캐릭터 간 1회 이동 가능 (이동 후 교환불가) */
  AccountSharableOnce = 2,
}

export enum GearCapability {
  /** 설정 불가 */
  Cannot = 0,
  /** 설정 가능 */
  Can = 1,
  /** 재설정 불가 */
  Fixed = 2,
}

export enum GearCuttable {
  /** 없음 */
  None = 0,
  /** 카르마의 가위 또는 실버 카르마의 가위를 사용하면 1회 교환이 가능하게 할 수 있습니다. */
  Silver = 1,
  /** 플래티넘 카르마의 가위를 사용하면 1회 교환이 가능하게 할 수 있습니다. */
  Platinum = 2,
}

export interface GearIncline {
  /** 카리스마 */
  charisma: number;
  /** 통찰력 */
  insight: number;
  /** 의지 */
  will: number;
  /** 손재주 */
  craft: number;
  /** 감성 */
  sense: number;
  /** 매력 */
  charm: number;
}
