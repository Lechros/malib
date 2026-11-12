import { GearGrowthOption, ReadonlyGearGrowthLevelData } from '../data';
import { ErrorCode, GearError } from '../error';
import { Gear } from '../Gear';
import { addOptions } from '../gearOption';
import { ReadonlyGear } from '../ReadonlyGear';

/**
 * 장비가 성장을 지원하는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 지원할 경우 `true`; 아닐 경우 `false`.
 */
export function supportsGrowth(gear: ReadonlyGear): boolean {
  return gear.growth !== undefined;
}

/**
 * 장비의 성장 단계 정보를 조회합니다.
 * @param gear 조회할 장비.
 * @param level 조회할 성장 레벨. 생략할 경우 현재 성장 레벨.
 * @returns 해당 단계의 성장 정보. 단계가 없을 경우 `undefined`.
 */
export function getGrowthLevelData(
  gear: ReadonlyGear,
  level = gear.attributes.growthLevel,
): ReadonlyGearGrowthLevelData | undefined {
  if (level === undefined) {
    return undefined;
  }
  return gear.growth?.levels[level];
}

/**
 * 장비에 성장을 적용할 수 있는 상태인지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 적용할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canApplyGrowth(gear: ReadonlyGear): boolean {
  return checkApplyGrowth(gear) === undefined;
}

function checkApplyGrowth(
  gear: ReadonlyGear,
  option?: Partial<GearGrowthOption>,
) {
  if (!supportsGrowth(gear)) return ErrorCode.Growth_Apply_NotSupported;
  if (gear.growthMax) return ErrorCode.Growth_Apply_MaxLevelReached;
  const level = gear.attributes.growthLevel;
  const data = getGrowthLevelData(gear);
  if (level === undefined || data === undefined)
    return ErrorCode.Growth_Apply_LevelNotFound;
  if (option) {
    const ranges = data.option ?? {};
    const keys = new Set([...Object.keys(ranges), ...Object.keys(option)]);
    for (const key of keys) {
      const type = key as keyof GearGrowthOption;
      const [min, max] = ranges[type] ?? [0, 0];
      const value = option[type] ?? 0;
      if (!Number.isInteger(value) || value < min || value > max)
        return ErrorCode.Growth_Apply_OptionOutOfRange;
    }
  }
  return undefined;
}

/**
 * 장비에 성장을 1회 적용합니다.
 *
 * 성장 경험치가 0%으로 설정되고 성장 레벨이 1 증가합니다.
 *
 * 현재 단계의 성장 옵션 범위 내의 증가량을 지정해야 합니다.
 * @param gear 적용할 장비.
 * @param option 적용할 성장 옵션 증가량.
 *
 * @throws {@link GearError}
 * 성장을 적용할 수 없는 상태이거나 증가량이 성장 범위를 벗어난 경우.
 */
export function applyGrowth(gear: Gear, option: Partial<GearGrowthOption>) {
  const code = checkApplyGrowth(gear, option);
  if (code !== undefined) {
    throw new GearError(code, { gear });
  }
  gear.data.growthOption ??= {};
  addOptions(gear.data.growthOption, option);
  gear.attributes.growthLevel = gear.attributes.growthLevel! + 1;
  gear.attributes.growthExp = 0;
}

/**
 * 장비의 성장을 초기화할 수 있는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 초기화할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canResetGrowth(gear: ReadonlyGear): boolean {
  return checkResetGrowth(gear) === undefined;
}

function checkResetGrowth(gear: ReadonlyGear) {
  if (!supportsGrowth(gear)) return ErrorCode.Growth_Reset_NotSupported;
  return undefined;
}

/**
 * 장비의 성장을 초기화합니다.
 *
 * @param gear 초기화할 장비.
 *
 * @throws {@link GearError}
 * 성장을 초기화할 수 없는 장비일 경우.
 */
export function resetGrowth(gear: Gear) {
  const code = checkResetGrowth(gear);
  if (code !== undefined) {
    throw new GearError(code, { gear });
  }
  gear.data.growthOption = undefined;
  gear.attributes.growthLevel = 1;
  gear.attributes.growthExp = 0;
}
