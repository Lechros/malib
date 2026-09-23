import {
  AddOptionGrade,
  AddOptionType,
  GearData,
  GearShapeData,
  PotentialData,
  PotentialGrade,
  SoulData,
} from './data';
import {
  applyAddOption,
  canApplyAddOption,
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
  resetAdditionalPotential,
  resetPotential,
  setAdditionalPotential,
  setPotential,
  supportsAdditionalPotential,
  supportsPotential,
} from './enhance/potential';
import {
  amplifySoul,
  canAmplifySoul,
  canSetSoulPotential,
  setSoulPotential,
  applySoulEnchant,
  canApplySoulEnchant,
  canSetSoul,
  resetSoulEnchant,
  setSoul,
  supportsSoul,
} from './enhance/soulWeapon';
import {
  applySpellTrace,
  SpellTraceRate,
  SpellTraceType,
} from './enhance/spellTrace';
import {
  canRecalculateStarforce,
  canResetStarforce,
  canStarforce,
  canStarScroll,
  recalculateStarforce,
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
import { ErrorCode, GearError } from './error';
import { ReadonlyGear } from './ReadonlyGear';

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
 * 장비 정보의 모든 속성에 대해 읽기 전용 속성을 제공합니다.
 * 일부 속성은 장비 객체 자체에 또는 반환 객체의 속성에 쓰기가 가능합니다.
 */
export class Gear extends ReadonlyGear {
  /**
   * 장비 정보
   */
  override get data(): GearData {
    return this._data;
  }

  /**
   * 장비 외형
   */
  override get shape(): Readonly<GearShapeData> | undefined {
    return this.data.shape;
  }

  /**
   * 장비 외형 변경
   *
   * @param shape 변경할 장비 외형.
   *
   * @throws {@link GearError}
   * 외형을 변경할 수 없는 장비일 경우.
   */
  override set shape(shape: GearShapeData | undefined) {
    if (this.attributes.noShapeChange) {
      throw new GearError(ErrorCode.Shape_Set_ChangeNotAllowed, { gear: this });
    }

    this.data.shape = shape;
  }

  /**
   * 이름 새기기
   */
  override get itemTag(): string | undefined {
    return this.data.itemTag;
  }

  /**
   * 이름 새기기 변경
   *
   * @param itemTag 적용할 이름.
   */
  override set itemTag(itemTag: string | undefined) {
    this.data.itemTag = itemTag;
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
    return canApplyAddOption(this);
  }

  /**
   * 장비에 추가 옵션을 적용합니다.
   * @param type 추가 옵션 종류.
   * @param grade 추가 옵션 단계.
   *
   * @throws {@link GearError}
   * 추가 옵션을 적용할 수 없는 상태일 경우.
   *
   * @throws {@link GearError}
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
   * @throws {@link GearError}
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
  get canApplyScrollFail(): boolean {
    return canFailScroll(this);
  }

  /**
   * 장비에 주문서 실패를 1회 적용합니다.
   *
   * @throws {@link GearError}
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
   * @throws {@link GearError}
   * 업그레이드 가능 횟수를 복구할 수 없는 상태일 경우.
   */
  applyResileScroll() {
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
   * @throws {@link GearError}
   * 주문서 강화를 초기화할 수 없는 장비일 경우.
   */
  resetUpgrade() {
    resetUpgrade(this);
    if (canRecalculateStarforce(this)) {
      recalculateStarforce(this);
    }
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
   * @throws {@link GearError}
   * 주문서를 적용할 수 없는 상태일 경우.
   */
  applyScroll(scroll: Scroll) {
    applyScroll(this, scroll);
    if (canRecalculateStarforce(this)) {
      recalculateStarforce(this);
    }
  }

  /**
   * 장비에 주문의 흔적 강화를 1회 적용합니다.
   * @param type 주문의 흔적 종류.
   * @param rate 주문의 흔적 성공 확률.
   *
   * @throws {@link GearError}
   * 주문서를 적용할 수 없는 상태일 경우.
   *
   * @throws {@link GearError}
   * 적용할 수 없는 주문의 흔적을 지정했을 경우.
   */
  applySpellTrace(type: SpellTraceType, rate: SpellTraceRate) {
    applySpellTrace(this, type, rate);
    if (canRecalculateStarforce(this)) {
      recalculateStarforce(this);
    }
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
   * @throws {@link GearError}
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
   * @throws {@link GearError}
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
   * @throws {@link GearError}
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
   * @throws {@link GearError}
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
   * @throws {@link GearError}
   * 잠재능력을 지원하지 않는 경우.
   *
   * @throws {@link GearError}
   * 설정하려는 잠재능력 등급이 Normal일 경우.
   *
   * @throws {@link GearError}
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
   * @throws {@link GearError}
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
   * @throws {@link GearError}
   * 에디셔널 잠재능력을 지원하지 않는 경우.
   *
   * @throws {@link GearError}
   * 설정하려는 에디셔널 잠재능력 등급이 Normal일 경우.
   *
   * @throws {@link GearError}
   * 잘못된 에디셔널 잠재옵션 목록을 지정했을 경우.
   */
  setAdditionalPotential(grade: PotentialGrade, options: PotentialData[]) {
    setAdditionalPotential(this, grade, options);
  }

  /**
   * 장비의 에디셔널 잠재능력을 초기화합니다.
   *
   * @throws {@link GearError}
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
   * 장비를 소울웨폰으로 변환할 수 있는 상태인지 여부
   */
  get canApplySoulEnchant(): boolean {
    return canApplySoulEnchant(this);
  }

  /**
   * 장비를 소울웨폰으로 변환합니다.
   */
  applySoulEnchant() {
    applySoulEnchant(this);
  }

  /**
   * 장비에 해당 소울을 장착할 수 있는지 여부를 반환합니다.
   * @param soul 확인할 소울 아이템.
   */
  canSetSoul(soul: SoulData): boolean {
    return canSetSoul(this, soul);
  }

  /**
   * 장비에 일반 소울을 장착할 수 있는지 여부
   */
  get canSetNormalSoul(): boolean {
    return canSetSoul(this, { name: '', option: {} });
  }

  /**
   * 장비에 위대한 소울을 장착할 수 있는지 여부
   */
  get canSetMagnificentSoul(): boolean {
    return canSetSoul(this, { name: '', option: {}, magnificent: true });
  }

  /**
   * 장비에 소울을 장착합니다.
   * @param soul 장착할 소울 아이템.
   *
   * @throws {@link GearError}
   * 소울을 장착할 수 없는 경우.
   */
  setSoul(soul: SoulData) {
    setSoul(this, soul);
  }

  /**
   * 장비에 소울 증폭을 진행할 수 있는지 여부
   */
  get canAmplifySoul(): boolean {
    return canAmplifySoul(this);
  }

  /**
   * 장비에 소울 증폭을 진행합니다.
   *
   * @throws {@link GearError}
   * 소울 증폭을 진행할 수 없는 경우.
   */
  amplifySoul() {
    amplifySoul(this);
  }

  /**
   * 장비에 소울 잠재능력을 설정할 수 있는지 여부
   */
  get canSetSoulPotential(): boolean {
    return canSetSoulPotential(this);
  }

  /**
   * 장비에 소울 잠재능력을 설정합니다.
   * @param grade 설정할 소울 잠재능력 등급.
   * @param options 설정할 소울 잠재능력 옵션.
   *
   * @throws {@link GearError}
   * 소울 잠재능력을 설정할 수 없는 경우.
   *
   * @throws {@link GearError}
   * 설정할 소울 잠재능력 등급이 Normal인 경우.
   *
   * @throws {@link GearError}
   * 잘못된 소울 잠재옵션 목록을 지정했을 경우.
   */
  setSoulPotential(grade: PotentialGrade, options: PotentialData[]) {
    setSoulPotential(this, grade, options);
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
   * @throws {@link GearError}
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
   * @throws {@link GearError}
   * 익셉셔널 강화를 초기화할 수 없는 경우.
   */
  resetExceptional() {
    resetExceptional(this);
  }
}
