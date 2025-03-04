import { GearData, GearReqData, GearType } from '../data';
import { Gear } from '../Gear';
import {
  _getAccSpellTrace,
  _getArmorSpellTrace,
  _getGloveSpellTrace,
  _getHeartSpellTrace,
  _getWeaponSpellTrace,
  getSpellTraceScroll,
  SpellTraceRate,
  SpellTraceType,
} from './spellTrace';
import { Scroll } from './upgrade';

describe('getSpellTraceScroll', () => {
  it.each([
    [
      mockGear(GearType.katara, { level: 120 }),
      SpellTraceType.dex,
      30,
      scr('30% 공격력(민첩) 주문서', { dex: 3, attackPower: 7 }, 'dex', 30),
    ],
    [
      mockGear(GearType.glove, { level: 100 }),
      SpellTraceType.dex,
      15,
      scr('15% 공격력 주문서', { attackPower: 4 }, 'dex', 15),
    ],
    [
      mockGear(GearType.shoes, { level: 250 }),
      SpellTraceType.int,
      15,
      scr('15% 지력 주문서', { int: 10, maxHp: 170, armor: 15 }, 'int', 15),
    ],
    [
      mockGear(GearType.belt, { level: 200 }),
      SpellTraceType.maxHp,
      70,
      scr('70% 체력 주문서', { maxHp: 150 }, 'maxHp', 70),
    ],
    [
      mockGear(GearType.machineHeart, { level: 100 }),
      SpellTraceType.luk,
      30,
      scr('30% 공격력 주문서', { attackPower: 5 }, 'luk', 30),
    ],
  ] satisfies [Gear, SpellTraceType, SpellTraceRate, Scroll][])(
    'getSpellTraceScroll(%p, %s, %d) is %p',
    (gear, type, rate, expected) => {
      const scroll = getSpellTraceScroll(gear, type, rate);

      expect(scroll).toEqual(expected);
    },
  );
});

