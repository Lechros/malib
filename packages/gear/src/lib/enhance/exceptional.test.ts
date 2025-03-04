import { defaultGear } from '../testUtils';
import {
  applyExceptional,
  canApplyExceptional,
  canResetExceptional,
  ExceptionalHammer,
  resetExceptional,
  supportsExceptional,
} from './exceptional';

describe('supportsExceptional', () => {
  it('is true for exceptionalUpgradeableCount === 1', () => {
    const gear = defaultGear({
      exceptionalUpgradeableCount: 1,
    });

    expect(supportsExceptional(gear)).toBe(true);
  });

  it('is true for exceptionalUpgradeCount === 1', () => {
    const gear = defaultGear({
      exceptionalUpgradeCount: 1,
    });

    expect(supportsExceptional(gear)).toBe(true);
  });

  it('is false for exceptionalTotalUpgradeableCount === 0', () => {
    const gear = defaultGear({});

    expect(supportsExceptional(gear)).toBe(false);
  });
});

describe('canApplyExceptional', () => {
  it('is true for exceptionalUpgradeableCount > 0', () => {
    const gear = defaultGear({
      exceptionalUpgradeableCount: 1,
    });

    expect(canApplyExceptional(gear)).toBe(true);
  });

  it('is false for exceptionalUpgradeableCount === 0', () => {
    const gear = defaultGear({
      exceptionalUpgradeCount: 1,
    });

    expect(canApplyExceptional(gear)).toBe(false);
  });
});

describe('applyExceptional', () => {
  it('increments exceptionalUpgradeCount', () => {
    const gear = defaultGear({
      exceptionalUpgradeableCount: 1,
    });
    const hammer: ExceptionalHammer = {
      name: '',
      option: {},
    };

    applyExceptional(gear, hammer);

    expect(gear.exceptionalUpgradeCount).toBe(1);
  });

  it('decrements exceptionalUpgradeableCount', () => {
    const gear = defaultGear({
      exceptionalUpgradeableCount: 1,
    });
    const hammer: ExceptionalHammer = {
      name: '',
      option: {},
    };

    applyExceptional(gear, hammer);

    expect(gear.exceptionalUpgradeableCount).toBe(0);
  });

  it('adds option to exceptionalOption', () => {
    const gear = defaultGear({
      exceptionalUpgradeableCount: 1,
    });
    const hammer: ExceptionalHammer = {
      name: '',
      option: { str: 1, attackPower: 2 },
    };
    const expected = {
      str: 1,
      attackPower: 2,
    };

    applyExceptional(gear, hammer);

    expect(gear.exceptionalOption).toEqual(expected);
  });

  it('throws TypeError for gear with exceptionalUpgradeableCount === 0', () => {
    const gear = defaultGear({});
    const hammer: ExceptionalHammer = { name: '', option: {} };

    expect(() => {
      applyExceptional(gear, hammer);
    }).toThrow(TypeError);
  });
});

describe('canResetExceptional', () => {
  it('is true for gear with totalExceptionalUpgradeableCount > 0', () => {
    const gear = defaultGear({
      exceptionalUpgradeableCount: 1,
    });

    expect(canResetExceptional(gear)).toBe(true);
  });

  it('is false for gear with totalExceptionalUpgradeableCount = 0', () => {
    const gear = defaultGear({});

    expect(canResetExceptional(gear)).toBe(false);
  });
});

describe('resetExceptional', () => {
  it('sets exceptionalUpgradeCount to 0', () => {
    const gear = defaultGear({
      exceptionalUpgradeCount: 2,
      exceptionalUpgradeableCount: 1,
    });

    resetExceptional(gear);

    expect(gear.exceptionalUpgradeCount).toBe(0);
  });

  it('sets exceptionalUpgradeableCount to 3', () => {
    const gear = defaultGear({
      exceptionalUpgradeCount: 2,
      exceptionalUpgradeableCount: 1,
    });

    resetExceptional(gear);

    expect(gear.exceptionalUpgradeableCount).toBe(3);
  });

  it('resets exceptionalOption', () => {
    const gear = defaultGear({
      exceptionalUpgradeCount: 1,
      exceptionalOption: { int: 1, luk: 2 },
    });

    resetExceptional(gear);

    expect(gear.exceptionalOption).toEqual({});
  });
});
