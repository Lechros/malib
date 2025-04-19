import { GearType, PotentialCan, PotentialGrade } from '../data';
import { defaultGear } from '../testUtils';
import {
  canSetAdditionalPotential,
  canSetPotential,
  resetAdditionalPotential,
  resetPotential,
  setAdditionalPotential,
  setPotential,
  supportsAdditionalPotential,
  supportsPotential,
} from './potential';

describe('supportsPotential', () => {
  it('is true for canPotential === Can', () => {
    const gear = defaultGear({
      attributes: {
        canPotential: PotentialCan.Can,
      },
    });

    expect(supportsPotential(gear)).toBe(true);
  });

  it('is true for canPotential === Fixed', () => {
    const gear = defaultGear({
      attributes: {
        canPotential: PotentialCan.Fixed,
      },
    });

    expect(supportsPotential(gear)).toBe(true);
  });

  it('is false for canPotential === Cannot', () => {
    const gear = defaultGear({
      attributes: {
        canPotential: PotentialCan.Cannot,
      },
    });

    expect(supportsPotential(gear)).toBe(false);
  });

  it('is true for canPotential === None with scrollTotalUpgradeableCount > 0', () => {
    const gear = defaultGear({
      attributes: {
        canPotential: PotentialCan.None,
      },
      scrollUpgradeableCount: 1,
    });

    expect(supportsPotential(gear)).toBe(true);
  });

  it('is false for canPotential === None with scrollTotalUpgradeableCount === 0', () => {
    const gear = defaultGear({
      attributes: {
        canPotential: PotentialCan.None,
      },
      scrollUpgradeableCount: 0,
    });

    expect(supportsPotential(gear)).toBe(false);
  });

  it('is false for canPotential === None with scrollTotalUpgradeableCount > 0 if type is mechanicGear', () => {
    const gear = defaultGear({
      type: GearType.machineArms,
      attributes: {
        canPotential: PotentialCan.None,
      },
      scrollUpgradeableCount: 1,
    });

    expect(supportsPotential(gear)).toBe(false);
  });

  it('is false for canPotential === None with scrollTotalUpgradeableCount > 0 if type is dragonGear', () => {
    const gear = defaultGear({
      type: GearType.dragonMask,
      attributes: {
        canPotential: PotentialCan.None,
      },
      scrollUpgradeableCount: 1,
    });

    expect(supportsPotential(gear)).toBe(false);
  });

  it.each([
    GearType.soulShield,
    GearType.demonShield,
    GearType.katara,
    GearType.magicArrow,
    GearType.card,
    GearType.orb,
    GearType.dragonEssence,
    GearType.soulRing,
    GearType.magnum,
    GearType.emblem,
    GearType.shield,
    GearType.katara,
    GearType.jewel,
  ])(
    'is true for canPotential === None with scrollTotalUpgradeableCount === 0 if type is %s',
    (type) => {
      const gear = defaultGear({
        type,
        attributes: {
          canPotential: PotentialCan.None,
        },
        scrollUpgradeableCount: 0,
      });

      expect(supportsPotential(gear)).toBe(true);
    },
  );
});

describe('canSetPotential', () => {
  it('is true for canPotential === Can', () => {
    const gear = defaultGear({
      attributes: {
        canPotential: PotentialCan.Can,
      },
    });

    expect(canSetPotential(gear)).toBe(true);
  });

  it('is false for canPotential === Fixed', () => {
    const gear = defaultGear({
      attributes: {
        canPotential: PotentialCan.Fixed,
      },
    });

    expect(canSetPotential(gear)).toBe(false);
  });

  it('is false for canPotential === Cannot', () => {
    const gear = defaultGear({
      attributes: {
        canPotential: PotentialCan.Cannot,
      },
    });

    expect(canSetPotential(gear)).toBe(false);
  });
});

