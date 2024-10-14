import { GearAddOption, GearType } from '../data';
import {
  _getAddOptionKeys,
  _getAllStatValue,
  _getBossDamageValue,
  _getDamageValue,
  _getDoubleStatValue,
  _getHpMpValue,
  _getJumpValue,
  _getPowerValue,
  _getReqLevelDecreaseValue,
  _getSingleStatValue,
  _getSpeedValue,
  AddOptionContext,
  AddOptionGrade,
  AddOptionType,
} from './addOption';

test.each([
  [0, 1, 1],
  [0, 2, 2],
  [0, 3, 3],
  [0, 4, 4],
  [0, 5, 5],
  [10, 1, 1],
  [10, 2, 2],
  [10, 3, 3],
  [10, 4, 4],
  [10, 5, 5],
  [20, 1, 2],
  [20, 2, 4],
  [20, 3, 6],
  [20, 4, 8],
  [20, 5, 10],
  [100, 1, 6],
  [100, 2, 12],
  [100, 3, 18],
  [100, 4, 24],
  [100, 5, 30],
  [118, 1, 6],
  [118, 2, 12],
  [118, 3, 18],
  [118, 4, 24],
  [118, 5, 30],
  [160, 3, 27],
  [160, 4, 36],
  [160, 5, 45],
  [160, 6, 54],
  [160, 7, 63],
  [200, 3, 33],
  [200, 4, 44],
  [200, 5, 55],
  [200, 6, 66],
  [200, 7, 77],
  [250, 3, 36],
  [250, 4, 48],
  [250, 5, 60],
  [250, 6, 72],
  [250, 7, 84],
] satisfies [number, AddOptionGrade, number][])(
  '_getSingleStatValue(reqLevel=%d, grade=%d) returns %d',
  (reqLevel, grade, expected) => {
    const value = _getSingleStatValue(grade, { reqLevel });

    expect(value).toBe(expected);
  },
);

test.each([
  [0, 1, 1],
  [0, 2, 2],
  [0, 3, 3],
  [0, 4, 4],
  [0, 5, 5],
  [10, 1, 1],
  [10, 2, 2],
  [10, 3, 3],
  [10, 4, 4],
  [10, 5, 5],
  [20, 1, 1],
  [20, 2, 2],
  [20, 3, 3],
  [20, 4, 4],
  [20, 5, 5],
  [40, 1, 2],
  [40, 2, 4],
  [40, 3, 6],
  [40, 4, 8],
  [40, 5, 10],
  [100, 1, 3],
  [100, 2, 6],
  [100, 3, 9],
  [100, 4, 12],
  [100, 5, 15],
  [118, 1, 3],
  [118, 2, 6],
  [118, 3, 9],
  [118, 4, 12],
  [118, 5, 15],
  [160, 3, 15],
  [160, 4, 20],
  [160, 5, 25],
  [160, 6, 30],
  [160, 7, 35],
  [200, 3, 18],
  [200, 4, 24],
  [200, 5, 30],
  [200, 6, 36],
  [200, 7, 42],
  [250, 3, 21],
  [250, 4, 28],
  [250, 5, 35],
  [250, 6, 42],
  [250, 7, 49],
] satisfies [number, AddOptionGrade, number][])(
  '_getDoubleStatValue(reqLevel=%d, grade=%d) returns %d',
  (reqLevel, grade, expected) => {
    const value = _getDoubleStatValue(grade, { reqLevel });

    expect(value).toBe(expected);
  },
);

