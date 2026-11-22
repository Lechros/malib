import { expectTypeOf } from 'vitest';
import {
  GearCapability,
  GearGrowthData,
  GearGrowthOption,
  GearType,
} from '../data';
import { ErrorCode, GearError } from '../error';
import { Gear } from '../Gear';
import { createGear, createReadonlyGear } from '../testing';
import {
  applyGrowth,
  canApplyGrowth,
  canResetGrowth,
  getGrowthLevelData,
  resetGrowth,
  supportsGrowth,
} from './growth';

function createGrowth(
  source: GearGrowthData['source'] = 'growth',
): GearGrowthData {
  return {
    source,
    levels: {
      1: { exp: 80, option: { str: [1, 2], attackPower: [0, 2] } },
      2: { exp: 120, option: { str: [2, 2], magicPower: [1, 1] } },
    },
  };
}

function createGrowingGear(source: GearGrowthData['source'] = 'growth') {
  return createGear({
    growth: createGrowth(source),
    attributes: { growthLevel: 1, growthExp: 50 },
  });
}

describe('supportsGrowth', () => {
  it.each(['growth', 'scroll'] as const)(
    '%s 출처의 성장을 지원한다.',
    (source) => {
      expect(supportsGrowth(createGrowingGear(source))).toBe(true);
    },
  );

  it('성장 규칙이 없으면 false를 반환한다.', () => {
    expect(supportsGrowth(createGear({ attributes: { growthLevel: 1 } }))).toBe(
      false,
    );
  });
});

describe('getGrowthLevelData', () => {
  it.each([undefined, 0, 80])(
    '경험치 %s의 조회 기본값은 0이며 원본을 변경하지 않는다.',
    (exp) => {
      const gear = createGrowingGear();
      gear.data.growth!.levels[1].exp = exp;
      const before = structuredClone(gear.data);

      expect(gear.growth!.levels[1].exp).toBe(exp ?? 0);
      expect(getGrowthLevelData(gear)!.exp).toBe(exp ?? 0);
      expectTypeOf(getGrowthLevelData(gear)!.exp).toEqualTypeOf<number>();
      expect(gear.data).toEqual(before);
    },
  );

  it('현재 단계 또는 지정한 단계의 규칙을 조회하며 원본을 변경하지 않는다.', () => {
    const gear = createGrowingGear();
    const before = structuredClone(gear.data);

    expect(getGrowthLevelData(gear)).toEqual(gear.growth?.levels[1]);
    expect(getGrowthLevelData(gear, 2)?.exp).toBe(120);
    expect(getGrowthLevelData(gear, 3)).toBeUndefined();
    expect(gear.data).toEqual(before);
  });

  it.each([0, 4])('%s 단계는 undefined를 반환한다.', (level) => {
    expect(getGrowthLevelData(createGrowingGear(), level)).toBeUndefined();
  });

  it('성장 규칙이나 현재 레벨이 없으면 undefined를 반환한다.', () => {
    expect(getGrowthLevelData(createGear())).toBeUndefined();
    const gear = createGear({ growth: createGrowth() });
    expect(getGrowthLevelData(gear)).toBeUndefined();
    expect(getGrowthLevelData(gear, 1)?.exp).toBe(80);
  });
});

