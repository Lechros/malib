import { GearCapability, PotentialGrade } from '../data';
import { createGear } from '../test';
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
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
      },
    });

    expect(supportsPotential(gear)).toBe(true);
  });

  it('is false for canPotential === Fixed', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Fixed,
      },
    });

    expect(supportsPotential(gear)).toBe(false);
  });

  it('is false for canPotential === Cannot', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Cannot,
      },
    });

    expect(supportsPotential(gear)).toBe(false);
  });
});

describe('canSetPotential', () => {
  it('is true for canPotential === Can', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
      },
    });

    expect(canSetPotential(gear)).toBe(true);
  });

  it('is false for canPotential === Fixed', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Fixed,
      },
    });

    expect(canSetPotential(gear)).toBe(false);
  });

  it('is false for canPotential === Cannot', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Cannot,
      },
    });

    expect(canSetPotential(gear)).toBe(false);
  });
});

describe('setPotential', () => {
  it('sets potentialGrade', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
      },
    });

    setPotential(gear, PotentialGrade.Unique, [
      { grade: PotentialGrade.Unique, summary: '', option: {} },
    ]);

    expect(gear.potentialGrade).toBe(PotentialGrade.Unique);
  });

  it('sets potentials', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
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
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
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
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
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
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Cannot,
      },
    });

    expect(() => {
      setPotential(gear, PotentialGrade.Unique, [
        { grade: PotentialGrade.Unique, summary: '', option: {} },
      ]);
    }).toThrow();
  });

  it('throws error if grade is Normal', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
      },
    });

    expect(() => {
      setPotential(gear, PotentialGrade.Normal, [
        { grade: PotentialGrade.Normal, summary: '', option: {} },
      ]);
    }).toThrow();
  });

  it('throws error if options length is less than 1', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
      },
    });

    expect(() => {
      setPotential(gear, PotentialGrade.Unique, []);
    }).toThrow();
  });

  it('throws error if options length is greater than 3', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
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
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
      },
      potentialGrade: PotentialGrade.Unique,
      potentials: [{ grade: PotentialGrade.Unique, summary: '', option: {} }],
    });

    resetPotential(gear);

    expect(gear.potentialGrade).toBe(PotentialGrade.Normal);
  });

  it('sets potentials to empty', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
      },
      potentialGrade: PotentialGrade.Unique,
      potentials: [{ grade: PotentialGrade.Unique, summary: '', option: {} }],
    });

    resetPotential(gear);

    expect(gear.potentials).toEqual([]);
  });
});

describe('supportsAdditionalPotential', () => {
  it('is true for canAdditionalPotential === Can', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
      },
    });

    expect(supportsAdditionalPotential(gear)).toBe(true);
  });

  it('is true for canAdditionalPotential === Fixed', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Fixed,
      },
    });

    expect(supportsAdditionalPotential(gear)).toBe(false);
  });

  it('is false for canAdditionalPotential === Cannot', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Cannot,
      },
    });

    expect(supportsAdditionalPotential(gear)).toBe(false);
  });
});

describe('canSetAdditionalPotential', () => {
  it('is true for canAdditionalPotential === Can', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
      },
    });

    expect(canSetAdditionalPotential(gear)).toBe(true);
  });

  it('is false for canAdditionalPotential === Fixed', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Fixed,
      },
    });

    expect(canSetAdditionalPotential(gear)).toBe(false);
  });

  it('is false for canAdditionalPotential === Cannot', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Cannot,
      },
    });

    expect(canSetAdditionalPotential(gear)).toBe(false);
  });
});

describe('setAdditionalPotential', () => {
  it('sets additionalPotentialGrade', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
      },
    });

    setAdditionalPotential(gear, PotentialGrade.Unique, [
      { grade: PotentialGrade.Unique, summary: '', option: {} },
    ]);

    expect(gear.additionalPotentialGrade).toBe(PotentialGrade.Unique);
  });

  it('sets additionalPotentials', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
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
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
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
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
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
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Cannot,
      },
    });

    expect(() => {
      setAdditionalPotential(gear, PotentialGrade.Unique, [
        { grade: PotentialGrade.Unique, summary: '', option: {} },
      ]);
    }).toThrow();
  });

  it('throws error if grade is Normal', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
      },
    });

    expect(() => {
      setAdditionalPotential(gear, PotentialGrade.Normal, [
        { grade: PotentialGrade.Normal, summary: '', option: {} },
      ]);
    }).toThrow();
  });

  it('throws error if options length is less than 1', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
      },
    });

    expect(() => {
      setAdditionalPotential(gear, PotentialGrade.Unique, []);
    }).toThrow();
  });

  it('throws error if options length is greater than 3', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
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
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
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
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
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
