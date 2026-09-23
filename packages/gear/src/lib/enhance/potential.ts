import {
  GearCapability,
  PotentialData,
  PotentialGrade,
  PotentialOption,
} from '../data';
import { ErrorCode, GearError } from '../error';
import { Gear } from '../Gear';
import { ReadonlyGear } from '../ReadonlyGear';

/**
 * 잠재옵션 (읽기 전용)
 */
export interface ReadonlyPotential extends Readonly<PotentialData> {
  /** 잠재능력 옵션 */
  option: Readonly<PotentialOption>;
}

/**
 * 장비가 잠재능력을 지원하는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 지원할 경우 `true`; 아닐 경우 `false`.
 */
export function supportsPotential(gear: ReadonlyGear): boolean {
  return gear.attributes.canPotential === GearCapability.Can;
}

/**
 * 장비의 잠재능력을 설정할 수 있는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 설정할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canSetPotential(gear: ReadonlyGear): boolean {
  return checkSetPotential(gear) === undefined;
}

function checkSetPotential(
  gear: ReadonlyGear,
  grade?: PotentialGrade,
  options?: PotentialData[],
) {
  if (gear.attributes.canPotential === GearCapability.Fixed)
    return ErrorCode.Potential_Set_Fixed;
  if (!supportsPotential(gear)) return ErrorCode.Potential_Set_NotSupported;
  if (grade === PotentialGrade.Normal)
    return ErrorCode.Potential_Set_NormalGradeNotAllowed;
  if (options && (options.length < 1 || options.length > 3))
    return ErrorCode.Potential_Set_OptionCountOutOfRange;
  return undefined;
}

function checkResetPotential(gear: ReadonlyGear) {
  if (!supportsPotential(gear)) return ErrorCode.Potential_Reset_NotSupported;
  return undefined;
}

/**
 * 장비의 잠재능력을 설정합니다.
 * @param gear 설정할 장비.
 * @param grade 잠재능력 등급.
 * @param options 잠재옵션 목록.
 *
 * @throws {@link GearError}
 * 잠재능력을 설정할 수 없는 장비일 경우.
 *
 * @throws {@link GearError}
 * 설정하려는 잠재능력 등급이 Normal일 경우.
 *
 * @throws {@link GearError}
 * 잘못된 잠재옵션 목록을 지정했을 경우.
 */
export function setPotential(
  gear: Gear,
  grade: PotentialGrade,
  options: PotentialData[],
) {
  const code = checkSetPotential(gear, grade, options);
  if (code !== undefined) {
    throw new GearError(code, {
      gear,
      grade,
      'options.length': options.length,
    });
  }
  gear.data.potentialGrade = grade;
  gear.data.potentials = options;
}

/**
 * 장비의 잠재능력을 초기화합니다.
 *
 * 에디셔널 잠재능력은 변경되지 않습니다.
 * @param gear 초기화할 장비.
 *
 * @throws {@link GearError}
 * 잠재능력을 초기화할 수 없는 장비일 경우.
 */
export function resetPotential(gear: Gear) {
  const code = checkResetPotential(gear);
  if (code !== undefined) {
    throw new GearError(code, { gear });
  }
  gear.data.potentialGrade = PotentialGrade.Normal;
  gear.data.potentials = undefined;
}

/**
 * 장비가 에디셔널 잠재능력을 지원하는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 지원할 경우 `true`; 아닐 경우 `false`.
 */
export function supportsAdditionalPotential(gear: ReadonlyGear): boolean {
  return gear.attributes.canAdditionalPotential === GearCapability.Can;
}

/**
 * 장비의 에디셔널 잠재능력을 설정할 수 있는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 설정할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canSetAdditionalPotential(gear: ReadonlyGear): boolean {
  return checkSetAdditionalPotential(gear) === undefined;
}

function checkSetAdditionalPotential(
  gear: ReadonlyGear,
  grade?: PotentialGrade,
  options?: PotentialData[],
) {
  if (gear.attributes.canAdditionalPotential === GearCapability.Fixed)
    return ErrorCode.AdditionalPotential_Set_Fixed;
  if (!supportsAdditionalPotential(gear))
    return ErrorCode.AdditionalPotential_Set_NotSupported;
  if (grade === PotentialGrade.Normal)
    return ErrorCode.AdditionalPotential_Set_NormalGradeNotAllowed;
  if (options && (options.length < 1 || options.length > 3))
    return ErrorCode.AdditionalPotential_Set_OptionCountOutOfRange;
  return undefined;
}

function checkResetAdditionalPotential(gear: ReadonlyGear) {
  if (!supportsAdditionalPotential(gear))
    return ErrorCode.AdditionalPotential_Reset_NotSupported;
  return undefined;
}

/**
 * 장비의 에디셔널 잠재능력을 설정합니다.
 * @param gear 설정할 장비.
 * @param grade 에디셔널 잠재능력 등급.
 * @param options 에디셔널 잠재옵션 목록.
 *
 * @throws {@link GearError}
 * 에디셔널 잠재능력을 설정할 수 없는 장비일 경우.
 *
 * @throws {@link GearError}
 * 설정하려는 에디셔널 잠재능력 등급이 Normal일 경우.
 *
 * @throws {@link GearError}
 * 잘못된 에디셔널 잠재옵션 목록을 지정했을 경우.
 */
export function setAdditionalPotential(
  gear: Gear,
  grade: PotentialGrade,
  options: PotentialData[],
) {
  const code = checkSetAdditionalPotential(gear, grade, options);
  if (code !== undefined) {
    throw new GearError(code, {
      gear,
      grade,
      'options.length': options.length,
    });
  }
  gear.data.additionalPotentialGrade = grade;
  gear.data.additionalPotentials = options;
}

/**
 * 장비의 에디셔널 잠재능력을 초기화합니다.
 * @param gear 초기화할 장비.
 *
 * @throws {@link GearError}
 * 에디셔널 잠재능력을 초기화할 수 없는 장비일 경우.
 */
export function resetAdditionalPotential(gear: Gear) {
  const code = checkResetAdditionalPotential(gear);
  if (code !== undefined) {
    throw new GearError(code, { gear });
  }
  gear.data.additionalPotentialGrade = PotentialGrade.Normal;
  gear.data.additionalPotentials = undefined;
}
