import { GearData, GearGender, PotentialData, ReadonlyGear } from '@malib/gear';
import { resolveAddOptions } from './addOption';
import { decode } from './codec';
import { ItemEquipmentInfo } from './data/ItemEquipment';
import { OpenApiFormatError, OpenApiValueError } from './exception';
import { resolveGearOption } from './option';
import { getGearType } from './part';
import { PotentialOptionResolver, resolvePotentialGrade } from './potential';

/**
 * Open API 장비 정보를 {@link GearData}로 변환합니다.
 * API에서 제공되지 않는 정보는 포함되지 않으므로 별도로 설정해야 합니다.
 *
 * @param data Open API 장비 정보.
 * @param jobName Open API 직업 이름.
 * @returns 장비 정보.
 *
 * @throws {@link OpenApiFormatError}
 * API 응답 형식이 지원하지 않는 형식일 경우.
 *
 * @throws {@link OpenApiValueError}
 * API 응답 값이 지원되지 않는 값일 경우.
 */
export function convert(data: ItemEquipmentInfo, jobName: string): GearData {
  const id = resolveId(data.item_icon);
  const gearType = getGearType(data.item_equipment_part, jobName);
  const gearData: GearData = {
    version: 2,
    id,
    type: gearType,
    name: data.item_name,
    icon: id.toString(),
    desc: data.item_description ?? undefined,
    ...(data.item_icon !== data.item_shape_icon && {
      shape: {
        name: data.item_shape_name,
        icon: resolveId(data.item_shape_icon).toString(),
      },
    }),
    req: {
      level: zeroToUndefined(data.item_base_option.base_equipment_level),
      levelIncrease: zeroToUndefined(data.equipment_level_increase),
      gender: resolveGender(data.item_gender),
    },
    attributes: {},
    baseOption: resolveGearOption(data.item_base_option),
    addOption: resolveGearOption(data.item_add_option),
    upgradeOption: resolveGearOption(data.item_total_option),
    starforceOption: resolveGearOption(data.item_starforce_option),
    exceptionalOption: resolveGearOption(data.item_exceptional_option),
    scrollUpgradeCount: zeroToUndefined(
      Number.parseInt(data.scroll_upgrade, 10),
    ),
    scrollResilienceCount: zeroToUndefined(
      Number.parseInt(data.scroll_resilience_count, 10),
    ),
    scrollUpgradeableCount: zeroToUndefined(
      Number.parseInt(data.scroll_upgradeable_count, 10),
    ),
    star: zeroToUndefined(Number.parseInt(data.starforce, 10)),
    starScroll: falseToUndefined(
      Number.parseInt(data.starforce_scroll_flag, 10) === 1,
    ),
    potentialGrade: resolvePotentialGrade(data.potential_option_grade),
    additionalPotentialGrade: resolvePotentialGrade(
      data.additional_potential_option_grade,
    ),
    exceptionalUpgradeCount: zeroToUndefined(
      data.item_exceptional_option.exceptional_upgrade,
    ),
  };
  const gear = new ReadonlyGear(gearData);
  gearData.addOptions = resolveAddOptions(gear);
  const potResolver = new PotentialOptionResolver(
    gear.req.level + gear.req.levelIncrease,
    gear.type,
  );
  gearData.potentials = [
    potResolver.resolvePotentialOption(data.potential_option_1),
    potResolver.resolvePotentialOption(data.potential_option_2),
    potResolver.resolvePotentialOption(data.potential_option_3),
  ].filter((pot): pot is PotentialData => pot !== null);
  gearData.additionalPotentials = [
    potResolver.resolveAdditionalPotentialOption(
      data.additional_potential_option_1,
    ),
    potResolver.resolveAdditionalPotentialOption(
      data.additional_potential_option_2,
    ),
    potResolver.resolveAdditionalPotentialOption(
      data.additional_potential_option_3,
    ),
  ].filter((pot): pot is PotentialData => pot !== null);
  return excludeUndefinedDeep(gearData);
}

/**
 * 아이콘 URL을 아이템 ID로 변환합니다.
 * @param iconUrl 아이콘 URL.
 * @returns 아이템 ID.
 *
 * @throws {@link OpenApiFormatError}
 * 아이콘 URL이 지원하지 않는 형식일 경우.
 */
function resolveId(iconUrl: string): number {
  const baseUrl = 'https://open.api.nexon.com/static/maplestory/item/icon/';
  if (!iconUrl.startsWith(baseUrl)) {
    throw new OpenApiFormatError(`Unsupported icon URL: ${iconUrl}`);
  }
  const id = iconUrl.split('/').pop();
  if (!id) {
    throw new OpenApiFormatError(`Unsupported icon URL: ${iconUrl}`);
  }
  return decode(id);
}

/**
 * 성별 이름을 착용 가능 성별로 변환합니다.
 * @param genderName 성별 이름.
 * @returns 착용 가능 성별.
 *
 * @throws {@link OpenApiValueError}
 * 성별 이름이 지원하지 않는 값일 경우.
 */
function resolveGender(genderName: string | null): GearGender | undefined {
  if (genderName === '남') {
    return GearGender.Male;
  } else if (genderName === '여') {
    return GearGender.Female;
  } else if (genderName === null) {
    return undefined;
  } else {
    throw new OpenApiValueError(`Unknown gender name: ${genderName}`);
  }
}

function zeroToUndefined(value: number): number | undefined {
  return value === 0 ? undefined : value;
}

function falseToUndefined(value: boolean): boolean | undefined {
  return !value ? undefined : value;
}

function excludeUndefinedDeep<T>(obj: T): T {
  // Array
  if (Array.isArray(obj)) {
    return obj.map(excludeUndefinedDeep) as T;
  }
  // Object
  if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => [key, excludeUndefinedDeep(value)]),
    ) as T;
  }
  // Primitive
  return obj;
}