describe('canApplyGrowth', () => {
  it('경험치 진행률과 관계없이 다음 단계가 있으면 성장할 수 있다.', () => {
    const gear = createGrowingGear();
    gear.attributes.growthExp = 0;

    expect(canApplyGrowth(gear)).toBe(true);
    gear.attributes.growthExp = 100;
    expect(gear.attributes.growthLevel).toBe(1);
  });

  it.each([
    [undefined, ErrorCode.Growth_Apply_LevelNotFound],
    [3, ErrorCode.Growth_Apply_MaxLevelReached],
    [4, ErrorCode.Growth_Apply_LevelNotFound],
  ])('현재 레벨이 %s이면 성장할 수 없다.', (level, code) => {
    const gear = createGrowingGear();
    gear.attributes.growthLevel = level;
    const before = structuredClone(gear.data);

    expect(canApplyGrowth(gear)).toBe(false);
    expect(() => applyGrowth(gear, {})).toThrow(
      expect.objectContaining({ code }),
    );
    expect(gear.data).toEqual(before);
  });

  it('마지막 규칙을 적용한 다음 레벨이 최대 성장 레벨이다.', () => {
    const gear = createGrowingGear();
    gear.attributes.growthLevel = 2;

    expect(gear.maxGrowthLevel).toBe(3);
    expect(gear.growthMax).toBe(false);
    expect(canApplyGrowth(gear)).toBe(true);
    applyGrowth(gear, { str: 2, magicPower: 1 });
    expect(gear.attributes.growthLevel).toBe(3);

    expect(gear.growthMax).toBe(true);
    expect(canApplyGrowth(gear)).toBe(false);
    expect(() => applyGrowth(gear, {})).toThrow(
      expect.objectContaining({ code: ErrorCode.Growth_Apply_MaxLevelReached }),
    );
  });

  it.each([0, undefined])(
    '경험치가 %s여도 마지막 단계 전에는 성장할 수 있다.',
    (exp) => {
      const gear = createGrowingGear();
      gear.data.growth!.levels[1].exp = exp;
      expect(gear.growthMax).toBe(false);
      expect(canApplyGrowth(gear)).toBe(true);
      applyGrowth(gear, { str: 1 });
      expect(gear.attributes.growthLevel).toBe(2);
    },
  );

  it('마지막 규칙의 경험치가 생략되어도 최대 성장 레벨은 유지된다.', () => {
    const gear = createGrowingGear();
    gear.data.growth!.levels[2].exp = undefined;
    gear.attributes.growthLevel = 3;
    expect(gear.growthMax).toBe(true);
    expect(canApplyGrowth(gear)).toBe(false);
  });

  it('성장 규칙이 없으면 최대 성장 레벨도 없다.', () => {
    expect(createGear().maxGrowthLevel).toBeUndefined();
  });

  it('성장 규칙이 없으면 지원 여부 오류가 우선한다.', () => {
    const gear = createGear();

    expect(canApplyGrowth(gear)).toBe(false);
    expect(() => applyGrowth(gear, {})).toThrow(
      expect.objectContaining({
        code: ErrorCode.Growth_Apply_NotSupported,
      }),
    );
  });
});

