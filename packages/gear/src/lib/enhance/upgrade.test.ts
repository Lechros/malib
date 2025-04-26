import { GearType, GearCapability } from '../data';
import { Gear } from '../Gear';
import { defaultGear } from '../testUtils';
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

let gear: Gear;

afterEach(() => {
  vitest.restoreAllMocks();
});

describe('supportsUpgrade', () => {
  it('returns true for canScroll === Can', () => {
    gear.data.attributes.canScroll = GearCapability.Can;

    expect(supportsUpgrade(gear)).toBe(true);
  });

  it('returns false for canScroll === Fixed', () => {
    gear.data.attributes.canScroll = GearCapability.Fixed;

    expect(supportsUpgrade(gear)).toBe(false);
  });

  it('returns false for canScroll === Cannot', () => {
    gear.data.attributes.canScroll = GearCapability.Cannot;

    expect(supportsUpgrade(gear)).toBe(false);
  });
});

describe('canFailScroll', () => {
  it('returns false for scrollUpgradeableCount == 0 gear', () => {
    gear.data.scrollUpgradeableCount = 0;

    expect(canFailScroll(gear)).toBe(false);
  });

  it('returns true for scrollUpgradeableCount > 0 gear', () => {
    gear.data.scrollUpgradeableCount = 1;

    expect(canFailScroll(gear)).toBe(true);
  });
});

describe('failScroll', () => {
  it('throws TypeError for scrollUpgradeableCount == 0 gear', () => {
    gear.data.scrollUpgradeableCount = 0;

    expect(() => {
      failScroll(gear);
    }).toThrow(TypeError);
  });

  it('increments scrollResilienceCount by 1', () => {
    gear.data.scrollUpgradeableCount = 2;
    gear.data.scrollResilienceCount = 1;

    failScroll(gear);

    expect(gear.scrollResilienceCount).toBe(2);
  });

  it('decrements scrollUpgradeableCount by 1', () => {
    gear.data.scrollUpgradeableCount = 2;
    gear.data.scrollResilienceCount = 1;

    failScroll(gear);

    expect(gear.scrollUpgradeableCount).toBe(1);
  });
});

describe('canResileScroll', () => {
  it('returns false for scrollTotalUpgradeableCount == 0 gear', () => {
    vitest
      .spyOn(gear, 'scrollTotalUpgradeableCount', 'get')
      .mockImplementation(() => 0);

    expect(canResileScroll(gear)).toBe(false);
  });

  it('returns false for scrollResilienceCount == 0 gear', () => {
    gear.data.scrollResilienceCount = 0;

    expect(canResileScroll(gear)).toBe(false);
  });

  it('returns true for scrollResilienceCount > 0 gear', () => {
    gear.data.scrollResilienceCount = 1;

    expect(canResileScroll(gear)).toBe(true);
  });
});

describe('resileScroll', () => {
  it('throws TypeError for scrollResilienceCount == 0 gear', () => {
    gear.data.scrollResilienceCount = 0;

    expect(() => {
      resileScroll(gear);
    }).toThrow(TypeError);
  });

  it('increments scrollUpgradeableCount by 1', () => {
    gear.data.scrollUpgradeableCount = 1;
    gear.data.scrollResilienceCount = 2;

    resileScroll(gear);

    expect(gear.scrollUpgradeableCount).toBe(2);
  });

  it('decrements scrollResilienceCount by 1', () => {
    gear.data.scrollUpgradeableCount = 1;
    gear.data.scrollResilienceCount = 2;

    resileScroll(gear);

    expect(gear.scrollResilienceCount).toBe(1);
  });
});

describe('canResetUpgrade', () => {
  it('returns true', () => {
    expect(canResetUpgrade(gear)).toBe(true);
  });

  it('returns true after reset', () => {
    resetUpgrade(gear);

    expect(canResetUpgrade(gear)).toBe(true);
  });
});

describe('resetUpgrade', () => {
  it('resets scrollResilienceCount', () => {
    expect(gear.scrollUpgradeableCount).toBe(8);
    expect(gear.scrollResilienceCount).toBe(0);
    for (let i = 0; i < 3; i++) {
      failScroll(gear);
    }

    resetUpgrade(gear);

    expect(gear.scrollUpgradeableCount).toBe(8);
    expect(gear.scrollResilienceCount).toBe(0);
  });

  it('resets scrollUpgradeCount', () => {
    expect(gear.scrollUpgradeableCount).toBe(8);
    expect(gear.scrollUpgradeCount).toBe(0);
    gear.data.scrollUpgradeableCount = 1;
    gear.data.scrollUpgradeCount = 7;

    resetUpgrade(gear);

    expect(gear.scrollUpgradeableCount).toBe(8);
    expect(gear.scrollUpgradeCount).toBe(0);
  });

  it('resets upgradeOption', () => {
    gear.data.upgradeOption = { str: 2, dex: 1 };

    resetUpgrade(gear);

    expect(gear.upgradeOption).toEqual({});
  });
});

describe('canApplyScroll', () => {
  it('returns false for scrollUpgradeableCount == 0 gear', () => {
    gear.data.scrollUpgradeableCount = 0;

    expect(canApplyScroll(gear)).toBe(false);
  });

  it('returns true for scrollUpgradeableCount > 0 gear', () => {
    gear.data.scrollUpgradeableCount = 1;

    expect(canApplyScroll(gear)).toBe(true);
  });
});

describe('applyScroll', () => {
  const scroll = {
    name: 'Test scroll',
    option: { str: 1, dex: 2, int: 3, luk: 4, maxHp: 50, magicPower: 10 },
  };

  it('throws TypeError for scrollUpgradeableCount == 0 gear', () => {
    gear.data.scrollUpgradeableCount = 0;

    expect(() => {
      applyScroll(gear, scroll);
    }).toThrow(TypeError);
  });

  it('increments scrollUpgradeCount by 1', () => {
    gear.data.scrollUpgradeableCount = 2;
    gear.data.scrollUpgradeCount = 1;

    applyScroll(gear, scroll);

    expect(gear.scrollUpgradeCount).toBe(2);
  });

  it('decrements scrollUpgradeableCount by 1', () => {
    gear.data.scrollUpgradeableCount = 2;
    gear.data.scrollUpgradeCount = 1;

    applyScroll(gear, scroll);

    expect(gear.scrollUpgradeableCount).toBe(1);
  });

  it('adds option to upgradeOption == undefined gear', () => {
    gear.data.upgradeOption = undefined;

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

  it('adds option to upgradeOption', () => {
    gear.data.upgradeOption = {};

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

beforeEach(() => {
  gear = defaultGear({
    type: GearType.shiningRod,
    req: {
      level: 200,
    },
    attributes: {
      canScroll: GearCapability.Can,
    },
    scrollUpgradeableCount: 8,
  });
});
