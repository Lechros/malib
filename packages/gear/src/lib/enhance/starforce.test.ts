import {
  GearCapability,
  GearOption,
  GearStarforceOption,
  GearType,
} from '../data';
import { Gear } from '../Gear';
import { createGear, upgradePatch } from '../test';
import { SpellTraceType } from './spellTrace';
import {
  canResetStarforce,
  canStarforce,
  canStarScroll,
  getMaxStar,
  resetStarforce,
  starforce,
  starScroll,
  supportsStarforce,
} from './starforce';

describe('supportsStarforce', () => {
  it('canStarforce = Can일 경우 true를 반환한다.', () => {
    const gear = createGear({
      attributes: { canStarforce: GearCapability.Can },
    });

    expect(supportsStarforce(gear)).toBe(true);
  });

  it('canStarforce = Fixed일 경우 false를 반환한다.', () => {
    const gear = createGear({
      attributes: { canStarforce: GearCapability.Fixed },
    });

    expect(supportsStarforce(gear)).toBe(false);
  });

  it('canStarforce = Cannot일 경우 false를 반환한다.', () => {
    const gear = createGear({
      attributes: { canStarforce: GearCapability.Cannot },
    });

    expect(supportsStarforce(gear)).toBe(false);
  });
});

describe('canStarforce', () => {
  it.each([
    [0, 0, true],
    [0, 5, false],
    [110, 9, true],
    [110, 10, false],
    [110, 11, false],
    [140, 15, true],
    [140, 24, true],
    [140, 25, true],
    [140, 30, false],
  ])(
    '요구 레벨 %d, 스타포스 강화 %d성일 때 %p를 반환한다.',
    (reqLevel, star, expected) => {
      const gear = createGear({
        req: { level: reqLevel },
        attributes: { canStarforce: GearCapability.Can },
        star,
      });

      expect(canStarforce(gear)).toBe(expected);
    },
  );

  it.each([
    [0, 0, true],
    [0, 5, true],
    [110, 9, true],
    [110, 10, true],
    [110, 11, true],
    [140, 15, true],
    [140, 24, true],
    [140, 25, true],
    [140, 29, true],
    [140, 30, false],
    [0, 15, false],
    [100, 15, false],
    [101, 15, true],
    [101, 18, true],
    [101, 19, false],
    [110, 19, false],
    [111, 19, true],
    [111, 28, true],
    [111, 29, false],
  ])(
    '요구 레벨 %d, 스타포스 강화 %d성일 때 ignoreMaxStar=true로 호출하면 %p를 반환한다.',
    (reqLevel, star, expected) => {
      const gear = createGear({
        req: { level: reqLevel },
        attributes: { canStarforce: GearCapability.Can },
        star,
      });

      expect(canStarforce(gear, true)).toBe(expected);
    },
  );

  it.each([
    [0, 0, true],
    [0, 5, true],
    [110, 9, true],
    [110, 10, true],
    [110, 11, true],
    [120, 15, false],
    [140, 15, false],
  ])(
    '요구 레벨 %d, 놀라운 장비 강화 %d성일 때 ignoreMaxStar=true로 호출하면 %p를 반환한다.',
    (reqLevel, star, expected) => {
      const gear = createGear({
        req: { level: reqLevel },
        attributes: { canStarforce: GearCapability.Can },
        star,
        starScroll: true,
      });

      expect(canStarforce(gear, true)).toBe(expected);
    },
  );

  it.each([
    [0, 0, true],
    [0, 5, false],
    [120, 9, true],
    [120, 10, false],
    [120, 11, false],
    [140, 10, true],
    [140, 15, false],
  ])(
    '요구 레벨 %d, 스타포스 강화 %d성인 슈페리얼 장비일 때 %p를 반환한다.',
    (reqLevel, star, expected) => {
      const gear = createGear({
        req: { level: reqLevel },
        attributes: { canStarforce: GearCapability.Can, superior: true },
        star,
      });

      expect(canStarforce(gear)).toBe(expected);
    },
  );
});