describe('_getWeaponSpellTrace', () => {
  it.each([
    ...withGear(mockGear(GearType.bow, { level: 20 }), [
      ['str', 100, scr('100% 공격력 주문서', { attackPower: 1 }, 'str', 100)],
      ['str', 70, scr('70% 공격력 주문서', { attackPower: 2 }, 'str', 70)],
      ['str', 30, scr('30% 공격력(힘) 주문서', { attackPower: 3, str: 1 }, 'str', 30)],
      ['str', 15, scr('15% 공격력(힘) 주문서', { attackPower: 5, str: 2 }, 'str', 15)],
      ['dex', 100, scr('100% 공격력 주문서', { attackPower: 1 }, 'dex', 100)],
      ['dex', 70, scr('70% 공격력 주문서', { attackPower: 2 }, 'dex', 70)],
      ['dex', 30, scr('30% 공격력(민첩) 주문서', { attackPower: 3, dex: 1 }, 'dex', 30)],
      ['dex', 15, scr('15% 공격력(민첩) 주문서', { attackPower: 5, dex: 2 }, 'dex', 15)],
      ['int', 100, scr('100% 마력 주문서', { magicPower: 1 }, 'int', 100)],
      ['int', 70, scr('70% 마력 주문서', { magicPower: 2 }, 'int', 70)],
      ['int', 30, scr('30% 마력(지력) 주문서', { magicPower: 3, int: 1 }, 'int', 30)],
      ['int', 15, scr('15% 마력(지력) 주문서', { magicPower: 5, int: 2 }, 'int', 15)],
      ['luk', 100, scr('100% 공격력 주문서', { attackPower: 1 }, 'luk', 100)],
      ['luk', 70, scr('70% 공격력 주문서', { attackPower: 2 }, 'luk', 70)],
      ['luk', 30, scr('30% 공격력(운) 주문서', { attackPower: 3, luk: 1 }, 'luk', 30)],
      ['luk', 15, scr('15% 공격력(운) 주문서', { attackPower: 5, luk: 2 }, 'luk', 15)],
      ['maxHp', 100, scr('100% 공격력 주문서', { attackPower: 1 }, 'maxHp', 100)],
      ['maxHp', 70, scr('70% 공격력 주문서', { attackPower: 2 }, 'maxHp', 70)],
      ['maxHp', 30, scr('30% 공격력(체력) 주문서', { attackPower: 3, maxHp: 50 }, 'maxHp', 30)],
      ['maxHp', 15, scr('15% 공격력(체력) 주문서', { attackPower: 5, maxHp: 100 }, 'maxHp', 15)],
    ]), // prettier-ignore
    ...withGear(mockGear(GearType.bow, { level: 100 }), [
      ['str', 100, scr('100% 공격력 주문서', { attackPower: 2 }, 'str', 100)],
      ['str', 70, scr('70% 공격력(힘) 주문서', { attackPower: 3, str: 1 }, 'str', 70)],
      ['str', 30, scr('30% 공격력(힘) 주문서', { attackPower: 5, str: 2 }, 'str', 30)],
      ['str', 15, scr('15% 공격력(힘) 주문서', { attackPower: 7, str: 3 }, 'str', 15)],
      ['dex', 100, scr('100% 공격력 주문서', { attackPower: 2 }, 'dex', 100)],
      ['dex', 70, scr('70% 공격력(민첩) 주문서', { attackPower: 3, dex: 1 }, 'dex', 70)],
      ['dex', 30, scr('30% 공격력(민첩) 주문서', { attackPower: 5, dex: 2 }, 'dex', 30)],
      ['dex', 15, scr('15% 공격력(민첩) 주문서', { attackPower: 7, dex: 3 }, 'dex', 15)],
      ['int', 100, scr('100% 마력 주문서', { magicPower: 2 }, 'int', 100)],
      ['int', 70, scr('70% 마력(지력) 주문서', { magicPower: 3, int: 1 }, 'int', 70)],
      ['int', 30, scr('30% 마력(지력) 주문서', { magicPower: 5, int: 2 }, 'int', 30)],
      ['int', 15, scr('15% 마력(지력) 주문서', { magicPower: 7, int: 3 }, 'int', 15)],
      ['luk', 100, scr('100% 공격력 주문서', { attackPower: 2 }, 'luk', 100)],
      ['luk', 70, scr('70% 공격력(운) 주문서', { attackPower: 3, luk: 1 }, 'luk', 70)],
      ['luk', 30, scr('30% 공격력(운) 주문서', { attackPower: 5, luk: 2 }, 'luk', 30)],
      ['luk', 15, scr('15% 공격력(운) 주문서', { attackPower: 7, luk: 3 }, 'luk', 15)],
      ['maxHp', 100, scr('100% 공격력 주문서', { attackPower: 2 }, 'maxHp', 100)],
      ['maxHp', 70, scr('70% 공격력(체력) 주문서', { attackPower: 3, maxHp: 50 }, 'maxHp', 70)],
      ['maxHp', 30, scr('30% 공격력(체력) 주문서', { attackPower: 5, maxHp: 100 }, 'maxHp', 30)],
      ['maxHp', 15, scr('15% 공격력(체력) 주문서', { attackPower: 7, maxHp: 150 }, 'maxHp', 15)],
    ]), // prettier-ignore
    ...withGear(mockGear(GearType.bow, { level: 200 }), [
      ['str', 100, scr('100% 공격력(힘) 주문서', { attackPower: 3, str: 1 }, 'str', 100)],
      ['str', 70, scr('70% 공격력(힘) 주문서', { attackPower: 5, str: 2 }, 'str', 70)],
      ['str', 30, scr('30% 공격력(힘) 주문서', { attackPower: 7, str: 3 }, 'str', 30)],
      ['str', 15, scr('15% 공격력(힘) 주문서', { attackPower: 9, str: 4 }, 'str', 15)],
      ['dex', 100, scr('100% 공격력(민첩) 주문서', { attackPower: 3, dex: 1 }, 'dex', 100)],
      ['dex', 70, scr('70% 공격력(민첩) 주문서', { attackPower: 5, dex: 2 }, 'dex', 70)],
      ['dex', 30, scr('30% 공격력(민첩) 주문서', { attackPower: 7, dex: 3 }, 'dex', 30)],
      ['dex', 15, scr('15% 공격력(민첩) 주문서', { attackPower: 9, dex: 4 }, 'dex', 15)],
      ['int', 100, scr('100% 마력(지력) 주문서', { magicPower: 3, int: 1 }, 'int', 100)],
      ['int', 70, scr('70% 마력(지력) 주문서', { magicPower: 5, int: 2 }, 'int', 70)],
      ['int', 30, scr('30% 마력(지력) 주문서', { magicPower: 7, int: 3 }, 'int', 30)],
      ['int', 15, scr('15% 마력(지력) 주문서', { magicPower: 9, int: 4 }, 'int', 15)],
      ['luk', 100, scr('100% 공격력(운) 주문서', { attackPower: 3, luk: 1 }, 'luk', 100)],
      ['luk', 70, scr('70% 공격력(운) 주문서', { attackPower: 5, luk: 2 }, 'luk', 70)],
      ['luk', 30, scr('30% 공격력(운) 주문서', { attackPower: 7, luk: 3 }, 'luk', 30)],
      ['luk', 15, scr('15% 공격력(운) 주문서', { attackPower: 9, luk: 4 }, 'luk', 15)],
      ['maxHp', 100, scr('100% 공격력(체력) 주문서', { attackPower: 3, maxHp: 50 }, 'maxHp', 100)],
      ['maxHp', 70, scr('70% 공격력(체력) 주문서', { attackPower: 5, maxHp: 100 }, 'maxHp', 70)],
      ['maxHp', 30, scr('30% 공격력(체력) 주문서', { attackPower: 7, maxHp: 150 }, 'maxHp', 30)],
      ['maxHp', 15, scr('15% 공격력(체력) 주문서', { attackPower: 9, maxHp: 200 }, 'maxHp', 15)],
    ]), // prettier-ignore
  ])('_getWeaponSpellTrace(%p, %s, %d) is %p', (gear, type, rate, expected) => {
    const scroll = _getWeaponSpellTrace(gear, type, rate);

    expect(scroll).toEqual(expected);
  });

  it('throws TypeError for allStat', () => {
    const gear = mockGear(GearType.cane, { level: 120 });

    expect(() =>
      _getWeaponSpellTrace(gear, SpellTraceType.allStat, 30),
    ).toThrow();
  });
});

