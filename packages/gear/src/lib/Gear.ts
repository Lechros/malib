import {
  AddOptionData,
  AddOptionGrade,
  AddOptionType,
  GearAddOption,
  GearBaseOption,
  GearData,
  GearExceptionalOption,
  GearMetadata,
  GearShapeData,
  GearStarforceOption,
  GearType,
  GearUpgradeOption,
  PotentialData,
  PotentialGrade,
  ReadonlySoulData,
  SoulChargeOption,
  SoulData,
} from './data';
import {
  applyAddOption,
  canResetAddOption,
  resetAddOption,
  supportsAddOption,
} from './enhance/addOption';
import {
  applyExceptional,
  canApplyExceptional,
  canResetExceptional,
  ExceptionalHammer,
  resetExceptional,
  supportsExceptional,
} from './enhance/exceptional';
import {
  canSetAdditionalPotential,
  canSetPotential,
  ReadonlyPotential,
  resetAdditionalPotential,
  resetPotential,
  setAdditionalPotential,
  setPotential,
  supportsAdditionalPotential,
  supportsPotential,
} from './enhance/potential';
import {
  applySpellTrace,
  SpellTraceRate,
  SpellTraceType,
} from './enhance/spellTrace';
import {
  canResetStarforce,
  canStarforce,
  canStarScroll,
  getMaxStar,
  resetStarforce,
  starforce,
  starScroll,
  supportsStarforce,
} from './enhance/starforce';
import {
  applyScroll,
  canApplyScroll,
  canFailScroll,
  canResetUpgrade,
  canResileScroll,
  failScroll,
  resetUpgrade,
  resileScroll,
  Scroll,
  supportsUpgrade,
} from './enhance/upgrade';
import { GearAttribute } from './GearAttribute';
import { toGearOption } from './gearOption';
import { GearReq } from './GearReq';
import {
  applySoulEnchant,
  canApplySoulEnchant,
  canSetSoul,
  canSetSoulCharge,
  resetSoulEnchant,
  setSoul,
  setSoulCharge,
  supportsSoul,
} from './soulSlot';
import { sumOptions } from './utils';

type _Gear = Omit<
  GearData,
  'potentials' | 'additionalPotentials' | 'addOptions'
> & {
  addOptions: readonly Readonly<AddOptionData>[];
  potentials: readonly ReadonlyPotential[];
  additionalPotentials: readonly ReadonlyPotential[];
};

/**
 * 장비
 *
 * 장비 정보를 KMS과 동일한 방식으로 변경하는 기능을 제공합니다.
 * - `supports...`: 장비가 특정 강화 방식을 지원하는지 여부입니다.
 * - `can...`: 장비에 특정 강화를 적용할 수 있는 상태인지 여부입니다.
 * - `apply...()`: 장비에 특정 강화를 적용합니다.
 * - `set...()`: 장비의 특정 속성을 설정합니다.
 * - `reset...()`: 장비의 특정 강화에 관련된 속성을 초기화합니다.
 *
 * 생성자에 전달된 장비 정보와 `data` 속성 간에 엄격한 동등(`===`)을 보장합니다.
 *
 * 장비 정보의 모든 속성에 대해 읽기 전용 속성을 제공하고, 일부 속성은 장비 객체 자체에 또는 반환 객체의 속성에 쓰기가 가능합니다.
 */
export class Gear implements _Gear {
  /** 장비 정보 */
  data: GearData;