describe('starforce', () => {
  it('스타포스 강화가 1성 증가한다.', () => {
    const gear = createGear({
      attributes: { canStarforce: GearCapability.Can },
      star: 1,
    });

    starforce(gear);

    expect(gear.star).toBe(2);
  });

  describe('방어구, 장신구 starforceOption', () => {
    it.each([
      ...gso(createGear('리버스 휀넬'), {
        1: { str: 2, dex: 2, maxHp: 5, armor: 7 },
        2: { str: 4, dex: 4, maxHp: 10, armor: 14 },
        3: { str: 6, dex: 6, maxHp: 15, armor: 21 },
        4: { str: 8, dex: 8, maxHp: 25, armor: 29 },
        5: { str: 10, dex: 10, maxHp: 35, armor: 37 },
        10: { str: 25, dex: 25, maxHp: 130, armor: 83 },
        15: { str: 40, dex: 40, maxHp: 255, armor: 142 },
      }),
      ...gso(createGear('앱솔랩스 시프슈즈'), {
        5: { dex: 10, luk: 10, armor: 44, speed: 3, jump: 3 },
        9: { dex: 22, luk: 22, armor: 88, speed: 7, jump: 7 },
        16: {
          dex: 53,
          luk: 53,
          attackPower: 10,
          magicPower: 10,
          armor: 189,
          speed: 18,
          jump: 18,
        },
        22: {
          dex: 131,
          luk: 131,
          attackPower: 92,
          magicPower: 92,
          armor: 306,
          speed: 18,
          jump: 18,
        },
      }),
      ...gso(
        createGear('앱솔랩스 시프슈즈', [
          upgradePatch([
            [SpellTraceType.str, 15],
            [SpellTraceType.luk, 15],
          ]),
        ]),
        {
          5: { dex: 10, luk: 10, armor: 77, speed: 3, jump: 3 },
          9: { dex: 22, luk: 22, armor: 155, speed: 7, jump: 7 },
          16: {
            str: 13,
            dex: 53,
            luk: 53,
            attackPower: 10,
            magicPower: 10,
            armor: 332,
            speed: 18,
            jump: 18,
          },
          22: {
            str: 91,
            dex: 131,
            luk: 131,
            attackPower: 92,
            magicPower: 92,
            armor: 540,
            speed: 18,
            jump: 18,
          },
        },
      ),
      ...gso(createGear('에테르넬 나이트케이프'), {
        16: {
          str: 57,
          dex: 57,
          int: 17,
          luk: 17,
          maxHp: 255,
          attackPower: 14,
          magicPower: 14,
          armor: 722,
        },
        17: {
          str: 74,
          dex: 74,
          int: 34,
          luk: 34,
          maxHp: 255,
          attackPower: 29,
          magicPower: 29,
          armor: 789,
        },
        22: {
          str: 159,
          dex: 159,
          int: 119,
          luk: 119,
          maxHp: 255,
          attackPower: 120,
          magicPower: 120,
          armor: 1175,
        },
        23: {
          str: 159,
          dex: 159,
          int: 119,
          luk: 119,
          maxHp: 255,
          attackPower: 143,
          magicPower: 143,
          armor: 1264,
        },
      }),
      ...gso(createGear('데아 시두스 이어링'), {
        15: { str: 40, dex: 40, int: 40, luk: 40, armor: 64 },
        20: {
          str: 75,
          dex: 75,
          int: 75,
          luk: 75,
          attackPower: 45,
          magicPower: 45,
          armor: 99,
        },
      }),
      ...gso(
        createGear('몽환의 벨트', {
          upgradeOption: {
            str: 24,
            dex: 9,
            int: 2,
            luk: 9,
            maxHp: 130,
            maxMp: 90,
            attackPower: 24,
            magicPower: 4,
            armor: 7,
          },
        }),
        {
          15: { str: 40, dex: 40, int: 40, luk: 40, maxHp: 255, armor: 181 },
          22: {
            str: 145,
            dex: 145,
            int: 145,
            luk: 145,
            maxHp: 255,
            attackPower: 106,
            magicPower: 106,
            armor: 321,
          },
          24: {
            str: 145,
            dex: 145,
            int: 145,
            luk: 145,
            maxHp: 255,
            attackPower: 150,
            magicPower: 150,
            armor: 371,
          },
          28: {
            str: 145,
            dex: 145,
            int: 145,
            luk: 145,
            maxHp: 255,
            attackPower: 256,
            magicPower: 256,
            armor: 487,
          },
        },
      ),
      ...gso(createGear('근원의 속삭임'), {
        1: { str: 2, dex: 2, int: 2, luk: 2, maxHp: 5, armor: 1 },
        10: { str: 25, dex: 25, int: 25, luk: 25, maxHp: 130, armor: 10 },
        17: {
          str: 74,
          dex: 74,
          int: 74,
          luk: 74,
          maxHp: 255,
          attackPower: 29,
          magicPower: 29,
          armor: 17,
        },
        18: {
          str: 91,
          dex: 91,
          int: 91,
          luk: 91,
          maxHp: 255,
          attackPower: 45,
          magicPower: 45,
          armor: 18,
        },
        22: {
          str: 159,
          dex: 159,
          int: 159,
          luk: 159,
          maxHp: 255,
          attackPower: 120,
          magicPower: 120,
          armor: 24,
        },
      }),
      ...gso(createGear('리튬 하트'), {
        1: { str: 2, dex: 2, int: 2, luk: 2 },
        2: { str: 4, dex: 4, int: 4, luk: 4 },
        3: { str: 6, dex: 6, int: 6, luk: 6 },
        4: { str: 8, dex: 8, int: 8, luk: 8 },
        5: { str: 10, dex: 10, int: 10, luk: 10 },
      }),
      ...gso(createGear('페어리 하트'), {
        1: { str: 2, dex: 2, int: 2, luk: 2 },
        2: { str: 4, dex: 4, int: 4, luk: 4 },
        3: { str: 6, dex: 6, int: 6, luk: 6 },
        4: { str: 8, dex: 8, int: 8, luk: 8 },
        5: { str: 10, dex: 10, int: 10, luk: 10 },
        6: { str: 13, dex: 13, int: 13, luk: 13 },
        7: { str: 16, dex: 16, int: 16, luk: 16 },
        8: { str: 19, dex: 19, int: 19, luk: 19 },
      }),
      ...gso(createGear('리퀴드메탈 하트'), {
        10: { str: 25, dex: 25, int: 25, luk: 25 },
        15: { str: 40, dex: 40, int: 40, luk: 40 },
      }),
      ...gso(createGear('컴플리트 언더컨트롤'), {
        22: {
          str: 145,
          dex: 145,
          int: 145,
          luk: 145,
          attackPower: 106,
          magicPower: 106,
        },
      }),
    ])(
      '%s를 %d성까지 스타포스 강화하면 %o 옵션이 설정된다.',
      (_, star, expected, gear) => {
        for (let i = gear.star; i < star; i++) {
          starforce(gear);
        }

        expect(gear.starforceOption).toEqual(expected);
      },
    );

    it.each([
      [4, 0],
      [5, 1],
      [6, 1],
      [7, 2],
      [8, 2],
      [9, 3],
      [10, 3],
      [11, 4],
      [11, 4],
      [13, 5],
      [14, 6],
      [15, 7],
      [16, 14],
    ])('%d성 130제 장갑의 공격력은 %d이다.', (star, expected) => {
      const gear = createGear({
        type: GearType.glove,
        req: { level: 130 },
        attributes: { canStarforce: GearCapability.Can },
      });

      for (let i = 0; i < star; i++) {
        starforce(gear);
      }

      expect(gear.starforceOption.attackPower).toBe(expected);
    });

    it.each([
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
      [10, 0],
      [11, 0],
      [11, 0],
      [13, 0],
      [14, 0],
      [15, 0],
    ])('%d성 120제 장갑의 공격력은 %d이다.', (star, expected) => {
      const gear = createGear({
        type: GearType.glove,
        req: { level: 120 },
        attributes: { canStarforce: GearCapability.Can },
      });

      for (let i = 0; i < star; i++) {
        starforce(gear);
      }

      expect(gear.starforceOption.attackPower).toBe(expected);
    });
  });

  describe('무기 starforceOption', () => {
    it.each([
      ...gso(
        createGear('쟈이힌 스태프', [upgradePatch([[SpellTraceType.int, 15]])]),
        {
          20: {
            int: 75,
            luk: 75,
            maxHp: 255,
            maxMp: 255,
            attackPower: 77,
            magicPower: 119,
          },
        },
      ),
      ...gso(
        createGear(
          '제네시스 브레스 슈터',
          {
            attributes: {
              canStarforce: GearCapability.Can,
              canScroll: GearCapability.Can,
            },
          },
          [upgradePatch([[SpellTraceType.dex, 15]])],
        ),
        {
          22: { str: 145, dex: 145, maxHp: 255, maxMp: 255, attackPower: 246 },
        },
      ),
      ...gso(
        createGear('라즐리 9형', [upgradePatch([[SpellTraceType.str, 15]])]),
        {
          28: { str: 145, dex: 145, maxHp: 255, maxMp: 255, attackPower: 459 },
        },
      ),
    ])(
      '%s를 %d성까지 스타포스 강화하면 %o 옵션이 설정된다.',
      (_, star, expected, gear) => {
        for (let i = gear.star; i < star; i++) {
          starforce(gear);
        }

        expect(gear.starforceOption).toEqual(expected);
      },
    );
  });

  describe('놀라운 장비 강화 주문서가 적용된 장비 starforceOption', () => {
    it.each([
      ...gso(
        createGear('스칼렛 링', {
          upgradeOption: {
            attackPower: 8,
          },
          starforceOption: {
            str: 114,
            dex: 114,
            int: 114,
            luk: 114,
            attackPower: 71,
            magicPower: 71,
            armor: 88,
          },
          star: 12,
          starScroll: true,
        }),
        {
          13: {
            str: 117,
            dex: 117,
            int: 117,
            luk: 117,
            maxHp: 25,
            attackPower: 71,
            magicPower: 71,
            armor: 98,
          },
          14: {
            str: 120,
            dex: 120,
            int: 120,
            luk: 120,
            maxHp: 50,
            attackPower: 71,
            magicPower: 71,
            armor: 108,
          },
          15: {
            str: 123,
            dex: 123,
            int: 123,
            luk: 123,
            maxHp: 75,
            attackPower: 71,
            magicPower: 71,
            armor: 119,
          },
        },
      ),
    ])(
      '%s를 %d성까지 스타포스 강화하면 %o 옵션이 설정된다.',
      (_, star, expected, gear) => {
        for (let i = gear.star; i < star; i++) {
          starforce(gear);
        }

        expect(gear.starforceOption).toEqual(expected);
      },
    );
  });

  describe('슈페리얼 장비 starforceOption', () => {
    it.each([
      ...gso(createGear('노바 히아데스 클록'), {
        1: { str: 9, dex: 9, int: 9, luk: 9, armor: 4 },
        5: { str: 65, dex: 65, int: 65, luk: 65, armor: 22 },
        6: {
          str: 65,
          dex: 65,
          int: 65,
          luk: 65,
          attackPower: 5,
          magicPower: 5,
          armor: 27,
        },
        7: {
          str: 65,
          dex: 65,
          int: 65,
          luk: 65,
          attackPower: 11,
          magicPower: 11,
          armor: 32,
        },
        8: {
          str: 65,
          dex: 65,
          int: 65,
          luk: 65,
          attackPower: 18,
          magicPower: 18,
          armor: 38,
        },
      }),
      ...gso(createGear('타일런트 케이론 클록'), {
        1: { str: 19, dex: 19, int: 19, luk: 19, armor: 8 },
        5: { str: 115, dex: 115, int: 115, luk: 115, armor: 44 },
        6: {
          str: 115,
          dex: 115,
          int: 115,
          luk: 115,
          attackPower: 9,
          magicPower: 9,
          armor: 54,
        },
        12: {
          str: 115,
          dex: 115,
          int: 115,
          luk: 115,
          attackPower: 87,
          magicPower: 87,
          armor: 127,
        },
        15: {
          str: 115,
          dex: 115,
          int: 115,
          luk: 115,
          attackPower: 150,
          magicPower: 150,
          armor: 172,
        },
      }),
    ])(
      '%s를 %d성까지 스타포스 강화하면 %o 옵션이 설정된다.',
      (_, star, expected, gear) => {
        for (let i = gear.star; i < star; i++) {
          starforce(gear);
        }

        expect(gear.starforceOption).toEqual(expected);
      },
    );
  });

  it.each([
    [GearType.glove, 'attackPower', 322],
    [GearType.cap, 'int', 145],
    [GearType.tuner, 'attackPower', 417],
    [GearType.bow, 'maxHp', 255],
    [GearType.shoes, 'speed', 18],
  ] satisfies [GearType, keyof GearOption, number][])(
    '장비 분류 %d, 요구 레벨 200 장비를 30성까지 강화하면 %s의 값이 %d이다.',
    (type, key, expected) => {
      const gear = createGear({
        type,
        req: { level: 200 },
        attributes: { canStarforce: GearCapability.Can },
      });

      for (let i = 0; i < 30; i++) {
        starforce(gear);
      }

      expect(gear.starforceOption).toHaveProperty(key, expected);
    },
  );

  it.each([
    [
      100,
      30,
      20,
      {
        str: 50,
        dex: 50,
        maxHp: 255,
        attackPower: 30,
        magicPower: 30,
        armor: 191,
      },
    ],
  ] satisfies [number, number, number, Partial<GearOption>][])(
    '요구 레벨이 %d + %d인 장비를 %d성까지 강화하면 %o 옵션이 설정된다.',
    (reqLevel, reqLevelIncrease, star, expected) => {
      const gear = createGear({
        type: GearType.coat,
        req: { level: reqLevel, levelIncrease: reqLevelIncrease, job: 1 },
        attributes: { canStarforce: GearCapability.Can },
        baseOption: {
          str: 2,
          dex: 6,
          armor: 105,
        },
      });

      for (let i = 0; i < star; i++) {
        starforce(gear);
      }

      expect(gear.starforceOption).toEqual(expected);
    },
  );
});

