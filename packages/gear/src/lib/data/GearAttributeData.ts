/**
 * 장비 속성
 */
export type GearAttributeData = {
  /** 고유 아이템 */
  only?: boolean;
  /** 교환 가능 여부 */
  trade?: GearTrade;
  /** 고유장착 아이템 */
  onlyEquip?: boolean;
  /** 월드 내 나의 캐릭터 간 이동 가능 여부 */
  share?: GearShare;
  /** 황금망치 사용 불가 */
  blockGoldHammer?: boolean;

  /** 슈페리얼 */
  superior?: boolean;

  /** 강화불가 */
  cannotUpgrade?: boolean;
  /** 잠재능력 설정 가능 여부 */
  potential?: PotentialCan;
  /** 에디셔널 잠재능력 설정 가능 여부 */
  additionalPotential?: PotentialCan;

  /** 카르마의 가위 사용 가능 여부 */
  cuttable?: GearCuttable;
  /** 쉐어 네임 텍을 사용 가능 여부 */
  accountShareTag?: boolean;
  /** 럭키 아이템 */
  lucky?: boolean;
  /** 장착 시 획득 경험치 */
  incline?: Partial<GearIncline>;
};

export const enum GearTrade {
  /** 교환 불가 */
  TradeBlock = 1,
  /** 장착 시 교환 불가 */
  EquipTradeBlock = 2,
}

export const enum GearShare {
  /** 월드 내 나의 캐릭터 간 이동 가능 */
  AccountSharable = 1,
  /** 월드 내 나의 캐릭터 간 1회 이동 가능 (이동 후 교환불가) */
  AccountSharableOnce = 2,
}

export const enum PotentialCan {
  /** 설정 불가 */
  Cannot = 1,
  /** 재설정 불가 */
  Fixed = 2,
}

export const enum GearCuttable {
  /** 카르마의 가위 또는 실버 카르마의 가위를 사용하면 1회 교환이 가능하게 할 수 있습니다. */
  Silver = 1,
  /** 플래티넘 카르마의 가위를 사용하면 1회 교환이 가능하게 할 수 있습니다. */
  Platinum = 2,
}

export type GearIncline = {
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
};
