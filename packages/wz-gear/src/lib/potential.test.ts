import { GearType, GearCapability } from '@malib/gear';
import {
  getCanAdditionalPotential,
  getCanPotential,
  typeSupportsPotential,
} from './potential';

describe('getCanPotential', () => {
  it('returns Can for tuc > 0', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
      tuc: 1,
    };

    expect(getCanPotential(info, GearType.cap)).toBe(GearCapability.Can);
  });

  it('returns true for tuc === 0 and tucIgnoreForPotential === 1', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
      tuc: 0,
      tucIgnoreForPotential: 1,
    };

    expect(getCanPotential(info, GearType.cap)).toBe(GearCapability.Can);
  });

  it.each([
    GearType.machineEngine,
    GearType.machineArms,
    GearType.machineLegs,
    GearType.machineBody,
    GearType.machineTransistors,
    GearType.dragonMask,
    GearType.dragonPendant,
    GearType.dragonWings,
    GearType.dragonTail,
  ])('returns false for tuc > 0 and type === %p', (type) => {
    const info = {
      id: 0,
      name: '',
      icon: '',
      tuc: 1,
      type,
    };

    expect(getCanPotential(info, type)).toBe(GearCapability.Cannot);
  });

  it('returns false for noPotential === 1', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
      noPotential: 1,
    };

    expect(getCanPotential(info, GearType.cap)).toBe(GearCapability.Cannot);
  });

  it('returns Fixed for fixedPotential === 1', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
      fixedPotential: 1,
    };

    expect(getCanPotential(info, GearType.cap)).toBe(GearCapability.Fixed);
  });

  it('returns by type for other cases', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
    };

    expect(getCanPotential(info, GearType.katara)).toBe(GearCapability.Can);
  });
});

describe('getCanAdditionalPotential', () => {
  it('returns Can for tuc > 0', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
      tuc: 1,
    };

    expect(getCanAdditionalPotential(info, GearType.cap)).toBe(
      GearCapability.Can,
    );
  });

  it('returns true for tuc === 0 and tucIgnoreForPotential === 1', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
      tuc: 0,
      tucIgnoreForPotential: 1,
    };

    expect(getCanAdditionalPotential(info, GearType.cap)).toBe(
      GearCapability.Can,
    );
  });

  it.each([
    GearType.machineEngine,
    GearType.machineArms,
    GearType.machineLegs,
    GearType.machineBody,
    GearType.machineTransistors,
    GearType.dragonMask,
    GearType.dragonPendant,
    GearType.dragonWings,
    GearType.dragonTail,
  ])('returns false for tuc > 0 and type === %p', (type) => {
    const info = {
      id: 0,
      name: '',
      icon: '',
      tuc: 1,
      type,
    };

    expect(getCanAdditionalPotential(info, type)).toBe(GearCapability.Cannot);
  });

  it('returns false for noPotential === 1', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
      noPotential: 1,
    };

    expect(getCanAdditionalPotential(info, GearType.cap)).toBe(
      GearCapability.Cannot,
    );
  });

  it('returns Cannot for fixedPotential === 1', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
      fixedPotential: 1,
    };

    expect(getCanAdditionalPotential(info, GearType.cap)).toBe(
      GearCapability.Cannot,
    );
  });

  it('returns by type for other cases', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
    };

    expect(getCanAdditionalPotential(info, GearType.katara)).toBe(
      GearCapability.Can,
    );
  });
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
    expect(typeSupportsPotential(type)).toBe(true);
  },
);
