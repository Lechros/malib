import { GearOption, GearType } from '../data';
import { createGear } from '../test';
import {
  _getAccSpellTrace,
  _getArmorSpellTrace,
  _getGloveSpellTrace,
  _getHeartSpellTrace,
  _getWeaponSpellTrace,
  getSpellTraceScroll,
  SpellTrace,
  SpellTraceRate,
  SpellTraceType,
} from './spellTrace';

describe('getSpellTraceScroll', () => {
  it.each([
    [
      GearType.katara,
      120,
      SpellTraceType.dex,
      30,
      '30% 공격력(민첩) 주문서',
      { dex: 3, attackPower: 7 },
    ],
    [
      GearType.glove,
      100,
      SpellTraceType.dex,
      15,
      '15% 공격력 주문서',
      { attackPower: 4 },
    ],
    [
      GearType.shoes,
      250,
      SpellTraceType.int,
      15,
      '15% 지력 주문서',
      { int: 10, maxHp: 170, armor: 15 },
    ],
    [
      GearType.belt,
      200,
      SpellTraceType.maxHp,
      70,
      '70% 체력 주문서',
      { maxHp: 150 },
    ],
    [
      GearType.machineHeart,
      100,
      SpellTraceType.luk,
      30,
      '30% 공격력 주문서',
      { attackPower: 5 },
    ],
  ] satisfies [
    GearType,
    number,
    SpellTraceType,
    SpellTraceRate,
    string,
    Partial<GearOption>,
  ][])(
    '올바른 이름과 옵션을 반환한다. 장비분류: %d, 요구 레벨: %d, 종류: %s, 확률: %d -> 이름: %s, 옵션: %p',
    (gearType, reqLevel, type, rate, expectedName, expectedOption) => {
      const gear = createGear({
        type: gearType,
        req: { level: reqLevel },
      });

      const scroll = getSpellTraceScroll(gear, type, rate);

      expect(scroll.name).toBe(expectedName);
      expect(scroll.option).toEqual(expectedOption);
    },
  );

  it.each([
    [GearType.katara, SpellTraceType.dex, 30],
    [GearType.glove, SpellTraceType.dex, 15],
    [GearType.shoes, SpellTraceType.int, 15],
    [GearType.belt, SpellTraceType.maxHp, 70],
    [GearType.machineHeart, SpellTraceType.luk, 30],
  ] satisfies [GearType, SpellTraceType, SpellTraceRate][])(
    '반환하는 주문서 정보의 type, rate는 입력과 동일하다.',
    (gearType, type, rate) => {
      const gear = createGear({
        type: gearType,
        req: { level: 120 },
      });

      const scroll = getSpellTraceScroll(gear, type, rate);

      expect(scroll.type).toBe(type);
      expect(scroll.rate).toBe(rate);
    },
  );

  it('reqLevelIncrease을 포함한 요구 레벨로 계산한다.', () => {
    const gear = createGear({
      type: GearType.cap,
      req: { level: 110, levelIncrease: 10 },
    });
    const expected: SpellTrace = {
      name: '70% 힘 주문서',
      option: {
        str: 4,
        maxHp: 70,
        armor: 5,
      },
      type: SpellTraceType.str,
      rate: 70,
    };

    const scroll = getSpellTraceScroll(gear, SpellTraceType.str, 70);

    expect(scroll).toEqual(expected);
  });
});

