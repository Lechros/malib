import { GearCapability } from '../data';
import { ErrorCode, GearError } from '../error';
import { createGear } from '../testing';
import { canApplyScroll } from './upgrade';
import {
  canApplyYggdrasil,
  getYggdrasilScroll,
  YggdrasilType,
} from './yggdrasil';

function createTarget(level = 120) {
  return createGear({
    req: { level },
    attributes: { canScroll: GearCapability.Can },
    scrollUpgradeableCount: 7,
  });
}

describe('getYggdrasilScroll', () => {
  it.each([
    [YggdrasilType.str, '힘'],
    [YggdrasilType.dex, '민첩성'],
    [YggdrasilType.int, '지력'],
    [YggdrasilType.luk, '행운'],
  ] as const)(
    '%s 주문서의 일반 및 고급 성장 정보를 생성한다.',
    (type, name) => {
      for (const advanced of [false, true]) {
        const gear = createTarget();
        const scroll = getYggdrasilScroll(gear, type, advanced);
        expect(scroll.name).toBe(
          `${advanced ? '고급 ' : ''}${name}의 이그드라실의 축복`,
        );
        expect(scroll.option).toEqual({});
        gear.applyScroll(scroll);
        const count = advanced ? 5 : 3;
        for (let level = 1; level <= count; level++) {
          expect(gear.growth?.levels[level]).toEqual({
            exp: level === 1 ? 70 : 75,
            option: { [type]: [1, 3] },
          });
          gear.applyGrowth({ [type]: 3 });
        }
        expect(gear.growthMax).toBe(true);
        expect(gear.growthOption[type]).toBe(count * 3);
        expect(gear.attributes.growthLevel).toBe(count + 1);
        expect(gear.growth?.levels[count + 1]).toBeUndefined();
      }
    },
  );

  it.each([
    [false, 69, false],
    [false, 70, true],
    [false, 120, true],
    [false, 121, false],
    [true, 119, false],
    [true, 120, true],
    [true, 250, true],
    [true, 251, false],
  ])(
    '고급 %s, 착용 레벨 %i의 적용 범위를 확인한다.',
    (advanced, level, allowed) => {
      const gear = createTarget(level);
      expect(canApplyYggdrasil(gear, advanced)).toBe(allowed);
      expect(gear.canApplyYggdrasil(advanced)).toBe(allowed);
      const create = () =>
        getYggdrasilScroll(gear, YggdrasilType.str, advanced);
      if (allowed) expect(create).not.toThrow();
      else
        expect(create).toThrow(
          new GearError(ErrorCode.Yggdrasil_CreateScroll_ReqLevelOutOfRange, {
            gear,
          }),
        );
    },
  );
});

describe('canApplyYggdrasil', () => {
  it('고급 여부를 생략하면 일반 주문서의 적용 가능 여부를 확인한다.', () => {
    const gear = createTarget(70);
    expect(canApplyYggdrasil(gear)).toBe(true);
    expect(gear.canApplyYggdrasil()).toBe(true);
    expect(gear.canApplyYggdrasil(true)).toBe(false);
  });

  it.each([false, true])(
    '주문서 강화를 지원하지 않으면 false를 반환한다. (고급: %s)',
    (advanced) => {
      const gear = createTarget();
      gear.data.attributes.canScroll = GearCapability.Cannot;
      expect(canApplyYggdrasil(gear, advanced)).toBe(false);
      expect(gear.canApplyYggdrasil(advanced)).toBe(false);
    },
  );

  it.each([false, true])(
    '남은 강화 횟수가 없으면 false를 반환한다. (고급: %s)',
    (advanced) => {
      const gear = createTarget();
      gear.data.scrollUpgradeableCount = 0;
      expect(canApplyYggdrasil(gear, advanced)).toBe(false);
      expect(gear.canApplyYggdrasil(advanced)).toBe(false);
    },
  );

  it.each(['growth', 'scroll'] as const)(
    '%s 출처의 성장 정보가 있으면 false를 반환한다.',
    (source) => {
      const gear = createTarget();
      gear.data.growth = { source, levels: { 1: { exp: 0 } } };
      for (const advanced of [false, true]) {
        expect(canApplyYggdrasil(gear, advanced)).toBe(false);
        expect(gear.canApplyYggdrasil(advanced)).toBe(false);
      }
    },
  );

  it('착용 레벨 증가를 포함하여 생성 함수와 동일하게 검사한다.', () => {
    const gear = createTarget(110);
    gear.data.req.levelIncrease = 11;
    expect(gear.canApplyYggdrasil()).toBe(false);
    expect(gear.canApplyYggdrasil(true)).toBe(true);
    expect(() => getYggdrasilScroll(gear, YggdrasilType.str)).toThrow(
      GearError,
    );
    expect(() =>
      getYggdrasilScroll(gear, YggdrasilType.str, true),
    ).not.toThrow();
  });
});

