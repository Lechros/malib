import { GearType, PotentialGrade } from '../data';
import { ErrorCode, GearError } from '../error';
import { createGear, createPotentialData, createSoulData } from '../testing';
import {
  applySoulAmplification,
  applySoulEnchant,
  canApplySoulAmplification,
  canApplySoulEnchant,
  canSetSoul,
  canSetSoulPotential,
  getSoulBaseOption,
  removeSoulEnchant,
  removeSoul,
  resetSoulWeapon,
  setSoul,
  setSoulPotential,
  supportsSoulWeapon,
  supportsSoulAmplification,
} from './soulWeapon';

describe('supportsSoulWeapon', () => {
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

    expect(supportsSoulWeapon(gear)).toBe(true);
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

    expect(supportsSoulWeapon(gear)).toBe(false);
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

    expect(supportsSoulWeapon(gear)).toBe(expected);
  });
});

describe('canApplySoulEnchant', () => {
  it.each([undefined, {}, { enchanted: false }])(
    '소울웨폰이 아닌 무기일 경우 true를 반환한다.',
    (soulWeapon) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon,
      });

      expect(canApplySoulEnchant(gear)).toBe(true);
    },
  );

  it('이미 소울웨폰일 경우 false를 반환한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: { enchanted: true },
    });

    expect(canApplySoulEnchant(gear)).toBe(false);
  });

  it('무기가 아닌 장비일 경우 false를 반환한다.', () => {
    const gear = createGear({
      type: GearType.cape,
      req: { level: 200 },
      soulWeapon: undefined,
    });

    expect(canApplySoulEnchant(gear)).toBe(false);
  });
});

describe('applySoulEnchant', () => {
  it.each([undefined, {}, { enchanted: false }])(
    '소울웨폰이 아닌 무기를 소울웨폰으로 변환한다.',
    (soulWeapon) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon,
      });

      applySoulEnchant(gear);

      expect(gear.soulEnchanted).toBe(true);
    },
  );

  it('이미 소울웨폰인 장비를 변환하면 GearError가 발생한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: { enchanted: true },
    });

    expect(() => {
      applySoulEnchant(gear);
    }).toThrow(GearError);
  });

  it('무기가 아닌 장비를 변환하면 GearError가 발생한다.', () => {
    const gear = createGear({
      type: GearType.cape,
      req: { level: 200 },
      soulWeapon: undefined,
    });

    expect(() => {
      applySoulEnchant(gear);
    }).toThrow(GearError);
  });

  it.each([1, 2, 3, 4])(
    '소울웨폰으로 다시 변환해도 기존 증폭 단계를 보존한다.',
    (amplificationLevel) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: { enchanted: false, amplificationLevel },
      });

      applySoulEnchant(gear);

      expect(gear.data.soulWeapon?.amplificationLevel).toBe(amplificationLevel);
    },
  );

  it('소울웨폰으로 다시 변환해도 기존 소울 잠재능력 등급을 보존한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: {
        enchanted: false,
        amplificationLevel: 1,
        potentialGrade: PotentialGrade.Unique,
      },
    });

    applySoulEnchant(gear);

    expect(gear.data.soulWeapon?.potentialGrade).toBe(PotentialGrade.Unique);
  });

  it('소울웨폰으로 다시 변환해도 기존 소울 잠재능력 옵션을 보존한다.', () => {
    const potentials = [
      createPotentialData(),
      createPotentialData(),
      createPotentialData(),
    ];
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: {
        enchanted: false,
        amplificationLevel: 1,
        potentials,
      },
    });

    applySoulEnchant(gear);

    expect(gear.data.soulWeapon?.potentials).toEqual(potentials);
  });
});

