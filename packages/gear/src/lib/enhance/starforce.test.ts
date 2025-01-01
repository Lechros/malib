import { GearType } from '../data';
import { defaultGear } from '../testUtils';
import {
  canResetStarforce,
  canStarforce,
  canStarScroll,
  resetStarforce,
  starforce,
  starScroll,
  supportsStarforce,
} from './starforce';

describe('supportsStarforce', () => {
  it('is true', () => {
    const gear = defaultGear({
      maxStar: 1,
    });

    expect(supportsStarforce(gear)).toBe(true);
  });

  it('is false for maxStar == 0', () => {
    const gear = defaultGear({
      scrollUpgradeableCount: 3,
    });

    expect(supportsStarforce(gear)).toBe(false);
  });

  it('is false for superior and maxStar == 0', () => {
    const gear = defaultGear({
      attributes: {
        superior: true,
      },
    });

    expect(supportsStarforce(gear)).toBe(false);
  });

  it('is false for starScroll and maxStar == 0', () => {
    const gear = defaultGear({
      starScroll: true,
    });

    expect(supportsStarforce(gear)).toBe(false);
  });

  it('is false for star == 1', () => {
    const gear = defaultGear({
      star: 1,
    });

    expect(supportsStarforce(gear)).toBe(false);
  });
});

describe('canStarforce', () => {
  it.each([
    [0, 0, false],
    [0, 5, true],
    [5, 5, false],
    [9, 10, true],
    [10, 10, false],
    [11, 10, false],
    [15, 25, true],
    [24, 25, true],
    [25, 25, false],
    [25, 20, false],
    [25, 30, false],
  ])('star = %d, maxStar = %d is %p', (star, maxStar, expected) => {
    const gear = defaultGear({ star, maxStar });

    expect(canStarforce(gear)).toBe(expected);
  });

  it.each([
    [0, 0, false],
    [0, 5, true],
    [5, 5, true],
    [9, 10, true],
    [10, 10, true],
    [11, 10, true],
    [15, 25, true],
    [24, 25, true],
    [25, 25, false],
    [25, 20, false],
    [25, 30, false],
  ])(
    'star = %d, maxStar = %d, ignoreMaxStar is %p',
    (star, maxStar, expected) => {
      const gear = defaultGear({ star, maxStar });

      expect(canStarforce(gear, true)).toBe(expected);
    },
  );

  it.each([
    [0, 0, false],
    [0, 5, true],
    [5, 5, true],
    [9, 10, true],
    [10, 10, true],
    [11, 10, true],
    [15, 25, false],
    [15, 15, false],
    [15, 20, false],
  ])(
    'star = %d, maxStar = %d, starScroll, ignoreMaxStar is %p',
    (star, maxStar, expected) => {
      const gear = defaultGear({ star, maxStar, starScroll: true });

      expect(canStarforce(gear, true)).toBe(expected);
    },
  );

  it.each([
    [0, 0, false],
    [0, 5, true],
    [5, 5, false],
    [9, 10, true],
    [10, 10, false],
    [11, 10, false],
    [10, 15, true],
    [15, 15, false],
    [15, 20, false],
  ])(
    'star = %d, maxStar = %d, superior, ignoreMaxStar is %p',
    (star, maxStar, expected) => {
      const gear = defaultGear({
        attributes: { superior: true },
        star,
        maxStar,
      });

      expect(canStarforce(gear)).toBe(expected);
    },
  );
});