describe('성장 주문서 적용', () => {
  it('성장 정보를 복사하지 않고 연결하며 성장 상태와 주문서 횟수를 갱신한다.', () => {
    const gear = createTarget();
    const scroll = getYggdrasilScroll(gear, YggdrasilType.dex);
    expect(canApplyScroll(gear, scroll)).toBe(true);
    gear.applyScroll(scroll);
    expect(gear.data.growth).toBe(scroll.growth);
    expect(gear.attributes.growthLevel).toBe(1);
    expect(gear.attributes.growthExp).toBe(0);
    expect(gear.growthOption.dex).toBe(0);
    expect(gear.scrollUpgradeableCount).toBe(6);
    expect(gear.scrollUpgradeCount).toBe(1);
  });

  it.each(['growth', 'scroll'] as const)(
    '%s 출처의 성장이 있으면 변경 없이 거부한다.',
    (source) => {
      const gear = createTarget();
      const scroll = getYggdrasilScroll(gear, YggdrasilType.str);
      gear.data.growth = { source, levels: { 1: { exp: 0 } } };
      const before = structuredClone(gear.data);
      expect(canApplyScroll(gear, scroll)).toBe(false);
      expect(canApplyScroll(gear)).toBe(true);
      expect(() => gear.applyScroll(scroll)).toThrow(
        new GearError(ErrorCode.Upgrade_ApplyScroll_AlreadyGrowing, { gear }),
      );
      expect(gear.data).toEqual(before);
      gear.applyScroll({ name: 'STR 주문서', option: { str: 1 } });
      expect(gear.upgradeOption.str).toBe(1);
      expect(gear.data.growth).toEqual(before.growth);
    },
  );

  it('주문서 실패는 성장을 부여하지 않는다.', () => {
    const gear = createTarget();
    gear.applyScrollFail();
    expect(gear.growth).toBeUndefined();
    expect(gear.scrollUpgradeableCount).toBe(6);
    expect(gear.scrollResilienceCount).toBe(1);
  });

  it('성장 초기화는 규칙을 유지하고 주문서 초기화 후에는 다시 부여할 수 있다.', () => {
    const gear = createTarget();
    const scroll = getYggdrasilScroll(gear, YggdrasilType.str);
    gear.applyScroll(scroll);
    gear.applyGrowth({ str: 3 });
    gear.resetGrowth();
    expect(gear.data.growth).toBe(scroll.growth);
    expect(gear.growthOption.str).toBe(0);
    gear.applyGrowth({ str: 2 });
    gear.resetUpgrade();
    expect(gear.growth).toBeUndefined();
    expect(gear.growthOption.str).toBe(0);
    expect(gear.attributes.growthLevel).toBeUndefined();
    expect(gear.attributes.growthExp).toBeUndefined();
    expect(canApplyScroll(gear, scroll)).toBe(true);
    gear.applyScroll(scroll);
    expect(gear.attributes.growthLevel).toBe(1);
  });
});
