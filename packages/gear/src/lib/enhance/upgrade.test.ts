import { GearType } from '../data';
import { Gear } from '../Gear';
import { defaultGear } from '../testUtils';
import {
  applyGoldenHammer,
  applyScroll,
  canApplyScroll,
  canFailScroll,
  canGoldenHammer,
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

describe('canUpgrade', () => {
  it('returns false for cannotUpgrade gear', () => {
    gear.data.attributes.cannotUpgrade = true;

    expect(supportsUpgrade(gear)).toBe(false);
  });

  it('returns false for scrollTotalUpgradeableCount == 0 gear', () => {
    vitest
      .spyOn(gear, 'scrollTotalUpgradeableCount', 'get')
      .mockImplementation(() => 0);

    expect(supportsUpgrade(gear)).toBe(false);
  });

  it('returns true for scrollTotalUpgradeableCount > 0 gear', () => {
    vitest
      .spyOn(gear, 'scrollTotalUpgradeableCount', 'get')
      .mockImplementation(() => 1);

    expect(supportsUpgrade(gear)).toBe(true);
  });
});

describe('canGoldenHammer', () => {
  it('returns false for cannotUpgrade gear', () => {
    gear.data.attributes.cannotUpgrade = true;

    expect(canGoldenHammer(gear)).toBe(false);
  });

  it('returns false for scrollTotalUpgradeableCount == 0 gear', () => {
    vitest
      .spyOn(gear, 'scrollTotalUpgradeableCount', 'get')
      .mockImplementation(() => 0);

    expect(canGoldenHammer(gear)).toBe(false);
  });

  it('returns false for blockGoldenHammer gear', () => {
    gear.data.attributes.blockGoldenHammer = true;

    expect(canGoldenHammer(gear)).toBe(false);
  });

  it('returns false for goldenHammer > 1 gear', () => {
    gear.data.goldenHammer = 1;

    expect(canGoldenHammer(gear)).toBe(false);
  });

  it('returns true for goldenHammer == 0 gear', () => {
    expect(canGoldenHammer(gear)).toBe(true);
  });
});

describe('applyGoldenHammer', () => {
  it('throws TypeError for cannotUpgrade gear', () => {
    gear.data.attributes.cannotUpgrade = true;

    expect(() => {
      applyGoldenHammer(gear);
    }).toThrow(TypeError);
  });

  it('throws TypeError for blockGoldenHammer gear', () => {
    gear.data.attributes.blockGoldenHammer = true;

    expect(() => {
      applyGoldenHammer(gear);
    }).toThrow(TypeError);
  });

  it('throws TypeError for goldenHammer > 0 gear', () => {
    gear.data.goldenHammer = 1;

    expect(() => {
      applyGoldenHammer(gear);
    }).toThrow(TypeError);
  });

  it('sets goldenHammer to 1', () => {
    applyGoldenHammer(gear);

    expect(gear.goldenHammer).toBe(1);
  });
});

describe('canFailScroll', () => {
  it('returns false for cannotUpgrade gear', () => {
    gear.data.attributes.cannotUpgrade = true;

    expect(canFailScroll(gear)).toBe(false);
  });

  it('returns false for scrollTotalUpgradeableCount == 0 gear', () => {
    vitest
      .spyOn(gear, 'scrollTotalUpgradeableCount', 'get')
      .mockImplementation(() => 0);

    expect(canFailScroll(gear)).toBe(false);
  });

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
  it('throws TypeError for cannotUpgrade gear', () => {
    gear.data.attributes.cannotUpgrade = true;

    expect(() => {
      failScroll(gear);
    }).toThrow(TypeError);
  });

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
  it('returns false for cannotUpgrade gear', () => {
    gear.data.attributes.cannotUpgrade = true;

    expect(canResileScroll(gear)).toBe(false);
  });

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
  it('throws TypeError for cannotUpgrade gear', () => {
    gear.data.attributes.cannotUpgrade = true;

    expect(() => {
      resileScroll(gear);
    }).toThrow(TypeError);
  });

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
  it('returns false for cannotUpgrade gear', () => {
    gear.data.attributes.cannotUpgrade = true;

    expect(canResetUpgrade(gear)).toBe(false);
  });

  it('returns true', () => {
    expect(canResetUpgrade(gear)).toBe(true);
  });

  it('returns true after reset', () => {
    resetUpgrade(gear);

    expect(canResetUpgrade(gear)).toBe(true);
  });
});

describe('resetUpgrade', () => {
  it('throws TypeError for cannotUpgrade gear', () => {
    gear.data.attributes.cannotUpgrade = true;

    expect(() => {
      resetUpgrade(gear);
    }).toThrow(TypeError);
  });

  it('resets goldenHammer', () => {
    expect(gear.scrollUpgradeableCount).toBe(8);
    expect(gear.goldenHammer).toBe(0);
    applyGoldenHammer(gear);

    resetUpgrade(gear);

    expect(gear.scrollUpgradeableCount).toBe(8);
    expect(gear.goldenHammer).toBe(0);
  });

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
  it('returns false for cannotUpgrade gear', () => {
    gear.data.attributes.cannotUpgrade = true;

    expect(canApplyScroll(gear)).toBe(false);
  });

  it('returns false for scrollTotalUpgradeableCount == 0 gear', () => {
    vitest
      .spyOn(gear, 'scrollTotalUpgradeableCount', 'get')
      .mockImplementation(() => 0);

    expect(canApplyScroll(gear)).toBe(false);
  });

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

  it('throws TypeError for cannotUpgrade gear', () => {
    gear.data.attributes.cannotUpgrade = true;

    expect(() => {
      applyScroll(gear, scroll);
    }).toThrow(TypeError);
  });

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
    scrollUpgradeableCount: 8,
  });
});
