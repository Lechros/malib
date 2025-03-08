import {
  GearType,
  PotentialCan,
  PotentialData,
  PotentialGrade,
  PotentialOption,
} from '../data';
import { ErrorMessage } from '../errors';
import { Gear } from '../Gear';
import { isDragonGear, isMechanicGear, isSubWeapon } from '../gearType';

/**
 * 잠재옵션 (읽기 전용)
 */
export interface ReadonlyPotential extends Readonly<PotentialData> {
  /** 장비에 표시되는 이름 */
  summary: string;
  /** 잠재능력 옵션 */
  option: Readonly<PotentialOption>;
}

/**
 * 장비가 잠재능력을 지원하는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 지원할 경우 `true`; 아닐 경우 `false`.
 */
export function supportsPotential(gear: Gear): boolean {
  return (
    _determineCanPotential(gear.attributes.canPotential, gear) !==
    PotentialCan.Cannot
  );
}

/**
 * 장비의 잠재능력을 설정할 수 있는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 설정할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canSetPotential(gear: Gear): boolean {
  return (
    _determineCanPotential(gear.attributes.canPotential, gear) ===
    PotentialCan.Can
  );
}

/**
 * 장비의 잠재능력을 설정합니다.
 * @param gear 설정할 장비.
 * @param grade 잠재능력 등급.
 * @param options 잠재옵션 목록.
 *
 * @throws {@link TypeError}
 * 잠재능력을 설정할 수 없는 장비일 경우.
 *
 * @throws {@link TypeError}
 * 설정하려는 잠재능력 등급이 Normal일 경우.
 *
 * @throws {@link TypeError}
 * 잘못된 잠재옵션 목록을 지정했을 경우.
 */
export function setPotential(
  gear: Gear,
  grade: PotentialGrade,
  options: PotentialData[],
) {
  if (!canSetPotential(gear)) {
    throw new TypeError(ErrorMessage.Potential_InvalidPotentialGear);
  }
  if (grade === PotentialGrade.Normal) {
    throw new TypeError(ErrorMessage.Potential_InvalidPotentialGrade);
  }
  if (options.length < 1 || options.length > 3) {
    throw new TypeError(ErrorMessage.Potential_InvalidPotentialOptions);
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
 * @throws {@link TypeError}
 * 잠재능력을 초기화할 수 없는 장비일 경우.
 */
export function resetPotential(gear: Gear) {
  if (!canSetPotential(gear)) {
    throw new TypeError(ErrorMessage.Potential_InvalidPotentialGear);
  }
  gear.data.potentialGrade = PotentialGrade.Normal;
  gear.data.potentials = undefined;
}

/**
 * 장비가 에디셔널 잠재능력을 지원하는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 지원할 경우 `true`; 아닐 경우 `false`.
 */
export function supportsAdditionalPotential(gear: Gear): boolean {
  return (
    _determineCanPotential(gear.attributes.canAdditionalPotential, gear) !==
    PotentialCan.Cannot
  );
}

/**
 * 장비의 에디셔널 잠재능력을 설정할 수 있는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 설정할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canSetAdditionalPotential(gear: Gear): boolean {
  return (
    _determineCanPotential(gear.attributes.canAdditionalPotential, gear) ===
    PotentialCan.Can
  );
}

/**
 * 장비의 에디셔널 잠재능력을 설정합니다.
 * @param gear 설정할 장비.
 * @param grade 에디셔널 잠재능력 등급.
 * @param options 에디셔널 잠재옵션 목록.
 *
 * @throws {@link TypeError}
 * 에디셔널 잠재능력을 설정할 수 없는 장비일 경우.
 *
 * @throws {@link TypeError}
 * 설정하려는 에디셔널 잠재능력 등급이 Normal일 경우.
 *
 * @throws {@link TypeError}
 * 잘못된 에디셔널 잠재옵션 목록을 지정했을 경우.
 */
export function setAdditionalPotential(
  gear: Gear,
  grade: PotentialGrade,
  options: PotentialData[],
) {
  if (!canSetAdditionalPotential(gear)) {
    throw new TypeError(ErrorMessage.Potential_InvalidAdditionalPotentialGear);
  }
  if (grade === PotentialGrade.Normal) {
    throw new TypeError(ErrorMessage.Potential_InvalidAdditionalPotentialGrade);
  }
  if (options.length < 1 || options.length > 3) {
    throw new TypeError(
      ErrorMessage.Potential_InvalidAdditionalPotentialOptions,
    );
  }
  gear.data.additionalPotentialGrade = grade;
  gear.data.additionalPotentials = options;
}

/**
 * 장비의 에디셔널 잠재능력을 초기화합니다.
 * @param gear 초기화할 장비.
 *
 * @throws {@link TypeError}
 * 에디셔널 잠재능력을 초기화할 수 없는 장비일 경우.
 */
export function resetAdditionalPotential(gear: Gear) {
  if (!canSetAdditionalPotential(gear)) {
    throw new TypeError(ErrorMessage.Potential_InvalidAdditionalPotentialGear);
  }
  gear.data.additionalPotentialGrade = PotentialGrade.Normal;
  gear.data.additionalPotentials = undefined;
}

function _determineCanPotential(can: PotentialCan, gear: Gear) {
  if (can !== PotentialCan.None) {
    return can;
  }
  return _defaultCanPotential(gear);
}

function _defaultCanPotential(gear: Gear) {
  if (gear.scrollTotalUpgradeableCount > 0) {
    if (isMechanicGear(gear.type) || isDragonGear(gear.type)) {
      return PotentialCan.Cannot;
    }
    return PotentialCan.Can;
  }
  if (_isSpecialCanPotential(gear.type) || isSubWeapon(gear.type)) {
    return PotentialCan.Can;
  }
  return PotentialCan.Cannot;
}

function _isSpecialCanPotential(gearType: GearType) {
  switch (gearType) {
    case GearType.soulShield:
    case GearType.demonShield:
    case GearType.katara:
    case GearType.magicArrow:
    case GearType.card:
    case GearType.orb:
    case GearType.dragonEssence:
    case GearType.soulRing:
    case GearType.magnum:
    case GearType.emblem:
      return true;
    default:
      return false;
  }
}