describe('_getWeaponSpellTrace', () => {
  it.each([
    ...map([GearType.bow, 20], [
      [SpellTraceType.str, 100, '100% 공격력 주문서', { attackPower: 1 }],
      [SpellTraceType.str, 70, '70% 공격력 주문서', { attackPower: 2 }],
      [SpellTraceType.str, 30, '30% 공격력(힘) 주문서', { attackPower: 3, str: 1 }],
      [SpellTraceType.str, 15, '15% 공격력(힘) 주문서', { attackPower: 5, str: 2 }],
      [SpellTraceType.dex, 100, '100% 공격력 주문서', { attackPower: 1 }],
      [SpellTraceType.dex, 70, '70% 공격력 주문서', { attackPower: 2 }],
      [SpellTraceType.dex, 30, '30% 공격력(민첩) 주문서', { attackPower: 3, dex: 1 }],
      [SpellTraceType.dex, 15, '15% 공격력(민첩) 주문서', { attackPower: 5, dex: 2 }],
      [SpellTraceType.int, 100, '100% 마력 주문서', { magicPower: 1 }],
      [SpellTraceType.int, 70, '70% 마력 주문서', { magicPower: 2 }],
      [SpellTraceType.int, 30, '30% 마력(지력) 주문서', { magicPower: 3, int: 1 }],
      [SpellTraceType.int, 15, '15% 마력(지력) 주문서', { magicPower: 5, int: 2 }],
      [SpellTraceType.luk, 100, '100% 공격력 주문서', { attackPower: 1 }],
      [SpellTraceType.luk, 70, '70% 공격력 주문서', { attackPower: 2 }],
      [SpellTraceType.luk, 30, '30% 공격력(운) 주문서', { attackPower: 3, luk: 1 }],
      [SpellTraceType.luk, 15, '15% 공격력(운) 주문서', { attackPower: 5, luk: 2 }],
      [SpellTraceType.maxHp, 100, '100% 공격력 주문서', { attackPower: 1 }],
      [SpellTraceType.maxHp, 70, '70% 공격력 주문서', { attackPower: 2 }],
      [SpellTraceType.maxHp, 30, '30% 공격력(체력) 주문서', { attackPower: 3, maxHp: 50 }],
      [SpellTraceType.maxHp, 15, '15% 공격력(체력) 주문서', { attackPower: 5, maxHp: 100 }],
    ] as [SpellTraceType, SpellTraceRate, string, Partial<GearOption>][]), // prettier-ignore
    ...map([GearType.bow, 100], [
      [SpellTraceType.str, 100, '100% 공격력 주문서', { attackPower: 2 }],
      [SpellTraceType.str, 70, '70% 공격력(힘) 주문서', { attackPower: 3, str: 1 }],
      [SpellTraceType.str, 30, '30% 공격력(힘) 주문서', { attackPower: 5, str: 2 }],
      [SpellTraceType.str, 15, '15% 공격력(힘) 주문서', { attackPower: 7, str: 3 }],
      [SpellTraceType.dex, 100, '100% 공격력 주문서', { attackPower: 2 }],
      [SpellTraceType.dex, 70, '70% 공격력(민첩) 주문서', { attackPower: 3, dex: 1 }],
      [SpellTraceType.dex, 30, '30% 공격력(민첩) 주문서', { attackPower: 5, dex: 2 }],
      [SpellTraceType.dex, 15, '15% 공격력(민첩) 주문서', { attackPower: 7, dex: 3 }],
      [SpellTraceType.int, 100, '100% 마력 주문서', { magicPower: 2 }],
      [SpellTraceType.int, 70, '70% 마력(지력) 주문서', { magicPower: 3, int: 1 }],
      [SpellTraceType.int, 30, '30% 마력(지력) 주문서', { magicPower: 5, int: 2 }],
      [SpellTraceType.int, 15, '15% 마력(지력) 주문서', { magicPower: 7, int: 3 }],
      [SpellTraceType.luk, 100, '100% 공격력 주문서', { attackPower: 2 }],
      [SpellTraceType.luk, 70, '70% 공격력(운) 주문서', { attackPower: 3, luk: 1 }],
      [SpellTraceType.luk, 30, '30% 공격력(운) 주문서', { attackPower: 5, luk: 2 }],
      [SpellTraceType.luk, 15, '15% 공격력(운) 주문서', { attackPower: 7, luk: 3 }],
      [SpellTraceType.maxHp, 100, '100% 공격력 주문서', { attackPower: 2 }],
      [SpellTraceType.maxHp, 70, '70% 공격력(체력) 주문서', { attackPower: 3, maxHp: 50 }],
      [SpellTraceType.maxHp, 30, '30% 공격력(체력) 주문서', { attackPower: 5, maxHp: 100 }],
      [SpellTraceType.maxHp, 15, '15% 공격력(체력) 주문서', { attackPower: 7, maxHp: 150 }],
    ] as [SpellTraceType, SpellTraceRate, string, Partial<GearOption>][]), // prettier-ignore
    ...map([GearType.bow, 200], [
      [SpellTraceType.str, 100, '100% 공격력(힘) 주문서', { attackPower: 3, str: 1 }],
      [SpellTraceType.str, 70, '70% 공격력(힘) 주문서', { attackPower: 5, str: 2 }],
      [SpellTraceType.str, 30, '30% 공격력(힘) 주문서', { attackPower: 7, str: 3 }],
      [SpellTraceType.str, 15, '15% 공격력(힘) 주문서', { attackPower: 9, str: 4 }],
      [SpellTraceType.dex, 100, '100% 공격력(민첩) 주문서', { attackPower: 3, dex: 1 }],
      [SpellTraceType.dex, 70, '70% 공격력(민첩) 주문서', { attackPower: 5, dex: 2 }],
      [SpellTraceType.dex, 30, '30% 공격력(민첩) 주문서', { attackPower: 7, dex: 3 }],
      [SpellTraceType.dex, 15, '15% 공격력(민첩) 주문서', { attackPower: 9, dex: 4 }],
      [SpellTraceType.int, 100, '100% 마력(지력) 주문서', { magicPower: 3, int: 1 }],
      [SpellTraceType.int, 70, '70% 마력(지력) 주문서', { magicPower: 5, int: 2 }],
      [SpellTraceType.int, 30, '30% 마력(지력) 주문서', { magicPower: 7, int: 3 }],
      [SpellTraceType.int, 15, '15% 마력(지력) 주문서', { magicPower: 9, int: 4 }],
      [SpellTraceType.luk, 100, '100% 공격력(운) 주문서', { attackPower: 3, luk: 1 }],
      [SpellTraceType.luk, 70, '70% 공격력(운) 주문서', { attackPower: 5, luk: 2 }],
      [SpellTraceType.luk, 30, '30% 공격력(운) 주문서', { attackPower: 7, luk: 3 }],
      [SpellTraceType.luk, 15, '15% 공격력(운) 주문서', { attackPower: 9, luk: 4 }],
      [SpellTraceType.maxHp, 100, '100% 공격력(체력) 주문서', { attackPower: 3, maxHp: 50 }],
      [SpellTraceType.maxHp, 70, '70% 공격력(체력) 주문서', { attackPower: 5, maxHp: 100 }],
      [SpellTraceType.maxHp, 30, '30% 공격력(체력) 주문서', { attackPower: 7, maxHp: 150 }],
      [SpellTraceType.maxHp, 15, '15% 공격력(체력) 주문서', { attackPower: 9, maxHp: 200 }],
    ] as [SpellTraceType, SpellTraceRate, string, Partial<GearOption>][]), // prettier-ignore
  ] satisfies [
    GearType,
    number,
    SpellTraceType,
    SpellTraceRate,
    string,
    Partial<GearOption>,
  ][])(
    '올바른 이름과 옵션을 반환한다. 장비분류: %d, 요구 레벨: %d, 종류: %s, 확률: %d -> 이름: %s, 옵션: %p',
    (gearType, reqLevel, type, rate, expectedName, expectedOption) => {
      const gear = createGear({
        type: gearType,
        req: { level: reqLevel },
      });

      const scroll = _getWeaponSpellTrace(gear, type, rate);

      expect(scroll.name).toEqual(expectedName);
      expect(scroll.option).toEqual(expectedOption);
    },
  );

  it('의 인자로 allStat을 전달하면 예외가 발생한다.', () => {
    const gear = createGear({
      type: GearType.cane,
      req: { level: 120 },
    });

    expect(() =>
      _getWeaponSpellTrace(gear, SpellTraceType.allStat, 30),
    ).toThrow();
  });
});