describe('_getGloveSpellTrace', () => {
  it.each([
    ...withGear(mockGear(GearType.glove, { level: 20 }), [
      ['str', 100, scr('100% 방어력 주문서', { armor: 3 }, 'str', 100)],
      ['str', 70, scr('70% 공격력 주문서', { attackPower: 1 }, 'str', 70)],
      ['str', 30, scr('30% 공격력 주문서', { attackPower: 2 }, 'str', 30)],
      ['str', 15, scr('15% 공격력 주문서', { attackPower: 3 }, 'str', 15)],
      ['int', 100, scr('100% 방어력 주문서', { armor: 3 }, 'int', 100)],
      ['int', 70, scr('70% 마력 주문서', { magicPower: 1 }, 'int', 70)],
      ['int', 30, scr('30% 마력 주문서', { magicPower: 2 }, 'int', 30)],
      ['int', 15, scr('15% 마력 주문서', { magicPower: 3 }, 'int', 15)],
      ['luk', 15, scr('15% 공격력 주문서', { attackPower: 3 }, 'luk', 15)],
      ['maxHp', 15, scr('15% 공격력 주문서', { attackPower: 3 }, 'maxHp', 15)],
      [
        'allStat',
        15,
        scr('15% 공격력 주문서', { attackPower: 3 }, 'allStat', 15),
      ],
    ]),
    ...withGear(mockGear(GearType.glove, { level: 100 }), [
      ['str', 100, scr('100% 공격력 주문서', { attackPower: 1 }, 'str', 100)],
      ['str', 70, scr('70% 공격력 주문서', { attackPower: 2 }, 'str', 70)],
      ['str', 30, scr('30% 공격력 주문서', { attackPower: 3 }, 'str', 30)],
      ['str', 15, scr('15% 공격력 주문서', { attackPower: 4 }, 'str', 15)],
      ['int', 100, scr('100% 마력 주문서', { magicPower: 1 }, 'int', 100)],
      ['int', 70, scr('70% 마력 주문서', { magicPower: 2 }, 'int', 70)],
      ['int', 30, scr('30% 마력 주문서', { magicPower: 3 }, 'int', 30)],
      ['int', 15, scr('15% 마력 주문서', { magicPower: 4 }, 'int', 15)],
      ['luk', 15, scr('15% 공격력 주문서', { attackPower: 4 }, 'luk', 15)],
      ['maxHp', 15, scr('15% 공격력 주문서', { attackPower: 4 }, 'maxHp', 15)],
      [
        'allStat',
        15,
        scr('15% 공격력 주문서', { attackPower: 4 }, 'allStat', 15),
      ],
    ]),
    ...withGear(mockGear(GearType.glove, { level: 250 }), [
      ['str', 100, scr('100% 공격력 주문서', { attackPower: 1 }, 'str', 100)],
      ['str', 70, scr('70% 공격력 주문서', { attackPower: 2 }, 'str', 70)],
      ['str', 30, scr('30% 공격력 주문서', { attackPower: 3 }, 'str', 30)],
      ['str', 15, scr('15% 공격력 주문서', { attackPower: 4 }, 'str', 15)],
      ['int', 100, scr('100% 마력 주문서', { magicPower: 1 }, 'int', 100)],
      ['int', 70, scr('70% 마력 주문서', { magicPower: 2 }, 'int', 70)],
      ['int', 30, scr('30% 마력 주문서', { magicPower: 3 }, 'int', 30)],
      ['int', 15, scr('15% 마력 주문서', { magicPower: 4 }, 'int', 15)],
      ['luk', 15, scr('15% 공격력 주문서', { attackPower: 4 }, 'luk', 15)],
      ['maxHp', 15, scr('15% 공격력 주문서', { attackPower: 4 }, 'maxHp', 15)],
      [
        'allStat',
        15,
        scr('15% 공격력 주문서', { attackPower: 4 }, 'allStat', 15),
      ],
    ]),
  ])('_getGloveSpellTrace(%p, %s, %d) is %p', (gear, type, rate, expected) => {
    const scroll = _getGloveSpellTrace(gear, type, rate);

    expect(scroll).toEqual(expected);
  });
});

