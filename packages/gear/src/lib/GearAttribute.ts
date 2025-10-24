import {
  GearAttributeData,
  GearCapability,
  GearCuttable,
  GearIncline,
  GearShare,
  GearTrade,
} from './data';

type OptionalProperty =
  | 'attackSpeed'
  | 'cuttableCount'
  | 'totalCuttableCount'
  | 'setItemId'
  | 'growthExp'
  | 'growthLevel'
  | 'dateExpire';

type _GearAttribute = Omit<
  Omit<Required<GearAttributeData>, OptionalProperty> &
    Pick<GearAttributeData, OptionalProperty>,
  'skills'
> & {
  skills: readonly string[];
};

export class GearAttribute implements _GearAttribute {
  /** 장비 속성 정보 */
  data: GearAttributeData;

  constructor(data: GearAttributeData) {
    this.data = data;
  }

  /** 고유 아이템 */
  get only(): boolean {
    return this.data.only ?? false;
  }

  /** 교환 가능 여부 */
  get trade(): GearTrade {
    return this.data.trade ?? 0;
  }

  set trade(value: GearTrade) {
    this.data.trade = value;
  }

  /** 고유장착 아이템 */
  get onlyEquip(): boolean {
    return this.data.onlyEquip ?? false;
  }

  /** 월드 내 나의 캐릭터 간 이동 가능 여부 */
  get share(): GearShare {
    return this.data.share ?? 0;
  }

  /** 슈페리얼 */
  get superior(): boolean {
    return this.data.superior ?? false;
  }

  /** 공격 속도 */
  get attackSpeed(): number | undefined {
    return this.data.attackSpeed;
  }

  /** 주문서 강화 가능 여부 */
  get canScroll(): GearCapability {
    return this.data.canScroll ?? 0;
  }

  /** 스타포스 강화 가능 여부 */
  get canStarforce(): GearCapability {
    return this.data.canStarforce ?? 0;
  }

  /** 추가옵션 설정 가능 여부 */
  get canAddOption(): GearCapability {
    return this.data.canAddOption ?? 0;
  }

  /** 잠재능력 설정 가능 여부 */
  get canPotential(): GearCapability {
    return this.data.canPotential ?? 0;
  }

  /** 에디셔널 잠재능력 설정 가능 여부 */
  get canAdditionalPotential(): GearCapability {
    return this.data.canAdditionalPotential ?? 0;
  }

  /** 스페셜 아이템 여부 */
  get specialGrade(): boolean {
    return this.data.specialGrade ?? false;
  }

  /** 카르마의 가위 사용 가능 여부 */
  get cuttable(): GearCuttable {
    return this.data.cuttable ?? 0;
  }

  /** 가위 사용 가능 횟수 */
  get cuttableCount(): number | undefined {
    return this.data.cuttableCount;
  }

  set cuttableCount(value) {
    this.data.cuttableCount = value;
  }

  /** 최대 가위 사용 가능 횟수 */
  get totalCuttableCount(): number | undefined {
    return this.data.totalCuttableCount;
  }

  /** 쉐어 네임 텍을 사용 가능 여부 */
  get accountShareTag(): boolean {
    return this.data.accountShareTag ?? false;
  }

  /** 훈장 신비의 모루 사용 불가 여부 */
  get noShapeChange(): boolean {
    return this.data.noShapeChange ?? false;
  }

  /** 세트 효과 ID */
  get setItemId(): number | undefined {
    return this.data.setItemId;
  }

  /** 럭키 아이템 */
  get lucky(): boolean {
    return this.data.lucky ?? false;
  }

  /** 장착 시 획득 경험치 */
  get incline(): Readonly<GearIncline> {
    return {
      charisma: 0,
      insight: 0,
      will: 0,
      craft: 0,
      sense: 0,
      charm: 0,
      ...this.data.incline,
    };
  }

  set incline(value: Partial<GearIncline>) {
    this.data.incline = value;
  }

  /** 보스 드롭 여부 */
  get bossReward(): boolean {
    return this.data.bossReward ?? false;
  }

  /** 사용 가능 스킬 */
  get skills(): readonly string[] {
    return this.data.skills ?? [];
  }

  /** 성장 경험치 */
  get growthExp(): number | undefined {
    return this.data.growthExp;
  }

  set growthExp(value) {
    if (value === undefined || (0 <= value && value <= 100)) {
      this.data.growthExp = value;
    }
  }

  /** 성장 레벨 */
  get growthLevel(): number | undefined {
    return this.data.growthLevel;
  }

  set growthLevel(value) {
    this.data.growthLevel = value;
  }

  /** 장비 유효 기간(KST) */
  get dateExpire(): string | undefined {
    return this.data.dateExpire;
  }

  set dateExpire(value) {
    if (value === undefined || !Number.isNaN(Date.parse(value))) {
      this.data.dateExpire = value;
    }
  }
}