describe('setPotential', () => {
  it('sets potentialGrade', () => {
    const gear = defaultGear({
      attributes: {
        canPotential: PotentialCan.Can,
      },
    });

    setPotential(gear, PotentialGrade.Unique, [
      { grade: PotentialGrade.Unique, summary: '', option: {} },
    ]);

    expect(gear.potentialGrade).toBe(PotentialGrade.Unique);
  });

  it('sets potentials', () => {
    const gear = defaultGear({
      attributes: {
        canPotential: PotentialCan.Can,
      },
    });

    setPotential(gear, PotentialGrade.Unique, [
      { grade: PotentialGrade.Unique, summary: 'test1', option: {} },
      { grade: PotentialGrade.Unique, summary: 'test2', option: {} },
    ]);

    expect(gear.potentials).toEqual([
      { grade: PotentialGrade.Unique, summary: 'test1', option: {} },
      { grade: PotentialGrade.Unique, summary: 'test2', option: {} },
    ]);
  });

  it('sets potentials for options with lower grade', () => {
    const gear = defaultGear({
      attributes: {
        canPotential: PotentialCan.Can,
      },
    });

    setPotential(gear, PotentialGrade.Unique, [
      { grade: PotentialGrade.Epic, summary: 'test1', option: {} },
      { grade: PotentialGrade.Rare, summary: 'test2', option: {} },
    ]);

    expect(gear.potentials).toEqual([
      { grade: PotentialGrade.Epic, summary: 'test1', option: {} },
      { grade: PotentialGrade.Rare, summary: 'test2', option: {} },
    ]);
  });

  it('sets potentials for options with higher grade', () => {
    const gear = defaultGear({
      attributes: {
        canPotential: PotentialCan.Can,
      },
    });

    setPotential(gear, PotentialGrade.Epic, [
      { grade: PotentialGrade.Legendary, summary: 'test1', option: {} },
    ]);

    expect(gear.potentials).toEqual([
      { grade: PotentialGrade.Legendary, summary: 'test1', option: {} },
    ]);
  });

  it('throws error if canSetPotential is false', () => {
    const gear = defaultGear({
      attributes: {
        canPotential: PotentialCan.Cannot,
      },
    });

    expect(() => {
      setPotential(gear, PotentialGrade.Unique, [
        { grade: PotentialGrade.Unique, summary: '', option: {} },
      ]);
    }).toThrow();
  });

  it('throws error if grade is Normal', () => {
    const gear = defaultGear({
      attributes: {
        canPotential: PotentialCan.Can,
      },
    });

    expect(() => {
      setPotential(gear, PotentialGrade.Normal, [
        { grade: PotentialGrade.Normal, summary: '', option: {} },
      ]);
    }).toThrow();
  });

  it('throws error if options length is less than 1', () => {
    const gear = defaultGear({
      attributes: {
        canPotential: PotentialCan.Can,
      },
    });

    expect(() => {
      setPotential(gear, PotentialGrade.Unique, []);
    }).toThrow();
  });

  it('throws error if options length is greater than 3', () => {
    const gear = defaultGear({
      attributes: {
        canPotential: PotentialCan.Can,
      },
    });

    expect(() => {
      setPotential(gear, PotentialGrade.Unique, [
        { grade: PotentialGrade.Unique, summary: '', option: {} },
        { grade: PotentialGrade.Unique, summary: '', option: {} },
        { grade: PotentialGrade.Unique, summary: '', option: {} },
        { grade: PotentialGrade.Unique, summary: '', option: {} },
      ]);
    }).toThrow();
  });
});