describe('_getArmorSpellTrace', () => {
  it.each([
    ...withGear(mockGear(GearType.shoulder, { level: 20 }), [
      ['str', 100, scr('100% 힘 주문서', { str: 1, maxHp: 5, armor: 1 }, 'str', 100)],
      ['str', 70, scr('70% 힘 주문서', { str: 2, maxHp: 15, armor: 2 }, 'str', 70)],
      ['str', 30, scr('30% 힘 주문서', { str: 3, maxHp: 30, armor: 4 }, 'str', 30)],
      ['str', 15, scr('15% 힘 주문서', { str: 4, maxHp: 45, armor: 6 }, 'str', 15)],
      ['dex', 100, scr('100% 민첩 주문서', { dex: 1, maxHp: 5, armor: 1 }, 'dex', 100)],
      ['dex', 70, scr('70% 민첩 주문서', { dex: 2, maxHp: 15, armor: 2 }, 'dex', 70)],
      ['dex', 30, scr('30% 민첩 주문서', { dex: 3, maxHp: 30, armor: 4 }, 'dex', 30)],
      ['dex', 15, scr('15% 민첩 주문서', { dex: 4, maxHp: 45, armor: 6 }, 'dex', 15)],
      ['int', 100, scr('100% 지력 주문서', { int: 1, maxHp: 5, armor: 1 }, 'int', 100)],
      ['int', 70, scr('70% 지력 주문서', { int: 2, maxHp: 15, armor: 2 }, 'int', 70)],
      ['int', 30, scr('30% 지력 주문서', { int: 3, maxHp: 30, armor: 4 }, 'int', 30)],
      ['int', 15, scr('15% 지력 주문서', { int: 4, maxHp: 45, armor: 6 }, 'int', 15)],
      ['luk', 100, scr('100% 운 주문서', { luk: 1, maxHp: 5, armor: 1 }, 'luk', 100)],
      ['luk', 70, scr('70% 운 주문서', { luk: 2, maxHp: 15, armor: 2 }, 'luk', 70)],
      ['luk', 30, scr('30% 운 주문서', { luk: 3, maxHp: 30, armor: 4 }, 'luk', 30)],
      ['luk', 15, scr('15% 운 주문서', { luk: 4, maxHp: 45, armor: 6 }, 'luk', 15)],
      ['maxHp', 100, scr('100% 체력 주문서', { maxHp: 50 + 5, armor: 1 }, 'maxHp', 100)],
      ['maxHp', 70, scr('70% 체력 주문서', { maxHp: 100 + 15, armor: 2 }, 'maxHp', 70)],
      ['maxHp', 30, scr('30% 체력 주문서', { maxHp: 150 + 30, armor: 4 }, 'maxHp', 30)],
      ['maxHp', 15, scr('15% 체력 주문서', { maxHp: 200 + 45, armor: 6 }, 'maxHp', 15)],
      [
        'allStat',
        30,
        scr(
          '30% 올스탯 주문서',
          {
            str: 1,
            dex: 1,
            int: 1,
            luk: 1,
            maxHp: 30,
            armor: 4,
          },
          'allStat',
          30,
        ),
      ],
      [
        'allStat',
        15,
        scr(
          '15% 올스탯 주문서',
          {
            str: 2,
            dex: 2,
            int: 2,
            luk: 2,
            maxHp: 45,
            armor: 6,
          },
          'allStat',
          15,
        ),
      ],
    ]), // prettier-ignore
    ...withGear(mockGear(GearType.shoulder, { level: 100 }), [
      ['str', 100, scr('100% 힘 주문서', { str: 2, maxHp: 20, armor: 2 }, 'str', 100)],
      ['str', 70, scr('70% 힘 주문서', { str: 3, maxHp: 40, armor: 4 }, 'str', 70)],
      ['str', 30, scr('30% 힘 주문서', { str: 5, maxHp: 70, armor: 7 }, 'str', 30)],
      ['str', 15, scr('15% 힘 주문서', { str: 7, maxHp: 110, armor: 10 }, 'str', 15)],
      ['dex', 100, scr('100% 민첩 주문서', { dex: 2, maxHp: 20, armor: 2 }, 'dex', 100)],
      ['dex', 70, scr('70% 민첩 주문서', { dex: 3, maxHp: 40, armor: 4 }, 'dex', 70)],
      ['dex', 30, scr('30% 민첩 주문서', { dex: 5, maxHp: 70, armor: 7 }, 'dex', 30)],
      ['dex', 15, scr('15% 민첩 주문서', { dex: 7, maxHp: 110, armor: 10 }, 'dex', 15)],
      ['int', 100, scr('100% 지력 주문서', { int: 2, maxHp: 20, armor: 2 }, 'int', 100)],
      ['int', 70, scr('70% 지력 주문서', { int: 3, maxHp: 40, armor: 4 }, 'int', 70)],
      ['int', 30, scr('30% 지력 주문서', { int: 5, maxHp: 70, armor: 7 }, 'int', 30)],
      ['int', 15, scr('15% 지력 주문서', { int: 7, maxHp: 110, armor: 10 }, 'int', 15)],
      ['luk', 100, scr('100% 운 주문서', { luk: 2, maxHp: 20, armor: 2 }, 'luk', 100)],
      ['luk', 70, scr('70% 운 주문서', { luk: 3, maxHp: 40, armor: 4 }, 'luk', 70)],
      ['luk', 30, scr('30% 운 주문서', { luk: 5, maxHp: 70, armor: 7 }, 'luk', 30)],
      ['luk', 15, scr('15% 운 주문서', { luk: 7, maxHp: 110, armor: 10 }, 'luk', 15)],
      ['maxHp', 100, scr('100% 체력 주문서', { maxHp: 100 + 20, armor: 2 }, 'maxHp', 100)],
      ['maxHp', 70, scr('70% 체력 주문서', { maxHp: 150 + 40, armor: 4 }, 'maxHp', 70)],
      ['maxHp', 30, scr('30% 체력 주문서', { maxHp: 250 + 70, armor: 7 }, 'maxHp', 30)],
      ['maxHp', 15, scr('15% 체력 주문서', { maxHp: 350 + 110, armor: 10 }, 'maxHp', 15)],
      [
        'allStat',
        30,
        scr('30% 올스탯 주문서',
          {
            str: 2,
            dex: 2,
            int: 2,
            luk: 2,
            maxHp: 70,
            armor: 7,
          },
          'allStat',
          30
        ),
      ],
      [
        'allStat',
        15,
        scr('15% 올스탯 주문서',
          {
            str: 3,
            dex: 3,
            int: 3,
            luk: 3,
            maxHp: 110,
            armor: 10,
          },
          'allStat',
          15
        ),
      ],
    ]), // prettier-ignore
    ...withGear(mockGear(GearType.shoulder, { level: 200 }), [
      ['str', 100, scr('100% 힘 주문서', { str: 3, maxHp: 30, armor: 3 }, 'str', 100)],
      ['str', 70, scr('70% 힘 주문서', { str: 4, maxHp: 70, armor: 5 }, 'str', 70)],
      ['str', 30, scr('30% 힘 주문서', { str: 7, maxHp: 120, armor: 10 }, 'str', 30)],
      ['str', 15, scr('15% 힘 주문서', { str: 10, maxHp: 170, armor: 15 }, 'str', 15)],
      ['dex', 100, scr('100% 민첩 주문서', { dex: 3, maxHp: 30, armor: 3 }, 'dex', 100)],
      ['dex', 70, scr('70% 민첩 주문서', { dex: 4, maxHp: 70, armor: 5 }, 'dex', 70)],
      ['dex', 30, scr('30% 민첩 주문서', { dex: 7, maxHp: 120, armor: 10 }, 'dex', 30)],
      ['dex', 15, scr('15% 민첩 주문서', { dex: 10, maxHp: 170, armor: 15 }, 'dex', 15)],
      ['int', 100, scr('100% 지력 주문서', { int: 3, maxHp: 30, armor: 3 }, 'int', 100)],
      ['int', 70, scr('70% 지력 주문서', { int: 4, maxHp: 70, armor: 5 }, 'int', 70)],
      ['int', 30, scr('30% 지력 주문서', { int: 7, maxHp: 120, armor: 10 }, 'int', 30)],
      ['int', 15, scr('15% 지력 주문서', { int: 10, maxHp: 170, armor: 15 }, 'int', 15)],
      ['luk', 100, scr('100% 운 주문서', { luk: 3, maxHp: 30, armor: 3 }, 'luk', 100)],
      ['luk', 70, scr('70% 운 주문서', { luk: 4, maxHp: 70, armor: 5 }, 'luk', 70)],
      ['luk', 30, scr('30% 운 주문서', { luk: 7, maxHp: 120, armor: 10 }, 'luk', 30)],
      ['luk', 15, scr('15% 운 주문서', { luk: 10, maxHp: 170, armor: 15 }, 'luk', 15)],
      ['maxHp', 100, scr('100% 체력 주문서', { maxHp: 150 + 30, armor: 3 }, 'maxHp', 100)],
      ['maxHp', 70, scr('70% 체력 주문서', { maxHp: 200 + 70, armor: 5 }, 'maxHp', 70)],
      ['maxHp', 30, scr('30% 체력 주문서', { maxHp: 350 + 120, armor: 10 }, 'maxHp', 30)],
      ['maxHp', 15, scr('15% 체력 주문서', { maxHp: 500 + 170, armor: 15 }, 'maxHp', 15)],
      [
        'allStat',
        30,
        scr('30% 올스탯 주문서',
          {
            str: 3,
            dex: 3,
            int: 3,
            luk: 3,
            maxHp: 120,
            armor: 10,
          },
          'allStat',
          30,
        ),
      ],
      [
        'allStat',
        15,
        scr('15% 올스탯 주문서',
          {
            str: 4,
            dex: 4,
            int: 4,
            luk: 4,
            maxHp: 170,
            armor: 15,
          },
          'allStat',
          15,
        ),
      ],
    ]), // prettier-ignore
  ])('_getArmorSpellTrace(%p, %s, %d) is %p', (gear, type, rate, expected) => {
    const scroll = _getArmorSpellTrace(gear, type, rate);

    expect(scroll).toEqual(expected);
  });

  it('returns option with attackPower == 1, magicPower == 1 for beginner gear', () => {
    const gear = mockGear(GearType.shoes, { level: 120, job: 0 });
    gear.data.scrollUpgradeCount = 3;

    const scroll = _getArmorSpellTrace(gear, SpellTraceType.dex, 70);

    expect(scroll.option).toHaveProperty('attackPower', 1);
    expect(scroll.option).toHaveProperty('magicPower', 1);
  });

  it('returns option with attackPower == 1 for warrior gear', () => {
    const gear = mockGear(GearType.shoes, { level: 120, job: 1 });
    gear.data.scrollUpgradeCount = 3;

    const scroll = _getArmorSpellTrace(gear, SpellTraceType.dex, 70);

    expect(scroll.option).toHaveProperty('attackPower', 1);
    expect(scroll.option).not.toHaveProperty('magicPower');
  });

  it('returns option with magicPower == 1 for magician gear', () => {
    const gear = mockGear(GearType.shoes, { level: 120, job: 2 });
    gear.data.scrollUpgradeCount = 3;

    const scroll = _getArmorSpellTrace(gear, SpellTraceType.dex, 70);

    expect(scroll.option).toHaveProperty('magicPower', 1);
    expect(scroll.option).not.toHaveProperty('attackPower');
  });

  it.each([100, 70] as const)(
    'throws TypeError for allStat, rate=%d',
    (rate) => {
      const gear = mockGear(GearType.cap, { level: 120 });

      expect(() =>
        _getArmorSpellTrace(gear, SpellTraceType.allStat, rate),
      ).toThrow();
    },
  );
});

