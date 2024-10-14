import {
  GearAddOption,
  GearData,
  GearTrade,
  GearType,
  PotentialGrade,
} from './data';
import { AddOptionGrade, AddOptionType } from './enhance/addOption';
import { Gear } from './Gear';

describe('Gear constructor', () => {
  it('should accept GearData', () => {
    const data = {
      meta: {
        id: 0,
        version: 1,
        add: [],
      },
      name: '',
      icon: '0',
      type: GearType.cap,
      req: {
        level: 0,
        str: 0,
        luk: 0,
        dex: 0,
        int: 0,
        job: 0,
      },
      attributes: {},

      baseOption: {},
      addOption: {},
      scrollOption: {},
      starforceOption: {},

      scrollUpgradeCount: 0,
      scrollResilienceCount: 0,
      scrollUpgradeableCount: 0,
      goldenHammer: 0,

      star: 0,
      maxStar: 0,
      starScroll: false,

      soulEnchanted: false,
      soulCharge: 0,
      soulChargeOption: {},

      potentialGrade: PotentialGrade.Normal,
      potentials: [null, null, null],
      additionalPotentialGrade: PotentialGrade.Normal,
      additionalPotentials: [null, null, null],

      exceptionalOption: {},
      exceptionalUpgradeCount: 0,
      exceptionalUpgradeableCount: 0,
    } satisfies GearData;

    const gear = new Gear(data);

    expect(gear).toBeInstanceOf(Gear);
  });
});