describe('canSetSoul', () => {
  it.each([undefined, {}, { enchanted: false }])(
    '소울웨폰이 아닐 경우 false를 반환한다.',
    (soulWeapon) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon,
      });
      const soul = createSoulData({ magnificent: true });

      expect(canSetSoul(gear, soul.magnificent ?? false)).toBe(false);
    },
  );

  it.each([undefined, false, true])(
    '소울웨폰이고 소울이 없는 경우 true를 반환한다.',
    (magnificent) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: { enchanted: true },
      });
      const soul = createSoulData({ magnificent });

      expect(canSetSoul(gear, soul.magnificent ?? false)).toBe(true);
    },
  );

  it.each([undefined, false, true])(
    '소울웨폰이고 소울이 장착된 경우 true를 반환한다.',
    (magnificent) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ name: '기존 소울' }),
        },
      });
      const soul = createSoulData({ name: '교체할 소울', magnificent });

      expect(canSetSoul(gear, soul.magnificent ?? false)).toBe(true);
    },
  );

  it.each([
    [undefined, undefined],
    [undefined, false],
    [undefined, true],
    [0, undefined],
    [0, false],
    [0, true],
  ])(
    '증폭하지 않은 소울웨폰에 소울을 장착하려는 경우 종류에 관계없이 true를 반환한다.',
    (amplificationLevel, magnificent) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel,
        },
      });
      const soul = createSoulData({ magnificent });

      expect(canSetSoul(gear, soul.magnificent ?? false)).toBe(true);
    },
  );

  it.each([
    [1, undefined],
    [1, false],
    [2, undefined],
    [2, false],
    [3, undefined],
    [3, false],
    [4, undefined],
    [4, false],
  ])(
    '증폭된 소울웨폰에 일반 소울을 장착하려는 경우 false를 반환한다.',
    (amplificationLevel, magnificent) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel,
        },
      });
      const soul = createSoulData({ magnificent });

      expect(canSetSoul(gear, soul.magnificent ?? false)).toBe(false);
    },
  );

  it.each([1, 2, 3, 4])(
    '증폭된 소울웨폰에 위대한 소울을 장착하려는 경우 true를 반환한다.',
    (amplificationLevel) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel,
        },
      });
      const soul = createSoulData({ magnificent: true });

      expect(canSetSoul(gear, soul.magnificent ?? false)).toBe(true);
    },
  );

  it.each([
    [1, undefined],
    [1, false],
    [2, undefined],
    [2, false],
    [3, undefined],
    [3, false],
    [4, undefined],
    [4, false],
  ])(
    '소울 없이 증폭 정보만 남은 소울웨폰에 일반 소울을 장착하려는 경우 false를 반환한다.',
    (amplificationLevel, magnificent) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: { enchanted: true, amplificationLevel },
      });
      const soul = createSoulData({ magnificent });

      expect(canSetSoul(gear, soul.magnificent ?? false)).toBe(false);
    },
  );

  it.each([1, 2, 3, 4])(
    '소울 없이 증폭 정보만 남은 소울웨폰에 위대한 소울을 장착하려는 경우 true를 반환한다.',
    (amplificationLevel) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: { enchanted: true, amplificationLevel },
      });
      const soul = createSoulData({ magnificent: true });

      expect(canSetSoul(gear, soul.magnificent ?? false)).toBe(true);
    },
  );
});

describe('setSoul', () => {
  it.each([undefined, {}, { enchanted: false }])(
    '소울웨폰이 아닌 장비에 소울을 장착하면 GearError가 발생한다.',
    (soulWeapon) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon,
      });
      const soul = createSoulData({ magnificent: true });

      expect(() => {
        setSoul(gear, soul);
      }).toThrow(GearError);
    },
  );

  it.each([undefined, false, true])(
    '소울이 없는 소울웨폰에 소울을 장착한다.',
    (magnificent) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: { enchanted: true },
      });
      const soul = createSoulData({ magnificent });

      setSoul(gear, soul);

      expect(gear.data.soulWeapon?.soul).toEqual(soul);
    },
  );

  it.each([undefined, false, true])(
    '소울웨폰에 장착된 소울을 다른 소울로 교체한다.',
    (magnificent) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ name: '기존 소울' }),
        },
      });
      const soul = createSoulData({ name: '교체할 소울', magnificent });

      setSoul(gear, soul);

      expect(gear.data.soulWeapon?.soul).toEqual(soul);
    },
  );

  it.each([
    [undefined, undefined],
    [undefined, false],
    [undefined, true],
    [0, undefined],
    [0, false],
    [0, true],
  ])(
    '증폭하지 않은 소울웨폰에 일반 소울과 위대한 소울 모두 장착한다.',
    (amplificationLevel, magnificent) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel,
        },
      });
      const soul = createSoulData({ magnificent });

      setSoul(gear, soul);

      expect(gear.data.soulWeapon?.soul).toEqual(soul);
    },
  );

  it.each([
    [1, undefined],
    [1, false],
    [2, undefined],
    [2, false],
    [3, undefined],
    [3, false],
    [4, undefined],
    [4, false],
  ])(
    '증폭된 소울웨폰에 일반 소울을 장착하면 GearError가 발생한다.',
    (amplificationLevel, magnificent) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel,
        },
      });
      const soul = createSoulData({ magnificent });

      expect(() => {
        setSoul(gear, soul);
      }).toThrow(GearError);
    },
  );

  it.each([1, 2, 3, 4])(
    '증폭된 소울웨폰에 위대한 소울을 장착한다.',
    (amplificationLevel) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel,
        },
      });
      const soul = createSoulData({ magnificent: true });

      setSoul(gear, soul);

      expect(gear.data.soulWeapon?.soul).toEqual(soul);
    },
  );

  it.each([
    [1, undefined],
    [1, false],
    [2, undefined],
    [2, false],
    [3, undefined],
    [3, false],
    [4, undefined],
    [4, false],
  ])(
    '증폭 정보만 남은 소울웨폰에 일반 소울을 장착하면 GearError가 발생한다.',
    (amplificationLevel, magnificent) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: { enchanted: true, amplificationLevel },
      });
      const soul = createSoulData({ magnificent });

      expect(() => {
        setSoul(gear, soul);
      }).toThrow(GearError);
    },
  );

  it.each([1, 2, 3, 4])(
    '증폭 정보만 남은 소울웨폰에 위대한 소울을 다시 장착한다.',
    (amplificationLevel) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: { enchanted: true, amplificationLevel },
      });
      const soul = createSoulData({ magnificent: true });

      setSoul(gear, soul);

      expect(gear.data.soulWeapon?.soul).toEqual(soul);
    },
  );

  it.each([1, 2, 3, 4])(
    '소울을 교체해도 기존 증폭 단계를 보존한다.',
    (amplificationLevel) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel,
        },
      });

      setSoul(gear, createSoulData({ magnificent: true }));

      expect(gear.soulAmplificationLevel).toBe(amplificationLevel);
    },
  );

  it('소울을 교체해도 기존 소울 잠재능력 등급을 보존한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: {
        enchanted: true,
        soul: createSoulData({ magnificent: true }),
        amplificationLevel: 1,
        potentialGrade: PotentialGrade.Unique,
      },
    });

    setSoul(gear, createSoulData({ magnificent: true }));

    expect(gear.soulPotentialGrade).toBe(PotentialGrade.Unique);
  });

  it('소울을 교체해도 기존 소울 잠재능력 옵션을 보존한다.', () => {
    const potentials = [
      createPotentialData(),
      createPotentialData(),
      createPotentialData(),
    ];
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: {
        enchanted: true,
        soul: createSoulData({ magnificent: true }),
        amplificationLevel: 1,
        potentials,
      },
    });

    setSoul(gear, createSoulData({ magnificent: true }));

    expect(gear.soulPotentials).toEqual(potentials);
  });
});