describe('_getAccSpellTrace', () => {
  it.each([
    ...withGear(mockGear(GearType.pendant, { level: 20 }), [
      ['str', 100, scr('100% 힘 주문서', { str: 1 }, 'str', 100)],
      ['str', 70, scr('70% 힘 주문서', { str: 2 }, 'str', 70)],
      ['str', 30, scr('30% 힘 주문서', { str: 3 }, 'str', 30)],
      ['dex', 100, scr('100% 민첩 주문서', { dex: 1 }, 'dex', 100)],
      ['dex', 70, scr('70% 민첩 주문서', { dex: 2 }, 'dex', 70)],
      ['dex', 30, scr('30% 민첩 주문서', { dex: 3 }, 'dex', 30)],
      ['int', 100, scr('100% 지력 주문서', { int: 1 }, 'int', 100)],
      ['int', 70, scr('70% 지력 주문서', { int: 2 }, 'int', 70)],
      ['int', 30, scr('30% 지력 주문서', { int: 3 }, 'int', 30)],
      ['luk', 100, scr('100% 운 주문서', { luk: 1 }, 'luk', 100)],
      ['luk', 70, scr('70% 운 주문서', { luk: 2 }, 'luk', 70)],
      ['luk', 30, scr('30% 운 주문서', { luk: 3 }, 'luk', 30)],
      ['maxHp', 100, scr('100% 체력 주문서', { maxHp: 50 }, 'maxHp', 100)],
      ['maxHp', 70, scr('70% 체력 주문서', { maxHp: 100 }, 'maxHp', 70)],
      ['maxHp', 30, scr('30% 체력 주문서', { maxHp: 150 }, 'maxHp', 30)],
      [
        'allStat',
        30,
        scr(
          '30% 올스탯 주문서',
          {
            str: 1,
            dex: 1,
            int: 1,
            luk: 1,
          },
          'allStat',
          30,
        ),
      ],
    ]),
    ...withGear(mockGear(GearType.shoulder, { level: 100 }), [
      ['str', 100, scr('100% 힘 주문서', { str: 1 }, 'str', 100)],
      ['str', 70, scr('70% 힘 주문서', { str: 2 }, 'str', 70)],
      ['str', 30, scr('30% 힘 주문서', { str: 4 }, 'str', 30)],
      ['dex', 100, scr('100% 민첩 주문서', { dex: 1 }, 'dex', 100)],
      ['dex', 70, scr('70% 민첩 주문서', { dex: 2 }, 'dex', 70)],
      ['dex', 30, scr('30% 민첩 주문서', { dex: 4 }, 'dex', 30)],
      ['int', 100, scr('100% 지력 주문서', { int: 1 }, 'int', 100)],
      ['int', 70, scr('70% 지력 주문서', { int: 2 }, 'int', 70)],
      ['int', 30, scr('30% 지력 주문서', { int: 4 }, 'int', 30)],
      ['luk', 100, scr('100% 운 주문서', { luk: 1 }, 'luk', 100)],
      ['luk', 70, scr('70% 운 주문서', { luk: 2 }, 'luk', 70)],
      ['luk', 30, scr('30% 운 주문서', { luk: 4 }, 'luk', 30)],
      ['maxHp', 100, scr('100% 체력 주문서', { maxHp: 50 }, 'maxHp', 100)],
      ['maxHp', 70, scr('70% 체력 주문서', { maxHp: 100 }, 'maxHp', 70)],
      ['maxHp', 30, scr('30% 체력 주문서', { maxHp: 200 }, 'maxHp', 30)],
      [
        'allStat',
        30,
        scr(
          '30% 올스탯 주문서',
          {
            str: 2,
            dex: 2,
            int: 2,
            luk: 2,
          },
          'allStat',
          30,
        ),
      ],
    ]),
    ...withGear(mockGear(GearType.shoulder, { level: 200 }), [
      ['str', 100, scr('100% 힘 주문서', { str: 2 }, 'str', 100)],
      ['str', 70, scr('70% 힘 주문서', { str: 3 }, 'str', 70)],
      ['str', 30, scr('30% 힘 주문서', { str: 5 }, 'str', 30)],
      ['dex', 100, scr('100% 민첩 주문서', { dex: 2 }, 'dex', 100)],
      ['dex', 70, scr('70% 민첩 주문서', { dex: 3 }, 'dex', 70)],
      ['dex', 30, scr('30% 민첩 주문서', { dex: 5 }, 'dex', 30)],
      ['int', 100, scr('100% 지력 주문서', { int: 2 }, 'int', 100)],
      ['int', 70, scr('70% 지력 주문서', { int: 3 }, 'int', 70)],
      ['int', 30, scr('30% 지력 주문서', { int: 5 }, 'int', 30)],
      ['luk', 100, scr('100% 운 주문서', { luk: 2 }, 'luk', 100)],
      ['luk', 70, scr('70% 운 주문서', { luk: 3 }, 'luk', 70)],
      ['luk', 30, scr('30% 운 주문서', { luk: 5 }, 'luk', 30)],
      ['maxHp', 100, scr('100% 체력 주문서', { maxHp: 100 }, 'maxHp', 100)],
      ['maxHp', 70, scr('70% 체력 주문서', { maxHp: 150 }, 'maxHp', 70)],
      ['maxHp', 30, scr('30% 체력 주문서', { maxHp: 250 }, 'maxHp', 30)],
      [
        'allStat',
        30,
        scr(
          '30% 올스탯 주문서',
          {
            str: 3,
            dex: 3,
            int: 3,
            luk: 3,
          },
          'allStat',
          30,
        ),
      ],
    ]),
  ])('_getAccSpellTrace(%p, %s, %d) is %p', (gear, type, rate, expected) => {
    const scroll = _getAccSpellTrace(gear, type, rate);

    expect(scroll).toEqual(expected);
  });

  it('throws TypeError for rate=15', () => {
    const gear = mockGear(GearType.ring, { level: 120 });

    expect(() => _getAccSpellTrace(gear, SpellTraceType.str, 15)).toThrow();
  });

  it.each([100, 70] as const)(
    'throws TypeError for allStat, rate=%d',
    (rate) => {
      const gear = mockGear(GearType.earrings, { level: 120 });

      expect(() =>
        _getAccSpellTrace(gear, SpellTraceType.allStat, rate),
      ).toThrow();
    },
  );
});