test.each([
  ...withCtx(
    ctx(GearType.thSword, 160, 205, 0, true, AddOptionType.attackPower),
    [3, 31],
    [4, 46],
    [5, 63],
    [6, 82],
    [7, 106],
  ),
  ...withCtx(
    ctx(GearType.thSword, 160, 205, 0, true, AddOptionType.magicPower),
    [3, 31],
    [4, 46],
    [5, 63],
    [6, 82],
    [7, 106],
  ),
  ...withCtx(
    ctx(GearType.staff, 200, 218, 353, true, AddOptionType.attackPower),
    [3, 40],
    [4, 58],
    [5, 80],
    [6, 105],
    [7, 135],
  ),
  ...withCtx(
    ctx(GearType.staff, 200, 218, 353, true, AddOptionType.magicPower),
    [3, 64],
    [4, 94],
    [5, 129],
    [6, 170],
    [7, 218],
  ),
  ...withCtx(
    ctx(GearType.staff, 150, 186, 300, true, AddOptionType.attackPower),
    [3, 23],
    [4, 33],
    [5, 46],
    [6, 60],
    [7, 77],
  ),
  ...withCtx(
    ctx(GearType.staff, 150, 186, 300, true, AddOptionType.magicPower),
    [3, 36],
    [4, 53],
    [5, 73],
    [6, 96],
    [7, 123],
  ),
])(
  '_getPowerValue(ctx=%p, grade=%d) with bossReward weapon returns %d',
  (context, grade, expected) => {
    const value = _getPowerValue(grade, context);

    expect(value).toBe(expected);
  },
);

test.each([
  ...withCtx(
    ctx(GearType.ohSword, 38, 65, 40, false, AddOptionType.attackPower),
    [1, 2],
    [2, 5],
    [3, 8],
    [4, 11],
    [5, 15],
  ),
  ...withCtx(
    ctx(GearType.polearm, 95, 99, 0, false, AddOptionType.attackPower),
    [1, 3],
    [2, 7],
    [3, 11],
    [4, 16],
    [5, 22],
  ),
  ...withCtx(
    ctx(GearType.polearm, 95, 101, 0, false, AddOptionType.attackPower),
    [1, 4],
    [2, 7],
    [3, 11],
    [4, 17],
    [5, 23],
  ),
  ...withCtx(
    ctx(GearType.thSword, 150, 400, 0, false, AddOptionType.attackPower),
    [1, 16],
    [2, 36],
    [3, 59],
    [4, 86],
    [5, 118],
  ),
])(
  '_getPowerValue(ctx=%p, grade=%d) with non bossReward weapon returns %d',
  (context, grade, expected) => {
    const value = _getPowerValue(grade, context);

    expect(value).toBe(expected);
  },
);

test.each([
  ...withCtx(heavySwordCtx(1), [1, 4], [2, 7], [3, 12], [4, 17], [5, 23]),
  ...withCtx(heavySwordCtx(2), [1, 4], [2, 7], [3, 12], [4, 17], [5, 24]),
  ...withCtx(heavySwordCtx(3), [1, 5], [2, 10], [3, 16], [4, 23], [5, 32]),
  ...withCtx(heavySwordCtx(4), [1, 5], [2, 11], [3, 17], [4, 25], [5, 34]),
  ...withCtx(heavySwordCtx(5), [1, 5], [2, 11], [3, 18], [4, 26], [5, 36]),
  ...withCtx(heavySwordCtx(6), [1, 6], [2, 13], [3, 21], [4, 30], [5, 41]),
  ...withCtx(heavySwordCtx(7), [1, 9], [2, 20], [3, 32], [4, 47], [5, 64]),
  ...withCtx(heavySwordCtx(8), [1, 11], [2, 23], [3, 38], [4, 56], [5, 76]),
  ...withCtx(heavySwordCtx(9), [1, 18], [2, 40], [3, 65], [4, 95], [5, 131]),
  ...withCtx(heavySwordCtx(10), [1, 21], [2, 46], [3, 75], [4, 110], [5, 151]),
  ...withCtx(longSwordCtx(1), [1, 4], [2, 7], [3, 12], [4, 17], [5, 23]),
  ...withCtx(longSwordCtx(2), [1, 4], [2, 7], [3, 12], [4, 17], [5, 24]),
  ...withCtx(longSwordCtx(3), [1, 5], [2, 10], [3, 16], [4, 23], [5, 32]),
  ...withCtx(longSwordCtx(4), [1, 5], [2, 11], [3, 17], [4, 25], [5, 34]),
  ...withCtx(longSwordCtx(5), [1, 5], [2, 11], [3, 18], [4, 26], [5, 36]),
  ...withCtx(longSwordCtx(6), [1, 6], [2, 13], [3, 21], [4, 30], [5, 41]),
  ...withCtx(longSwordCtx(7), [1, 9], [2, 20], [3, 32], [4, 47], [5, 64]),
  ...withCtx(longSwordCtx(8), [1, 11], [2, 23], [3, 38], [4, 56], [5, 76]),
  ...withCtx(longSwordCtx(9), [1, 18], [2, 40], [3, 65], [4, 95], [5, 131]),
  ...withCtx(longSwordCtx(10), [1, 21], [2, 46], [3, 75], [4, 110], [5, 151]),
])(
  '_getPowerValue(ctx=%p, grade=%d) with zero weapon returns %d',
  (context, grade, expected) => {
    const value = _getPowerValue(grade, context);

    expect(value).toBe(expected);
  },
);