describe('removeSoulEnchant', () => {
  it.each([1, 2, 3, 4])(
    '인챈트를 해제해도 기존 증폭 단계를 보존한다.',
    (amplificationLevel) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel,
        },
      });

      removeSoulEnchant(gear);

      expect(gear.data.soulWeapon?.amplificationLevel).toBe(amplificationLevel);
    },
  );

  it('인챈트를 해제해도 기존 소울 잠재능력 등급을 보존한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: {
        enchanted: true,
        soul: createSoulData({ magnificent: true }),
        amplificationLevel: 1,
        potentialGrade: PotentialGrade.Unique,
      },
    });

    removeSoulEnchant(gear);

    expect(gear.data.soulWeapon?.potentialGrade).toBe(PotentialGrade.Unique);
  });

  it('인챈트를 해제해도 기존 소울 잠재능력 옵션을 보존한다.', () => {
    const potentials = [
      createPotentialData(),
      createPotentialData(),
      createPotentialData(),
    ];
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: {
        enchanted: true,
        soul: createSoulData({ magnificent: true }),
        amplificationLevel: 1,
        potentials,
      },
    });

    removeSoulEnchant(gear);

    expect(gear.data.soulWeapon?.potentials).toEqual(potentials);
  });

  it('소울웨폰 상태를 해제한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: {
        enchanted: true,
        soul: createSoulData({ magnificent: true }),
        amplificationLevel: 1,
      },
    });

    removeSoulEnchant(gear);

    expect(gear.soulEnchanted).toBe(false);
  });

  it('장착된 소울 데이터를 보존한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: {
        enchanted: true,
        soul: createSoulData({ magnificent: true }),
        amplificationLevel: 1,
      },
    });

    removeSoulEnchant(gear);

    expect(gear.data.soulWeapon?.soul).toEqual(
      createSoulData({ magnificent: true }),
    );
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
        soulWeapon: { enchanted: true, soul: createSoulData() },
      });

      expect(getSoulBaseOption(gear)).toEqual(expected);
    },
  );

  it.each([undefined, {}])('소울이 없으면 옵션이 없다: %j', (soulWeapon) => {
    const gear = createGear({ type: GearType.bow, soulWeapon });

    expect(getSoulBaseOption(gear)).toBeUndefined();
  });
});

