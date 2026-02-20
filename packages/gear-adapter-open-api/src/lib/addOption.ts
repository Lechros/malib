import {
  AddOptionData,
  AddOptionGrade,
  AddOptionType,
  getAddOptionValue,
  ReadonlyGear,
} from '@malib/gear';
import { OpenApiFormatError, OpenApiValueError } from './exception';

/** str, dex, int, luk 목표 수치 (sdil) */
interface SdilTarget {
  str: number;
  dex: number;
  int: number;
  luk: number;
}

const MAX_ADD_OPTIONS = 4;

const STAT_ADD_OPTION_TYPES = [
  AddOptionType.str,
  AddOptionType.dex,
  AddOptionType.int,
  AddOptionType.luk,
  AddOptionType.str_dex,
  AddOptionType.str_int,
  AddOptionType.str_luk,
  AddOptionType.dex_int,
  AddOptionType.dex_luk,
  AddOptionType.int_luk,
];

const GRADES: AddOptionGrade[] = [1, 2, 3, 4, 5, 6, 7];

/**
 * 장비 정보로부터 추가 옵션 목록을 생성합니다.
 *
 * @param gear 장비 정보.
 * @param option 추가 옵션 목록.
 * @returns 추가 옵션 목록.
 */
export function resolveAddOptions(gear: ReadonlyGear): AddOptionData[] {
  const result: AddOptionData[] = [];
  let available = MAX_ADD_OPTIONS;
  for (const [key, value] of Object.entries(gear.addOption)) {
    const type = key as AddOptionType;
    if (!STAT_ADD_OPTION_TYPES.includes(type)) {
      result.push({
        type,
        grade: getAddOptionGrade(gear, type, Number(value)),
        value: Number(value),
      });
      available--;
    }
  }
  if (available < 0) {
    throw new OpenApiValueError('Too many add options');
  }
  const solution = findAddOptionSolution(gear, gear.addOption, available);
  if (solution === null) {
    throw new OpenApiValueError('No add option solution found');
  }
  result.unshift(...solution);
  return result;
}

function getAddOptionGrade(
  gear: ReadonlyGear,
  type: AddOptionType,
  value: number,
): AddOptionGrade {
  for (const grade of GRADES) {
    if (getAddOptionValue(gear, type, grade) === value) {
      return grade;
    }
  }
  throw new OpenApiFormatError(
    `Unknown add option value: ${value} for type: ${type}`,
  );
}

/**
 * sdil 목표가 주어졌을 때, 해당 수치를 만족하는 추가옵션 조합을 찾습니다.
 * @param gear 대상 장비.
 * @param target 목표 str, dex, int, luk.
 * @returns 가능한 추가 옵션 조합, 없으면 null.
 */
export function findAddOptionSolution(
  gear: ReadonlyGear,
  target: SdilTarget,
  available: number,
): AddOptionData[] | null {
  const t = [target.str, target.dex, target.int, target.luk];

  function search(
    current: number[],
    used: AddOptionData[],
  ): AddOptionData[] | null {
    if (
      current[0] === t[0] &&
      current[1] === t[1] &&
      current[2] === t[2] &&
      current[3] === t[3]
    ) {
      return used;
    }
    if (used.length >= available) return null;
    if (
      current[0] > t[0] ||
      current[1] > t[1] ||
      current[2] > t[2] ||
      current[3] > t[3]
    ) {
      return null;
    }

    for (const type of STAT_ADD_OPTION_TYPES) {
      for (const grade of GRADES) {
        const [ds, dd, di, dl] = getContribution(gear, type, grade);
        const next = [
          current[0] + ds,
          current[1] + dd,
          current[2] + di,
          current[3] + dl,
        ];
        used.push({ type, grade, value: getAddOptionValue(gear, type, grade) });
        const result = search(next, used);
        if (result !== null) return result;
        used.pop();
      }
    }
    return null;
  }

  return search([0, 0, 0, 0], []);
}

/**
 * 단일/이중 스탯 추가옵션 한 줄의 기여분 [str, dex, int, luk].
 */
function getContribution(
  gear: ReadonlyGear,
  type: AddOptionType,
  grade: AddOptionGrade,
): [number, number, number, number] {
  const v = getAddOptionValue(gear, type, grade);
  switch (type) {
    case AddOptionType.str:
      return [v, 0, 0, 0];
    case AddOptionType.dex:
      return [0, v, 0, 0];
    case AddOptionType.int:
      return [0, 0, v, 0];
    case AddOptionType.luk:
      return [0, 0, 0, v];
    case AddOptionType.str_dex:
      return [v, v, 0, 0];
    case AddOptionType.str_int:
      return [v, 0, v, 0];
    case AddOptionType.str_luk:
      return [v, 0, 0, v];
    case AddOptionType.dex_int:
      return [0, v, v, 0];
    case AddOptionType.dex_luk:
      return [0, v, 0, v];
    case AddOptionType.int_luk:
      return [0, 0, v, v];
    default:
      return [0, 0, 0, 0];
  }
}