describe('applyGrowth', () => {
  it('보스 데미지와 방어율 무시 증가량을 누적하고 최종 옵션에 합산한다.', () => {
    const gear = createGrowingGear();
    gear.data.baseOption = { bossDamage: 10, ignoreMonsterArmor: 20 };
    gear.data.growth!.levels = {
      1: { option: { bossDamage: [2, 2], ignoreMonsterArmor: [1, 3] } },
      2: { option: { bossDamage: [3, 3], ignoreMonsterArmor: [2, 2] } },
    };
    applyGrowth(gear, { bossDamage: 2, ignoreMonsterArmor: 3 });
    applyGrowth(gear, { bossDamage: 3, ignoreMonsterArmor: 2 });
    expect(gear.growthOption.bossDamage).toBe(5);
    expect(gear.growthOption.ignoreMonsterArmor).toBe(5);
    expect(gear.totalOption.bossDamage).toBe(15);
    expect(gear.totalOption.ignoreMonsterArmor).toBe(25);
    expect(gear.growthMax).toBe(true);
    resetGrowth(gear);
    expect(gear.totalOption.bossDamage).toBe(10);
    expect(gear.totalOption.ignoreMonsterArmor).toBe(20);
  });

  it('현재 단계의 증가량을 누적하고 레벨을 1 올리며 진행률을 초기화한다.', () => {
    const gear = createGrowingGear();
    const growth = structuredClone(gear.data.growth);

    applyGrowth(gear, { str: 1, attackPower: 2 });
    expect(gear.attributes.growthLevel).toBe(2);
    expect(gear.attributes.growthExp).toBe(0);
    expect(gear.growthOption).toEqual({ str: 1, attackPower: 2 });
    expect(gear.growthMax).toBe(false);

    applyGrowth(gear, { str: 2, magicPower: 1 });
    expect(gear.attributes.growthLevel).toBe(3);
    expect(gear.growthOption).toEqual({
      str: 3,
      attackPower: 2,
      magicPower: 1,
    });
    expect(gear.growthMax).toBe(true);
    expect(gear.data.growth).toEqual(growth);
  });

  it('생략한 옵션은 0으로 처리한다.', () => {
    const gear = createGrowingGear();

    applyGrowth(gear, { str: 2 });

    expect(gear.growthOption).toEqual({ str: 2 });
    expect(gear.growthOption.attackPower).toBe(0);
  });

  it('옵션이 없는 단계도 다음 단계가 있으면 성장할 수 있다.', () => {
    const gear = createGrowingGear();
    gear.data.growth!.levels[1] = { exp: 80 };

    applyGrowth(gear, {});

    expect(gear.attributes.growthLevel).toBe(2);
    expect(gear.growthOption).toEqual({});
  });

  it.each<Partial<GearGrowthOption>>([
    {},
    { str: 0 },
    { str: 3 },
    { str: 1.5 },
    { str: NaN },
    { str: Infinity },
    { str: 1, attackPower: -1 },
    { str: 1, magicPower: 1 },
  ])('증가량 %j가 범위를 벗어나면 변경 없이 오류가 발생한다.', (option) => {
    const gear = createGrowingGear();
    gear.data.growthOption = { dex: 3 };
    const before = structuredClone(gear.data);

    expect(() => applyGrowth(gear, option)).toThrow(
      expect.objectContaining({
        code: ErrorCode.Growth_Apply_OptionOutOfRange,
      }),
    );
    expect(gear.data).toEqual(before);
  });

  it('고정 증가량과 다른 값을 적용할 수 없다.', () => {
    const gear = createGrowingGear();
    gear.attributes.growthLevel = 2;

    expect(() => applyGrowth(gear, { str: 1, magicPower: 1 })).toThrow(
      GearError,
    );
  });

  it('영어 오류 메시지를 제공한다.', () => {
    const gear = new Gear(createGrowingGear().data, { errorLanguage: 'en' });

    expect(() => applyGrowth(gear, {})).toThrow(
      'Growth option increases must be integers within the range for this level.',
    );
  });
});

describe('resetGrowth', () => {
  it.each(['growth', 'scroll'] as const)(
    '%s 출처와 규칙을 유지하고 성장 결과만 초기화한다.',
    (source) => {
      const gear = createGrowingGear(source);
      applyGrowth(gear, { str: 2 });
      const growth = structuredClone(gear.data.growth);

      expect(canResetGrowth(gear)).toBe(true);
      resetGrowth(gear);

      expect(gear.data.growth).toEqual(growth);
      expect(gear.data.growthOption).toBeUndefined();
      expect(gear.attributes.growthLevel).toBe(1);
      expect(gear.attributes.growthExp).toBe(0);
    },
  );

  it('성장을 지원하지 않으면 초기화할 수 없다.', () => {
    const gear = createGear();

    expect(canResetGrowth(gear)).toBe(false);
    expect(() => resetGrowth(gear)).toThrow(
      expect.objectContaining({
        code: ErrorCode.Growth_Reset_NotSupported,
      }),
    );
  });
});

describe('ReadonlyGear growth', () => {
  it('조회한 성장 범위는 읽기 전용 타입이다.', () => {
    const gear = createReadonlyGear({
      growth: createGrowth(),
      attributes: { growthLevel: 1 },
    });

    expectTypeOf(gear.growth!.levels[1].option!.str).toEqualTypeOf<
      readonly [min: number, max: number] | undefined
    >();
    expectTypeOf(getGrowthLevelData(gear)!.option!.str).toEqualTypeOf<
      readonly [min: number, max: number] | undefined
    >();
  });
  it('성장 옵션의 기본값은 0이고 조회 시 원본을 변경하지 않는다.', () => {
    const gear = createReadonlyGear();
    const before = structuredClone(gear.data);

    expect(gear.growth).toBeUndefined();
    expect(gear.growthOption.str).toBe(0);
    expect(gear.growthMax).toBe(false);
    expect(gear.data).toEqual(before);
  });

  it('최종 옵션에 성장 옵션을 한 번 합산한다.', () => {
    const gear = createReadonlyGear({
      baseOption: { str: 1 },
      addOption: { str: 2 },
      upgradeOption: { str: 3 },
      starforceOption: { str: 4 },
      growthOption: { str: 5 },
      exceptionalOption: { str: 6 },
    });

    expect(gear.totalOption.str).toBe(15);
  });
});