test.each([
  [ctx(GearType.cap, 60, 5, 5, false, AddOptionType.attackPower), 1, 1],
  [ctx(GearType.coat, 65, 5, 5, false, AddOptionType.attackPower), 2, 2],
  [ctx(GearType.cape, 100, 5, 5, false, AddOptionType.attackPower), 3, 3],
  [ctx(GearType.glove, 118, 5, 5, false, AddOptionType.attackPower), 4, 4],
  [ctx(GearType.pendant, 150, 5, 5, false, AddOptionType.attackPower), 5, 5],
  [ctx(GearType.earrings, 200, 5, 5, false, AddOptionType.attackPower), 1, 1],
  [ctx(GearType.belt, 250, 5, 5, false, AddOptionType.attackPower), 2, 2],
] satisfies [AddOptionContext, AddOptionGrade, number][])(
  '_getPowerValue(ctx=%p, grade=%d) with armor returns %d',
  (context, grade, expected) => {
    const value = _getPowerValue(grade, context);

    expect(value).toBe(expected);
  },
);

test.each([
  ctx(GearType.cap, 0, 5, 5, false, AddOptionType.attackPower),
  ctx(GearType.coat, 10, 5, 5, false, AddOptionType.attackPower),
  ctx(GearType.cape, 20, 5, 5, false, AddOptionType.attackPower),
  ctx(GearType.glove, 30, 5, 5, false, AddOptionType.attackPower),
  ctx(GearType.pendant, 40, 5, 5, false, AddOptionType.attackPower),
  ctx(GearType.earrings, 50, 5, 5, false, AddOptionType.attackPower),
  ctx(GearType.belt, 59, 5, 5, false, AddOptionType.attackPower),
])(
  '_getPowerValue(ctx=%p, grade=%d) with reqLevel < 60 throws TypeError',
  (context) => {
    expect(() => _getPowerValue(4, context)).toThrow(TypeError);
  },
);

test.each([
  [108, 1, 300],
  [108, 2, 600],
  [108, 3, 900],
  [108, 4, 1200],
  [108, 5, 1500],
  [145, 3, 1260],
  [145, 4, 1680],
  [145, 5, 2100],
  [145, 6, 2520],
  [145, 7, 2940],
  [160, 3, 1440],
  [160, 4, 1920],
  [160, 5, 2400],
  [160, 6, 2880],
  [160, 7, 3360],
  [180, 1, 540],
  [180, 2, 1080],
  [180, 3, 1620],
  [180, 4, 2160],
  [180, 5, 2700],
  [200, 3, 1800],
  [200, 4, 2400],
  [200, 5, 3000],
  [200, 6, 3600],
  [200, 7, 4200],
  [250, 3, 2100],
  [250, 4, 2800],
  [250, 5, 3500],
  [250, 6, 4200],
  [250, 7, 4900],
] satisfies [number, AddOptionGrade, number][])(
  '_getHpMpValue(reqLevel=%d, grade=%d) returns %d',
  (reqLevel, grade, expected) => {
    const value = _getHpMpValue(grade, { reqLevel });

    expect(value).toBe(expected);
  },
);