describe('canApplySoulAmplification', () => {
  it.each([
    undefined,
    {},
    {
      enchanted: false,
      amplificationLevel: 1,
      soul: createSoulData({ magnificent: true }),
    },
  ])('소울웨폰이 아닐 경우 false를 반환한다.', (soulWeapon) => {
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon,
    });

    expect(canApplySoulAmplification(gear)).toBe(false);
  });

  it('소울웨폰이고 소울이 없는 경우 false를 반환한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: { enchanted: true, amplificationLevel: 1 },
    });

    expect(canApplySoulAmplification(gear)).toBe(false);
  });

  it.each([undefined, false])(
    '장착된 소울이 일반 소울인 경우 false를 반환한다.',
    (magnificent) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          amplificationLevel: 1,
          soul: createSoulData({ magnificent }),
        },
      });

      expect(canApplySoulAmplification(gear)).toBe(false);
    },
  );

  it.each([undefined, 0, 150, 199])(
    '무기의 요구 레벨이 200 미만인 경우 false를 반환한다.',
    (reqLevel) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: reqLevel },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel: 0,
        },
      });

      expect(canApplySoulAmplification(gear)).toBe(false);
    },
  );

  it.each([
    [200, undefined],
    [200, 0],
    [250, undefined],
    [250, 0],
  ])(
    '요구 레벨이 200 이상인 무기에 증폭하지 않은 위대한 소울이 장착된 경우 true를 반환한다.',
    (reqLevel, amplificationLevel) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: reqLevel },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel,
        },
      });

      expect(canApplySoulAmplification(gear)).toBe(true);
    },
  );

  it.each([1, 2, 3])(
    '위대한 소울을 증폭했고 최대 단계 미만인 경우 true를 반환한다.',
    (amplificationLevel) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel,
        },
      });

      expect(canApplySoulAmplification(gear)).toBe(true);
    },
  );

  it('소울 증폭 단계가 최대인 경우 false를 반환한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: {
        enchanted: true,
        soul: createSoulData({ magnificent: true }),
        amplificationLevel: 4,
      },
    });

    expect(canApplySoulAmplification(gear)).toBe(false);
  });
});

describe('applySoulAmplification', () => {
  it.each([undefined, 0])(
    '처음 증폭하면 소울 잠재능력 등급을 Rare로 설정한다.',
    (amplificationLevel) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel,
        },
      });

      applySoulAmplification(gear);

      expect(gear.soulPotentialGrade).toBe(PotentialGrade.Rare);
    },
  );

  it.each([undefined, 0])(
    '처음 증폭하면 소울 잠재능력 옵션을 빈 배열로 설정한다.',
    (amplificationLevel) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel,
        },
      });

      applySoulAmplification(gear);

      expect(gear.data.soulWeapon?.potentials).toEqual([]);
    },
  );

  it.each([1, 2, 3])(
    '추가로 증폭해도 기존 소울 잠재능력 등급을 보존한다.',
    (amplificationLevel) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel,
          potentialGrade: PotentialGrade.Unique,
        },
      });

      applySoulAmplification(gear);

      expect(gear.soulPotentialGrade).toBe(PotentialGrade.Unique);
    },
  );

  it.each([1, 2, 3])(
    '추가로 증폭해도 기존 소울 잠재능력 옵션을 보존한다.',
    (amplificationLevel) => {
      const potentials = [
        createPotentialData({ summary: '테스트용 소울 잠재능력 1' }),
        createPotentialData({ summary: '테스트용 소울 잠재능력 2' }),
        createPotentialData({ summary: '테스트용 소울 잠재능력 3' }),
      ];
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel,
          potentials: potentials,
        },
      });

      applySoulAmplification(gear);

      expect(gear.soulPotentials).toEqual(potentials);
    },
  );

  it.each([
    undefined,
    {},
    {
      enchanted: false,
      amplificationLevel: 1,
      soul: createSoulData({ magnificent: true }),
    },
  ])(
    '소울웨폰이 아닌 장비의 소울을 증폭하면 GearError가 발생한다.',
    (soulWeapon) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon,
      });

      expect(() => {
        applySoulAmplification(gear);
      }).toThrow(GearError);
    },
  );

  it('소울이 없는 소울웨폰을 증폭하면 GearError가 발생한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: { enchanted: true, amplificationLevel: 1 },
    });

    expect(() => {
      applySoulAmplification(gear);
    }).toThrow(GearError);
  });

  it.each([undefined, false])(
    '일반 소울을 증폭하면 GearError가 발생한다.',
    (magnificent) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          amplificationLevel: 1,
          soul: createSoulData({ magnificent }),
        },
      });

      expect(() => {
        applySoulAmplification(gear);
      }).toThrow(GearError);
    },
  );

  it.each([undefined, 0, 150, 199])(
    '요구 레벨이 200 미만인 무기의 소울을 증폭하면 GearError가 발생한다.',
    (reqLevel) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: reqLevel },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel: 0,
        },
      });

      expect(() => {
        applySoulAmplification(gear);
      }).toThrow(GearError);
    },
  );

  it.each([
    [200, undefined],
    [200, 0],
    [250, undefined],
    [250, 0],
  ])(
    '위대한 소울을 처음 증폭하면 1단계가 된다.',
    (reqLevel, amplificationLevel) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: reqLevel },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel,
        },
      });

      applySoulAmplification(gear);

      expect(gear.soulAmplificationLevel).toBe(1);
    },
  );

  it.each([
    [1, 2],
    [2, 3],
    [3, 4],
  ])(
    '이미 증폭한 소울을 증폭하면 단계가 하나 증가한다.',
    (amplificationLevel, expected) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel,
        },
      });

      applySoulAmplification(gear);

      expect(gear.soulAmplificationLevel).toBe(expected);
    },
  );

  it('최대 단계에서 추가로 증폭하면 GearError가 발생한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: {
        enchanted: true,
        soul: createSoulData({ magnificent: true }),
        amplificationLevel: 4,
      },
    });

    expect(() => {
      applySoulAmplification(gear);
    }).toThrow(GearError);
  });
});