describe('_getGloveSpellTrace', () => {
  it.each([
    ...map([GearType.glove, 20], [
      [SpellTraceType.str, 100, '100% 방어력 주문서', { armor: 3 }],
      [SpellTraceType.str, 70, '70% 공격력 주문서', { attackPower: 1 }],
      [SpellTraceType.str, 30, '30% 공격력 주문서', { attackPower: 2 }],
      [SpellTraceType.str, 15, '15% 공격력 주문서', { attackPower: 3 }],
      [SpellTraceType.int, 100, '100% 방어력 주문서', { armor: 3 }],
      [SpellTraceType.int, 70, '70% 마력 주문서', { magicPower: 1 }],
      [SpellTraceType.int, 30, '30% 마력 주문서', { magicPower: 2 }],
      [SpellTraceType.int, 15, '15% 마력 주문서', { magicPower: 3 }],
      [SpellTraceType.luk, 15, '15% 공격력 주문서', { attackPower: 3 }],
      [SpellTraceType.maxHp, 15, '15% 공격력 주문서', { attackPower: 3 }],
      [SpellTraceType.allStat, 15, '15% 공격력 주문서', { attackPower: 3 }],
    ] as [SpellTraceType, SpellTraceRate, string, Partial<GearOption>][]),
    ...map([GearType.glove, 100], [
      [SpellTraceType.str, 100, '100% 공격력 주문서', { attackPower: 1 }],
      [SpellTraceType.str, 70, '70% 공격력 주문서', { attackPower: 2 }],
      [SpellTraceType.str, 30, '30% 공격력 주문서', { attackPower: 3 }],
      [SpellTraceType.str, 15, '15% 공격력 주문서', { attackPower: 4 }],
      [SpellTraceType.int, 100, '100% 마력 주문서', { magicPower: 1 }],
      [SpellTraceType.int, 70, '70% 마력 주문서', { magicPower: 2 }],
      [SpellTraceType.int, 30, '30% 마력 주문서', { magicPower: 3 }],
      [SpellTraceType.int, 15, '15% 마력 주문서', { magicPower: 4 }],
      [SpellTraceType.luk, 15, '15% 공격력 주문서', { attackPower: 4 }],
      [SpellTraceType.maxHp, 15, '15% 공격력 주문서', { attackPower: 4 }],
      [SpellTraceType.allStat, 15, '15% 공격력 주문서', { attackPower: 4 }],
    ] as [SpellTraceType, SpellTraceRate, string, Partial<GearOption>][]),
    ...map([GearType.glove, 250], [
      [SpellTraceType.str, 100, '100% 공격력 주문서', { attackPower: 1 }],
      [SpellTraceType.str, 70, '70% 공격력 주문서', { attackPower: 2 }],
      [SpellTraceType.str, 30, '30% 공격력 주문서', { attackPower: 3 }],
      [SpellTraceType.str, 15, '15% 공격력 주문서', { attackPower: 4 }],
      [SpellTraceType.int, 100, '100% 마력 주문서', { magicPower: 1 }],
      [SpellTraceType.int, 70, '70% 마력 주문서', { magicPower: 2 }],
      [SpellTraceType.int, 30, '30% 마력 주문서', { magicPower: 3 }],
      [SpellTraceType.int, 15, '15% 마력 주문서', { magicPower: 4 }],
      [SpellTraceType.luk, 15, '15% 공격력 주문서', { attackPower: 4 }],
      [SpellTraceType.maxHp, 15, '15% 공격력 주문서', { attackPower: 4 }],
      [SpellTraceType.allStat, 15, '15% 공격력 주문서', { attackPower: 4 }],
    ] as [SpellTraceType, SpellTraceRate, string, Partial<GearOption>][]),
  ])(
    '올바른 이름과 옵션을 반환한다. 장비분류: %d, 요구 레벨: %d, 종류: %s, 확률: %d -> 이름: %s, 옵션: %p',
    (gearType, reqLevel, type, rate, expectedName, expectedOption) => {
      const gear = createGear({
        type: gearType,
        req: { level: reqLevel },
      });

      const scroll = _getGloveSpellTrace(gear, type, rate);

      expect(scroll.name).toEqual(expectedName);
      expect(scroll.option).toEqual(expectedOption);
    },
  );
});