test.each([
  [GearType.cap, 1, 1],
  [GearType.pants, 2, 2],
  [GearType.glove, 3, 3],
  [GearType.pendant, 4, 4],
  [GearType.earrings, 5, 5],
  [GearType.belt, 6, 6],
  [GearType.pocket, 7, 7],
] satisfies [GearType, AddOptionGrade, number][])(
  '_getSpeedValue(gearType=%d, grade=%d) with non weapon gear returns %d',
  (gearType, grade, expected) => {
    const value = _getSpeedValue(grade, { gearType });

    expect(value).toBe(expected);
  },
);

test.each([
  GearType.shiningRod,
  GearType.staff,
  GearType.ohSword,
  GearType.thSword,
  GearType.bow,
  GearType.tuner,
  GearType.dagger,
])(
  '_getSpeedValue(gearType=%d) with weapon gear throws TypeError',
  (gearType) => {
    expect(() => _getSpeedValue(4, { gearType })).toThrow(TypeError);
  },
);

test.each([
  [GearType.cap, 1, 1],
  [GearType.pants, 2, 2],
  [GearType.glove, 3, 3],
  [GearType.pendant, 4, 4],
  [GearType.earrings, 5, 5],
  [GearType.belt, 6, 6],
  [GearType.pocket, 7, 7],
] satisfies [GearType, AddOptionGrade, number][])(
  '_getJumpValue(gearType=%d, grade=%d) with non weapon gear returns %d',
  (gearType, grade, expected) => {
    const value = _getJumpValue(grade, { gearType });

    expect(value).toBe(expected);
  },
);

test.each([
  GearType.shiningRod,
  GearType.staff,
  GearType.ohSword,
  GearType.thSword,
  GearType.bow,
  GearType.tuner,
  GearType.dagger,
])(
  '_getJumpValue(gearType=%d) with weapon gear throws TypeError',
  (gearType) => {
    expect(() => _getJumpValue(4, { gearType })).toThrow(TypeError);
  },
);

test.each([
  [GearType.shiningRod, 1, 1],
  [GearType.staff, 2, 2],
  [GearType.ohSword, 3, 3],
  [GearType.thSword, 4, 4],
  [GearType.bow, 5, 5],
  [GearType.tuner, 6, 6],
  [GearType.dagger, 7, 7],
] satisfies [GearType, AddOptionGrade, number][])(
  '_getDamageValue(gearType=%d, grade=%d) with weapon gear returns %d',
  (gearType, grade, expected) => {
    const value = _getDamageValue(grade, { gearType });

    expect(value).toBe(expected);
  },
);

test.each([
  GearType.cap,
  GearType.pants,
  GearType.glove,
  GearType.pendant,
  GearType.earrings,
  GearType.belt,
  GearType.pocket,
])(
  '_getDamageValue(gearType=%d) with non weapon gear throws TypeError',
  (gearType) => {
    expect(() => _getDamageValue(4, { gearType })).toThrow(TypeError);
  },
);

test.each([
  [GearType.shiningRod, 100, 1, 2],
  [GearType.staff, 110, 2, 4],
  [GearType.ohSword, 120, 3, 6],
  [GearType.thSword, 130, 4, 8],
  [GearType.bow, 140, 5, 10],
  [GearType.tuner, 160, 6, 12],
  [GearType.dagger, 200, 7, 14],
] satisfies [GearType, number, AddOptionGrade, number][])(
  '_getBossDamageValue(gearType=%d, reqLevel=%d, grade=%d) with weapon gear returns %d',
  (gearType, reqLevel, grade, expected) => {
    const value = _getBossDamageValue(grade, { gearType, reqLevel });

    expect(value).toBe(expected);
  },
);