describe('resetPotential', () => {
  it('sets potentialGrade to Normal', () => {
    const gear = defaultGear({
      attributes: {
        canPotential: PotentialCan.Can,
      },
      potentialGrade: PotentialGrade.Unique,
      potentials: [{ grade: PotentialGrade.Unique, summary: '', option: {} }],
    });

    resetPotential(gear);

    expect(gear.potentialGrade).toBe(PotentialGrade.Normal);
  });

  it('sets potentials to empty', () => {
    const gear = defaultGear({
      attributes: {
        canPotential: PotentialCan.Can,
      },
      potentialGrade: PotentialGrade.Unique,
      potentials: [{ grade: PotentialGrade.Unique, summary: '', option: {} }],
    });

    resetPotential(gear);

    expect(gear.potentials).toEqual([]);
  });
});
// Now generate all tests equal but with Additional variant
describe('supportsAdditionalPotential', () => {
  it('is true for canAdditionalPotential === Can', () => {
    const gear = defaultGear({
      attributes: {
        canAdditionalPotential: PotentialCan.Can,
      },
    });

    expect(supportsAdditionalPotential(gear)).toBe(true);
  });

  it('is true for canAdditionalPotential === Fixed', () => {
    const gear = defaultGear({
      attributes: {
        canAdditionalPotential: PotentialCan.Fixed,
      },
    });

    expect(supportsAdditionalPotential(gear)).toBe(true);
  });

  it('is false for canAdditionalPotential === Cannot', () => {
    const gear = defaultGear({
      attributes: {
        canAdditionalPotential: PotentialCan.Cannot,
      },
    });

    expect(supportsAdditionalPotential(gear)).toBe(false);
  });

  it('is true for canAdditionalPotential === None with scrollTotalUpgradeableCount > 0', () => {
    const gear = defaultGear({
      attributes: {
        canAdditionalPotential: PotentialCan.None,
      },
      scrollUpgradeableCount: 1,
    });

    expect(supportsAdditionalPotential(gear)).toBe(true);
  });

  it('is false for canAdditionalPotential === None with scrollTotalUpgradeableCount === 0', () => {
    const gear = defaultGear({
      attributes: {
        canAdditionalPotential: PotentialCan.None,
      },
      scrollUpgradeableCount: 0,
    });

    expect(supportsAdditionalPotential(gear)).toBe(false);
  });

  it('is false for canAdditionalPotential === None with scrollTotalUpgradeableCount > 0 if type is mechanicGear', () => {
    const gear = defaultGear({
      type: GearType.machineArms,
      attributes: {
        canAdditionalPotential: PotentialCan.None,
      },
      scrollUpgradeableCount: 1,
    });

    expect(supportsAdditionalPotential(gear)).toBe(false);
  });

  it('is false for canAdditionalPotential === None with scrollTotalUpgradeableCount > 0 if type is dragonGear', () => {
    const gear = defaultGear({
      type: GearType.dragonMask,
      attributes: {
        canAdditionalPotential: PotentialCan.None,
      },
      scrollUpgradeableCount: 1,
    });

    expect(supportsAdditionalPotential(gear)).toBe(false);
  });

  it.each([
    GearType.soulShield,
    GearType.demonShield,
    GearType.katara,
    GearType.magicArrow,
    GearType.card,
    GearType.orb,
    GearType.dragonEssence,
    GearType.soulRing,
    GearType.magnum,
    GearType.emblem,
    GearType.shield,
    GearType.katara,
    GearType.jewel,
  ])(
    'is true for canAdditionalPotential === None with scrollTotalUpgradeableCount === 0 if type is %s',
    (type) => {
      const gear = defaultGear({
        type,
        attributes: {
          canAdditionalPotential: PotentialCan.None,
        },
        scrollUpgradeableCount: 0,
      });

      expect(supportsAdditionalPotential(gear)).toBe(true);
    },
  );
});

describe('canSetAdditionalPotential', () => {
  it('is true for canAdditionalPotential === Can', () => {
    const gear = defaultGear({
      attributes: {
        canAdditionalPotential: PotentialCan.Can,
      },
    });

    expect(canSetAdditionalPotential(gear)).toBe(true);
  });

  it('is false for canAdditionalPotential === Fixed', () => {
    const gear = defaultGear({
      attributes: {
        canAdditionalPotential: PotentialCan.Fixed,
      },
    });

    expect(canSetAdditionalPotential(gear)).toBe(false);
  });

  it('is false for canAdditionalPotential === Cannot', () => {
    const gear = defaultGear({
      attributes: {
        canAdditionalPotential: PotentialCan.Cannot,
      },
    });

    expect(canSetAdditionalPotential(gear)).toBe(false);
  });
});