describe('_getArmorSpellTrace', () => {
  it.each([
    ...map([GearType.shoulder, 20], [
      [SpellTraceType.str, 100,'100% 힘 주문서', { str: 1, maxHp: 5, armor: 1 }],
      [SpellTraceType.str, 70,'70% 힘 주문서', { str: 2, maxHp: 15, armor: 2 }],
      [SpellTraceType.str, 30,'30% 힘 주문서', { str: 3, maxHp: 30, armor: 4 }],
      [SpellTraceType.str, 15,'15% 힘 주문서', { str: 4, maxHp: 45, armor: 6 }],
      [SpellTraceType.dex, 100,'100% 민첩 주문서', { dex: 1, maxHp: 5, armor: 1 }],
      [SpellTraceType.dex, 70,'70% 민첩 주문서', { dex: 2, maxHp: 15, armor: 2 }],
      [SpellTraceType.dex, 30,'30% 민첩 주문서', { dex: 3, maxHp: 30, armor: 4 }],
      [SpellTraceType.dex, 15,'15% 민첩 주문서', { dex: 4, maxHp: 45, armor: 6 }],
      [SpellTraceType.int, 100,'100% 지력 주문서', { int: 1, maxHp: 5, armor: 1 }],
      [SpellTraceType.int, 70,'70% 지력 주문서', { int: 2, maxHp: 15, armor: 2 }],
      [SpellTraceType.int, 30,'30% 지력 주문서', { int: 3, maxHp: 30, armor: 4 }],
      [SpellTraceType.int, 15,'15% 지력 주문서', { int: 4, maxHp: 45, armor: 6 }],
      [SpellTraceType.luk, 100,'100% 운 주문서', { luk: 1, maxHp: 5, armor: 1 }],
      [SpellTraceType.luk, 70,'70% 운 주문서', { luk: 2, maxHp: 15, armor: 2 }],
      [SpellTraceType.luk, 30,'30% 운 주문서', { luk: 3, maxHp: 30, armor: 4 }],
      [SpellTraceType.luk, 15,'15% 운 주문서', { luk: 4, maxHp: 45, armor: 6 }],
      [SpellTraceType.maxHp, 100,'100% 체력 주문서', { maxHp: 50 + 5, armor: 1 }],
      [SpellTraceType.maxHp, 70,'70% 체력 주문서', { maxHp: 100 + 15, armor: 2 }],
      [SpellTraceType.maxHp, 30,'30% 체력 주문서', { maxHp: 150 + 30, armor: 4 }],
      [SpellTraceType.maxHp, 15,'15% 체력 주문서', { maxHp: 200 + 45, armor: 6 }],
      [SpellTraceType.allStat, 30,'30% 올스탯 주문서', { str: 1, dex: 1, int: 1, luk: 1, maxHp: 30, armor: 4 }],
      [SpellTraceType.allStat, 15,'15% 올스탯 주문서', { str: 2, dex: 2, int: 2, luk: 2, maxHp: 45, armor: 6 }],
    ] as [SpellTraceType, SpellTraceRate, string, Partial<GearOption>][]), // prettier-ignore
    ...map([GearType.shoulder, 100], [
      [SpellTraceType.str, 100, '100% 힘 주문서', { str: 2, maxHp: 20, armor: 2 }],
      [SpellTraceType.str, 70, '70% 힘 주문서', { str: 3, maxHp: 40, armor: 4 }],
      [SpellTraceType.str, 30, '30% 힘 주문서', { str: 5, maxHp: 70, armor: 7 }],
      [SpellTraceType.str, 15, '15% 힘 주문서', { str: 7, maxHp: 110, armor: 10 }],
      [SpellTraceType.dex, 100, '100% 민첩 주문서', { dex: 2, maxHp: 20, armor: 2 }],
      [SpellTraceType.dex, 70, '70% 민첩 주문서', { dex: 3, maxHp: 40, armor: 4 }],
      [SpellTraceType.dex, 30, '30% 민첩 주문서', { dex: 5, maxHp: 70, armor: 7 }],
      [SpellTraceType.dex, 15, '15% 민첩 주문서', { dex: 7, maxHp: 110, armor: 10 }],
      [SpellTraceType.int, 100, '100% 지력 주문서', { int: 2, maxHp: 20, armor: 2 }],
      [SpellTraceType.int, 70, '70% 지력 주문서', { int: 3, maxHp: 40, armor: 4 }],
      [SpellTraceType.int, 30, '30% 지력 주문서', { int: 5, maxHp: 70, armor: 7 }],
      [SpellTraceType.int, 15, '15% 지력 주문서', { int: 7, maxHp: 110, armor: 10 }],
      [SpellTraceType.luk, 100, '100% 운 주문서', { luk: 2, maxHp: 20, armor: 2 }],
      [SpellTraceType.luk, 70, '70% 운 주문서', { luk: 3, maxHp: 40, armor: 4 }],
      [SpellTraceType.luk, 30, '30% 운 주문서', { luk: 5, maxHp: 70, armor: 7 }],
      [SpellTraceType.luk, 15, '15% 운 주문서', { luk: 7, maxHp: 110, armor: 10 }],
      [SpellTraceType.maxHp, 100, '100% 체력 주문서', { maxHp: 120, armor: 2 }],
      [SpellTraceType.maxHp, 70, '70% 체력 주문서', { maxHp: 190, armor: 4 }],
      [SpellTraceType.maxHp, 30, '30% 체력 주문서', { maxHp: 320, armor: 7 }],
      [SpellTraceType.maxHp, 15, '15% 체력 주문서', { maxHp: 460, armor: 10 }],
      [SpellTraceType.allStat, 30, '30% 올스탯 주문서', { str: 2, dex: 2, int: 2, luk: 2, maxHp: 70, armor: 7 }],
      [SpellTraceType.allStat, 15, '15% 올스탯 주문서', { str: 3, dex: 3, int: 3, luk: 3, maxHp: 110, armor: 10 }],
    ] as [SpellTraceType, SpellTraceRate, string, Partial<GearOption>][]), // prettier-ignore
    ...map([GearType.shoulder, 200], [
      [SpellTraceType.str, 100, '100% 힘 주문서', { str: 3, maxHp: 30, armor: 3 }],
      [SpellTraceType.str, 70, '70% 힘 주문서', { str: 4, maxHp: 70, armor: 5 }],
      [SpellTraceType.str, 30, '30% 힘 주문서', { str: 7, maxHp: 120, armor: 10 }],
      [SpellTraceType.str, 15, '15% 힘 주문서', { str: 10, maxHp: 170, armor: 15 }],
      [SpellTraceType.dex, 100, '100% 민첩 주문서', { dex: 3, maxHp: 30, armor: 3 }],
      [SpellTraceType.dex, 70, '70% 민첩 주문서', { dex: 4, maxHp: 70, armor: 5 }],
      [SpellTraceType.dex, 30, '30% 민첩 주문서', { dex: 7, maxHp: 120, armor: 10 }],
      [SpellTraceType.dex, 15, '15% 민첩 주문서', { dex: 10, maxHp: 170, armor: 15 }],
      [SpellTraceType.int, 100, '100% 지력 주문서', { int: 3, maxHp: 30, armor: 3 }],
      [SpellTraceType.int, 70, '70% 지력 주문서', { int: 4, maxHp: 70, armor: 5 }],
      [SpellTraceType.int, 30, '30% 지력 주문서', { int: 7, maxHp: 120, armor: 10 }],
      [SpellTraceType.int, 15, '15% 지력 주문서', { int: 10, maxHp: 170, armor: 15 }],
      [SpellTraceType.luk, 100, '100% 운 주문서', { luk: 3, maxHp: 30, armor: 3 }],
      [SpellTraceType.luk, 70, '70% 운 주문서', { luk: 4, maxHp: 70, armor: 5 }],
      [SpellTraceType.luk, 30, '30% 운 주문서', { luk: 7, maxHp: 120, armor: 10 }],
      [SpellTraceType.luk, 15, '15% 운 주문서', { luk: 10, maxHp: 170, armor: 15 }],
      [SpellTraceType.maxHp, 100, '100% 체력 주문서', { maxHp: 180, armor: 3 }],
      [SpellTraceType.maxHp, 70, '70% 체력 주문서', { maxHp: 270, armor: 5 }],
      [SpellTraceType.maxHp, 30, '30% 체력 주문서', { maxHp: 470, armor: 10 }],
      [SpellTraceType.maxHp, 15, '15% 체력 주문서', { maxHp: 670, armor: 15 }],
      [SpellTraceType.allStat, 30, '30% 올스탯 주문서', { str: 3, dex: 3, int: 3, luk: 3, maxHp: 120, armor: 10 }],
      [SpellTraceType.allStat, 15, '15% 올스탯 주문서', { str: 4, dex: 4, int: 4, luk: 4, maxHp: 170, armor: 15 }],
    ] as [SpellTraceType, SpellTraceRate, string, Partial<GearOption>][]), // prettier-ignore
  ])(
    '올바른 이름과 옵션을 반환한다. 장비분류: %d, 요구 레벨: %d, 종류: %s, 확률: %d -> 이름: %s, 옵션: %p',
    (gearType, reqLevel, type, rate, expectedName, expectedOption) => {
      const gear = createGear({
        type: gearType,
        req: { level: reqLevel },
      });

      const scroll = _getArmorSpellTrace(gear, type, rate);

      expect(scroll.name).toBe(expectedName);
      expect(scroll.option).toEqual(expectedOption);
    },
  );

  it('공용 장비의 4번째 주문서 옵션은 공격력 1, 마력 1로 설정된다.', () => {
    const gear = createGear({
      req: { level: 120 },
      scrollUpgradeCount: 3,
    });

    const scroll = _getArmorSpellTrace(gear, SpellTraceType.dex, 70);

    expect(scroll.option).toHaveProperty('attackPower', 1);
    expect(scroll.option).toHaveProperty('magicPower', 1);
  });

  it('전사 장비의 4번째 주문서 옵션은 공격력 1, 마력 0으로 설정된다.', () => {
    const gear = createGear({
      req: { level: 120, job: 1 },
      scrollUpgradeCount: 3,
    });

    const scroll = _getArmorSpellTrace(gear, SpellTraceType.dex, 70);

    expect(scroll.option).toHaveProperty('attackPower', 1);
    expect(scroll.option).not.toHaveProperty('magicPower');
  });

  it('마법사 장비의 4번째 주문서 옵션은 공격력 0, 마력 1로 설정된다.', () => {
    const gear = createGear({
      req: { level: 120, job: 2 },
      scrollUpgradeCount: 3,
    });

    const scroll = _getArmorSpellTrace(gear, SpellTraceType.dex, 70);

    expect(scroll.option).not.toHaveProperty('attackPower');
    expect(scroll.option).toHaveProperty('magicPower', 1);
  });

  it.each([100, 70] as const)(
    '확률 %d% 올스탯 주문서는 예외가 발생한다.',
    (rate) => {
      const gear = createGear({
        req: { level: 120 },
      });

      expect(() =>
        _getArmorSpellTrace(gear, SpellTraceType.allStat, rate),
      ).toThrow();
    },
  );
});