describe('canSetSoulPotential', () => {
  it.each([
    undefined,
    {},
    {
      enchanted: false,
      amplificationLevel: 1,
      soul: createSoulData({ magnificent: true }),
    },
  ])('소울웨폰이 아닐 경우 false를 반환한다.', (soulWeapon) => {
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon,
    });

    expect(canSetSoulPotential(gear)).toBe(false);
  });

  it('소울웨폰이고 소울이 없는 경우 false를 반환한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: { enchanted: true, amplificationLevel: 1 },
    });

    expect(canSetSoulPotential(gear)).toBe(false);
  });

  it.each([undefined, false])(
    '장착된 소울이 일반 소울인 경우 false를 반환한다.',
    (magnificent) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          amplificationLevel: 1,
          soul: createSoulData({ magnificent }),
        },
      });

      expect(canSetSoulPotential(gear)).toBe(false);
    },
  );

  it.each([undefined, 0])(
    '위대한 소울이 장착되었지만 증폭하지 않은 경우 false를 반환한다.',
    (amplificationLevel) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel,
        },
      });

      expect(canSetSoulPotential(gear)).toBe(false);
    },
  );

  it.each([1, 2, 3, 4])(
    '증폭한 위대한 소울이 장착된 경우 true를 반환한다.',
    (amplificationLevel) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel,
        },
      });

      expect(canSetSoulPotential(gear)).toBe(true);
    },
  );
});

describe('setSoulPotential', () => {
  it.each([
    undefined,
    {},
    {
      enchanted: false,
      amplificationLevel: 1,
      soul: createSoulData({ magnificent: true }),
    },
  ])(
    '소울웨폰이 아닌 장비에 소울 잠재능력을 설정하면 GearError가 발생한다.',
    (soulWeapon) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon,
      });
      const potentials = [
        createPotentialData(),
        createPotentialData(),
        createPotentialData(),
      ];

      expect(() => {
        setSoulPotential(gear, PotentialGrade.Rare, potentials);
      }).toThrow(GearError);
    },
  );

  it('소울이 없는 소울웨폰에 잠재능력을 설정하면 GearError가 발생한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: { enchanted: true, amplificationLevel: 1 },
    });
    const potentials = [
      createPotentialData(),
      createPotentialData(),
      createPotentialData(),
    ];

    expect(() => {
      setSoulPotential(gear, PotentialGrade.Rare, potentials);
    }).toThrow(GearError);
  });

  it.each([undefined, false])(
    '일반 소울에 잠재능력을 설정하면 GearError가 발생한다.',
    (magnificent) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          amplificationLevel: 1,
          soul: createSoulData({ magnificent }),
        },
      });
      const potentials = [
        createPotentialData(),
        createPotentialData(),
        createPotentialData(),
      ];

      expect(() => {
        setSoulPotential(gear, PotentialGrade.Rare, potentials);
      }).toThrow(GearError);
    },
  );

  it.each([undefined, 0])(
    '증폭하지 않은 위대한 소울에 잠재능력을 설정하면 GearError가 발생한다.',
    (amplificationLevel) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel,
        },
      });
      const potentials = [
        createPotentialData(),
        createPotentialData(),
        createPotentialData(),
      ];

      expect(() => {
        setSoulPotential(gear, PotentialGrade.Rare, potentials);
      }).toThrow(GearError);
    },
  );

  it.each([1, 2, 3, 4])(
    '증폭한 위대한 소울에 잠재능력 옵션을 설정한다.',
    (amplificationLevel) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel,
        },
      });
      const potentials = [
        createPotentialData(),
        createPotentialData(),
        createPotentialData(),
      ];

      setSoulPotential(gear, PotentialGrade.Rare, potentials);

      expect(gear.soulPotentials).toEqual(potentials);
    },
  );

  it.each([
    PotentialGrade.Rare,
    PotentialGrade.Epic,
    PotentialGrade.Unique,
    PotentialGrade.Legendary,
  ])('소울 잠재능력 등급을 설정한다.', (grade) => {
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: {
        enchanted: true,
        soul: createSoulData({ magnificent: true }),
        amplificationLevel: 1,
      },
    });
    const potentials = [
      createPotentialData(),
      createPotentialData(),
      createPotentialData(),
    ];

    setSoulPotential(gear, grade, potentials);

    expect(gear.soulPotentialGrade).toBe(grade);
  });

  it('설정하려는 잠재능력 등급이 Normal일 경우 GearError가 발생한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: {
        enchanted: true,
        soul: createSoulData({ magnificent: true }),
        amplificationLevel: 1,
      },
    });
    const potentials = [
      createPotentialData(),
      createPotentialData(),
      createPotentialData(),
    ];

    expect(() => {
      setSoulPotential(gear, PotentialGrade.Normal, potentials);
    }).toThrow(GearError);
  });

  it.each([0, 1, 2, 4])(
    '소울 잠재능력 옵션이 세 개가 아니면 GearError가 발생한다.',
    (length) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
          amplificationLevel: 1,
        },
      });
      const potentials = Array.from({ length }, () => createPotentialData());

      expect(() => {
        setSoulPotential(gear, PotentialGrade.Rare, potentials);
      }).toThrow(
        expect.objectContaining({
          code: ErrorCode.SoulWeapon_SetPotential_OptionCountNotThree,
          context: {
            gear,
            grade: PotentialGrade.Rare,
            'options.length': length,
          },
          message: expect.stringContaining(length.toString()),
        }),
      );
    },
  );
});