describe('canStarScroll', () => {
  it.each([
    [0, 0, true],
    [0, 5, false],
    [110, 9, true],
    [110, 10, false],
    [110, 11, false],
    [140, 15, false],
    [140, 20, false],
  ])(
    '요구 레벨 %d, 스타포스 강화 %d성일 때 %p를 반환한다.',
    (reqLevel, star, expected) => {
      const gear = createGear({
        req: { level: reqLevel },
        attributes: { canStarforce: GearCapability.Can },
        star,
      });

      expect(canStarScroll(gear)).toBe(expected);
    },
  );

  it.each([
    [0, 0, true],
    [0, 5, true],
    [110, 9, true],
    [110, 10, true],
    [110, 11, true],
    [140, 15, false],
    [140, 20, false],
  ])(
    '요구 레벨 %d, 스타포스 강화 %d성일 때 ignoreMaxStar=true로 호출하면 %p를 반환한다.',
    (reqLevel, star, expected) => {
      const gear = createGear({
        req: { level: reqLevel },
        attributes: { canStarforce: GearCapability.Can },
        star,
      });

      expect(canStarScroll(gear, true)).toBe(expected);
    },
  );

  it.each([
    [0, 0, true],
    [0, 5, true],
    [110, 9, true],
    [110, 10, true],
    [110, 11, true],
    [140, 15, false],
    [140, 20, false],
  ])(
    '요구 레벨 %d, 놀라운 장비 강화 %d성일 때 ignoreMaxStar=true로 호출하면 %p를 반환한다.',
    (reqLevel, star, expected) => {
      const gear = createGear({
        req: { level: reqLevel },
        attributes: { canStarforce: GearCapability.Can },
        star,
        starScroll: true,
      });

      expect(canStarScroll(gear, true)).toBe(expected);
    },
  );

  it.each([
    [0, 0, false],
    [0, 5, false],
    [110, 9, false],
    [110, 10, false],
    [110, 11, false],
    [120, 15, false],
    [140, 15, false],
  ])(
    '요구 레벨 %d, 스타포스 강화 %d성인 슈페리얼 장비일 때 %p를 반환한다.',
    (reqLevel, star, expected) => {
      const gear = createGear({
        req: { level: reqLevel },
        attributes: { canStarforce: GearCapability.Can, superior: true },
        star,
      });

      expect(canStarScroll(gear)).toBe(expected);
    },
  );
});