describe('setAdditionalPotential', () => {
  it('sets additionalPotentialGrade', () => {
    const gear = defaultGear({
      attributes: {
        canAdditionalPotential: PotentialCan.Can,
      },
    });

    setAdditionalPotential(gear, PotentialGrade.Unique, [
      { grade: PotentialGrade.Unique, summary: '', option: {} },
    ]);

    expect(gear.additionalPotentialGrade).toBe(PotentialGrade.Unique);
  });

  it('sets additionalPotentials', () => {
    const gear = defaultGear({
      attributes: {
        canAdditionalPotential: PotentialCan.Can,
      },
    });

    setAdditionalPotential(gear, PotentialGrade.Unique, [
      { grade: PotentialGrade.Unique, summary: 'test1', option: {} },
      { grade: PotentialGrade.Unique, summary: 'test2', option: {} },
    ]);

    expect(gear.additionalPotentials).toEqual([
      { grade: PotentialGrade.Unique, summary: 'test1', option: {} },
      { grade: PotentialGrade.Unique, summary: 'test2', option: {} },
    ]);
  });

  it('sets additionalPotentials for options with lower grade', () => {
    const gear = defaultGear({
      attributes: {
        canAdditionalPotential: PotentialCan.Can,
      },
    });

    setAdditionalPotential(gear, PotentialGrade.Unique, [
      { grade: PotentialGrade.Epic, summary: 'test1', option: {} },
      { grade: PotentialGrade.Rare, summary: 'test2', option: {} },
    ]);

    expect(gear.additionalPotentials).toEqual([
      { grade: PotentialGrade.Epic, summary: 'test1', option: {} },
      { grade: PotentialGrade.Rare, summary: 'test2', option: {} },
    ]);
  });

  it('sets additionalPotentials for options with higher grade', () => {
    const gear = defaultGear({
      attributes: {
        canAdditionalPotential: PotentialCan.Can,
      },
    });

    setAdditionalPotential(gear, PotentialGrade.Epic, [
      { grade: PotentialGrade.Legendary, summary: 'test1', option: {} },
    ]);

    expect(gear.additionalPotentials).toEqual([
      { grade: PotentialGrade.Legendary, summary: 'test1', option: {} },
    ]);
  });

  it('throws error if canSetAdditionalPotential is false', () => {
    const gear = defaultGear({
      attributes: {
        canAdditionalPotential: PotentialCan.Cannot,
      },
    });

    expect(() => {
      setAdditionalPotential(gear, PotentialGrade.Unique, [
        { grade: PotentialGrade.Unique, summary: '', option: {} },
      ]);
    }).toThrow();
  });

  it('throws error if grade is Normal', () => {
    const gear = defaultGear({
      attributes: {
        canAdditionalPotential: PotentialCan.Can,
      },
    });

    expect(() => {
      setAdditionalPotential(gear, PotentialGrade.Normal, [
        { grade: PotentialGrade.Normal, summary: '', option: {} },
      ]);
    }).toThrow();
  });

  it('throws error if options length is less than 1', () => {
    const gear = defaultGear({
      attributes: {
        canAdditionalPotential: PotentialCan.Can,
      },
    });

    expect(() => {
      setAdditionalPotential(gear, PotentialGrade.Unique, []);
    }).toThrow();
  });

  it('throws error if options length is greater than 3', () => {
    const gear = defaultGear({
      attributes: {
        canAdditionalPotential: PotentialCan.Can,
      },
    });

    expect(() => {
      setAdditionalPotential(gear, PotentialGrade.Unique, [
        { grade: PotentialGrade.Unique, summary: '', option: {} },
        { grade: PotentialGrade.Unique, summary: '', option: {} },
        { grade: PotentialGrade.Unique, summary: '', option: {} },
        { grade: PotentialGrade.Unique, summary: '', option: {} },
      ]);
    }).toThrow();
  });
});

describe('resetAdditionalPotential', () => {
  it('sets additionalPotentialGrade to Normal', () => {
    const gear = defaultGear({
      attributes: {
        canAdditionalPotential: PotentialCan.Can,
      },
      additionalPotentialGrade: PotentialGrade.Unique,
      additionalPotentials: [
        { grade: PotentialGrade.Unique, summary: '', option: {} },
      ],
    });

    resetAdditionalPotential(gear);

    expect(gear.additionalPotentialGrade).toBe(PotentialGrade.Normal);
  });

  it('sets additionalPotentials to empty', () => {
    const gear = defaultGear({
      attributes: {
        canAdditionalPotential: PotentialCan.Can,
      },
      additionalPotentialGrade: PotentialGrade.Unique,
      additionalPotentials: [
        { grade: PotentialGrade.Unique, summary: '', option: {} },
      ],
    });

    resetAdditionalPotential(gear);

    expect(gear.additionalPotentials).toEqual([]);
  });
});
