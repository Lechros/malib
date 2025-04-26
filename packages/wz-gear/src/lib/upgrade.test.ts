import { GearCapability } from '@malib/gear';
import { getCanScroll } from './upgrade';

describe('getCanScroll', () => {
  it('returns Cannot for tuc === undefined', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
    };

    expect(getCanScroll(info)).toBe(GearCapability.Cannot);
  });

  it('returns Cannot for tuc === 0', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
      tuc: 0,
    };

    expect(getCanScroll(info)).toBe(GearCapability.Cannot);
  });

  it('returns Fixed for exceptUpgrade === 1', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
      exceptUpgrade: 1,
      tuc: 1,
    };

    expect(getCanScroll(info)).toBe(GearCapability.Fixed);
  });

  it('returns Can for tuc > 0', () => {
    const info = {
      id: 0,
      name: '',
      icon: '',
      tuc: 1,
    };

    expect(getCanScroll(info)).toBe(GearCapability.Can);
  });
});
