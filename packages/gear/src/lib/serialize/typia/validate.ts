import typia from "typia";
import { GearLike } from "../interface";

//$ pnpm typia generate --input packages/gear/src/lib/serialize/typia --output packages/gear/src/lib/serialize --project tsconfig.typia.json

/**
 * 객체가 `GearLike` 형식인지 여부를 확인합니다.
 * @param input 확인할 객체.
 * @returns 입력이 `GearLike` 형식일 경우 `true`; 아닐 경우 `false`.
 */
export const isGearLike = typia.createIs<GearLike>();