test.each([
  GearType.cap,
  GearType.pants,
  GearType.glove,
  GearType.pendant,
  GearType.earrings,
  GearType.belt,
  GearType.pocket,
])(
  '_getBossDamageValue(gearType=%d) with non weapon gear throws TypeError',
  (gearType) => {
    expect(() => _getBossDamageValue(4, { gearType, reqLevel: 200 })).toThrow(
      TypeError,
    );
  },
);

test.each([0, 10, 20, 40, 60, 80, 89])(
  '_getBossDamageValue(reqLevel=%d) with reqLevel < 90 gear throws TypeError',
  (reqLevel) => {
    expect(() =>
      _getBossDamageValue(4, { gearType: GearType.staff, reqLevel }),
    ).toThrow(TypeError);
  },
);

test.each([
  [GearType.cap, 70, 1, 1],
  [GearType.cap, 150, 2, 2],
  [GearType.cap, 250, 3, 3],
  [GearType.thSword, 70, 4, 4],
  [GearType.thSword, 140, 5, 5],
  [GearType.thSword, 200, 6, 6],
] satisfies [GearType, number, AddOptionGrade, number][])(
  '_getAllStatValue(gearType=%d, reqLevel=%d, grade=%d) returns %d',
  (gearType, reqLevel, grade, expected) => {
    const value = _getAllStatValue(grade, { gearType, reqLevel });

    expect(value).toBe(expected);
  },
);

test.each([
  [GearType.ohSword, 0, 1, 1],
  [GearType.ohAxe, 50, 2, 2],
  [GearType.thBlunt, 69, 3, 3],
] satisfies [GearType, number, AddOptionGrade, number][])(
  '_getAllStatValue(gearType=%d, reqLevel=%d, grade=%d) with reqLevel < 70 and weapon gear returns %d',
  (gearType, reqLevel, grade, expected) => {
    const value = _getAllStatValue(grade, { gearType, reqLevel });

    expect(value).toBe(expected);
  },
);

test.each([
  [GearType.cap, 0],
  [GearType.longcoat, 50],
  [GearType.shoes, 69],
] satisfies [GearType, number][])(
  '_getAllStatValue(gearType=%d, reqLevel=%d) with reqLevel < 70 and non weapon gear throws TypeError',
  (gearType, reqLevel) => {
    expect(() => _getAllStatValue(4, { gearType, reqLevel })).toThrow(
      TypeError,
    );
  },
);

test.each([
  [70, 1, 5],
  [150, 2, 10],
  [250, 3, 15],
  [70, 4, 20],
  [140, 5, 25],
  [200, 6, 30],
  [250, 7, 35],
] satisfies [number, AddOptionGrade, number][])(
  '_getReqLevelDecreaseValue(reqLevel=%d, grade=%d) returns %d',
  (reqLevel, grade, expected) => {
    const value = _getReqLevelDecreaseValue(grade, { reqLevel });

    expect(value).toBe(expected);
  },
);

test.each([
  [8, 4, 8],
  [10, 3, 10],
  [20, 4, 20],
  [20, 5, 20],
] satisfies [number, AddOptionGrade, number][])(
  '_getReqLevelDecreaseValue(reqLevel=%d, grade=%d) returns value smaller or equal to reqLevel (%d)',
  (reqLevel, grade, expected) => {
    const value = _getReqLevelDecreaseValue(grade, { reqLevel });

    expect(value).toBe(expected);
  },
);

test('_getReqLevelDecreaseValue() with reqLevel=0 throws TypeError', () => {
  expect(() => _getReqLevelDecreaseValue(1, { reqLevel: 0 })).toThrow(
    TypeError,
  );
});

