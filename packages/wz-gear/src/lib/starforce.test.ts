import { GearType, StarforceCan } from '@malib/gear';
import { getCanStarforce } from './starforce';

describe('getCanStarforce', () => {
  it('returns Cannot for tuc === undefined', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
    };

    expect(getCanStarforce(info, GearType.cap)).toBe(StarforceCan.Cannot);
  });

  it('returns Cannot for tuc === 0', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
      tuc: 0,
    };

    expect(getCanStarforce(info, GearType.cap)).toBe(StarforceCan.Cannot);
  });

  it('returns Cannot for onlyUpgrade === 1', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
      onlyUpgrade: 1,
    };

    expect(getCanStarforce(info, GearType.cap)).toBe(StarforceCan.Cannot);
  });

  it('returns Fixed for exceptUpgrade === 1', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
      exceptUpgrade: 1,
      tuc: 1,
    };

    expect(getCanStarforce(info, GearType.cap)).toBe(StarforceCan.Fixed);
  });

  it('returns Cannot for mechanic gear', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
    };

    expect(getCanStarforce(info, GearType.machineArms)).toBe(
      StarforceCan.Cannot,
    );
  });

  it('returns Cannot for dragon gear', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
    };

    expect(getCanStarforce(info, GearType.dragonPendant)).toBe(
      StarforceCan.Cannot,
    );
  });

  it('returns Can for other cases', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
      tuc: 1,
    };

    expect(getCanStarforce(info, GearType.katara)).toBe(StarforceCan.Can);
  });
});
