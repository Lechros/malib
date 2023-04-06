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

export function serializeMap<K, V>(
  map: Map<K, V>,
  filterFunc?: (val: V) => boolean
): [K, V][];
export function serializeMap<K, V, VLike>(
  map: Map<K, V>,
  filterFunc: ((val: V) => boolean) | undefined,
  convertFunc: (val: V) => VLike
): [K, VLike][];
export function serializeMap<K, V, VLike>(
  map: Map<K, V>,
  filterFunc?: (val: V) => boolean,
  convertFunc?: (val: V) => VLike
): [K, V][] | [K, VLike][] {
  let entries = [...map];
  if (filterFunc) {
    entries = entries.filter((e) => filterFunc(e[1]));
  }
  if (convertFunc) {
    return entries.map((e) => [e[0], convertFunc(e[1])]);
  }
  return entries;
}

export function serializeArray<T>(
  arr: T[],
  filterFunc?: (e: T) => boolean
): T[];
export function serializeArray<T, TLike>(
  arr: T[],
  filterFunc: ((e: T) => boolean) | undefined,
  convertFunc: (e: T) => TLike
): TLike[];
export function serializeArray<T, TLike>(
  arr: T[],
  filterFunc?: (e: T) => boolean,
  convertFunc?: (e: T) => TLike
): T[] | TLike[] {
  let _arr = arr;
  if (filterFunc) {
    _arr = _arr.filter(filterFunc);
  }
  if (convertFunc) {
    return _arr.map(convertFunc);
  }
  return _arr === arr ? [...arr] : _arr;
}

export function deserializeMap<K, V>(mapLike: [K, V][]): Map<K, V>;
export function deserializeMap<K, V, VLike>(
  mapLike: [K, VLike][],
  func: (val: VLike) => V
): Map<K, V>;
export function deserializeMap<K, V, VLike>(
  mapLike: [K, V][] | [K, VLike][],
  func?: (val: VLike) => V
): Map<K, V> {
  if (func) {
    return new Map((mapLike as [K, VLike][]).map((e) => [e[0], func(e[1])]));
  }
  return new Map(mapLike as [K, V][]);
}

export function deserializeArray<T>(arr: T[]): T[];
export function deserializeArray<T, TLike>(
  arr: TLike[],
  func: (e: TLike) => T
): T[];
export function deserializeArray<T, TLike>(
  arr: T[] | TLike[],
  func?: (e: TLike) => T
): T[] {
  if (func) {
    return [...(arr as TLike[])].map(func);
  }
  return [...(arr as T[])];
}