describe('starforce', () => {
  it('increments star by 1', () => {
    const gear = defaultGear({ star: 1, maxStar: 5 });

    starforce(gear);

    expect(gear.star).toBe(2);
  });

  it('does not change data maxStar', () => {
    const gear = defaultGear({ star: 15, maxStar: 15 });

    starforce(gear, true);

    expect(gear.data.maxStar).toBe(15);
  });

  describe('sets starforceOption', () => {
    it.each([
      [
        {
          type: GearType.cap,
          req: { level: 120, job: 1 },
          baseOption: { str: 6, armor: 120 },
          maxStar: 15,
        },
        {
          1: { str: 2, dex: 2, maxHp: 5, armor: 7 },
          2: { str: 4, dex: 4, maxHp: 10, armor: 14 },
          3: { str: 6, dex: 6, maxHp: 15, armor: 21 },
          4: { str: 8, dex: 8, maxHp: 25, armor: 29 },
          5: { str: 10, dex: 10, maxHp: 35, armor: 37 },
          10: { str: 25, dex: 25, maxHp: 130, armor: 83 },
          15: { str: 40, dex: 40, maxHp: 255, armor: 142 },
        },
      ],
      [
        {
          type: GearType.shoes,
          req: { level: 160, job: 8 },
          baseOption: {
            dex: 20,
            luk: 20,
            attackPower: 5,
            armor: 150,
            speed: 10,
            jump: 7,
          },
          maxStar: 25,
        },
        {
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
        },
      ],
      [
        {
          type: GearType.shoes,
          req: { level: 160, job: 8 },
          baseOption: {
            dex: 20,
            luk: 20,
            attackPower: 5,
            armor: 150,
            speed: 10,
            jump: 7,
          },
          upgradeOption: {
            str: 10,
            luk: 70,
            maxHp: 1360,
            attackPower: 1,
            armor: 120,
          },
          maxStar: 25,
        },
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
      ],
      [
        {
          type: GearType.cape,
          req: { level: 250, job: 1 },
          baseOption: {
            str: 50,
            dex: 50,
            int: 50,
            luk: 50,
            attackPower: 9,
            magicPower: 9,
            armor: 600,
          },
          maxStar: 25,
        },
        {
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
        },
      ],
      [
        {
          type: GearType.earrings,
          req: { level: 130 },
          baseOption: {
            str: 5,
            dex: 5,
            int: 5,
            luk: 5,
            attackPower: 2,
            magicPower: 2,
            armor: 50,
          },
          maxStar: 20,
        },
        {
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
        },
      ],
      [
        {
          type: GearType.belt,
          req: { level: 200 },
          baseOption: {
            str: 50,
            dex: 50,
            int: 50,
            luk: 50,
            maxHp: 150,
            maxMp: 150,
            attackPower: 6,
            magicPower: 6,
            armor: 150,
          },
          maxStar: 25,
        },
        {
          15: { str: 40, dex: 40, int: 40, luk: 40, maxHp: 255, armor: 172 },
          22: {
            str: 145,
            dex: 145,
            int: 145,
            luk: 145,
            maxHp: 255,
            attackPower: 106,
            magicPower: 106,
            armor: 306,
          },
          24: {
            str: 145,
            dex: 145,
            int: 145,
            luk: 145,
            maxHp: 255,
            attackPower: 150,
            magicPower: 150,
            armor: 353,
          },
        },
      ],
      [
        {
          type: GearType.ring,
          req: { level: 250 },
          baseOption: {
            str: 10,
            dex: 10,
            int: 10,
            luk: 10,
            maxHp: 500,
            maxMp: 500,
            attackPower: 5,
            magicPower: 5,
          },
          maxStar: 25,
        },
        {
          1: {
            str: 2,
            dex: 2,
            int: 2,
            luk: 2,
            maxHp: 5,
            armor: 1,
          },
          10: {
            str: 25,
            dex: 25,
            int: 25,
            luk: 25,
            maxHp: 130,
            armor: 10,
          },
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
        },
      ],
      [
        {
          type: GearType.machineHeart,
          req: { level: 30 },
          baseOption: {
            str: 3,
            dex: 3,
            int: 3,
            luk: 3,
            maxHp: 50,
          },
          maxStar: 5,
        },
        {
          1: { str: 2, dex: 2, int: 2, luk: 2 },
          2: { str: 4, dex: 4, int: 4, luk: 4 },
          3: { str: 6, dex: 6, int: 6, luk: 6 },
          4: { str: 8, dex: 8, int: 8, luk: 8 },
          5: { str: 10, dex: 10, int: 10, luk: 10 },
        },
      ],
      [
        {
          type: GearType.machineHeart,
          req: { level: 100 },
          baseOption: {
            maxHp: 100,
          },
          maxStar: 8,
        },
        {
          1: { str: 2, dex: 2, int: 2, luk: 2 },
          2: { str: 4, dex: 4, int: 4, luk: 4 },
          3: { str: 6, dex: 6, int: 6, luk: 6 },
          4: { str: 8, dex: 8, int: 8, luk: 8 },
          5: { str: 10, dex: 10, int: 10, luk: 10 },
          6: { str: 13, dex: 13, int: 13, luk: 13 },
          7: { str: 16, dex: 16, int: 16, luk: 16 },
          8: { str: 19, dex: 19, int: 19, luk: 19 },
        },
      ],
      [
        {
          type: GearType.machineHeart,
          req: { level: 120 },
          baseOption: {
            str: 3,
            dex: 3,
            int: 3,
            luk: 3,
            maxHp: 100,
          },
          maxStar: 15,
        },
        {
          10: { str: 25, dex: 25, int: 25, luk: 25 },
          15: { str: 40, dex: 40, int: 40, luk: 40 },
        },
      ],
      [
        {
          type: GearType.machineHeart,
          req: { level: 200 },
          baseOption: {
            str: 25,
            dex: 25,
            int: 25,
            luk: 25,
            maxHp: 1250,
            attackPower: 15,
            magicPower: 15,
          },
          maxStar: 25,
        },
        {
          22: {
            str: 145,
            dex: 145,
            int: 145,
            luk: 145,
            attackPower: 106,
            magicPower: 106,
          },
        },
      ],
    ])('for %p to %p', (data, options) => {
      const gear = defaultGear(data);

      expect(gear.star < gear.maxStar);
      for (let i = gear.star; i < gear.maxStar; i++) {
        starforce(gear);

        if (gear.star in options) {
          const expected = options[gear.star as keyof typeof options];
          expect(gear.starforceOption).toEqual(expected);
        }
      }
    });

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
    ])('for glove star == %d bonus attackPower to %d', (star, expected) => {
      const gear = defaultGear({
        type: GearType.glove,
        req: { level: 130 },
        maxStar: 20,
      });

      for (let i = 0; i < star; i++) {
        starforce(gear);
      }

      expect(gear.starforceOption.attackPower).toBe(expected);
    });
  });

  describe('sets starforceOption for weapon', () => {
    it.each([
      [
        {
          type: GearType.staff,
          req: { level: 130, job: 2 },
          baseOption: {
            attackPower: 90,
            magicPower: 142,
          },
          upgradeOption: {
            int: 32,
            magicPower: 72,
          },
          maxStar: 20,
        },
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
      ],
      [
        {
          type: GearType.breathShooter,
          req: { level: 200, job: 4 },
          baseOption: {
            str: 150,
            dex: 150,
            attackPower: 318,
            speed: 19,
            bossDamage: 30,
            ignoreMonsterArmor: 20,
          },
          upgradeOption: {
            dex: 32,
            attackPower: 72,
          },
          maxStar: 25,
        },
        {
          22: {
            str: 145,
            dex: 145,
            maxHp: 255,
            maxMp: 255,
            attackPower: 246,
          },
        },
      ],
    ])('for %p to %p', (data, options) => {
      const gear = defaultGear(data);

      expect(gear.star < gear.maxStar);
      for (let i = gear.star; i < gear.maxStar; i++) {
        starforce(gear);

        if (gear.star in options) {
          const expected = options[gear.star as keyof typeof options];
          expect(gear.starforceOption).toEqual(expected);
        }
      }
    });

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
    ])('for glove star == %d bonus attackPower to %d', (star, expected) => {
      const gear = defaultGear({
        type: GearType.glove,
        req: { level: 130 },
        maxStar: 20,
      });

      for (let i = 0; i < star; i++) {
        starforce(gear);
      }

      expect(gear.starforceOption.attackPower).toBe(expected);
    });
  });

  describe('sets starforceOption for starScroll gear', () => {
    it.each([
      [
        {
          type: GearType.ring,
          req: { level: 135 },
          baseOption: {
            str: 4,
            dex: 4,
            int: 4,
            luk: 4,
            maxHp: 150,
            maxMp: 150,
            attackPower: 1,
            magicPower: 1,
            armor: 100,
          },
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
          maxStar: 15,
          starScroll: true,
        },
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
      ],
    ])('%p to %p', (data, options) => {
      const gear = defaultGear(data);

      expect(gear.star < gear.maxStar);
      for (let i = gear.star; i < gear.maxStar; i++) {
        starforce(gear);

        if (gear.star in options) {
          const expected = options[gear.star as keyof typeof options];
          expect(gear.starforceOption).toEqual(expected);
        }
      }
    });
  });

  describe('sets starforceOption for superior gear', () => {
    it.each([
      [
        {
          type: GearType.cape,
          req: { level: 110 },
          attributes: { superior: true },
          baseOption: {
            str: 30,
            dex: 30,
            int: 30,
            luk: 30,
            attackPower: 17,
            magicPower: 17,
            armor: 70,
          },
          maxStar: 8,
        },
        {
          1: {
            str: 9,
            dex: 9,
            int: 9,
            luk: 9,
            armor: 4,
          },
          5: {
            str: 65,
            dex: 65,
            int: 65,
            luk: 65,
            armor: 22,
          },
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
        },
      ],
      [
        {
          type: GearType.cape,
          req: { level: 150, job: 4 },
          attributes: { superior: true },
          baseOption: {
            str: 50,
            dex: 50,
            int: 50,
            luk: 50,
            attackPower: 30,
            magicPower: 30,
            armor: 150,
          },
          maxStar: 15,
        },
        {
          1: {
            str: 19,
            dex: 19,
            int: 19,
            luk: 19,
            armor: 8,
          },
          5: {
            str: 115,
            dex: 115,
            int: 115,
            luk: 115,
            armor: 44,
          },
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
        },
      ],
    ])('%p to %p', (data, options) => {
      const gear = defaultGear(data);

      expect(gear.star < gear.maxStar);
      for (let i = gear.star; i < gear.maxStar; i++) {
        starforce(gear);

        if (gear.star in options) {
          const expected = options[gear.star as keyof typeof options];
          expect(gear.starforceOption).toEqual(expected);
        }
      }
    });
  });
});

