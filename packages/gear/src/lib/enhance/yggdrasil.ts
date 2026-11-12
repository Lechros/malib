import { ErrorCode, GearError } from '../error';
import { ReadonlyGear } from '../ReadonlyGear';
import { canApplyScroll, Scroll } from './upgrade';

/**
 * 이그드라실의 축복 종류
 */
export enum YggdrasilType {
  /** STR */
  str = 'str',
  /** DEX */
  dex = 'dex',
  /** INT */
  int = 'int',
  /** LUK */
  luk = 'luk',
}

/**
 * 장비에 이그드라실의 축복을 적용할 수 있는 상태인지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @param advanced 고급 이그드라실의 축복 여부. 기본값은 `false`입니다.
 * @returns 적용할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canApplyYggdrasil(
  gear: ReadonlyGear,
  advanced = false,
): boolean {
  return (
    canApplyScroll(gear) &&
    !gear.growth &&
    checkYggdrasilLevel(gear, advanced) === undefined
  );
}

function checkYggdrasilLevel(gear: ReadonlyGear, advanced: boolean) {
  const reqLevel = gear.req.level + gear.req.levelIncrease;
  if (reqLevel < (advanced ? 120 : 70) || reqLevel > (advanced ? 250 : 120))
    return ErrorCode.Yggdrasil_CreateScroll_ReqLevelOutOfRange;
  return undefined;
}

/**
 * 이그드라실의 축복 주문서를 생성합니다.
 * @param gear 대상 장비.
 * @param type 이그드라실의 축복 종류.
 * @param advanced 고급 이그드라실의 축복 여부. 기본값은 `false`입니다.
 * @returns 이그드라실의 축복 주문서.
 *
 * @throws {@link GearError}
 * 장비의 착용 레벨이 주문서의 적용 범위를 벗어난 경우.
 */
export function getYggdrasilScroll(
  gear: ReadonlyGear,
  type: YggdrasilType,
  advanced = false,
): Scroll {
  const code = checkYggdrasilLevel(gear, advanced);
  if (code !== undefined) {
    throw new GearError(code, { gear });
  }
  const names = { str: '힘', dex: '민첩성', int: '지력', luk: '행운' };
  const growth: NonNullable<Scroll['growth']> = {
    source: 'scroll',
    levels: {},
  };
  const count = advanced ? 5 : 3;
  for (let level = 1; level <= count; level++) {
    growth.levels[level] = {
      exp: level === 1 ? 70 : 75,
      option: { [type]: [1, 3] },
    };
  }
  return {
    name: `${advanced ? '고급 ' : ''}${names[type]}의 이그드라실의 축복`,
    option: {},
    growth,
  };
}