describe('Gear', () => {
  let gear: Gear;

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
      // @ts-expect-error
      expect(() => (gear.meta = { id: 0, version: 1 })).toThrow();
    });
  });

  describe('name', () => {
    it('is 제네시스 샤이닝로드', () => {
      expect(gear.name).toBe('제네시스 샤이닝로드');
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.name = '제네시스 스태프')).toThrow();
    });
  });

  describe('icon', () => {
    it('is 1212128', () => {
      expect(gear.icon).toBe('1212128');
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.icon = '1234567')).toThrow();
    });
  });

  describe('desc', () => {
    it('is 해방 무기', () => {
      expect(gear.desc).toBe('해방 무기');
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.desc = '설명')).toThrow();
      // @ts-expect-error
      expect(() => (gear.desc = undefined)).toThrow();
    });
  });

  describe('shapeName', () => {
    it('is 모루 아이템', () => {
      expect(gear.shapeName).toBe('모루 아이템');
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.shapeName = '모루 이름')).toThrow();
    });
  });

  describe('shapeIcon', () => {
    it('is 1010101', () => {
      expect(gear.shapeIcon).toBe('1010101');
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.shapeIcon = '1234567')).toThrow();
    });
  });

  describe('type', () => {
    it('is shiningRod', () => {
      expect(gear.type).toBe(GearType.shiningRod);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.type = GearType.staff)).toThrow();
    });
  });

  describe('req', () => {
    it('level is 200', () => {
      expect(gear.req.level).toBe(200);
    });

    it('level is settable to 250', () => {
      gear.req.level = 250;

      expect(gear.req.level).toBe(250);
    });

    it('str is 0', () => {
      expect(gear.req.str).toBe(0);
    });

    it('str is settable to 100', () => {
      gear.req.str = 100;

      expect(gear.req.str).toBe(100);
    });

    it('dex is 0', () => {
      expect(gear.req.dex).toBe(0);
    });

    it('dex is settable to 100', () => {
      gear.req.dex = 100;

      expect(gear.req.dex).toBe(100);
    });

    it('int is 600', () => {
      expect(gear.req.int).toBe(600);
    });

    it('int is settable to 100', () => {
      gear.req.int = 100;

      expect(gear.req.int).toBe(100);
    });

    it('luk is 0', () => {
      expect(gear.req.luk).toBe(0);
    });

    it('luk is settable to 100', () => {
      gear.req.luk = 100;

      expect(gear.req.luk).toBe(100);
    });

    it('job is 2', () => {
      expect(gear.req.job).toBe(2);
    });

    it('job is settable to 4', () => {
      gear.req.job = 4;

      expect(gear.req.job).toBe(4);
    });

    it('class is undefined', () => {
      expect(gear.req.class).toBeUndefined();
    });

    it('class is settable to 57', () => {
      gear.req.job = 57;

      expect(gear.req.job).toBe(57);
    });

    it('is readonly property', () => {
      expect(
        () =>
          // @ts-expect-error
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
      // @ts-expect-error
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
      // @ts-expect-error
      expect(() => (gear.totalOption = {})).toThrow();
    });

    it('is readonly object', () => {
      // @ts-expect-error
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
      // @ts-expect-error
      expect(() => (gear.baseOption = {})).toThrow();
    });

    it('is readonly object', () => {
      // @ts-expect-error
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
      // @ts-expect-error
      expect(() => (gear.addOption = {})).toThrow();
    });

    it('is readonly object', () => {
      // @ts-expect-error
      expect(() => (gear.addOption.int = 3)).not.toThrow();
    });
  });

  describe('scrollOption', () => {
    it('is equal to input value', () => {
      expect(gear.scrollOption).toEqual({
        int: 32,
        magicPower: 72,
      });
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.scrollOption = {})).toThrow();
    });

    it('is readonly object', () => {
      // @ts-expect-error
      expect(() => (gear.scrollOption.int = 3)).not.toThrow();
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
      // @ts-expect-error
      expect(() => (gear.starforceOption = {})).toThrow();
    });

    it('is readonly object', () => {
      // @ts-expect-error
      expect(() => (gear.starforceOption.int = 3)).not.toThrow();
    });
  });

  describe('scrollUpgradeCount', () => {
    it('is 8', () => {
      expect(gear.scrollUpgradeCount).toBe(8);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.scrollUpgradeCount = 7)).toThrow();
    });
  });

  describe('scrollResilienceCount', () => {
    it('is 0', () => {
      expect(gear.scrollResilienceCount).toBe(0);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.scrollResilienceCount = 1)).toThrow();
    });
  });

  describe('scrollUpgradeableCount', () => {
    it('is 0', () => {
      expect(gear.scrollUpgradeableCount).toBe(0);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.scrollUpgradeableCount = 1)).toThrow();
    });
  });

  describe('goldenHammer', () => {
    it('is 0', () => {
      expect(gear.goldenHammer).toBe(0);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.goldenHammer = 1)).toThrow();
    });
  });

  describe('star', () => {
    it('is 22', () => {
      expect(gear.star).toBe(22);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.star = 23)).toThrow();
    });
  });

  describe('maxStar', () => {
    it('is 25', () => {
      expect(gear.maxStar).toBe(25);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.maxStar = 20)).toThrow();
    });
  });

  describe('starScroll', () => {
    it('is false', () => {
      expect(gear.starScroll).toBe(false);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.starScroll = true)).toThrow();
    });
  });

  describe('soulEnchanted', () => {
    it('is true', () => {
      expect(gear.soulEnchanted).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.soulEnchanted = false)).toThrow();
    });
  });

  describe('soul', () => {
    it('is 위대한 데미안의 소울 with 공격력 : +3%', () => {
      expect(gear.soul).toEqual({
        name: '위대한 데미안의 소울',
        title: '위대한 데미안의',
        option: {
          attackPowerRate: 3,
        },
        optionDesc: '공격력 : +3%',
        skillName: '파멸의 검',
      });
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.soul = undefined)).toThrow();
    });
  });

  describe('soulCharge', () => {
    it('is 1000', () => {
      expect(gear.soulCharge).toBe(1000);
    });

    it('is readonly property', () => {
      // @ts-expect-error
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
      // @ts-expect-error
      expect(() => (gear.soulChargeOption = undefined)).toThrow();
    });
  });

  describe('potentialGrade', () => {
    it('is Legendary', () => {
      expect(gear.potentialGrade).toBe(PotentialGrade.Legendary);
    });

    it('is settable to Unique', () => {
      gear.potentialGrade = PotentialGrade.Unique;

      expect(gear.potentialGrade).toBe(PotentialGrade.Unique);
    });
  });

  describe('potentials', () => {
    it('is equal to input value', () => {
      expect(gear.potentials).toEqual([
        {
          title: '보스 몬스터 공격 시 데미지 : +40%',
          option: {
            bossDamage: 40,
          },
        },
        {
          title: '마력 : +12%',
          option: {
            magicPowerRate: 12,
          },
        },
        {
          title: '마력 : +9%',
          option: {
            magicPowerRate: 9,
          },
        },
      ]);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.potentials = [null, null, null])).toThrow();
    });
  });

  describe('additionalPotentialGrade', () => {
    it('is Unique', () => {
      expect(gear.additionalPotentialGrade).toBe(PotentialGrade.Unique);
    });

    it('is settable to Epic', () => {
      gear.additionalPotentialGrade = PotentialGrade.Epic;

      expect(gear.additionalPotentialGrade).toBe(PotentialGrade.Epic);
    });
  });

  describe('additionalPotentials', () => {
    it('is equal to input value', () => {
      expect(gear.additionalPotentials).toEqual([
        {
          title: '마력 : +9%',
          option: {
            magicPowerRate: 9,
          },
        },
        {
          title: '마력 : +9%',
          option: {
            magicPowerRate: 9,
          },
        },
        {
          title: '크리티컬 확률 : +6%',
          option: {
            criticalRate: 6,
          },
        },
      ]);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.additionalPotentials = [null, null, null])).toThrow();
    });
  });

  describe('exceptionalOption', () => {
    it('is equal to input value', () => {
      expect(gear.exceptionalOption).toEqual({});
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.exceptionalOption = {})).toThrow();
    });

    it('is readonly object', () => {
      // @ts-expect-error
      expect(() => (gear.exceptionalOption.int = 3)).not.toThrow();
    });
  });

  describe('exceptionalUpgradeCount', () => {
    it('is 0', () => {
      expect(gear.exceptionalUpgradeCount).toBe(0);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.exceptionalUpgradeCount = 1)).toThrow();
    });
  });

  describe('exceptionalUpgradeableCount', () => {
    it('is 0', () => {
      expect(gear.exceptionalUpgradeableCount).toBe(0);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.exceptionalUpgradeableCount = 1)).toThrow();
    });
  });

  describe('setShape', () => {
    it('sets shapeName', () => {
      gear.setShape('외형 이름', '');

      expect(gear.shapeName).toBe('외형 이름');
    });

    it('sets shapeIcon', () => {
      gear.setShape('', '1515151');

      expect(gear.shapeIcon).toBe('1515151');
    });
  });

  describe('resetShape', () => {
    it('resets shapeName', () => {
      gear.resetShape();

      expect(gear.shapeName).toBeUndefined();
    });

    it('resets shapeIcon', () => {
      gear.resetShape();

      expect(gear.shapeIcon).toBe('1212128');
    });
  });

  describe('canAddOption', () => {
    it.each([
      GearType.magicGauntlet,
      GearType.handCannon,
      GearType.faceAccessory,
      GearType.pocket,
    ])('returns true for gearType %d', (gearType) => {
      gear.data.type = gearType;

      const can = gear.canAddOption;

      expect(can).toBe(true);
    });

    it.each([GearType.ring, GearType.shoulder, GearType.badge])(
      'returns false for gearType %d',
      (gearType) => {
        gear.data.type = gearType;

        const can = gear.canAddOption;

        expect(can).toBe(false);
      },
    );
  });

  describe('applyAddOption', () => {
    it.each([
      [GearType.cape, 160, AddOptionType.str, 5, { str: 45 }],
      [GearType.wand, 200, AddOptionType.bossDamage, 7, { bossDamage: 14 }],
    ] satisfies [
      GearType,
      number,
      AddOptionType,
      AddOptionGrade,
      Partial<GearAddOption>,
    ][])('sets addOption', (gearType, reqLevel, type, grade, expected) => {
      gear.data.type = gearType;
      gear.req.level = reqLevel;
      gear.data.addOption = {};

      gear.applyAddOption(type, grade);

      expect(gear.addOption).toEqual(expected);
    });

    it('adds to previous addOption', () => {
      gear.data.type = GearType.belt;
      gear.req.level = 200;
      gear.data.addOption = { str: 1, dex: 2 };

      gear.applyAddOption(AddOptionType.str_dex, 3);

      expect(gear.addOption).toEqual({ str: 19, dex: 20 });
    });

    it('sets meta add property', () => {
      gear.data.type = GearType.cap;
      gear.req.level = 160;

      gear.applyAddOption(AddOptionType.str, 2);
      gear.applyAddOption(AddOptionType.str, 3);
      gear.applyAddOption(AddOptionType.str, 2);
      gear.applyAddOption(AddOptionType.dex, 5);
      gear.applyAddOption(AddOptionType.allStat, 7);

      expect(gear.meta.add).toEqual([
        [AddOptionType.str, 2],
        [AddOptionType.str, 3],
        [AddOptionType.str, 2],
        [AddOptionType.dex, 5],
        [AddOptionType.allStat, 7],
      ]);
    });
  });

  describe('resetAddOption', () => {
    it('resets addOption', () => {
      gear.data.addOption = { str: 1, dex: 2, bossDamage: 10 };

      gear.resetAddOption();

      expect(gear.addOption).toEqual({});
    });

    it('resets meta add property', () => {
      gear.meta.add = [
        [AddOptionType.luk, 5],
        [AddOptionType.armor, 3],
      ];

      gear.resetAddOption();

      expect(gear.meta.add).toEqual([]);
    });
  });

  beforeEach(() => {
    gear = new Gear({
      meta: {
        id: 1212128,
        version: 1,
        add: [],
      },
      name: '제네시스 샤이닝로드',
      icon: '1212128',
      desc: '해방 무기',
      shapeName: '모루 아이템',
      shapeIcon: '1010101',
      type: GearType.shiningRod,
      req: {
        level: 200,
        str: 0,
        luk: 0,
        dex: 0,
        int: 600,
        job: 2,
      },
      attributes: {
        only: true,
        trade: GearTrade.TradeBlock,
        onlyEquip: true,
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
      scrollOption: {
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
      goldenHammer: 0,

      star: 22,
      maxStar: 25,
      starScroll: false,

      soulEnchanted: true,
      soul: {
        name: '위대한 데미안의 소울',
        title: '위대한 데미안의',
        option: {
          attackPowerRate: 3,
        },
        optionDesc: '공격력 : +3%',
        skillName: '파멸의 검',
      },
      soulCharge: 1000,
      soulChargeOption: {
        magicPower: 20,
      },

      potentialGrade: PotentialGrade.Legendary,
      potentials: [
        {
          title: '보스 몬스터 공격 시 데미지 : +40%',
          option: {
            bossDamage: 40,
          },
        },
        {
          title: '마력 : +12%',
          option: {
            magicPowerRate: 12,
          },
        },
        {
          title: '마력 : +9%',
          option: {
            magicPowerRate: 9,
          },
        },
      ],
      additionalPotentialGrade: PotentialGrade.Unique,
      additionalPotentials: [
        {
          title: '마력 : +9%',
          option: {
            magicPowerRate: 9,
          },
        },
        {
          title: '마력 : +9%',
          option: {
            magicPowerRate: 9,
          },
        },
        {
          title: '크리티컬 확률 : +6%',
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