describe('canStarScroll', () => {
  it.each([
    [0, 0, false],
    [0, 5, true],
    [5, 5, false],
    [9, 10, true],
    [10, 10, false],
    [11, 10, false],
    [15, 25, false],
    [15, 30, false],
    [20, 25, false],
  ])('star = %d, maxStar = %d is %p', (star, maxStar, expected) => {
    const gear = defaultGear({ star, maxStar });

    expect(canStarScroll(gear)).toBe(expected);
  });

  it.each([
    [0, 0, false],
    [0, 5, true],
    [5, 5, true],
    [9, 10, true],
    [10, 10, true],
    [11, 10, true],
    [15, 25, false],
    [24, 25, false],
    [25, 25, false],
    [25, 20, false],
    [25, 30, false],
  ])(
    'star = %d, maxStar = %d, ignoreMaxStar is %p',
    (star, maxStar, expected) => {
      const gear = defaultGear({ star, maxStar });

      expect(canStarScroll(gear, true)).toBe(expected);
    },
  );

  it.each([
    [0, 0, false],
    [0, 5, true],
    [5, 5, true],
    [9, 10, true],
    [10, 10, true],
    [11, 10, true],
    [15, 25, false],
    [24, 25, false],
    [25, 25, false],
    [25, 20, false],
    [25, 30, false],
  ])(
    'star = %d, maxStar = %d, starScroll, ignoreMaxStar is %p',
    (star, maxStar, expected) => {
      const gear = defaultGear({ star, maxStar, starScroll: true });

      expect(canStarScroll(gear, true)).toBe(expected);
    },
  );

  it.each([
    [0, 0, false],
    [0, 5, false],
    [5, 5, false],
    [9, 10, false],
    [10, 10, false],
    [11, 10, false],
    [10, 15, false],
    [15, 15, false],
  ])(
    'star = %d, maxStar = %d, superior, ignoreMaxStar is %p',
    (star, maxStar, expected) => {
      const gear = defaultGear({
        attributes: { superior: true },
        star,
        maxStar,
      });

      expect(canStarScroll(gear)).toBe(expected);
    },
  );
});