describe('소울웨폰 오류 우선순위', () => {
  it.each([
    [GearType.cap, ErrorCode.SoulWeapon_Enchant_NotWeapon],
    [GearType.thSword, ErrorCode.SoulWeapon_Enchant_AlreadyEnchanted],
  ])('무기 여부를 중복 변환보다 먼저 검사한다 (%d).', (type, code) => {
    const gear = createGear({ type, soulWeapon: { enchanted: true } });
    expect(canApplySoulEnchant(gear)).toBe(false);
    expect(() => applySoulEnchant(gear)).toThrow(
      expect.objectContaining({ code }),
    );
  });

  it.each([
    [false, ErrorCode.SoulWeapon_Equip_NotEnchanted],
    [true, ErrorCode.SoulWeapon_Equip_AmplifiedSlotRequiresAmplifiableSoul],
  ])(
    '소울웨폰 여부를 장착할 소울보다 먼저 검사한다 (%s).',
    (enchanted, code) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: { enchanted, amplificationLevel: 1 },
      });
      const soul = createSoulData({ magnificent: false });
      expect(canSetSoul(gear, soul.magnificent ?? false)).toBe(false);
      expect(() => setSoul(gear, soul)).toThrow(
        expect.objectContaining({ code }),
      );
    },
  );

  it.each([
    [199, false, undefined, 4, ErrorCode.SoulWeapon_Amplify_ReqLevelBelow200],
    [199, true, undefined, 4, ErrorCode.SoulWeapon_Amplify_ReqLevelBelow200],
    [199, true, false, 4, ErrorCode.SoulWeapon_Amplify_ReqLevelBelow200],
    [200, false, undefined, 4, ErrorCode.SoulWeapon_Amplify_NotEnchanted],
    [200, true, undefined, 4, ErrorCode.SoulWeapon_Amplify_NoSoulEquipped],
    [
      200,
      true,
      false,
      4,
      ErrorCode.SoulWeapon_Amplify_EquippedSoulNotAmplifiable,
    ],
    [200, true, true, 4, ErrorCode.SoulWeapon_Amplify_MaxLevelReached],
  ])(
    '레벨, 소울웨폰 여부, 소울, 증폭 단계 순서로 검사한다 (%#).',
    (level, enchanted, magnificent, amplificationLevel, code) => {
      const soul =
        magnificent === undefined ? undefined : createSoulData({ magnificent });
      const gear = createGear({
        type: GearType.bow,
        req: { level },
        soulWeapon: { enchanted, soul, amplificationLevel },
      });
      const before = structuredClone(gear.data);
      expect(canApplySoulAmplification(gear)).toBe(false);
      expect(() => applySoulAmplification(gear)).toThrow(
        expect.objectContaining({
          code,
          context: { gear },
        }),
      );
      expect(gear.data).toEqual(before);
    },
  );

  it.each([
    [
      false,
      0,
      undefined,
      PotentialGrade.Normal,
      ErrorCode.SoulWeapon_SetPotential_NotEnchanted,
      false,
    ],
    [
      true,
      0,
      undefined,
      PotentialGrade.Normal,
      ErrorCode.SoulWeapon_SetPotential_NoSoulEquipped,
      false,
    ],
    [
      true,
      1,
      undefined,
      PotentialGrade.Normal,
      ErrorCode.SoulWeapon_SetPotential_NoSoulEquipped,
      false,
    ],
    [
      true,
      1,
      false,
      PotentialGrade.Normal,
      ErrorCode.SoulWeapon_SetPotential_EquippedSoulNotAmplifiable,
      false,
    ],
    [
      true,
      1,
      true,
      PotentialGrade.Normal,
      ErrorCode.SoulWeapon_SetPotential_NormalGradeNotAllowed,
      true,
    ],
    [
      true,
      1,
      true,
      PotentialGrade.Rare,
      ErrorCode.SoulWeapon_SetPotential_OptionCountNotThree,
      true,
    ],
    [
      true,
      0,
      false,
      PotentialGrade.Normal,
      ErrorCode.SoulWeapon_SetPotential_EquippedSoulNotAmplifiable,
      false,
    ],
    [
      true,
      0,
      true,
      PotentialGrade.Normal,
      ErrorCode.SoulWeapon_SetPotential_NotAmplified,
      false,
    ],
  ])(
    '장비 상태, 등급, 옵션 개수 순서로 검사한다 (%#).',
    (enchanted, amplificationLevel, magnificent, grade, code, canSet) => {
      const soul =
        magnificent === undefined ? undefined : createSoulData({ magnificent });
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: { enchanted, amplificationLevel, soul },
      });
      const before = structuredClone(gear.data);
      expect(canSetSoulPotential(gear)).toBe(canSet);
      expect(() => setSoulPotential(gear, grade, [])).toThrow(
        expect.objectContaining({
          code,
          context: {
            gear,
            grade,
            'options.length': 0,
          },
        }),
      );
      expect(gear.data).toEqual(before);
    },
  );
});

