import {
  AddOptionData,
  GearAddOption,
  GearBaseOption,
  GearData,
  GearExceptionalOption,
  GearMetadata,
  GearShapeData,
  GearStarforceOption,
  GearType,
  GearUpgradeOption,
  PotentialGrade,
  ReadonlySoulData,
  SoulChargeOption,
} from './data';
import { ReadonlyPotential } from './enhance/potential';
import { getMaxStar } from './enhance/starforce';
import { GearAttribute } from './GearAttribute';
import { sumOptions, toGearOption } from './gearOption';
import { GearReq } from './GearReq';

type _Gear = Omit<
  GearData,
  'attributes' | 'potentials' | 'additionalPotentials' | 'addOptions'
> & {
  attributes: GearAttribute;
  addOptions: readonly Readonly<AddOptionData>[];
  potentials: readonly ReadonlyPotential[];
  additionalPotentials: readonly ReadonlyPotential[];
};

/**
 * 장비 (읽기 전용)
 *
 * 생성자에 전달된 장비 정보와 `data` 속성 간에 엄격한 동등(`===`)을 보장합니다.
 *
 * 장비 정보의 모든 속성에 대해 읽기 전용 속성을 제공합니다.
 */
export class ReadonlyGear implements _Gear {
  /** 장비 정보 */
  protected readonly _data: Readonly<GearData>;

  /**
   * 장비 정보를 참조하는 장비 인스턴스를 생성합니다.
   * @param data 장비 정보.
   */
  constructor(data: GearData) {
    this._data = data;
  }

  /**
   * 장비 정보
   */
  get data(): Readonly<GearData> {
    return this._data;
  }

  /**
   * 장비 메타데이터
   */
  get meta(): GearMetadata {
    return this.data.meta;
  }

  /**
   * 장비명
   */
  get name(): string {
    return this.data.name;
  }

  /**
   * 장비 아이콘
   */
  get icon(): string {
    return this.data.icon ?? '';
  }

  /**
   * 장비 설명
   */
  get desc(): string | undefined {
    return this.data.desc;
  }

  /**
   * 장비 외형
   */
  get shape(): Readonly<GearShapeData> | undefined {
    return this.data.shape;
  }

  /**
   * 장비 외형 아이콘
   *
   * 장비 외형이 설정되었을 경우 장비 외형 아이콘, 그렇지 않을 경우 장비 아이콘.
   */
  get shapeIcon(): string {
    return this.shape?.icon ?? this.icon;
  }

  /**
   * 장비 분류
   */
  get type(): GearType {
    return this.data.type;
  }

  /**
   * 장비 착용 제한
   */
  get req(): GearReq {
    return new GearReq(this.data.req);
  }

  /**
   * 장비 속성
   */
  get attributes(): GearAttribute {
    return new GearAttribute(this.data.attributes);
  }

  /**
   * 장비 최종 옵션
   *
   * 기본 옵션, 추가 옵션, 주문서 옵션, 스타포스 옵션의 합.
   *
   * 익셉셔널 옵션은 미포함.
   */
  get totalOption(): Readonly<
    GearBaseOption & GearAddOption & GearUpgradeOption & GearStarforceOption
  > {
    return toGearOption(
      sumOptions(
        this.baseOption,
        this.addOption,
        this.upgradeOption,
        this.starforceOption,
      ),
    );
  }

  /**
   * 장비 순수 옵션
   */
  get baseOption(): Readonly<GearBaseOption> {
    return toGearOption(this.data.baseOption ?? {});
  }

  /**
   * 장비 추가 옵션
   */
  get addOption(): Readonly<GearAddOption> {
    return toGearOption(this.data.addOption ?? {});
  }

  /**
   * 장비 주문서 강화 옵션
   */
  get upgradeOption(): Readonly<GearUpgradeOption> {
    return toGearOption(this.data.upgradeOption ?? {});
  }

  /**
   * 장비 스타포스 옵션
   */
  get starforceOption(): Readonly<GearStarforceOption> {
    return toGearOption(this.data.starforceOption ?? {});
  }

