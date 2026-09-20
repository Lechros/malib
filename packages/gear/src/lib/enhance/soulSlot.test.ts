import { GearType } from '../data';
import { GearError } from '../errors';
import { createGear, createSoulData } from '../test';
import {
  applySoulEnchant,
  canApplySoulEnchant,
  canSetSoul,
  getSoulBaseOption,
  resetSoulEnchant,
  setSoul,
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
});

describe('getSoulBaseOption', () => {
  it.each([
    [170, 0, { attackPower: 20 }],
    [90, 200, { magicPower: 20 }],
    [100, 100, { attackPower: 20 }],
  ])(
    '기본 공격력 %d, 마력 %d에 따라 고정 옵션을 반환한다.',
    (attackPower, magicPower, expected) => {
      const gear = createGear({
        type: GearType.bow,
        baseOption: { attackPower, magicPower },
        soulSlot: { soul: createSoulData() },
      });

      expect(getSoulBaseOption(gear)).toEqual(expected);
    },
  );

  it.each([undefined, {}])('소울이 없으면 옵션이 없다: %j', (soulSlot) => {
    const gear = createGear({ type: GearType.bow, soulSlot });

    expect(getSoulBaseOption(gear)).toBeUndefined();
  });
});
