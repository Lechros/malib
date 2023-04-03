import { Gear } from "../gear";
import { plainToGear } from "./fromplain";
import { gearToPlain } from "./toplain";
import { isGearLike } from "./validate";

/**
 * 장비를 문자열로 변환합니다. `JSON.stringify`를 사용합니다.
 * @param gear 변환할 장비.
 * @returns 장비를 나타내는 문자열.
 */
export function stringifyGear(gear: Gear): string {
  return JSON.stringify(gearToPlain(gear));
}

/**
 * 문자열을 장비로 변환합니다. 입력을 검사하지 않고 `JSON.parse`를 사용합니다.
 * @param gear 변환할 문자열.
 * @returns 장비. 입력이 잘못되었을 경우 오류가 발생하거나 장비를 반환합니다.
 */
export function parseGear(like: string): Gear {
  return plainToGear(JSON.parse(like));
}

/**
 * 문자열을 장비로 변환합니다. 입력을 검사하고 `JSON.parse`를 사용합니다.
 * @param gear 변환할 문자열.
 * @returns 장비. 입력이 잘못되었을 경우 `null`을 반환합니다.
 */
export function validateParseGear(maybe: string): Gear | null {
  const maybeLike = JSON.parse(maybe) as unknown;
  if (isGearLike(maybeLike)) {
    return plainToGear(maybeLike);
  }
  return null;
}