test.each([
  [AddOptionType.str, ['str']],
  [AddOptionType.dex, ['dex']],
  [AddOptionType.int, ['int']],
  [AddOptionType.luk, ['luk']],
  [AddOptionType.str_dex, ['str', 'dex']],
  [AddOptionType.str_int, ['str', 'int']],
  [AddOptionType.str_luk, ['str', 'luk']],
  [AddOptionType.dex_int, ['dex', 'int']],
  [AddOptionType.dex_luk, ['dex', 'luk']],
  [AddOptionType.int_luk, ['int', 'luk']],
  [AddOptionType.maxHp, ['maxHp']],
  [AddOptionType.maxMp, ['maxMp']],
  [AddOptionType.attackPower, ['attackPower']],
  [AddOptionType.magicPower, ['magicPower']],
  [AddOptionType.armor, ['armor']],
  [AddOptionType.speed, ['speed']],
  [AddOptionType.jump, ['jump']],
  [AddOptionType.bossDamage, ['bossDamage']],
  [AddOptionType.damage, ['damage']],
  [AddOptionType.allStat, ['allStat']],
  [AddOptionType.reqLevelDecrease, ['reqLevelDecrease']],
] satisfies [AddOptionType, (keyof GearAddOption)[]][])(
  '_getAddOptionKeys(%s) returns %p',
  (type, expected) => {
    const keys = _getAddOptionKeys(type);

    expect(keys).toEqual(expected);
  },
);

function ctx(
  gearType: GearType,
  reqLevel: number,
  attackPower: number,
  magicPower: number,
  bossReward: boolean,
  type: AddOptionType,
): AddOptionContext {
  return {
    gearType,
    reqLevel,
    attackPower,
    magicPower,
    bossReward,
    type,
  };
}

function heavySwordCtx(
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
): AddOptionContext {
  return {
    1: ctx(GearType.heavySword, 100, 102, 0, false, AddOptionType.attackPower),
    2: ctx(GearType.heavySword, 110, 105, 0, false, AddOptionType.attackPower),
    3: ctx(GearType.heavySword, 120, 107, 0, false, AddOptionType.attackPower),
    4: ctx(GearType.heavySword, 130, 114, 0, false, AddOptionType.attackPower),
    5: ctx(GearType.heavySword, 140, 121, 0, false, AddOptionType.attackPower),
    6: ctx(GearType.heavySword, 150, 139, 0, false, AddOptionType.attackPower),
    7: ctx(GearType.heavySword, 170, 173, 0, false, AddOptionType.attackPower),
    8: ctx(GearType.heavySword, 180, 207, 0, false, AddOptionType.attackPower),
    9: ctx(GearType.heavySword, 200, 297, 0, false, AddOptionType.attackPower),
    10: ctx(GearType.heavySword, 200, 342, 0, false, AddOptionType.attackPower),
  }[type];
}

function longSwordCtx(
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
): AddOptionContext {
  return {
    1: ctx(GearType.longSword, 100, 100, 0, false, AddOptionType.attackPower),
    2: ctx(GearType.longSword, 110, 103, 0, false, AddOptionType.attackPower),
    3: ctx(GearType.longSword, 120, 105, 0, false, AddOptionType.attackPower),
    4: ctx(GearType.longSword, 130, 112, 0, false, AddOptionType.attackPower),
    5: ctx(GearType.longSword, 140, 117, 0, false, AddOptionType.attackPower),
    6: ctx(GearType.longSword, 150, 135, 0, false, AddOptionType.attackPower),
    7: ctx(GearType.longSword, 170, 169, 0, false, AddOptionType.attackPower),
    8: ctx(GearType.longSword, 180, 203, 0, false, AddOptionType.attackPower),
    9: ctx(GearType.longSword, 200, 293, 0, false, AddOptionType.attackPower),
    10: ctx(GearType.longSword, 200, 337, 0, false, AddOptionType.attackPower),
  }[type];
}

function withCtx<T>(
  ctx: T,
  ...gradeValues: [AddOptionGrade, number][]
): [T, AddOptionGrade, number][] {
  return gradeValues.map(([grade, value]) => [ctx, grade, value]);
}
