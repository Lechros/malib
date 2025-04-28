import { GearCapability, PotentialGrade } from '../data';
import { createGear, createPotentialData } from '../test';
import {
  canSetAdditionalPotential,
  canSetPotential,
  resetAdditionalPotential,
  resetPotential,
  setAdditionalPotential,
  setPotential,
  supportsAdditionalPotential,
  supportsPotential,
} from './potential';

describe('supportsPotential', () => {
  it('canPotential = Can일 경우 true를 반환한다.', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
      },
    });

    expect(supportsPotential(gear)).toBe(true);
  });

  it('canPotential = Fixed일 경우 false를 반환한다.', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Fixed,
      },
    });

    expect(supportsPotential(gear)).toBe(false);
  });

  it('canPotential = Cannot일 경우 false를 반환한다.', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Cannot,
      },
    });

    expect(supportsPotential(gear)).toBe(false);
  });
});

describe('canSetPotential', () => {
  it('canPotential = Can일 경우 true를 반환한다.', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
      },
    });

    expect(canSetPotential(gear)).toBe(true);
  });

  it('canPotential = Fixed일 경우 false를 반환한다.', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Fixed,
      },
    });

    expect(canSetPotential(gear)).toBe(false);
  });

  it('canPotential = Cannot일 경우 false를 반환한다.', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Cannot,
      },
    });

    expect(canSetPotential(gear)).toBe(false);
  });
});

describe('setPotential', () => {
  it('잠재능력 등급을 설정한다.', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
      },
    });

    setPotential(gear, PotentialGrade.Unique, [createPotentialData()]);

    expect(gear.potentialGrade).toBe(PotentialGrade.Unique);
  });

  it('잠재능력 옵션을 설정한다.', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
      },
    });
    const potentials = [
      createPotentialData({
        grade: PotentialGrade.Unique,
        summary: '테스트용 잠재능력 1',
      }),
      createPotentialData({
        grade: PotentialGrade.Unique,
        summary: '테스트용 잠재능력 2',
      }),
    ];

    setPotential(gear, PotentialGrade.Unique, potentials);

    expect(gear.potentials).toEqual(potentials);
  });

  it('잠재능력 옵션의 등급이 잠재능력 등급보다 낮은 경우에도 설정한다.', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
      },
    });
    const potentials = [createPotentialData({ grade: PotentialGrade.Rare })];

    setPotential(gear, PotentialGrade.Unique, potentials);

    expect(gear.potentials).toEqual(potentials);
  });

  it('잠재능력 옵션의 등급이 잠재능력 등급보다 높은 경우에도 설정한다.', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
      },
    });
    const potentials = [
      createPotentialData({ grade: PotentialGrade.Legendary }),
    ];

    setPotential(gear, PotentialGrade.Epic, potentials);

    expect(gear.potentials).toEqual(potentials);
  });

  it('canPotential = Cannot일 경우 TypeError가 발생한다.', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Cannot,
      },
    });

    expect(() => {
      setPotential(gear, PotentialGrade.Unique, [createPotentialData()]);
    }).toThrow(TypeError);
  });

  it('설정하려는 잠재능력 등급이 Normal일 경우 TypeError가 발생한다.', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
      },
    });

    expect(() => {
      setPotential(gear, PotentialGrade.Normal, [createPotentialData()]);
    }).toThrow(TypeError);
  });

  it('설정하려는 잠재능력 옵션의 길이가 0일 경우 TypeError가 발생한다.', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
      },
    });

    expect(() => {
      setPotential(gear, PotentialGrade.Unique, []);
    }).toThrow(TypeError);
  });

  it('설정하려는 잠재능력 옵션의 길이가 3보다 클 경우 TypeError가 발생한다.', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
      },
    });

    expect(() => {
      setPotential(gear, PotentialGrade.Unique, [
        createPotentialData(),
        createPotentialData(),
        createPotentialData(),
        createPotentialData(),
      ]);
    }).toThrow(TypeError);
  });
});

describe('resetPotential', () => {
  it('잠재능력 등급을 Normal로 설정한다.', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
      },
      potentialGrade: PotentialGrade.Unique,
    });

    resetPotential(gear);

    expect(gear.potentialGrade).toBe(PotentialGrade.Normal);
  });

  it('잠재능력 옵션을 초기화한다.', () => {
    const gear = createGear({
      attributes: {
        canPotential: GearCapability.Can,
      },
      potentials: [createPotentialData()],
    });

    resetPotential(gear);

    expect(gear.potentials).toEqual([]);
  });
});