describe('removeSoul', () => {
  it('인챈트와 증폭 정보를 보존하고 소울만 제거한다.', () => {
    const soulWeapon = {
      enchanted: true,
      soul: createSoulData({ magnificent: true }),
      amplificationLevel: 3,
      potentialGrade: PotentialGrade.Unique,
      potentials: [createPotentialData()],
    };
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: structuredClone(soulWeapon),
    });

    removeSoul(gear);

    expect(gear.data.soulWeapon).toEqual({ ...soulWeapon, soul: undefined });
    expect(gear.soulEnchanted).toBe(true);
    expect(gear.soul).toBeUndefined();
    expect(gear.soulAmplificationActive).toBe(false);
    expect(gear.soulAmplificationLevel).toBe(3);
    expect(canSetSoul(gear, false)).toBe(false);
    expect(canSetSoul(gear, true)).toBe(true);
    const before = structuredClone(gear.data);
    expect(() => setSoul(gear, createSoulData())).toThrow(GearError);
    expect(gear.data).toEqual(before);

    setSoul(gear, createSoulData({ magnificent: true }));

    expect(gear.soulAmplificationActive).toBe(true);
    expect(gear.soulAmplificationLevel).toBe(3);
    expect(gear.soulPotentialGrade).toBe(PotentialGrade.Unique);
    expect(gear.soulPotentials).toEqual(soulWeapon.potentials);
  });

  it('비활성 상태에 저장된 소울도 제거한다.', () => {
    const gear = createGear({
      soulWeapon: {
        enchanted: false,
        soul: createSoulData(),
        amplificationLevel: 2,
      },
    });

    removeSoul(gear);

    expect(gear.data.soulWeapon).toEqual({
      enchanted: false,
      amplificationLevel: 2,
    });
  });
});

describe('resetSoulWeapon', () => {
  it.each([false, true])('소울웨폰 정보를 완전히 제거한다.', (enchanted) => {
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: {
        enchanted,
        soul: createSoulData({ magnificent: true }),
        amplificationLevel: 4,
        potentialGrade: PotentialGrade.Unique,
        potentials: [createPotentialData()],
      },
    });
    const before = structuredClone(gear.data);
    delete before.soulWeapon;

    resetSoulWeapon(gear);

    expect(gear.data).toEqual(before);
    expect(gear.data).not.toHaveProperty('soulWeapon');
    expect(gear.soulEnchanted).toBe(false);
    expect(gear.soulAmplificationLevel).toBe(0);
    expect(gear.soulPotentialGrade).toBe(PotentialGrade.Normal);
    expect(gear.soulPotentials).toEqual([]);
    applySoulEnchant(gear);
    expect(canSetSoul(gear, false)).toBe(true);
    setSoul(gear, createSoulData());
    expect(gear.soul?.magnificent).toBe(false);
  });
});