describe('Gear growth', () => {
  function createGrowingWeapon(source: GearGrowthData['source'] = 'growth') {
    return createGear({
      type: GearType.bow,
      req: { level: 120, job: { class: 4 } },
      attributes: {
        growthLevel: 1,
        canStarforce: GearCapability.Can,
        canScroll: GearCapability.Can,
      },
      baseOption: { attackPower: 49, armor: 19 },
      growth: {
        source,
        levels: {
          1: {
            exp: 80,
            option: { attackPower: [1, 1], magicPower: [1, 1], armor: [1, 1] },
          },
        },
      },
    });
  }

  it('성장 적용과 초기화 후 스타포스 옵션을 다시 계산한다.', () => {
    const gear = createGrowingWeapon();
    gear.applyStarforce();
    expect(gear.starforceOption.attackPower).toBe(1);
    expect(gear.starforceOption.armor).toBe(0);

    expect(gear.supportsGrowth).toBe(true);
    expect(gear.canApplyGrowth).toBe(true);
    gear.applyGrowth({ attackPower: 1, magicPower: 1, armor: 1 });
    expect(gear.star).toBe(1);
    expect(gear.starforceOption.attackPower).toBe(2);
    expect(gear.starforceOption.magicPower).toBe(1);
    expect(gear.starforceOption.armor).toBe(0);
    expect(gear.canApplyGrowth).toBe(false);

    expect(gear.canResetGrowth).toBe(true);
    gear.resetGrowth();
    expect(gear.starforceOption.attackPower).toBe(1);
    expect(gear.starforceOption.magicPower).toBe(0);
    expect(gear.starforceOption.armor).toBe(0);
  });

  it.each([GearType.bow, GearType.cap])(
    '%s의 16성에서 성장으로 부여된 비주력 스탯도 증가한다.',
    (type) => {
      const gear = createGrowingWeapon();
      gear.data.type = type;
      gear.data.req.level = 150;
      gear.data.star = 15;
      gear.data.growthOption = { int: 1 };

      gear.applyStarforce();

      expect(gear.starforceOption.int).toBeGreaterThan(0);
    },
  );

  it('슈페리얼 장비는 성장 옵션만 있는 스탯과 공격력을 강화하지 않는다.', () => {
    const gear = createGrowingWeapon();
    gear.data.baseOption = {};
    gear.data.attributes.superior = true;
    gear.data.growthOption = { str: 1, attackPower: 1 };

    for (let i = 0; i < 6; i++) {
      gear.applyStarforce();
    }

    expect(gear.starforceOption.str).toBe(0);
    expect(gear.starforceOption.attackPower).toBe(0);
    expect(gear.starforceOption.magicPower).toBe(0);
  });

  it.each([
    { type: GearType.bow, star: 0, superior: false, starScroll: false },
    { type: GearType.bow, star: 15, superior: false, starScroll: false },
    { type: GearType.cap, star: 0, superior: false, starScroll: false },
    { type: GearType.cap, star: 15, superior: false, starScroll: false },
    { type: GearType.cap, star: 0, superior: true, starScroll: false },
    { type: GearType.cap, star: 5, superior: true, starScroll: false },
    { type: GearType.bow, star: 0, superior: false, starScroll: true },
    { type: GearType.cap, star: 0, superior: false, starScroll: true },
  ])(
    '강화 조건 %j에서 성장 옵션을 주문서 옵션과 동일하게 취급한다.',
    ({ type, star, superior, starScroll }) => {
      const gear = createGrowingWeapon();
      gear.data.type = type;
      gear.data.req.level = 150;
      gear.data.star = star;
      gear.data.attributes.superior = superior;
      gear.data.upgradeOption = { int: -1, magicPower: -1 };
      gear.data.growthOption = {
        int: 1,
        magicPower: 1,
        attackPower: 1,
        armor: 1,
      };
      const control = new Gear(structuredClone(gear.data));
      control.data.growthOption = undefined;
      control.data.upgradeOption = {
        int: 0,
        magicPower: 0,
        attackPower: 1,
        armor: 1,
      };

      if (starScroll) {
        gear.applyStarScroll();
        control.applyStarScroll();
      } else {
        gear.applyStarforce();
        control.applyStarforce();
      }

      expect(gear.starforceOption).toEqual(control.starforceOption);
    },
  );

  it('별도 성장 함수는 스타포스 옵션을 재계산하지 않는다.', () => {
    const gear = createGrowingWeapon();
    gear.applyStarforce();
    const before = structuredClone(gear.data.starforceOption);

    applyGrowth(gear, { attackPower: 1, magicPower: 1, armor: 1 });
    expect(gear.data.starforceOption).toEqual(before);
    resetGrowth(gear);
    expect(gear.data.starforceOption).toEqual(before);
  });

  it('방어구의 스타포스 방어력 계산에 성장분을 포함한다.', () => {
    const gear = createGrowingWeapon();
    gear.data.type = GearType.cap;
    gear.applyStarforce();
    expect(gear.starforceOption.armor).toBe(1);

    gear.applyGrowth({ attackPower: 1, magicPower: 1, armor: 1 });

    expect(gear.starforceOption.armor).toBe(2);
    gear.resetGrowth();
    expect(gear.starforceOption.armor).toBe(1);
  });

  it('이미 놀장이 적용된 장비를 성장시켜도 기존 강화분을 재계산하지 않는다.', () => {
    const gear = createGrowingWeapon();
    gear.applyStarScroll();
    const before = structuredClone(gear.data.starforceOption);

    gear.applyGrowth({ attackPower: 1, magicPower: 1, armor: 1 });

    expect(gear.attributes.growthLevel).toBe(2);
    expect(gear.data.starforceOption).toEqual(before);
  });

  it('놀장은 성장분을 계산에 포함하지만 성장 초기화 시 재계산하지 않는다.', () => {
    const gear = createGrowingWeapon();
    gear.applyGrowth({ attackPower: 1, magicPower: 1, armor: 1 });
    gear.applyStarScroll();
    const control = createGrowingWeapon();
    control.applyStarScroll();
    expect(gear.starforceOption.attackPower).toBe(
      control.starforceOption.attackPower + 1,
    );
    expect(gear.starforceOption.magicPower).toBeGreaterThan(0);
    expect(gear.starforceOption.armor).toBe(2);
    const before = structuredClone(gear.data.starforceOption);

    gear.resetGrowth();

    expect(gear.data.starforceOption).toEqual(before);
  });

  it.each(['growth', 'scroll'] as const)(
    '주문서 초기화는 %s 출처에 따라 성장 정보를 처리한다.',
    (source) => {
      const gear = createGrowingWeapon(source);
      gear.applyGrowth({ attackPower: 1, magicPower: 1, armor: 1 });
      gear.applyStarforce();
      const growth = structuredClone(gear.data.growth);

      gear.resetUpgrade();

      if (source === 'scroll') {
        expect(gear.data.growth).toBeUndefined();
        expect(gear.data.growthOption).toBeUndefined();
        expect(gear.attributes.growthLevel).toBeUndefined();
        expect(gear.attributes.growthExp).toBeUndefined();
        expect(gear.starforceOption.attackPower).toBe(1);
      } else {
        expect(gear.data.growth).toEqual(growth);
        expect(gear.growthOption.attackPower).toBe(1);
        expect(gear.attributes.growthLevel).toBe(2);
        expect(gear.growthMax).toBe(true);
        expect(gear.starforceOption.attackPower).toBe(2);
      }
    },
  );
});
