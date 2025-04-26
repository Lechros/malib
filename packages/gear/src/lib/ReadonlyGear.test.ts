import {
  GearCapability,
  GearData,
  GearTrade,
  GearType,
  PotentialGrade,
} from './data';
import { Gear } from './Gear';
import { ReadonlyGear } from './ReadonlyGear';

describe('Gear constructor', () => {
  it('should accept GearData', () => {
    const data = {
      meta: {
        id: 0,
        version: 1,
      },
      name: '',
      type: GearType.cap,
      req: {},
      attributes: {},
    } satisfies GearData;

    const gear = new Gear(data);

    expect(gear).toBeInstanceOf(Gear);
  });
});

describe('ReadonlyGear', () => {
  let gear: ReadonlyGear;

  describe('meta', () => {
    it('id is 1212123', () => {
      expect(gear.meta.id).toBe(1212128);
    });

    it('id is settable to 1234567', () => {
      gear.meta.id = 1234567;

      expect(gear.meta.id).toBe(1234567);
    });

    it('version is 1', () => {
      expect(gear.meta.version).toBe(1);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'id' because it is a read-only property.
      expect(() => (gear.meta = { id: 0, version: 1 })).toThrow();
    });
  });

  describe('name', () => {
    it('is 제네시스 샤이닝로드', () => {
      expect(gear.name).toBe('제네시스 샤이닝로드');
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'name' because it is a read-only property.
      expect(() => (gear.name = '제네시스 스태프')).toThrow();
    });
  });

  describe('icon', () => {
    it('is 1212128', () => {
      expect(gear.icon).toBe('1212128');
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'icon' because it is a read-only property.
      expect(() => (gear.icon = '1234567')).toThrow();
    });
  });

  describe('desc', () => {
    it('is 해방 무기', () => {
      expect(gear.desc).toBe('해방 무기');
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'desc' because it is a read-only property.
      expect(() => (gear.desc = '설명')).toThrow();
      // @ts-expect-error: Cannot assign to 'desc' because it is a read-only property.
      expect(() => (gear.desc = undefined)).toThrow();
    });
  });

  describe('shape', () => {
    it('is { name: 모루 아이템, icon: 1010101 }', () => {
      expect(gear.shape).toEqual({ name: '모루 아이템', icon: '1010101' });
    });

    it('is readonly property', () => {
      expect(
        // @ts-expect-error: Cannot assign to 'shape' because it is a read-only property.
        () => (gear.shape = { name: '모루 아이템', icon: '1010101' }),
      ).toThrow();
    });
  });

  describe('shapeIcon', () => {
    it('is 1010101', () => {
      expect(gear.shapeIcon).toBe('1010101');
    });

    it('is icon if shape is undefined', () => {
      (gear.data as GearData).shape = undefined;

      expect(gear.shapeIcon).toBe('1212128');
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'shapeIcon' because it is a read-only property.
      expect(() => (gear.shapeIcon = '1234567')).toThrow();
    });
  });

  describe('type', () => {
    it('is shiningRod', () => {
      expect(gear.type).toBe(GearType.shiningRod);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'type' because it is a read-only property.
      expect(() => (gear.type = GearType.staff)).toThrow();
    });
  });

  describe('req', () => {
    it('level is 200', () => {
      expect(gear.req.level).toBe(200);
    });

    it('job is 2', () => {
      expect(gear.req.job).toBe(2);
    });

    it('class is 0', () => {
      expect(gear.req.class).toBe(0);
    });

    it('is readonly property', () => {
      expect(
        () =>
          // @ts-expect-error: Cannot assign to 'req' because it is a read-only property.
          (gear.req = {
            level: 100,
            str: 0,
            dex: 0,
            int: 0,
            luk: 0,
            job: 0,
          }),
      ).toThrow();
    });
  });

  describe('attributes', () => {
    it('only is true', () => {
      expect(gear.attributes.only).toBe(true);
    });

    it('trade is TradeBlock', () => {
      expect(gear.attributes.trade).toBe(GearTrade.TradeBlock);
    });

    it('trade is settable to EquipTradeBlock', () => {
      gear.attributes.trade = GearTrade.EquipTradeBlock;

      expect(gear.attributes.trade).toBe(GearTrade.EquipTradeBlock);
    });

    it('trade is settable to undefined', () => {
      gear.attributes.trade = GearTrade.Tradeable;

      expect(gear.attributes.trade).toBe(GearTrade.Tradeable);
    });

    it('onlyEquip is true', () => {
      expect(gear.attributes.onlyEquip).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'attributes' because it is a read-only property.
      expect(() => (gear.attributes = {})).toThrow();
    });
  });

  describe('totalOption', () => {
    it('is sum of standard options', () => {
      expect(gear.totalOption).toEqual({
        int: 382,
        luk: 295,
        maxHp: 255,
        maxMp: 255,
        attackPower: 430,
        magicPower: 938,
        bossDamage: 44,
        ignoreMonsterArmor: 20,
        allStat: 4,
      });
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'totalOption' because it is a read-only property.
      expect(() => (gear.totalOption = {})).toThrow();
    });

    it('is readonly object', () => {
      // @ts-expect-error: Cannot assign to 'int' because it is a read-only property.
      expect(() => (gear.totalOption.int = 3)).not.toThrow();
    });
  });

  describe('baseOption', () => {
    it('is equal to input value', () => {
      expect(gear.baseOption).toEqual({
        int: 150,
        luk: 150,
        attackPower: 237,
        magicPower: 400,
        bossDamage: 30,
        ignoreMonsterArmor: 20,
      });
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'baseOption' because it is a read-only property.
      expect(() => (gear.baseOption = {})).toThrow();
    });

    it('is readonly object', () => {
      // @ts-expect-error: Cannot assign to 'int' because it is a read-only property.
      expect(() => (gear.baseOption.int = 3)).not.toThrow();
    });
  });

  describe('addOption', () => {
    it('is equal to input value', () => {
      expect(gear.addOption).toEqual({
        int: 55,
        magicPower: 192,
        bossDamage: 14,
        allStat: 4,
      });
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'addOption' because it is a read-only property.
      expect(() => (gear.addOption = {})).toThrow();
    });

    it('is readonly object', () => {
      // @ts-expect-error: Cannot assign to 'int' because it is a read-only property.
      expect(() => (gear.addOption.int = 3)).not.toThrow();
    });
  });

  describe('scrollOption', () => {
    it('is equal to input value', () => {
      expect(gear.upgradeOption).toEqual({
        int: 32,
        magicPower: 72,
      });
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'upgradeOption' because it is a read-only property.
      expect(() => (gear.upgradeOption = {})).toThrow();
    });

    it('is readonly object', () => {
      // @ts-expect-error: Cannot assign to 'int' because it is a read-only property.
      expect(() => (gear.upgradeOption.int = 3)).not.toThrow();
    });
  });

  describe('starforceOption', () => {
    it('is equal to input value', () => {
      expect(gear.starforceOption).toEqual({
        int: 145,
        luk: 145,
        maxHp: 255,
        maxMp: 255,
        attackPower: 193,
        magicPower: 274,
      });
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'starforceOption' because it is a read-only property.
      expect(() => (gear.starforceOption = {})).toThrow();
    });

    it('is readonly object', () => {
      // @ts-expect-error: Cannot assign to 'int' because it is a read-only property.
      expect(() => (gear.starforceOption.int = 3)).not.toThrow();
    });
  });

  describe('scrollUpgradeCount', () => {
    it('is 8', () => {
      expect(gear.scrollUpgradeCount).toBe(8);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'scrollUpgradeCount' because it is a read-only property.
      expect(() => (gear.scrollUpgradeCount = 7)).toThrow();
    });
  });

  describe('scrollResilienceCount', () => {
    it('is 0', () => {
      expect(gear.scrollResilienceCount).toBe(0);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'scrollResilienceCount' because it is a read-only property.
      expect(() => (gear.scrollResilienceCount = 1)).toThrow();
    });
  });

  describe('scrollUpgradeableCount', () => {
    it('is 0', () => {
      expect(gear.scrollUpgradeableCount).toBe(0);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'scrollUpgradeableCount' because it is a read-only property.
      expect(() => (gear.scrollUpgradeableCount = 1)).toThrow();
    });
  });

  describe('scrollTotalUpgradeableCount', () => {
    it('is 8', () => {
      expect(gear.scrollTotalUpgradeableCount).toBe(8);
    });

    it('is 9 after scrollUpgradeCount += 1', () => {
      (gear.data as GearData).scrollUpgradeCount = gear.scrollUpgradeCount + 1;

      expect(gear.scrollTotalUpgradeableCount).toBe(9);
    });

    it('is 9 after scrollResilienceCount += 1', () => {
      (gear.data as GearData).scrollResilienceCount =
        gear.scrollResilienceCount + 1;

      expect(gear.scrollTotalUpgradeableCount).toBe(9);
    });

    it('is 9 after scrollUpgradeableCount += 1', () => {
      (gear.data as GearData).scrollUpgradeableCount =
        gear.scrollUpgradeableCount + 1;

      expect(gear.scrollTotalUpgradeableCount).toBe(9);
    });
  });

  describe('star', () => {
    it('is 22', () => {
      expect(gear.star).toBe(22);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'star' because it is a read-only property.
      expect(() => (gear.star = 23)).toThrow();
    });
  });

  describe('maxStar', () => {
    it('is 30', () => {
      expect(gear.maxStar).toBe(30);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'maxStar' because it is a read-only property.
      expect(() => (gear.maxStar = 20)).toThrow();
    });
  });

  describe('starScroll', () => {
    it('is false', () => {
      expect(gear.starScroll).toBe(false);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'starScroll' because it is a read-only property.
      expect(() => (gear.starScroll = true)).toThrow();
    });
  });

  describe('soulEnchanted', () => {
    it('is true', () => {
      expect(gear.soulEnchanted).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'soulEnchanted' because it is a read-only property.
      expect(() => (gear.soulEnchanted = false)).toThrow();
    });
  });

  describe('soul', () => {
    it('is 위대한 데미안의 소울 with 공격력 : +3%', () => {
      expect(gear.soul).toEqual({
        name: '위대한 데미안의 소울',
        skill: '파멸의 검',
        option: {
          attackPowerRate: 3,
        },
        chargeFactor: 2,
      });
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'soul' because it is a read-only property.
      expect(() => (gear.soul = undefined)).toThrow();
    });
  });

  describe('soulCharge', () => {
    it('is 1000', () => {
      expect(gear.soulCharge).toBe(1000);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'soulCharge' because it is a read-only property.
      expect(() => (gear.soulCharge = undefined)).toThrow();
    });
  });

  describe('soulChargeOption', () => {
    it('is equal to input value', () => {
      expect(gear.soulChargeOption).toEqual({
        magicPower: 20,
      });
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'soulChargeOption' because it is a read-only property.
      expect(() => (gear.soulChargeOption = undefined)).toThrow();
    });
  });

  describe('potentialGrade', () => {
    it('is Legendary', () => {
      expect(gear.potentialGrade).toBe(PotentialGrade.Legendary);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'potentialGrade' because it is a read-only property.
      expect(() => (gear.potentialGrade = PotentialGrade.Unique)).toThrow();
    });
  });

  describe('potentials', () => {
    it('is equal to input value', () => {
      expect(gear.potentials).toEqual([
        {
          grade: PotentialGrade.Legendary,
          summary: '보스 몬스터 공격 시 데미지 : +40%',
          option: {
            bossDamage: 40,
          },
        },
        {
          grade: PotentialGrade.Legendary,
          summary: '마력 : +12%',
          option: {
            magicPowerRate: 12,
          },
        },
        {
          grade: PotentialGrade.Unique,
          summary: '마력 : +9%',
          option: {
            magicPowerRate: 9,
          },
        },
      ]);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'potentials' because it is a read-only property.
      expect(() => (gear.potentials = [])).toThrow();
    });

    it('is readonly array', () => {
      // @ts-expect-error: Cannot mutate 'potentials' because it is a readonly array.
      gear.potentials[0] = { summary: '', option: {} };
    });

    it('is deeply readonly', () => {
      // @ts-expect-error: Cannot assign to 'potentials' element because it is a read-only property
      gear.potentials[0].option.bossDamage = 50;
    });
  });

  describe('additionalPotentialGrade', () => {
    it('is Unique', () => {
      expect(gear.additionalPotentialGrade).toBe(PotentialGrade.Unique);
    });

    it('is readonly property', () => {
      expect(
        // @ts-expect-error: Cannot assign to 'additionalPotentialGrade' because it is a read-only property.
        () => (gear.additionalPotentialGrade = PotentialGrade.Epic),
      ).toThrow();
    });
  });

  describe('additionalPotentials', () => {
    it('is equal to input value', () => {
      expect(gear.additionalPotentials).toEqual([
        {
          grade: PotentialGrade.Unique,
          summary: '마력 : +9%',
          option: {
            magicPowerRate: 9,
          },
        },
        {
          grade: PotentialGrade.Unique,
          summary: '마력 : +9%',
          option: {
            magicPowerRate: 9,
          },
        },
        {
          grade: PotentialGrade.Epic,
          summary: '크리티컬 확률 : +6%',
          option: {
            criticalRate: 6,
          },
        },
      ]);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'potentials' because it is a read-only property.
      expect(() => (gear.additionalPotentials = [])).toThrow();
    });

    it('is readonly array', () => {
      // @ts-expect-error: Cannot mutate 'potentials' because it is a readonly array.
      gear.additionalPotentials[0] = { summary: '', option: {} };
    });

    it('is deeply readonly', () => {
      // @ts-expect-error: Cannot assign to 'potentials' element because it is a read-only property
      gear.additionalPotentials[0].option.bossDamage = 50;
    });
  });

  describe('exceptionalOption', () => {
    it('is equal to input value', () => {
      expect(gear.exceptionalOption).toEqual({});
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'exceptionalOption' because it is a read-only property.
      expect(() => (gear.exceptionalOption = {})).toThrow();
    });

    it('is readonly object', () => {
      // @ts-expect-error: Cannot assign to 'int' because it is a read-only property.
      expect(() => (gear.exceptionalOption.int = 3)).not.toThrow();
    });
  });

  describe('exceptionalUpgradeCount', () => {
    it('is 0', () => {
      expect(gear.exceptionalUpgradeCount).toBe(0);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'exceptionalUpgradeCount' because it is a read-only property.
      expect(() => (gear.exceptionalUpgradeCount = 1)).toThrow();
    });
  });

  describe('exceptionalUpgradeableCount', () => {
    it('is 0', () => {
      expect(gear.exceptionalUpgradeableCount).toBe(0);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'exceptionalUpgradeableCount' because it is a read-only property.
      expect(() => (gear.exceptionalUpgradeableCount = 1)).toThrow();
    });
  });

  beforeEach(() => {
    gear = new ReadonlyGear({
      meta: {
        id: 1212128,
        version: 1,
      },
      name: '제네시스 샤이닝로드',
      icon: '1212128',
      desc: '해방 무기',
      shape: {
        name: '모루 아이템',
        icon: '1010101',
      },
      type: GearType.shiningRod,
      req: {
        level: 200,
        job: 2,
      },
      attributes: {
        only: true,
        trade: GearTrade.TradeBlock,
        onlyEquip: true,
        canAddOption: GearCapability.Can,
        canPotential: GearCapability.Can,
        canAdditionalPotential: GearCapability.Can,
        canScroll: GearCapability.Can,
        canStarforce: GearCapability.Can,
      },

      baseOption: {
        int: 150,
        luk: 150,
        attackPower: 237,
        magicPower: 400,
        bossDamage: 30,
        ignoreMonsterArmor: 20,
      },
      addOption: {
        int: 55,
        magicPower: 192,
        bossDamage: 14,
        allStat: 4,
      },
      upgradeOption: {
        int: 32,
        magicPower: 72,
      },
      starforceOption: {
        int: 145,
        luk: 145,
        maxHp: 255,
        maxMp: 255,
        attackPower: 193,
        magicPower: 274,
      },

      scrollUpgradeCount: 8,
      scrollResilienceCount: 0,
      scrollUpgradeableCount: 0,

      star: 22,
      starScroll: false,

      soulSlot: {
        soul: {
          name: '위대한 데미안의 소울',
          skill: '파멸의 검',
          option: {
            attackPowerRate: 3,
          },
          chargeFactor: 2,
        },
        charge: 1000,
        chargeOption: {
          magicPower: 20,
        },
      },

      potentialGrade: PotentialGrade.Legendary,
      potentials: [
        {
          grade: PotentialGrade.Legendary,
          summary: '보스 몬스터 공격 시 데미지 : +40%',
          option: {
            bossDamage: 40,
          },
        },
        {
          grade: PotentialGrade.Legendary,
          summary: '마력 : +12%',
          option: {
            magicPowerRate: 12,
          },
        },
        {
          grade: PotentialGrade.Unique,
          summary: '마력 : +9%',
          option: {
            magicPowerRate: 9,
          },
        },
      ],
      additionalPotentialGrade: PotentialGrade.Unique,
      additionalPotentials: [
        {
          grade: PotentialGrade.Unique,
          summary: '마력 : +9%',
          option: {
            magicPowerRate: 9,
          },
        },
        {
          grade: PotentialGrade.Unique,
          summary: '마력 : +9%',
          option: {
            magicPowerRate: 9,
          },
        },
        {
          grade: PotentialGrade.Epic,
          summary: '크리티컬 확률 : +6%',
          option: {
            criticalRate: 6,
          },
        },
      ],

      exceptionalOption: {},
      exceptionalUpgradeCount: 0,
      exceptionalUpgradeableCount: 0,
    });
  });
});