  /**
   * 추가 옵션 목록
   */
  get addOptions(): readonly Readonly<AddOptionData>[] {
    return this.data.addOptions ?? [];
  }

  /**
   * 업그레이드 횟수
   */
  get scrollUpgradeCount(): number {
    return this.data.scrollUpgradeCount ?? 0;
  }

  /**
   * 복구 가능 횟수
   */
  get scrollResilienceCount(): number {
    return this.data.scrollResilienceCount ?? 0;
  }

  /**
   * 업그레이드 가능 횟수
   */
  get scrollUpgradeableCount(): number {
    return this.data.scrollUpgradeableCount ?? 0;
  }

  /**
   * 전체 업그레이드 가능 횟수
   *
   * 성공, 실패, 황금 망치 적용 여부를 무시한 장비의 기본 업그레이드 가능 횟수입니다.
   */
  get scrollTotalUpgradeableCount(): number {
    return (
      this.scrollUpgradeCount +
      this.scrollUpgradeableCount +
      this.scrollResilienceCount
    );
  }

  /**
   * 스타포스 강화 단계
   */
  get star(): number {
    return this.data.star ?? 0;
  }

  /**
   * 최대 스타포스 강화 단계
   *
   * 놀라운 장비 강화 주문서가 사용되었을 경우 최대 `15`입니다.
   */
  get maxStar(): number {
    return getMaxStar(this);
  }

  /**
   * 놀라운 장비 강화 주문서 사용 여부
   */
  get starScroll(): boolean {
    return this.data.starScroll ?? false;
  }

  /**
   * 소울 인챈트 여부
   */
  get soulEnchanted(): boolean {
    return this.data.soulSlot !== undefined;
  }

  /**
   * 소울
   */
  get soul(): ReadonlySoulData | undefined {
    if (!this.data.soulSlot?.soul) {
      return undefined;
    }
    return {
      ...this.data.soulSlot.soul,
      option: toGearOption(this.data.soulSlot.soul.option),
    };
  }

  /**
   * 소울 충전량
   */
  get soulCharge(): number {
    return this.data.soulSlot?.charge ?? 0;
  }

  /**
   * 소울 충전 옵션
   */
  get soulChargeOption(): Readonly<SoulChargeOption> {
    return toGearOption(this.data.soulSlot?.chargeOption ?? {});
  }

  /**
   * 잠재능력 등급
   */
  get potentialGrade(): PotentialGrade {
    return this.data.potentialGrade ?? PotentialGrade.Normal;
  }

  /**
   * 잠재능력 목록
   */
  get potentials(): readonly ReadonlyPotential[] {
    if (!this.data.potentials) {
      return [];
    }
    return this.data.potentials.map((potential) => ({
      ...potential,
      option: toGearOption(potential.option),
    }));
  }

  /**
   * 에디셔널 잠재능력 등급
   */
  get additionalPotentialGrade(): PotentialGrade {
    return this.data.additionalPotentialGrade ?? PotentialGrade.Normal;
  }

  /**
   * 에디셔널 잠재능력 목록
   */
  get additionalPotentials(): readonly Readonly<ReadonlyPotential>[] {
    if (!this.data.additionalPotentials) {
      return [];
    }
    return this.data.additionalPotentials.map((potential) => ({
      ...potential,
      option: toGearOption(potential.option),
    }));
  }

  /**
   * 장비 익셉셔널 옵션
   */
  get exceptionalOption(): Readonly<GearExceptionalOption> {
    return toGearOption(this.data.exceptionalOption ?? {});
  }

  /**
   * 익셉셔널 강화 횟수
   */
  get exceptionalUpgradeCount(): number {
    return this.data.exceptionalUpgradeCount ?? 0;
  }

  /**
   * 익셉셔널 강화 가능 횟수
   */
  get exceptionalUpgradeableCount(): number {
    return this.data.exceptionalUpgradeableCount ?? 0;
  }

  /**
   * 전체 익셉셔널 강화 가능 횟수
   */
  get exceptionalTotalUpgradeableCount(): number {
    return this.exceptionalUpgradeCount + this.exceptionalUpgradeableCount;
  }
}