describe('starScroll', () => {
  it('스타포스 강화가 1성 증가한다.', () => {
    const gear = createGear({
      attributes: { canStarforce: GearCapability.Can },
    });

    starScroll(gear);

    expect(gear.star).toBe(1);
  });

  it('starScroll 속성을 true로 설정한다.', () => {
    const gear = createGear({
      attributes: { canStarforce: GearCapability.Can },
    });

    starScroll(gear);

    expect(gear.starScroll).toBe(true);
  });

  describe('방어구, 장신구 starforceOption', () => {
    it.each([
      ...gso(
        createGear('노가다 목장갑', {
          upgradeOption: {
            str: 50,
            dex: 50,
            int: 50,
            luk: 50,
            attackPower: 5,
            magicPower: 5,
            armor: 50,
          },
        }),
        {
          5: { str: 25, dex: 25, int: 25, luk: 25, armor: 17 },
          8: {
            str: 25,
            dex: 25,
            int: 25,
            luk: 25,
            attackPower: 6,
            magicPower: 6,
            armor: 29,
          },
          12: {
            str: 25,
            dex: 25,
            int: 25,
            luk: 25,
            attackPower: 29,
            magicPower: 29,
            armor: 49,
          },
        },
      ),
      ...gso(createGear('스칼렛 숄더'), {
        5: {
          str: 95,
          dex: 95,
          int: 95,
          luk: 95,
          armor: 37,
        },
        12: {
          str: 95,
          dex: 95,
          int: 95,
          luk: 95,
          attackPower: 71,
          magicPower: 71,
          armor: 109,
        },
      }),
      ...gso(createGear('데이브레이크 펜던트'), {
        12: {
          str: 105,
          dex: 105,
          int: 105,
          luk: 105,
          attackPower: 78,
          magicPower: 78,
          armor: 88,
        },
      }),
    ])(
      '%s를 %d성까지 놀라운 장비 강화하면 %o 옵션이 설정된다.',
      (_, star, expected, gear) => {
        for (let i = gear.star; i < star; i++) {
          starScroll(gear, false, true);
        }

        expect(gear.starforceOption).toEqual(expected);
      },
    );
    it.each([
      ...gso(createGear('펜살리르 스키퍼부츠'), {
        5: {
          str: 105,
          dex: 105,
          maxHp: 250,
          armor: 26,
        },
        10: {
          str: 105,
          dex: 105,
          maxHp: 500,
          attackPower: 50,
          armor: 58,
        },
        12: {
          str: 105,
          dex: 105,
          maxHp: 600,
          attackPower: 78,
          armor: 73,
        },
      }),
    ])(
      '%s를 보너스를 적용하여 %d성까지 놀라운 장비 강화하면 %o 옵션이 설정된다.',
      (_, star, expected, gear) => {
        for (let i = gear.star; i < star; i++) {
          starScroll(gear, true);
        }

        expect(gear.starforceOption).toEqual(expected);
      },
    );

    it.each([
      ...gso(createGear('스칼렛 링'), {
        1: { str: 16, dex: 16, int: 16, luk: 16, armor: 6 },
        3: { str: 52, dex: 52, int: 52, luk: 52, armor: 18 },
        5: { str: 100, dex: 100, int: 100, luk: 100, armor: 31 },
        10: {
          str: 110,
          dex: 110,
          int: 110,
          luk: 110,
          attackPower: 45,
          magicPower: 45,
          armor: 70,
        },
        12: {
          str: 114,
          dex: 114,
          int: 114,
          luk: 114,
          attackPower: 71,
          magicPower: 71,
          armor: 88,
        },
      }),
    ])(
      '%s를 보너스를 적용하여 %d성까지 놀라운 장비 강화하면 %o 옵션이 설정된다.',
      (_, star, expected, gear) => {
        for (let i = gear.star; i < star; i++) {
          starScroll(gear, true);
        }

        expect(gear.starforceOption).toEqual(expected);
      },
    );
  });

  describe('무기 starforceOption', () => {
    it.each([
      ...gso(
        createGear('쟈이힌 스태프', [upgradePatch([[SpellTraceType.int, 15]])]),
        { 12: { int: 90, attackPower: 104, magicPower: 139 } },
      ),
    ])(
      '%s를 %d성까지 놀라운 장비 강화하면 %o 옵션이 설정된다.',
      (_, star, expected, gear) => {
        for (let i = gear.star; i < star; i++) {
          starScroll(gear);
        }

        expect(gear.starforceOption).toEqual(expected);
      },
    );

    it.each([
      ...gso(
        createGear('쟈이힌 스태프', [upgradePatch([[SpellTraceType.int, 15]])]),
        {
          1: { int: 14, attackPower: 3, magicPower: 6 },
          2: { int: 29, attackPower: 6, magicPower: 12 },
          5: { int: 90, attackPower: 16, magicPower: 30 },
          8: { int: 90, attackPower: 52, magicPower: 74 },
          12: { int: 90, attackPower: 118, magicPower: 152 },
        },
      ),
    ])(
      '%s를 보너스를 적용하여 %d성까지 놀라운 장비 강화하면 %o 옵션이 설정된다.',
      (_, star, expected, gear) => {
        for (let i = gear.star; i < star; i++) {
          starScroll(gear, true);
        }

        expect(gear.starforceOption).toEqual(expected);
      },
    );
  });
});

