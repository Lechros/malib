import { GearType } from '../data';
import { createGear, createSoulData } from '../test';
import {
  _updateChargeOption,
  applySoulEnchant,
  canApplySoulEnchant,
  canSetSoul,
  canSetSoulCharge,
  resetSoulEnchant,
  setSoul,
  setSoulCharge,
  supportsSoul,
} from './soulSlot';

describe('supportsSoul', () => {
  it.each([
    GearType.shiningRod,
    GearType.ritualFan,
    GearType.longSword,
    GearType.tuner,
    GearType.dagger,
  ])('is true for weapon gears, type == %d', (type) => {
    const gear = createGear({
      type,
    });

    expect(supportsSoul(gear)).toBe(true);
  });

  it.each([
    GearType.cap,
    GearType.pants,
    GearType.cape,
    GearType.belt,
    GearType.pendant,
    GearType.katara,
    GearType.shield,
  ])('is false for non weapon gears, type == %d', (type) => {
    const gear = createGear({
      type,
    });

    expect(supportsSoul(gear)).toBe(false);
  });

  it.each([
    [0, true],
    [20, true],
    [29, true],
    [30, true],
    [75, true],
    [200, true],
  ])('for reqLevel == %d is %p', (reqLevel, expected) => {
    const gear = createGear({
      type: GearType.thSword,
      req: { level: reqLevel },
    });

    expect(supportsSoul(gear)).toBe(expected);
  });
});

describe('canApplySoulEnchant', () => {
  it('is true for unenchanted gear', () => {
    const gear = createGear({
      type: GearType.bow,
    });

    expect(canApplySoulEnchant(gear)).toBe(true);
  });

  it('is false for enchanted gear', () => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: {},
    });

    expect(canApplySoulEnchant(gear)).toBe(false);
  });
});

describe('applySoulEnchant', () => {
  it('sets soulEnchanted to true', () => {
    const gear = createGear({
      type: GearType.bow,
    });

    applySoulEnchant(gear);

    expect(gear.soulEnchanted).toBe(true);
  });

  it('throws TypeError for non weapon gears', () => {
    const gear = createGear({
      type: GearType.cape,
    });

    expect(() => {
      applySoulEnchant(gear);
    }).toThrow();
  });

  it('throws TypeError for already soul enchanted gears', () => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: {},
    });

    expect(() => {
      applySoulEnchant(gear);
    }).toThrow();
  });
});

describe('canSetSoul', () => {
  it('is true for enchanted gear', () => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: {},
    });

    expect(canSetSoul(gear)).toBe(true);
  });

  it('is true for enchanted gear with soul', () => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: { soul: createSoulData() },
    });

    expect(canSetSoul(gear)).toBe(true);
  });

  it('is false for unenchanted gear', () => {
    const gear = createGear({
      type: GearType.bow,
    });

    expect(canSetSoul(gear)).toBe(false);
  });
});

describe('setSoul', () => {
  it('sets soul name to 위대한 카링의 소울', () => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: {},
    });
    const soul = createSoulData({ name: '위대한 카링의 소울' });

    setSoul(gear, soul);

    expect(gear.soul?.name).toBe('위대한 카링의 소울');
  });

  it('sets soul charge option to { attackPower: 20 }', () => {
    const gear = createGear({
      type: GearType.bow,
      baseOption: { attackPower: 170 },
      soulSlot: { charge: 1000 },
    });
    const soul = createSoulData({ chargeFactor: 2 });

    setSoul(gear, soul);

    expect(gear.soulChargeOption).toEqual({ attackPower: 20 });
  });

  it('sets soul charge option to { magicPower: 10 }', () => {
    const gear = createGear({
      type: GearType.staff,
      baseOption: { attackPower: 90, magicPower: 200 },
      soulSlot: { charge: 100 },
    });
    const soul = createSoulData({ chargeFactor: 2 });

    setSoul(gear, soul);

    expect(gear.soulChargeOption).toEqual({ magicPower: 10 });
  });

  it('throws TypeError for unenchanted gear', () => {
    const gear = createGear({
      type: GearType.bow,
    });
    const soul = createSoulData();

    expect(() => {
      setSoul(gear, soul);
    }).toThrow();
  });
});

describe('canSetSoulCharge', () => {
  it('is true for enchanted gear', () => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: {},
    });

    expect(canSetSoulCharge(gear)).toBe(true);
  });
});

describe('setSoulCharge', () => {
  it.each([0, 1, 100, 500, 999, 1000])('sets soul charge', (charge) => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: {},
    });

    setSoulCharge(gear, charge);

    expect(gear.soulCharge).toBe(charge);
  });

  it('sets soul charge option', () => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: {},
    });

    setSoulCharge(gear, 200);

    expect(gear.soulChargeOption).toEqual({ attackPower: 6 });
  });

  it.each([-1000, -100, -1, 1001, 2000])(
    'throws TypeError for charge == %d',
    (charge) => {
      const gear = createGear({
        type: GearType.bow,
        soulSlot: {},
      });

      expect(() => {
        setSoulCharge(gear, charge);
      }).toThrow();
    },
  );

  it('throws TypeError for unenchanted gear', () => {
    const gear = createGear({
      type: GearType.bow,
    });

    expect(() => {
      setSoulCharge(gear, 700);
    }).toThrow();
  });
});

describe('resetSoulEnchant', () => {
  it('resets soulEnchanted', () => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: {},
    });

    resetSoulEnchant(gear);

    expect(gear.soulEnchanted).toBe(false);
  });

  it('resets soul', () => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: {},
    });

    resetSoulEnchant(gear);

    expect(gear.soul).toBeUndefined();
  });

  it('resets soulCharge', () => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: {},
    });

    resetSoulEnchant(gear);

    expect(gear.soulCharge).toBe(0);
  });

  it('resets soulChargeOption', () => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: {},
    });

    resetSoulEnchant(gear);

    expect(gear.soulChargeOption).toEqual({});
  });
});

describe('_updateChargeOption', () => {
  it.each([
    [1, 0, 0],
    [1, 1, 10],
    [1, 99, 10],
    [1, 100, 10],
    [1, 101, 11],
    [1, 200, 11],
    [1, 300, 12],
    [1, 399, 13],
    [1, 400, 13],
    [1, 401, 14],
    [1, 500, 14],
    [1, 501, 15],
    [1, 1000, 15],
    [2, 0, 0],
    [2, 1, 10],
    [2, 99, 10],
    [2, 100, 10],
    [2, 101, 12],
    [2, 200, 12],
    [2, 300, 14],
    [2, 399, 16],
    [2, 400, 16],
    [2, 401, 18],
    [2, 500, 18],
    [2, 501, 20],
    [2, 1000, 20],
  ] as const)(
    'chargeFactor === %d, charge === %d, sets %d',
    (chargeFactor, charge, expected) => {
      const gear = createGear({
        type: GearType.bow,
        soulSlot: {
          soul: createSoulData({ chargeFactor }),
          charge,
        },
      });

      _updateChargeOption(gear);

      expect(gear.soulChargeOption.attackPower).toBe(expected);
    },
  );
});
