import typia from "typia";
import { GearLike } from "../interface";

/**
 * 객체가 `GearLike` 형식인지 여부를 확인합니다.
 * @param input 확인할 객체.
 * @returns 장비가 `GearLike` 형식일 경우 `true`; 아닐 경우 `false`.
 */
export const isGearLike = typia.createIs<GearLike>();