describe('_getAccSpellTrace', () => {
  it.each([
    ...map([GearType.pendant, 20], [
      ['str', 100, '100% 힘 주문서', { str: 1 }],
      ['str', 70, '70% 힘 주문서', { str: 2 }],
      ['str', 30, '30% 힘 주문서', { str: 3 }],
      ['dex', 100, '100% 민첩 주문서', { dex: 1 }],
      ['dex', 70, '70% 민첩 주문서', { dex: 2 }],
      ['dex', 30, '30% 민첩 주문서', { dex: 3 }],
      ['int', 100, '100% 지력 주문서', { int: 1 }],
      ['int', 70, '70% 지력 주문서', { int: 2 }],
      ['int', 30, '30% 지력 주문서', { int: 3 }],
      ['luk', 100, '100% 운 주문서', { luk: 1 }],
      ['luk', 70, '70% 운 주문서', { luk: 2 }],
      ['luk', 30, '30% 운 주문서', { luk: 3 }],
      ['maxHp', 100, '100% 체력 주문서', { maxHp: 50 }],
      ['maxHp', 70, '70% 체력 주문서', { maxHp: 100 }],
      ['maxHp', 30, '30% 체력 주문서', { maxHp: 150 }],
      ['allStat', 30, '30% 올스탯 주문서', { str: 1, dex: 1, int: 1, luk: 1 }],
    ] as [SpellTraceType, SpellTraceRate, string, Partial<GearOption>][]),
    ...map([GearType.pendant, 100], [
      ['str', 100, '100% 힘 주문서', { str: 1 }],
      ['str', 70, '70% 힘 주문서', { str: 2 }],
      ['str', 30, '30% 힘 주문서', { str: 4 }],
      ['dex', 100, '100% 민첩 주문서', { dex: 1 }],
      ['dex', 70, '70% 민첩 주문서', { dex: 2 }],
      ['dex', 30, '30% 민첩 주문서', { dex: 4 }],
      ['int', 100, '100% 지력 주문서', { int: 1 }],
      ['int', 70, '70% 지력 주문서', { int: 2 }],
      ['int', 30, '30% 지력 주문서', { int: 4 }],
      ['luk', 100, '100% 운 주문서', { luk: 1 }],
      ['luk', 70, '70% 운 주문서', { luk: 2 }],
      ['luk', 30, '30% 운 주문서', { luk: 4 }],
      ['maxHp', 100, '100% 체력 주문서', { maxHp: 50 }],
      ['maxHp', 70, '70% 체력 주문서', { maxHp: 100 }],
      ['maxHp', 30, '30% 체력 주문서', { maxHp: 200 }],
      ['allStat', 30, '30% 올스탯 주문서', { str: 2, dex: 2, int: 2, luk: 2 }],
    ] as [SpellTraceType, SpellTraceRate, string, Partial<GearOption>][]),
    ...map([GearType.pendant, 200], [
      ['str', 100, '100% 힘 주문서', { str: 2 }],
      ['str', 70, '70% 힘 주문서', { str: 3 }],
      ['str', 30, '30% 힘 주문서', { str: 5 }],
      ['dex', 100, '100% 민첩 주문서', { dex: 2 }],
      ['dex', 70, '70% 민첩 주문서', { dex: 3 }],
      ['dex', 30, '30% 민첩 주문서', { dex: 5 }],
      ['int', 100, '100% 지력 주문서', { int: 2 }],
      ['int', 70, '70% 지력 주문서', { int: 3 }],
      ['int', 30, '30% 지력 주문서', { int: 5 }],
      ['luk', 100, '100% 운 주문서', { luk: 2 }],
      ['luk', 70, '70% 운 주문서', { luk: 3 }],
      ['luk', 30, '30% 운 주문서', { luk: 5 }],
      ['maxHp', 100, '100% 체력 주문서', { maxHp: 100 }],
      ['maxHp', 70, '70% 체력 주문서', { maxHp: 150 }],
      ['maxHp', 30, '30% 체력 주문서', { maxHp: 250 }],
      ['allStat', 30, '30% 올스탯 주문서', { str: 3, dex: 3, int: 3, luk: 3 }],
    ] as [SpellTraceType, SpellTraceRate, string, Partial<GearOption>][]),
  ])(
    '올바른 이름과 옵션을 반환한다. 장비분류: %d, 요구 레벨: %d, 종류: %s, 확률: %d -> 이름: %s, 옵션: %p',
    (gearType, reqLevel, type, rate, expectedName, expectedOption) => {
      const gear = createGear({
        type: gearType,
        req: { level: reqLevel },
      });

      const scroll = _getAccSpellTrace(gear, type, rate);

      expect(scroll.name).toEqual(expectedName);
      expect(scroll.option).toEqual(expectedOption);
    },
  );

  it('확률 15% 주문서는 예외가 발생한다.', () => {
    const gear = createGear({
      type: GearType.ring,
      req: { level: 120 },
    });

    expect(() => _getAccSpellTrace(gear, SpellTraceType.str, 15)).toThrow();
  });

  it.each([100, 70] as const)(
    '확률 %d% 올스탯 주문서는 예외가 발생한다.',
    (rate) => {
      const gear = createGear({
        type: GearType.ring,
        req: { level: 120 },
      });

      expect(() =>
        _getAccSpellTrace(gear, SpellTraceType.allStat, rate),
      ).toThrow();
    },
  );
});