describe('_getHeartSpellTrace', () => {
  it.each([
    ...withGear(mockGear(GearType.glove, { level: 20 }), [
      ['str', 100, scr('100% 공격력 주문서', { attackPower: 1 }, 'str', 100)],
      ['str', 70, scr('70% 공격력 주문서', { attackPower: 2 }, 'str', 70)],
      ['str', 30, scr('30% 공격력 주문서', { attackPower: 3 }, 'str', 30)],
      ['int', 100, scr('100% 마력 주문서', { magicPower: 1 }, 'int', 100)],
      ['int', 70, scr('70% 마력 주문서', { magicPower: 2 }, 'int', 70)],
      ['int', 30, scr('30% 마력 주문서', { magicPower: 3 }, 'int', 30)],
      ['luk', 30, scr('30% 공격력 주문서', { attackPower: 3 }, 'luk', 30)],
      ['maxHp', 30, scr('30% 공격력 주문서', { attackPower: 3 }, 'maxHp', 30)],
      [
        'allStat',
        30,
        scr('30% 공격력 주문서', { attackPower: 3 }, 'allStat', 30),
      ],
    ]),
    ...withGear(mockGear(GearType.glove, { level: 90 }), [
      ['str', 100, scr('100% 공격력 주문서', { attackPower: 2 }, 'str', 100)],
      ['str', 70, scr('70% 공격력 주문서', { attackPower: 3 }, 'str', 70)],
      ['str', 30, scr('30% 공격력 주문서', { attackPower: 5 }, 'str', 30)],
      ['int', 100, scr('100% 마력 주문서', { magicPower: 2 }, 'int', 100)],
      ['int', 70, scr('70% 마력 주문서', { magicPower: 3 }, 'int', 70)],
      ['int', 30, scr('30% 마력 주문서', { magicPower: 5 }, 'int', 30)],
    ]),
    ...withGear(mockGear(GearType.glove, { level: 160 }), [
      ['str', 100, scr('100% 공격력 주문서', { attackPower: 3 }, 'str', 100)],
      ['str', 70, scr('70% 공격력 주문서', { attackPower: 5 }, 'str', 70)],
      ['str', 30, scr('30% 공격력 주문서', { attackPower: 7 }, 'str', 30)],
      ['int', 100, scr('100% 마력 주문서', { magicPower: 3 }, 'int', 100)],
      ['int', 70, scr('70% 마력 주문서', { magicPower: 5 }, 'int', 70)],
      ['int', 30, scr('30% 마력 주문서', { magicPower: 7 }, 'int', 30)],
    ]),
  ])('_getHeartSpellTrace(%p, %s, %d) is %p', (gear, type, rate, expected) => {
    const scroll = _getHeartSpellTrace(gear, type, rate);

    expect(scroll).toEqual(expected);
  });
});

function mockGear(type: GearType, req: GearReqData) {
  return new Gear({
    type,
    req,
  } as GearData);
}

function withGear(
  gear: Gear,
  values: [`${SpellTraceType}`, SpellTraceRate, Scroll][],
): [Gear, SpellTraceType, SpellTraceRate, Scroll][] {
  return values.map((value) => [
    gear,
    ...(value as [SpellTraceType, SpellTraceRate, Scroll]),
  ]);
}

function scr(
  name: string,
  option: Scroll['option'],
  type: SpellTraceType | `${SpellTraceType}`,
  rate: SpellTraceRate,
) {
  return { name, option, type, rate };
}
