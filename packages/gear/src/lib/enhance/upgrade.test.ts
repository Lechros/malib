import { GearCapability } from '../data';
import { GearError } from '../errors';
import { createGear, createScroll } from '../test';
import {
  applyScroll,
  canApplyScroll,
  canFailScroll,
  canResetUpgrade,
  canResileScroll,
  failScroll,
  resetUpgrade,
  resileScroll,
  supportsUpgrade,
} from './upgrade';

describe('supportsUpgrade', () => {
  it('canScroll = Can일 경우 true를 반환한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
    });

    expect(supportsUpgrade(gear)).toBe(true);
  });

  it('canScroll = Cannot일 경우 false를 반환한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Cannot },
    });

    expect(supportsUpgrade(gear)).toBe(false);
  });

  it('canScroll = Fixed 경우 false를 반환한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Fixed },
    });

    expect(supportsUpgrade(gear)).toBe(false);
  });
});

describe('canFailScroll', () => {
  it('canScroll = Cannot일 경우 false를 반환한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
    });

    expect(supportsUpgrade(gear)).toBe(true);
  });

  it('잔여 주문서 강화 횟수가 0일 경우 false를 반환한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
    });

    expect(canFailScroll(gear)).toBe(false);
  });

  it('잔여 주문서 강화 횟수가 1일 경우 true를 반환한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
      scrollUpgradeableCount: 1,
    });

    expect(canFailScroll(gear)).toBe(true);
  });
});

describe('failScroll', () => {
  it('잔여 주문서 강화 횟수가 0일 경우 GearError가 발생한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
    });

    expect(() => {
      failScroll(gear);
    }).toThrow(GearError);
  });

  it('복구 가능 주문서 강화 횟수가 1회 증가한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
      scrollUpgradeableCount: 1,
      scrollResilienceCount: 1,
    });

    failScroll(gear);

    expect(gear.scrollResilienceCount).toBe(2);
  });

  it('잔여 주문서 강화 횟수가 1회 감소한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
      scrollUpgradeableCount: 1,
      scrollResilienceCount: 1,
    });

    failScroll(gear);

    expect(gear.scrollUpgradeableCount).toBe(0);
  });
});

describe('canResileScroll', () => {
  it('canScroll = Cannot일 경우 false를 반환한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Cannot },
    });

    expect(canResileScroll(gear)).toBe(false);
  });

  it('복구 가능 주문서 강화 횟수가 0일 경우 false를 반환한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
    });

    expect(canResileScroll(gear)).toBe(false);
  });

  it('복구 가능 주문서 강화 횟수가 1일 경우 true를 반환한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
      scrollResilienceCount: 1,
    });

    expect(canResileScroll(gear)).toBe(true);
  });
});

describe('resileScroll', () => {
  it('복구 가능 주문서 강화 횟수가 0일 경우 GearError가 발생한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
    });

    expect(() => {
      resileScroll(gear);
    }).toThrow(GearError);
  });

  it('잔여 주문서 강화 횟수가 1회 증가한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
      scrollUpgradeableCount: 1,
      scrollResilienceCount: 1,
    });

    resileScroll(gear);

    expect(gear.scrollUpgradeableCount).toBe(2);
  });

  it('복구 가능 주문서 강화 횟수가 1회 감소한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
      scrollUpgradeableCount: 1,
      scrollResilienceCount: 1,
    });

    resileScroll(gear);

    expect(gear.scrollResilienceCount).toBe(0);
  });
});

describe('canResetUpgrade', () => {
  it('canScroll = Cannot일 경우 false를 반환한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Cannot },
    });

    expect(canResetUpgrade(gear)).toBe(false);
  });

  it('주문서 강화 횟수와 관계 없이 true를 반환한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
    });

    expect(canResetUpgrade(gear)).toBe(true);
  });
});