describe('_getHeartSpellTrace', () => {
  it.each([
    ...map([GearType.machineHeart, 20], [
      [SpellTraceType.str, 100, '100% 공격력 주문서', { attackPower: 1 }],
      [SpellTraceType.str, 70, '70% 공격력 주문서', { attackPower: 2 }],
      [SpellTraceType.str, 30, '30% 공격력 주문서', { attackPower: 3 }],
      [SpellTraceType.int, 100, '100% 마력 주문서', { magicPower: 1 }],
      [SpellTraceType.int, 70, '70% 마력 주문서', { magicPower: 2 }],
      [SpellTraceType.int, 30, '30% 마력 주문서', { magicPower: 3 }],
      [SpellTraceType.luk, 30, '30% 공격력 주문서', { attackPower: 3 }],
      [SpellTraceType.maxHp, 30, '30% 공격력 주문서', { attackPower: 3 }],
      [SpellTraceType.allStat, 30, '30% 공격력 주문서', { attackPower: 3 }],
    ] as [SpellTraceType, SpellTraceRate, string, Partial<GearOption>][]),
    ...map([GearType.machineHeart, 90], [
      [SpellTraceType.str, 100, '100% 공격력 주문서', { attackPower: 2 }],
      [SpellTraceType.str, 70, '70% 공격력 주문서', { attackPower: 3 }],
      [SpellTraceType.str, 30, '30% 공격력 주문서', { attackPower: 5 }],
      [SpellTraceType.int, 100, '100% 마력 주문서', { magicPower: 2 }],
      [SpellTraceType.int, 70, '70% 마력 주문서', { magicPower: 3 }],
      [SpellTraceType.int, 30, '30% 마력 주문서', { magicPower: 5 }],
      [SpellTraceType.luk, 30, '30% 공격력 주문서', { attackPower: 5 }],
      [SpellTraceType.maxHp, 30, '30% 공격력 주문서', { attackPower: 5 }],
      [SpellTraceType.allStat, 30, '30% 공격력 주문서', { attackPower: 5 }],
    ] as [SpellTraceType, SpellTraceRate, string, Partial<GearOption>][]),
    ...map([GearType.machineHeart, 160], [
      [SpellTraceType.str, 100, '100% 공격력 주문서', { attackPower: 3 }],
      [SpellTraceType.str, 70, '70% 공격력 주문서', { attackPower: 5 }],
      [SpellTraceType.str, 30, '30% 공격력 주문서', { attackPower: 7 }],
      [SpellTraceType.int, 100, '100% 마력 주문서', { magicPower: 3 }],
      [SpellTraceType.int, 70, '70% 마력 주문서', { magicPower: 5 }],
      [SpellTraceType.int, 30, '30% 마력 주문서', { magicPower: 7 }],
      [SpellTraceType.luk, 30, '30% 공격력 주문서', { attackPower: 7 }],
      [SpellTraceType.maxHp, 30, '30% 공격력 주문서', { attackPower: 7 }],
      [SpellTraceType.allStat, 30, '30% 공격력 주문서', { attackPower: 7 }],
    ] as [SpellTraceType, SpellTraceRate, string, Partial<GearOption>][]),
  ])(
    '올바른 이름과 옵션을 반환한다. 장비분류: %d, 요구 레벨: %d, 종류: %s, 확률: %d -> 이름: %s, 옵션: %p',
    (gearType, reqLevel, type, rate, expectedName, expectedOption) => {
      const gear = createGear({
        type: gearType,
        req: { level: reqLevel },
      });

      const scroll = _getHeartSpellTrace(gear, type, rate);

      expect(scroll.name).toEqual(expectedName);
      expect(scroll.option).toEqual(expectedOption);
    },
  );
});

function map<Root extends unknown[], Values extends unknown[]>(
  root: [...Root],
  values: [...Values][],
): [...Root, ...Values][] {
  return values.map((value) => [...root, ...value]);
}