describe('supportsAdditionalPotential', () => {
  it('canAdditionalPotential = Can일 경우 true를 반환한다.', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
      },
    });

    expect(supportsAdditionalPotential(gear)).toBe(true);
  });

  it('canAdditionalPotential = Fixed일 경우 false를 반환한다.', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Fixed,
      },
    });

    expect(supportsAdditionalPotential(gear)).toBe(false);
  });

  it('canAdditionalPotential = Cannot일 경우 false를 반환한다.', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Cannot,
      },
    });

    expect(supportsAdditionalPotential(gear)).toBe(false);
  });

  describe('canSetAdditionalPotential', () => {
    it('canAdditionalPotential = Can일 경우 true를 반환한다.', () => {
      const gear = createGear({
        attributes: {
          canAdditionalPotential: GearCapability.Can,
        },
      });

      expect(canSetAdditionalPotential(gear)).toBe(true);
    });

    it('canAdditionalPotential = Fixed일 경우 false를 반환한다.', () => {
      const gear = createGear({
        attributes: {
          canAdditionalPotential: GearCapability.Fixed,
        },
      });

      expect(canSetAdditionalPotential(gear)).toBe(false);
    });

    it('canAdditionalPotential = Cannot일 경우 false를 반환한다.', () => {
      const gear = createGear({
        attributes: {
          canAdditionalPotential: GearCapability.Cannot,
        },
      });

      expect(canSetAdditionalPotential(gear)).toBe(false);
    });
  });
});

describe('setAdditionalPotential', () => {
  it('에디셔널 잠재능력 등급을 설정한다.', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
      },
    });

    setAdditionalPotential(gear, PotentialGrade.Unique, [
      createPotentialData(),
    ]);

    expect(gear.additionalPotentialGrade).toBe(PotentialGrade.Unique);
  });

  it('에디셔널 잠재능력 옵션을 설정한다.', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
      },
    });
    const potentials = [
      createPotentialData({
        grade: PotentialGrade.Unique,
        summary: '테스트용 에디셔널 잠재능력 1',
      }),
      createPotentialData({
        grade: PotentialGrade.Unique,
        summary: '테스트용 에디셔널 잠재능력 2',
      }),
    ];

    setAdditionalPotential(gear, PotentialGrade.Unique, potentials);

    expect(gear.additionalPotentials).toEqual(potentials);
  });

  it('에디셔널 잠재능력 옵션의 등급이 에디셔널 잠재능력 등급보다 낮은 경우에도 설정한다.', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
      },
    });
    const potentials = [createPotentialData({ grade: PotentialGrade.Rare })];

    setAdditionalPotential(gear, PotentialGrade.Unique, potentials);

    expect(gear.additionalPotentials).toEqual(potentials);
  });

  it('에디셔널 잠재능력 옵션의 등급이 에디셔널 잠재능력 등급보다 높은 경우에도 설정한다.', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
      },
    });
    const potentials = [
      createPotentialData({ grade: PotentialGrade.Legendary }),
    ];

    setAdditionalPotential(gear, PotentialGrade.Epic, potentials);

    expect(gear.additionalPotentials).toEqual(potentials);
  });

  it('canAdditionalPotential = Cannot일 경우 TypeError가 발생한다.', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Cannot,
      },
    });

    expect(() => {
      setAdditionalPotential(gear, PotentialGrade.Unique, [
        createPotentialData(),
      ]);
    }).toThrow(TypeError);
  });

  it('설정하려는 에디셔널 잠재능력 등급이 Normal일 경우 TypeError가 발생한다.', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
      },
    });

    expect(() => {
      setAdditionalPotential(gear, PotentialGrade.Normal, [
        createPotentialData(),
      ]);
    }).toThrow(TypeError);
  });

  it('설정하려는 에디셔널 잠재능력 옵션의 길이가 0일 경우 TypeError가 발생한다.', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
      },
    });

    expect(() => {
      setAdditionalPotential(gear, PotentialGrade.Unique, []);
    }).toThrow(TypeError);
  });

  it('설정하려는 에디셔널 잠재능력 옵션의 길이가 3보다 클 경우 TypeError가 발생한다.', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
      },
    });

    expect(() => {
      setAdditionalPotential(gear, PotentialGrade.Unique, [
        createPotentialData(),
        createPotentialData(),
        createPotentialData(),
        createPotentialData(),
      ]);
    }).toThrow(TypeError);
  });
});

describe('resetAdditionalPotential', () => {
  it('에디셔널 잠재능력 등급을 Normal로 설정한다.', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
      },
      additionalPotentialGrade: PotentialGrade.Legendary,
    });

    resetAdditionalPotential(gear);

    expect(gear.additionalPotentialGrade).toBe(PotentialGrade.Normal);
  });

  it('에디셔널 잠재능력 옵션을 초기화한다.', () => {
    const gear = createGear({
      attributes: {
        canAdditionalPotential: GearCapability.Can,
      },
      additionalPotentials: [createPotentialData()],
    });

    resetAdditionalPotential(gear);

    expect(gear.additionalPotentials).toEqual([]);
  });
});