describe('resetUpgrade', () => {
  it('canScroll = Cannot일 경우 GearError가 발생한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Cannot },
    });
    expect(() => {
      resetUpgrade(gear);
    }).toThrow(GearError);
  });

  it('복구 가능 주문서 강화 횟수가 0으로 설정된다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
      scrollResilienceCount: 1,
    });

    resetUpgrade(gear);

    expect(gear.scrollResilienceCount).toBe(0);
  });

  it('주문서 강화 횟수가 0으로 설정된다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
      scrollUpgradeCount: 1,
    });

    resetUpgrade(gear);

    expect(gear.scrollUpgradeCount).toBe(0);
  });

  it('잔여 주문서 강화 횟수가 전체 주문서 강화 횟수로 설정된다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
      scrollUpgradeableCount: 1,
      scrollResilienceCount: 1,
    });

    resetUpgrade(gear);

    expect(gear.scrollUpgradeableCount).toBe(2);
  });

  it('upgradeOption을 초기화한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
      upgradeOption: { str: 2, dex: 1 },
    });

    resetUpgrade(gear);

    expect(gear.upgradeOption).toEqual({});
  });
});

describe('canApplyScroll', () => {
  it('canScroll = Cannot일 경우 false를 반환한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Cannot },
    });

    expect(canApplyScroll(gear)).toBe(false);
  });

  it('잔여 주문서 강화 횟수가 0회일 경우 false를 반환한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
    });

    expect(canApplyScroll(gear)).toBe(false);
  });

  it('잔여 주문서 강화 횟수가 1회일 경우 true를 반환한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
      scrollUpgradeableCount: 1,
    });

    expect(canApplyScroll(gear)).toBe(true);
  });
});

describe('applyScroll', () => {
  it('canScroll = Cannot일 경우 GearError가 발생한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Cannot },
    });
    const scroll = createScroll();

    expect(() => {
      applyScroll(gear, scroll);
    }).toThrow(GearError);
  });

  it('잔여 주문서 강화 횟수가 0회일 경우 GearError가 발생한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
    });
    const scroll = createScroll();

    expect(() => {
      applyScroll(gear, scroll);
    }).toThrow(GearError);
  });

  it('주문서 강화 횟수가 1회 증가한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
      scrollUpgradeableCount: 1,
      scrollUpgradeCount: 1,
    });
    const scroll = createScroll();

    applyScroll(gear, scroll);

    expect(gear.scrollUpgradeCount).toBe(2);
  });

  it('잔여 주문서 강화 횟수가 1회 감소한다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
      scrollUpgradeableCount: 1,
      scrollUpgradeCount: 1,
    });
    const scroll = createScroll();

    applyScroll(gear, scroll);

    expect(gear.scrollUpgradeableCount).toBe(0);
  });

  it('upgradeOption = undefined인 경우에도 옵션이 적용된다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
      scrollUpgradeableCount: 1,
    });
    const scroll = createScroll({
      option: {
        str: 1,
        dex: 2,
        int: 3,
        luk: 4,
        maxHp: 50,
        magicPower: 10,
      },
    });

    applyScroll(gear, scroll);

    expect(gear.upgradeOption).toEqual({
      str: 1,
      dex: 2,
      int: 3,
      luk: 4,
      maxHp: 50,
      magicPower: 10,
    });
  });

  it('기존의 upgradeOption에 옵션이 추가된다.', () => {
    const gear = createGear({
      attributes: { canScroll: GearCapability.Can },
      upgradeOption: {},
      scrollUpgradeableCount: 2,
    });
    const scroll = createScroll({
      option: {
        str: 1,
        dex: 2,
        int: 3,
        luk: 4,
        maxHp: 50,
        magicPower: 10,
      },
    });

    applyScroll(gear, scroll);

    expect(gear.upgradeOption).toEqual({
      str: 1,
      dex: 2,
      int: 3,
      luk: 4,
      maxHp: 50,
      magicPower: 10,
    });

    applyScroll(gear, scroll);

    expect(gear.upgradeOption).toEqual({
      str: 2,
      dex: 4,
      int: 6,
      luk: 8,
      maxHp: 100,
      magicPower: 20,
    });
  });
});