describe('소울웨폰 해제와 복원', () => {
  it('인챈트를 다시 적용하면 보존된 소울과 증폭 정보를 복원한다.', () => {
    const soulWeapon = {
      enchanted: true,
      soul: createSoulData({ magnificent: true }),
      amplificationLevel: 3,
      potentialGrade: PotentialGrade.Unique,
      potentials: [createPotentialData()],
    };
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: structuredClone(soulWeapon),
    });

    removeSoulEnchant(gear);

    expect(gear.data.soulWeapon).toEqual({ ...soulWeapon, enchanted: false });
    expect(gear.soul).toBeUndefined();
    expect(gear.soulBaseOption).toEqual({});
    expect(gear.soulAmplificationActive).toBe(false);
    expect(gear.soulAmplificationLevel).toBe(3);
    expect(gear.soulPotentialGrade).toBe(PotentialGrade.Unique);
    expect(gear.soulPotentials).toEqual(soulWeapon.potentials);
    expect(canSetSoulPotential(gear)).toBe(false);
    applySoulEnchant(gear);
    expect(gear.data.soulWeapon).toEqual(soulWeapon);
    expect(gear.soul?.magnificent).toBe(true);
    expect(gear.soulAmplificationLevel).toBe(3);
    expect(gear.soulPotentialGrade).toBe(PotentialGrade.Unique);
    expect(gear.soulPotentials).toEqual(soulWeapon.potentials);
  });

  it.each([removeSoulEnchant, removeSoul, resetSoulWeapon])(
    '정보가 없는 장비에 반복 적용해도 정보를 생성하지 않는다.',
    (remove) => {
      const gear = createGear();
      const before = structuredClone(gear.data);

      remove(gear);
      remove(gear);

      expect(gear.data).toEqual(before);
    },
  );
});

describe('소울웨폰을 지원하지 않는 장비', () => {
  it('소울웨폰 데이터가 있어도 소울 장착과 강화를 허용하지 않는다.', () => {
    const gear = createGear({
      type: GearType.cap,
      req: { level: 200 },
      soulWeapon: {
        enchanted: true,
        soul: createSoulData({ magnificent: true }),
        amplificationLevel: 2,
      },
    });
    const before = structuredClone(gear.data);

    expect(canSetSoul(gear, false)).toBe(false);
    expect(canSetSoul(gear, true)).toBe(false);
    expect(canApplySoulAmplification(gear)).toBe(false);
    expect(canSetSoulPotential(gear)).toBe(false);
    expect(() => setSoul(gear, createSoulData({ magnificent: true }))).toThrow(
      GearError,
    );
    expect(() => applySoulAmplification(gear)).toThrow(GearError);
    expect(() =>
      setSoulPotential(gear, PotentialGrade.Rare, [
        createPotentialData(),
        createPotentialData(),
        createPotentialData(),
      ]),
    ).toThrow(GearError);
    expect(gear.data).toEqual(before);
  });
});

describe('supportsSoulAmplification', () => {
  it.each([
    [GearType.bow, 199, false],
    [GearType.bow, 200, true],
    [GearType.bow, 250, true],
    [GearType.cap, 200, false],
  ])(
    '장비 종류 %d와 요구 레벨 %d로 증폭 지원 여부를 반환한다.',
    (type, level, expected) => {
      const gear = createGear({
        type,
        req: { level },
        soulWeapon: {
          enchanted: true,
          soul: createSoulData({ magnificent: true }),
        },
      });
      expect(supportsSoulAmplification(gear)).toBe(expected);
    },
  );

  it.each([
    [false, true, false],
    [true, undefined, false],
    [true, false, false],
    [true, true, true],
  ] as const)(
    '인챈트와 부여된 소울 종류에 따라 증폭 지원 여부를 반환한다.',
    (enchanted, magnificent, expected) => {
      const gear = createGear({
        type: GearType.bow,
        req: { level: 200 },
        soulWeapon: {
          enchanted,
          soul:
            magnificent === undefined
              ? undefined
              : createSoulData({ magnificent }),
          amplificationLevel: 4,
        },
      });
      expect(supportsSoulAmplification(gear)).toBe(expected);
      expect(canApplySoulAmplification(gear)).toBe(false);
    },
  );
});

describe('소울 잠재능력 요구 레벨', () => {
  it.each([
    [199, false],
    [200, true],
  ])('요구 레벨 %d에서 판정과 설정 결과가 일치한다.', (level, expected) => {
    const gear = createGear({
      type: GearType.bow,
      req: { level },
      soulWeapon: {
        enchanted: true,
        soul: createSoulData({ magnificent: true }),
        amplificationLevel: 1,
      },
    });
    const potentials = [
      createPotentialData(),
      createPotentialData(),
      createPotentialData(),
    ];
    const before = structuredClone(gear.data);
    expect(canSetSoulPotential(gear)).toBe(expected);
    if (expected) {
      setSoulPotential(gear, PotentialGrade.Rare, potentials);
      expect(gear.soulPotentials).toEqual(potentials);
    } else {
      expect(() =>
        setSoulPotential(gear, PotentialGrade.Rare, potentials),
      ).toThrow(GearError);
      expect(gear.data).toEqual(before);
    }
  });
});