describe('canResetStarforce', () => {
  it('canStarforce = Can일 경우 true를 반환한다.', () => {
    const gear = createGear({
      attributes: { canStarforce: GearCapability.Can },
    });

    expect(canResetStarforce(gear)).toBe(true);
  });

  it('canStarforce = Fixed일 경우 false를 반환한다.', () => {
    const gear = createGear({
      attributes: { canStarforce: GearCapability.Fixed },
    });

    expect(canResetStarforce(gear)).toBe(false);
  });

  it('canStarforce = Cannot일 경우 false를 반환한다.', () => {
    const gear = createGear({
      attributes: { canStarforce: GearCapability.Cannot },
    });

    expect(canResetStarforce(gear)).toBe(false);
  });

  it('스타포스 강화가 0일 경우 true를 반환한다.', () => {
    const gear = createGear({
      attributes: { canStarforce: GearCapability.Can },
      star: 0,
    });

    expect(canResetStarforce(gear)).toBe(true);
  });
});

describe('resetStarforce', () => {
  it('스타포스 강화를 0성으로 설정한다.', () => {
    const gear = createGear({
      attributes: { canStarforce: GearCapability.Can },
      star: 5,
    });

    resetStarforce(gear);

    expect(gear.star).toBe(0);
  });

  it('스타포스 옵션을 초기화한다.', () => {
    const gear = createGear({
      attributes: { canStarforce: GearCapability.Can },
      starforceOption: { str: 1 },
    });

    resetStarforce(gear);

    expect(gear.starforceOption).toEqual({});
  });
});