describe('starScroll', () => {
  it('increments gear star by 1', () => {
    const gear = defaultGear({ star: 10, maxStar: 20 });

    starScroll(gear);

    expect(gear.star).toBe(11);
  });

  it('sets starScroll to true', () => {
    const gear = defaultGear({ star: 5, maxStar: 10 });

    starScroll(gear);

    expect(gear.starScroll).toBe(true);
  });

  describe('sets starforceOption', () => {
    it.each([
      [
        {
          type: GearType.glove,
          req: { level: 10 },
          baseOption: { armor: 2 },
          upgradeOption: {
            str: 50,
            dex: 50,
            int: 50,
            luk: 50,
            attackPower: 5,
            magicPower: 5,
            armor: 50,
          },
          maxStar: 5,
        },
        {
          5: {
            str: 25,
            dex: 25,
            int: 25,
            luk: 25,
            armor: 17,
          },
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
      ],
      [
        {
          type: GearType.shoulder,
          req: { level: 135 },
          baseOption: {
            str: 12,
            dex: 12,
            int: 12,
            luk: 12,
            maxHp: 400,
            attackPower: 7,
            magicPower: 7,
            armor: 125,
          },
          maxStar: 20,
        },
        {
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
        },
      ],
      [
        {
          type: GearType.pendant,
          req: { level: 140 },
          baseOption: {
            str: 8,
            dex: 8,
            int: 8,
            luk: 8,
            maxHpRate: 5,
            attackPower: 2,
            magicPower: 2,
            armor: 100,
          },
          maxStar: 25,
        },
        {
          12: {
            str: 105,
            dex: 105,
            int: 105,
            luk: 105,
            attackPower: 78,
            magicPower: 78,
            armor: 88,
          },
        },
      ],
    ])('%p to %p', (data, options) => {
      const gear = defaultGear(data);

      expect(gear.star < gear.maxStar);
      for (let i = gear.star; i < gear.maxStar; i++) {
        starScroll(gear);

        if (gear.star in options) {
          const expected = options[gear.star as keyof typeof options];
          expect(gear.starforceOption).toEqual(expected);
        }
      }
    });

    it.each([
      [
        {
          type: GearType.staff,
          req: { level: 130, job: 2 },
          baseOption: {
            attackPower: 90,
            magicPower: 142,
          },
          upgradeOption: {
            int: 32,
            magicPower: 72,
          },
          maxStar: 20,
        },
        {
          12: {
            int: 90,
            attackPower: 104,
            magicPower: 139,
          },
        },
      ],
    ])('for weapon %p to %p', (data, options) => {
      const gear = defaultGear(data);

      expect(gear.star < gear.maxStar);
      for (let i = gear.star; i < gear.maxStar; i++) {
        starScroll(gear);

        if (gear.star in options) {
          const expected = options[gear.star as keyof typeof options];
          expect(gear.starforceOption).toEqual(expected);
        }
      }
    });

    it.each([
      [
        {
          type: GearType.staff,
          req: { level: 130, job: 2 },
          baseOption: {
            attackPower: 90,
            magicPower: 142,
          },
          upgradeOption: {
            int: 32,
            magicPower: 72,
          },
          maxStar: 20,
        },
        {
          1: {
            int: 14,
            attackPower: 3,
            magicPower: 6,
          },
          2: {
            int: 29,
            attackPower: 6,
            magicPower: 12,
          },
          5: {
            int: 90,
            attackPower: 16,
            magicPower: 30,
          },
          8: {
            int: 90,
            attackPower: 52,
            magicPower: 74,
          },
          12: {
            int: 90,
            attackPower: 118,
            magicPower: 152,
          },
        },
      ],
    ])('for weapon bonus %p to %p', (data, options) => {
      const gear = defaultGear(data);

      expect(gear.star < gear.maxStar);
      for (let i = gear.star; i < gear.maxStar; i++) {
        starScroll(gear, true);

        if (gear.star in options) {
          const expected = options[gear.star as keyof typeof options];
          expect(gear.starforceOption).toEqual(expected);
        }
      }
    });

    it.each([
      [
        {
          type: GearType.ring,
          req: { level: 135 },
          baseOption: {
            str: 4,
            dex: 4,
            int: 4,
            luk: 4,
            maxHp: 150,
            maxMp: 150,
            attackPower: 1,
            magicPower: 1,
            armor: 100,
          },
          maxStar: 20,
        },
        {
          1: {
            str: 16,
            dex: 16,
            int: 16,
            luk: 16,
            armor: 6,
          },
          3: {
            str: 52,
            dex: 52,
            int: 52,
            luk: 52,
            armor: 18,
          },
          5: {
            str: 100,
            dex: 100,
            int: 100,
            luk: 100,
            armor: 31,
          },
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
        },
      ],
    ])('for accessory bonus %p to %p', (data, options) => {
      const gear = defaultGear(data);

      expect(gear.star < gear.maxStar);
      for (let i = gear.star; i < gear.maxStar; i++) {
        starScroll(gear, true);

        if (gear.star in options) {
          const expected = options[gear.star as keyof typeof options];
          expect(gear.starforceOption).toEqual(expected);
        }
      }
    });

    it.each([
      [
        {
          type: GearType.shoes,
          req: { level: 140 },
          baseOption: {
            str: 10,
            dex: 10,
            attackPower: 1,
            armor: 80,
            speed: 5,
          },
          maxStar: 20,
        },
        {
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
        },
      ],
    ])('for armor bonus %p to %p', (data, options) => {
      const gear = defaultGear(data);

      expect(gear.star < gear.maxStar);
      for (let i = gear.star; i < gear.maxStar; i++) {
        starScroll(gear, true);

        if (gear.star in options) {
          const expected = options[gear.star as keyof typeof options];
          expect(gear.starforceOption).toEqual(expected);
        }
      }
    });
  });
});

describe('canResetStarforce', () => {
  it('is true', () => {
    const gear = defaultGear({
      maxStar: 1,
    });

    expect(canResetStarforce(gear)).toBe(true);
  });

  it('is false for maxStar == 0', () => {
    const gear = defaultGear({
      scrollUpgradeableCount: 3,
    });

    expect(canResetStarforce(gear)).toBe(false);
  });

  it('is false for superior and maxStar == 0', () => {
    const gear = defaultGear({
      attributes: {
        superior: true,
      },
    });

    expect(canResetStarforce(gear)).toBe(false);
  });

  it('is false for starScroll and maxStar == 0', () => {
    const gear = defaultGear({
      starScroll: true,
    });

    expect(canResetStarforce(gear)).toBe(false);
  });

  it('is true for star == 1', () => {
    const gear = defaultGear({
      star: 1,
    });

    expect(canResetStarforce(gear)).toBe(false);
  });
});

describe('resetStarforce', () => {
  it('resets star', () => {
    const gear = defaultGear({ star: 5, maxStar: 5 });

    resetStarforce(gear);

    expect(gear.star).toBe(0);
  });

  it('resets star for star > maxStar gear', () => {
    const gear = defaultGear({ star: 5, maxStar: 1 });

    resetStarforce(gear);

    expect(gear.star).toBe(0);
  });

  it('resets starforceOption', () => {
    const gear = defaultGear({ maxStar: 1, starforceOption: { str: 1 } });

    resetStarforce(gear);

    expect(gear.starforceOption).toEqual({});
  });
});
