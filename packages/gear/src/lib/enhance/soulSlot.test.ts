import { GearType } from '../data';
import { GearError } from '../errors';
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
  ])('무기(장비 분류: %d)일 경우 true를 반환한다.', (type) => {
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
  ])('무기가 아닌 장비(장비 분류: %d)일 경우 false를 반환한다.', (type) => {
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
  ])('요구 레벨에 관계 없이 true를 반환한다.', (reqLevel, expected) => {
    const gear = createGear({
      type: GearType.thSword,
      req: { level: reqLevel },
    });

    expect(supportsSoul(gear)).toBe(expected);
  });
});

describe('canApplySoulEnchant', () => {
  it('소울 인챈트가 적용되지 않았을을 경우 true를 반환한다.', () => {
    const gear = createGear({
      type: GearType.bow,
    });

    expect(canApplySoulEnchant(gear)).toBe(true);
  });

  it('소울 인챈트가 적용되었을 경우 false를 반환한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: {},
    });

    expect(canApplySoulEnchant(gear)).toBe(false);
  });
});

describe('applySoulEnchant', () => {
  it('소울 인챈트를 적용한다.', () => {
    const gear = createGear({
      type: GearType.bow,
    });

    applySoulEnchant(gear);

    expect(gear.soulEnchanted).toBe(true);
  });

  it('무기가 아닌 장비일 경우 GearError가 발생한다.', () => {
    const gear = createGear({
      type: GearType.cape,
    });

    expect(() => {
      applySoulEnchant(gear);
    }).toThrow(GearError);
  });

  it('이미 소울 인챈트가 적용되었을 경우 GearError가 발생한다.', () => {
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
  it('소울 인챈트가 적용되었을 경우 true를 반환한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: {},
    });

    expect(canSetSoul(gear)).toBe(true);
  });

  it('소울 인챈트가 적용되고 소울이 장착된 경우 true를 반환한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: { soul: createSoulData() },
    });

    expect(canSetSoul(gear)).toBe(true);
  });

  it('소울 인챈트가 적용되지 않았을 경우 false를 반환한다.', () => {
    const gear = createGear({
      type: GearType.bow,
    });

    expect(canSetSoul(gear)).toBe(false);
  });
});

describe('setSoul', () => {
  it('소울 정보를 설정한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: {},
    });
    const soul = createSoulData({ name: '위대한 카링의 소울' });

    setSoul(gear, soul);

    expect(gear.soul).toEqual(soul);
  });

  it('공격력 무기의 소울 충전 옵션을 갱신한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      baseOption: { attackPower: 170 },
      soulSlot: { charge: 1000 },
    });
    const soul = createSoulData({ chargeFactor: 2 });

    setSoul(gear, soul);

    expect(gear.soulChargeOption).toEqual({ attackPower: 20 });
  });

  it('마력 무기의 소울 충전 옵션을 갱신한다.', () => {
    const gear = createGear({
      type: GearType.staff,
      baseOption: { attackPower: 90, magicPower: 200 },
      soulSlot: { charge: 100 },
    });
    const soul = createSoulData({ chargeFactor: 2 });

    setSoul(gear, soul);

    expect(gear.soulChargeOption).toEqual({ magicPower: 10 });
  });

  it('소울 인챈트가 적용되지 않았을 경우 GearError가 발생한다.', () => {
    const gear = createGear({
      type: GearType.bow,
    });
    const soul = createSoulData();

    expect(() => {
      setSoul(gear, soul);
    }).toThrow(GearError);
  });
});

describe('canSetSoulCharge', () => {
  it('소울 인챈트가 적용되었을 경우 true를 반환한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: {},
    });

    expect(canSetSoulCharge(gear)).toBe(true);
  });

  it('소울 인챈트가 적용되지 않았을 경우 false를 반환한다.', () => {
    const gear = createGear({
      type: GearType.bow,
    });

    expect(canSetSoulCharge(gear)).toBe(false);
  });
});

describe('setSoulCharge', () => {
  it.each([0, 1, 100, 500, 999, 1000])('소울 충전량을 설정한다.', (charge) => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: {},
    });

    setSoulCharge(gear, charge);

    expect(gear.soulCharge).toBe(charge);
  });

  it('소울 충전 옵션을 설정한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: {},
    });

    setSoulCharge(gear, 200);

    expect(gear.soulChargeOption).toEqual({ attackPower: 6 });
  });

  it.each([-1000, -100, -1, 1001, 2000])(
    '소울 충전량이 0 미만 또는 1000 초과일 경우 RangeError가 발생한다.',
    (charge) => {
      const gear = createGear({
        type: GearType.bow,
        soulSlot: {},
      });

      expect(() => {
        setSoulCharge(gear, charge);
      }).toThrow(RangeError);
    },
  );

  it('소울 인챈트가 적용되지 않았을 경우 GearError가 발생한다.', () => {
    const gear = createGear({
      type: GearType.bow,
    });

    expect(() => {
      setSoulCharge(gear, 700);
    }).toThrow(GearError);
  });
});

describe('resetSoulEnchant', () => {
  it('소울 인챈트를 해제한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: {},
    });

    resetSoulEnchant(gear);

    expect(gear.soulEnchanted).toBe(false);
  });

  it('소울을 초기화한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: {},
    });

    resetSoulEnchant(gear);

    expect(gear.soul).toBeUndefined();
  });

  it('소울 충전량을 초기화한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      soulSlot: {},
    });

    resetSoulEnchant(gear);

    expect(gear.soulCharge).toBe(0);
  });

  it('소울 충전 옵션을 초기화한다.', () => {
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
    '소울 충전 옵션 배율=%d, 소울 충전량=%d일 때 공격력을 %d로 설정한다.',
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