describe('getMaxStar', () => {
  it('canStarforce = Cannot일 경우 0을 반환한다.', () => {
    const gear = createGear({
      attributes: { canStarforce: GearCapability.Cannot },
    });

    expect(getMaxStar(gear)).toBe(0);
  });

  it('canStarforce = Fixed일 경우 0이 아닌 값을 반환한다.', () => {
    const gear = createGear({
      attributes: { canStarforce: GearCapability.Fixed },
    });

    expect(getMaxStar(gear)).not.toBe(0);
  });

  it.each([
    [0, 5],
    [90, 5],
    [95, 8],
    [98, 8],
    [110, 10],
    [120, 15],
    [130, 20],
    [140, 30],
    [250, 30],
  ] satisfies [number, number][])(
    '요구 레벨이 %d일 경우 %d를 반환한다.',
    (reqLevel, expected) => {
      const gear = createGear({
        req: { level: reqLevel },
        attributes: { canStarforce: GearCapability.Can },
      });

      expect(getMaxStar(gear)).toBe(expected);
    },
  );

  it.each([
    [0, 3],
    [90, 3],
    [95, 5],
    [98, 5],
    [110, 8],
    [120, 10],
    [130, 12],
    [140, 15],
    [250, 15],
  ] satisfies [number, number][])(
    '요구 레벨 %d, 슈페리얼일 경우 %d을 반환한다.',
    (reqLevel, expected) => {
      const gear = createGear({
        req: { level: reqLevel },
        attributes: { canStarforce: GearCapability.Can, superior: true },
      });

      expect(getMaxStar(gear)).toBe(expected);
    },
  );

  it('요구 레벨 110, 놀라운 장비 강화 주문서가 적용되었을 경우 15를 반환한다.', () => {
    const gear = createGear({
      req: { level: 140 },
      attributes: { canStarforce: GearCapability.Can },
      starScroll: true,
    });

    expect(getMaxStar(gear)).toBe(15);
  });

  it('요구 레벨 140, 놀라운 장비 강화 주문서가 적용되었을 경우 15를 반환한다', () => {
    const gear = createGear({
      req: { level: 140 },
      attributes: { canStarforce: GearCapability.Can },
      starScroll: true,
    });

    expect(getMaxStar(gear)).toBe(15);
  });

  it('요구 레벨이 110 + 20일 경우 20을 반환한다.', () => {
    const gear = createGear({
      req: { level: 110, levelIncrease: 20 },
      attributes: { canStarforce: GearCapability.Can },
    });

    expect(getMaxStar(gear)).toBe(20);
  });
});

function gso(
  gear: Gear,
  options: Record<number, Partial<GearStarforceOption>>,
): [string, number, Partial<GearStarforceOption>, Gear][] {
  return Object.entries(options).map(([star, expected]) => {
    return [
      gear.name,
      Number(star),
      expected,
      new Gear(structuredClone(gear.data)),
    ];
  });
}