  /**
   * 장비 정보를 참조하는 장비 인스턴스를 생성합니다.
   * @param data 장비 정보.
   */
  constructor(data: GearData) {
    this.data = data;
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

  set shape(shape: GearShapeData | undefined) {
    this.data.shape = shape;
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

  /**
   * 장비가 추가 옵션을 지원하는지 여부
   */
  get supportsAddOption(): boolean {
    return supportsAddOption(this);
  }

  /**
   * 장비에 추가 옵션을 적용할 수 있는 상태인지 여부
   */
  get canApplyAddOption(): boolean {
    return supportsAddOption(this);
  }

  /**
   * 장비에 추가 옵션을 적용합니다.
   * @param type 추가 옵션 종류.
   * @param grade 추가 옵션 단계.
   *
   * @throws {@link TypeError}
   * 추가 옵션을 적용할 수 없는 상태일 경우.
   *
   * @throws {@link TypeError}
   * 부여할 수 없는 추가 옵션을 지정했을 경우.
   */
  applyAddOption(type: AddOptionType, grade: AddOptionGrade) {
    applyAddOption(this, type, grade);
  }

  /**
   * 장비의 추가 옵션을 초기화할 수 있는 상태인지 여부
   */
  get canResetAddOption(): boolean {
    return canResetAddOption(this);
  }

  /**
   * 장비의 추가 옵션을 초기화합니다.
   *
   * @throws {@link TypeError}
   * 추가 옵션을 초기화할 수 없는 상태의 장비일 경우.
   */
  resetAddOption() {
    resetAddOption(this);
  }

  /**
   * 장비가 주문서 강화를 지원하는지 여부
   */
  get supportsUpgrade(): boolean {
    return supportsUpgrade(this);
  }

  /**
   * 장비에 주문서 실패를 적용할 수 있는 상태인지 여부
   */
  get canApplyFailScroll(): boolean {
    return canFailScroll(this);
  }

  /**
   * 장비에 주문서 실패를 1회 적용합니다.
   *
   * @throws {@link TypeError}
   * 주문서 실패를 적용할 수 없는 상태일 경우.
   */
  applyScrollFail() {
    failScroll(this);
  }

  /**
   * 장비의 주문서 실패로 차감된 업그레이드 가능 횟수를 복구할 수 있는 상태인지 여부
   */
  get canApplyResileScroll(): boolean {
    return canResileScroll(this);
  }

  /**
   * 장비의 주문서 실패로 차감된 업그레이드 가능 횟수를 1회 복구합니다.
   *
   * @throws {@link TypeError}
   * 업그레이드 가능 횟수를 복구할 수 없는 상태일 경우.
   */
  applyScrollResile() {
    resileScroll(this);
  }

  /**
   * 장비의 주문서 강화를 초기화할 수 있는 상태인지 여부
   */
  get canResetUpgrade(): boolean {
    return canResetUpgrade(this);
  }

  /**
   * 장비의 주문서 강화를 초기화합니다.
   *
   * @throws {@link TypeError}
   * 주문서 강화를 초기화할 수 없는 장비일 경우.
   */
  resetUpgrade() {
    resetUpgrade(this);
  }

  /**
   * 장비에 주문서를 적용할 수 있는 상태인지 여부
   */
  get canApplyScroll(): boolean {
    return canApplyScroll(this);
  }

  /**
   * 장비에 주문서를 1회 적용합니다.
   * @param scroll 적용할 주문서.
   *
   * @throws {@link TypeError}
   * 주문서를 적용할 수 없는 상태일 경우.
   */
  applyScroll(scroll: Scroll) {
    applyScroll(this, scroll);
  }

  /**
   * 장비에 주문의 흔적 강화를 1회 적용합니다.
   * @param type 주문의 흔적 종류.
   * @param rate 주문의 흔적 성공 확률.
   *
   * @throws {@link TypeError}
   * 주문서를 적용할 수 없는 상태일 경우.
   *
   * @throws {@link TypeError}
   * 적용할 수 없는 주문의 흔적을 지정했을 경우.
   */
  applySpellTrace(type: SpellTraceType, rate: SpellTraceRate) {
    applySpellTrace(this, type, rate);
  }

  /**
   * 장비가 스타포스 강화를 지원하는지 여부
   */
  get supportsStarforce(): boolean {
    return supportsStarforce(this);
  }

  /**
   * 장비에 스타포스 강화를 적용할 수 있는 상태인지 여부
   */
  get canApplyStarforce(): boolean {
    return canStarforce(this);
  }

  /**
   * 장비에 스타포스 강화를 1회 적용합니다.
   *
   * @throws {@link TypeError}
   * 스타포스 강화를 적용할 수 없는 경우.
   */
  applyStarforce() {
    starforce(this);
  }

  /**
   * 장비에 최대 강화 단계를 무시하고 스타포스 강화를 적용할 수 있는 상태인지 여부
   */
  get canApplyStarforceIgnoringMaxStar(): boolean {
    return canStarforce(this, true);
  }

  /**
   * 장비에 최대 강화 단계를 무시하고 스타포스 강화를 1회 적용합니다.
   *
   * @throws {@link TypeError}
   * 스타포스 강화를 적용할 수 없는 경우.
   */
  applyStarforceIgnoringMaxStar() {
    starforce(this, true);
  }

  /**
   * 장비에 놀라운 장비 강화 주문서를 적용할 수 있는 상태인지 여부
   */
  get canApplyStarScroll(): boolean {
    return canStarScroll(this);
  }

  /**
   * 장비에 놀라운 장비 강화 주문서를 1회 적용합니다.
   * @param bonus 보너스 스탯 적용 여부.
   *
   * @throws {@link TypeError}
   * 놀라운 장비 강화 주문서를 적용할 수 없는 경우.
   */
  applyStarScroll(bonus = false) {
    starScroll(this, bonus);
  }

  /**
   * 장비에 놀라운 장비 강화 주문서를 적용할 수 있는 상태인지 여부
   */
  get canApplyStarScrollIgnoringMaxStar(): boolean {
    return canStarScroll(this, true);
  }

  /**
   * 장비에 놀라운 장비 강화 주문서를 1회 적용합니다.
   * @param bonus 보너스 스탯 적용 여부.
   *
   * @throws {@link TypeError}
   * 놀라운 장비 강화 주문서를 적용할 수 없는 경우.
   */
  applyStarScrollIgnoringMaxStar(bonus = false) {
    starScroll(this, bonus, true);
  }

  /**
   * 장비의 스타포스 강화를 초기화할 수 있는지 여부
   */
  get canResetStarforce(): boolean {
    return canResetStarforce(this);
  }

  /**
   * 장비의 스타포스 강화를 초기화합니다.
   */
  resetStarforce() {
    resetStarforce(this);
  }

  /**
   * 장비가 잠재능력을 지원하는지 여부
   */
  get supportsPotential(): boolean {
    return supportsPotential(this);
  }

  /**
   * 장비의 잠재능력을 설정할 수 있는지 여부
   */
  get canSetPotential(): boolean {
    return canSetPotential(this);
  }

  /**
   * 장비의 잠재능력을 설정합니다.
   *
   * `grade`는 `PotentialGrade.Normal`일 수 없습니다.
   *
   * `options`에 포함된 잠재옵션은 1개 이상 3개 이하여야 합니다.
   * @param grade 잠재능력 등급.
   * @param options 잠재옵션 목록.
   *
   * @throws {@link TypeError}
   * 잠재능력을 설정할 수 없는 경우.
   *
   * @throws {@link TypeError}
   * 설정하려는 잠재능력 등급이 Normal일 경우.
   *
   * @throws {@link TypeError}
   * 잘못된 잠재옵션 목록을 지정했을 경우.
   */
  setPotential(grade: PotentialGrade, options: PotentialData[]) {
    setPotential(this, grade, options);
  }

  /**
   * 장비의 잠재능력을 초기화합니다.
   *
   * 에디셔널 잠재능력은 변경되지 않습니다.
   *
   * @throws {@link TypeError}
   * 잠재능력을 초기화할 수 없는 경우.
   */
  resetPotential() {
    resetPotential(this);
  }

  /**
   * 장비가 에디셔널 잠재능력을 지원하는지 여부
   */
  get supportsAdditionalPotential(): boolean {
    return supportsAdditionalPotential(this);
  }

  /**
   * 장비의 에디셔널 잠재능력을 설정할 수 있는지 여부
   */
  get canSetAdditionalPotential(): boolean {
    return canSetAdditionalPotential(this);
  }

  /**
   * 장비의 에디셔널 잠재능력을 설정합니다.
   *
   * `grade`는 `PotentialGrade.Normal`일 수 없습니다.
   *
   * `options`에 포함된 에디셔널 잠재옵션은 1개 이상 3개 이하여야 합니다.
   * @param grade 에디셔널 잠재능력 등급.
   * @param options 에디셔널 잠재옵션 목록.
   *
   * @throws {@link TypeError}
   * 에디셔널 잠재능력을 설정할 수 없는 경우.
   *
   * @throws {@link TypeError}
   * 설정하려는 에디셔널 잠재능력 등급이 Normal일 경우.
   *
   * @throws {@link TypeError}
   * 잘못된 에디셔널 잠재옵션 목록을 지정했을 경우.
   */
  setAdditionalPotential(grade: PotentialGrade, options: PotentialData[]) {
    setAdditionalPotential(this, grade, options);
  }

  /**
   * 장비의 에디셔널 잠재능력을 초기화합니다.
   *
   * @throws {@link TypeError}
   * 에디셔널 잠재능력을 초기화할 수 없는 경우.
   */
  resetAdditionalPotential() {
    resetAdditionalPotential(this);
  }

  /**
   * 장비가 소울웨폰을 지원하는지 여부
   */
  get supportsSoul(): boolean {
    return supportsSoul(this);
  }

  /**
   * 장비에 소울 인챈터를 적용할 수 있는 상태인지 여부
   */
  get canApplySoulEnchant(): boolean {
    return canApplySoulEnchant(this);
  }

  /**
   * 장비에 소울 인챈터를 적용합니다.
   */
  applySoulEnchant() {
    applySoulEnchant(this);
  }

  /**
   * 장비에 소울을 장착할 수 있는지 여부
   */
  get canSetSoul(): boolean {
    return canSetSoul(this);
  }

  /**
   * 장비에 소울을 장착합니다.
   * @param soul 장착할 소울 아이템.
   *
   * @throws {@link TypeError}
   * 소울을 장착할 수 없는 경우.
   */
  setSoul(soul: SoulData) {
    setSoul(this, soul);
  }

  /**
   * 장비의 소울 충전량을 설정할 수 있는지 여부
   */
  get canSetSoulCharge(): boolean {
    return canSetSoulCharge(this);
  }

  /**
   * 장비의 소울 충전량을 설정합니다.
   * @param charge 소울 충전량.
   *
   * @throws {@link TypeError}
   * 소울 충전량을 설정할 수 없는 경우.
   */
  setSoulCharge(charge: number) {
    setSoulCharge(this, charge);
  }

  /**
   * 장비의 소울웨폰을 초기화합니다.
   */
  resetSoulEnchant() {
    resetSoulEnchant(this);
  }

  /**
   * 장비가 익셉셔널 강화를 지원하는지 여부
   */
  get supportsExceptional(): boolean {
    return supportsExceptional(this);
  }

  /**
   * 장비에 익셉셔널 강화를 적용할 수 있는지 여부
   */
  get canApplyExceptional(): boolean {
    return canApplyExceptional(this);
  }

  /**
   * 장비에 익셉셔널 강화를 적용합니다.
   * @param exceptionalHammer 적용할 익셉셔널 해머.
   *
   * @throws {@link TypeError}
   * 익셉셔널 강화를 적용할 수 없는 상태일 경우.
   */
  applyExceptional(exceptionalHammer: ExceptionalHammer) {
    applyExceptional(this, exceptionalHammer);
  }

  /**
   * 장비의 익셉셔널 강화를 초기화할 수 있는지 여부
   */
  get canResetExceptional(): boolean {
    return canResetExceptional(this);
  }

  /**
   * 장비의 익셉셔널 강화를 초기화합니다.
   *
   * @throws {@link TypeError}
   * 익셉셔널 강화를 초기화할 수 없는 경우.
   */
  resetExceptional() {
    resetExceptional(this);
  }
}
