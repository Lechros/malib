import {
  GearAttributeData,
  GearCuttable,
  GearIncline,
  GearShare,
  GearTrade,
  PotentialCan,
} from './data';

export class GearAttribute implements GearAttributeData {
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

  /** 황금망치 사용 불가 */
  get blockGoldHammer(): boolean {
    return this.data.blockGoldHammer ?? false;
  }

  /** 슈페리얼 */
  get superior(): boolean {
    return this.data.superior ?? false;
  }

  /** 강화불가 */
  get cannotUpgrade(): boolean {
    return this.data.cannotUpgrade ?? false;
  }

  /** 잠재능력 설정 가능 여부 */
  get potential(): PotentialCan {
    return this.data.potential ?? 0;
  }

  /** 에디셔널 잠재능력 설정 가능 여부 */
  get additionalPotential(): PotentialCan {
    return this.data.additionalPotential ?? 0;
  }

  /** 착용 레벨 증가 */
  get reqLevelIncrease(): number {
    return this.data.reqLevelIncrease ?? 0;
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

  /** 쉐어 네임 텍을 사용 가능 여부 */
  get accountShareTag(): boolean {
    return this.data.accountShareTag ?? false;
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

export type GearAttribute2 = {
  /** 고유 아이템 */
  readonly only?: boolean;
  /** 교환 가능 여부 */
  trade?: GearTrade;
  /** 고유장착 아이템 */
  readonly onlyEquip?: boolean;
  /** 월드 내 나의 캐릭터 간 이동 가능 여부 */
  share?: GearShare;
  /** 황금망치 사용 불가 */
  readonly blockGoldHammer?: boolean;

  /** 슈페리얼 */
  readonly superior?: boolean;

  /** 강화불가 */
  readonly cannotUpgrade?: boolean;
  /** 잠재능력 설정 가능 여부 */
  readonly potential?: PotentialCan;
  /** 에디셔널 잠재능력 설정 가능 여부 */
  readonly additionalPotential?: PotentialCan;

  /** 착용 레벨 증가 */
  readonly reqLevelIncrease?: number;

  /** 카르마의 가위 사용 가능 여부 */
  readonly cuttable?: GearCuttable;
  /** 가위 사용 가능 횟수 */
  cuttableCount?: number;
  /** 쉐어 네임 텍을 사용 가능 여부 */
  readonly accountShareTag?: boolean;
  /** 럭키 아이템 */
  readonly lucky?: boolean;
  /** 장착 시 획득 경험치 */
  incline?: Partial<GearIncline>;
  /** 보스 드롭 여부 */
  readonly bossReward?: boolean;

  /** 성장 경험치 */
  growthExp?: number;
  /** 성장 레벨 */
  growthLevel?: number;
  /** 장비 유효 기간(KST) */
  dateExpire?: string;
};
