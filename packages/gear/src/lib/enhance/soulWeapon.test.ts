import { GearType, PotentialGrade } from '../data';
import { ErrorCode, GearError } from '../error';
import { createGear, createPotentialData, createSoulData } from '../testing';
import {
  amplifySoul,
  applySoulEnchant,
  canAmplifySoul,
  canApplySoulEnchant,
  canSetSoul,
  canSetSoulPotential,
  getSoulBaseOption,
  resetSoulEnchant,
  setSoul,
  setSoulPotential,
  supportsSoul,
} from './soulWeapon';

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

      expect(gear.soulAmplificationLevel).toBe(amplificationLevel);
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

    expect(gear.soulPotentialGrade).toBe(PotentialGrade.Unique);
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

    expect(gear.soulPotentials).toEqual(potentials);
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

      expect(canSetSoul(gear, soul)).toBe(false);
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

      expect(canSetSoul(gear, soul)).toBe(true);
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

      expect(canSetSoul(gear, soul)).toBe(true);
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

      expect(canSetSoul(gear, soul)).toBe(true);
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

      expect(canSetSoul(gear, soul)).toBe(false);
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

      expect(canSetSoul(gear, soul)).toBe(true);
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

      expect(canSetSoul(gear, soul)).toBe(false);
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

      expect(canSetSoul(gear, soul)).toBe(true);
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

describe('resetSoulEnchant', () => {
  it.each([1, 2, 3, 4])(
    '소울웨폰을 초기화해도 기존 증폭 단계를 보존한다.',
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

      resetSoulEnchant(gear);

      expect(gear.soulAmplificationLevel).toBe(amplificationLevel);
    },
  );

  it('소울웨폰을 초기화해도 기존 소울 잠재능력 등급을 보존한다.', () => {
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

    resetSoulEnchant(gear);

    expect(gear.soulPotentialGrade).toBe(PotentialGrade.Unique);
  });

  it('소울웨폰을 초기화해도 기존 소울 잠재능력 옵션을 보존한다.', () => {
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

    resetSoulEnchant(gear);

    expect(gear.soulPotentials).toEqual(potentials);
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

    resetSoulEnchant(gear);

    expect(gear.soulEnchanted).toBe(false);
  });

  it('장착된 소울을 제거한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: {
        enchanted: true,
        soul: createSoulData({ magnificent: true }),
        amplificationLevel: 1,
      },
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

describe('canAmplifySoul', () => {
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

    expect(canAmplifySoul(gear)).toBe(false);
  });

  it('소울웨폰이고 소울이 없는 경우 false를 반환한다.', () => {
    const gear = createGear({
      type: GearType.bow,
      req: { level: 200 },
      soulWeapon: { enchanted: true, amplificationLevel: 1 },
    });

    expect(canAmplifySoul(gear)).toBe(false);
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

      expect(canAmplifySoul(gear)).toBe(false);
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

      expect(canAmplifySoul(gear)).toBe(false);
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

      expect(canAmplifySoul(gear)).toBe(true);
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

      expect(canAmplifySoul(gear)).toBe(true);
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

    expect(canAmplifySoul(gear)).toBe(false);
  });
});

describe('amplifySoul', () => {
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

      amplifySoul(gear);

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

      amplifySoul(gear);

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

      amplifySoul(gear);

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

      amplifySoul(gear);

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
        amplifySoul(gear);
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
      amplifySoul(gear);
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
        amplifySoul(gear);
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
        amplifySoul(gear);
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

      amplifySoul(gear);

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

      amplifySoul(gear);

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
      amplifySoul(gear);
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
        soulWeapon: { enchanted, amplificationLevel: 1 },
      });
      const soul = createSoulData({ magnificent: false });
      expect(canSetSoul(gear, soul)).toBe(false);
      expect(() => setSoul(gear, soul)).toThrow(
        expect.objectContaining({ code }),
      );
    },
  );

  it.each([
    [199, false, undefined, 4, ErrorCode.SoulWeapon_Amplify_ReqLevelBelow200],
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
        req: { level },
        soulWeapon: { enchanted, soul, amplificationLevel },
      });
      const before = structuredClone(gear.data);
      expect(canAmplifySoul(gear)).toBe(false);
      expect(() => amplifySoul(gear)).toThrow(
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
      ErrorCode.SoulWeapon_SetPotential_NotAmplified,
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
  ])(
    '장비 상태, 등급, 옵션 개수 순서로 검사한다 (%#).',
    (enchanted, amplificationLevel, magnificent, grade, code, canSet) => {
      const soul =
        magnificent === undefined ? undefined : createSoulData({ magnificent });
      const gear = createGear({
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
