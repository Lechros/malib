import {
  GearAddOption,
  GearData,
  GearTrade,
  GearType,
  PotentialGrade,
} from './data';
import { AddOptionGrade, AddOptionType } from './enhance/addOption';
import { SpellTraceType } from './enhance/spellTrace';
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
      type: GearType.cap,
      req: {},
      attributes: {},
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

    it('is settable', () => {
      gear.shape = { name: '모루 아이템 2', icon: '1212121' };

      expect(gear.shape).toEqual({ name: '모루 아이템 2', icon: '1212121' });
    });

    it('is settable to undefined', () => {
      gear.shape = undefined;

      expect(gear.shape).toBeUndefined();
    });
  });

  describe('shapeIcon', () => {
    it('is 1010101', () => {
      expect(gear.shapeIcon).toBe('1010101');
    });

    it('is icon if shape is undefined', () => {
      gear.shape = undefined;

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

    it('str is 0', () => {
      expect(gear.req.str).toBe(0);
    });

    it('dex is 0', () => {
      expect(gear.req.dex).toBe(0);
    });

    it('int is 600', () => {
      expect(gear.req.int).toBe(600);
    });

    it('luk is 0', () => {
      expect(gear.req.luk).toBe(0);
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

  describe('goldenHammer', () => {
    it('is 0', () => {
      expect(gear.goldenHammer).toBe(0);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'goldenHammer' because it is a read-only property.
      expect(() => (gear.goldenHammer = 1)).toThrow();
    });
  });

  describe('scrollTotalUpgradeableCount', () => {
    it('is 8', () => {
      expect(gear.scrollTotalUpgradeableCount).toBe(8);
    });

    it('is 9 after scrollUpgradeCount += 1', () => {
      gear.data.scrollUpgradeCount = gear.scrollUpgradeCount + 1;

      expect(gear.scrollTotalUpgradeableCount).toBe(9);
    });

    it('is 9 after scrollResilienceCount += 1', () => {
      gear.data.scrollResilienceCount = gear.scrollResilienceCount + 1;

      expect(gear.scrollTotalUpgradeableCount).toBe(9);
    });

    it('is 9 after scrollUpgradeableCount += 1', () => {
      gear.data.scrollUpgradeableCount = gear.scrollUpgradeableCount + 1;

      expect(gear.scrollTotalUpgradeableCount).toBe(9);
    });

    it('is 8 after scrollUpgrabeableCount += 1, goldenHammer += 1', () => {
      gear.data.scrollUpgradeableCount = gear.scrollUpgradeableCount + 1;
      gear.data.goldenHammer = gear.goldenHammer + 1;

      expect(gear.scrollTotalUpgradeableCount).toBe(8);
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
    it('is 25', () => {
      expect(gear.maxStar).toBe(25);
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
          summary: '보스 몬스터 공격 시 데미지 : +40%',
          option: {
            bossDamage: 40,
          },
        },
        {
          summary: '마력 : +12%',
          option: {
            magicPowerRate: 12,
          },
        },
        {
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
          summary: '마력 : +9%',
          option: {
            magicPowerRate: 9,
          },
        },
        {
          summary: '마력 : +9%',
          option: {
            magicPowerRate: 9,
          },
        },
        {
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

  describe('canAddOption', () => {
    it.each([
      GearType.magicGauntlet,
      GearType.handCannon,
      GearType.faceAccessory,
      GearType.pocket,
    ])('returns true for gearType %d', (gearType) => {
      gear.data.type = gearType;

      const can = gear.supportsAddOption;

      expect(can).toBe(true);
    });

    it.each([GearType.ring, GearType.shoulder, GearType.badge])(
      'returns false for gearType %d',
      (gearType) => {
        gear.data.type = gearType;

        const can = gear.supportsAddOption;

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
      gear.data.req.level = reqLevel;
      gear.data.addOption = {};

      gear.applyAddOption(type, grade);

      expect(gear.addOption).toEqual(expected);
    });

    it('adds to previous addOption', () => {
      gear.data.type = GearType.belt;
      gear.data.req.level = 200;
      gear.data.addOption = { str: 1, dex: 2 };

      gear.applyAddOption(AddOptionType.str_dex, 3);

      expect(gear.addOption).toEqual({ str: 19, dex: 20 });
    });

    it('sets meta add property', () => {
      gear.data.type = GearType.cap;
      gear.data.req.level = 160;

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

  describe('canUpgrade', () => {
    it('is true', () => {
      expect(gear.supportsUpgrade).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'supportsUpgrade' because it is a read-only property.
      expect(() => (gear.supportsUpgrade = false)).toThrow();
    });
  });

  describe('canGoldenHammer', () => {
    it('is true', () => {
      expect(gear.canApplyGoldenHammer).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'canApplyGoldenHammer' because it is a read-only property.
      expect(() => (gear.canApplyGoldenHammer = false)).toThrow();
    });
  });

  describe('applyGoldenHammer', () => {
    it('sets goldenHammer to 1', () => {
      gear.applyGoldenHammer();

      expect(gear.goldenHammer).toBe(1);
    });
  });

  describe('canFailScroll', () => {
    it('is false', () => {
      expect(gear.canApplyFailScroll).toBe(false);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'canApplyFailScroll' because it is a read-only property.
      expect(() => (gear.canApplyFailScroll = true)).toThrow();
    });
  });

  describe('failScroll', () => {
    it('throws TypeError', () => {
      expect(() => {
        gear.applyScrollFail();
      }).toThrow();
    });

    it('sets scrollUpgradeableCount from 1 to 0', () => {
      gear.data.scrollUpgradeableCount = 1;

      gear.applyScrollFail();

      expect(gear.scrollUpgradeableCount).toBe(0);
    });
  });

  describe('canResileScroll', () => {
    it('is false', () => {
      expect(gear.canApplyResileScroll).toBe(false);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'canApplyResileScroll' because it is a read-only property.
      expect(() => (gear.canApplyResileScroll = true)).toThrow();
    });
  });

  describe('resileScroll', () => {
    it('throws TypeError', () => {
      expect(() => {
        gear.applyScrollResile();
      }).toThrow();
    });

    it('sets scrollResilienceCount from 1 to 0', () => {
      gear.data.scrollResilienceCount = 1;

      gear.applyScrollResile();

      expect(gear.scrollResilienceCount).toBe(0);
    });
  });

  describe('canResetUpgrade', () => {
    it('is true', () => {
      expect(gear.canResetUpgrade).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'canResetUpgrade' because it is a read-only property.
      expect(() => (gear.canResetUpgrade = false)).toThrow();
    });
  });

  describe('resetUpgrade', () => {
    it('resets upgradeOption', () => {
      gear.resetUpgrade();

      expect(gear.upgradeOption).toEqual({});
    });

    it('sets scrollUpgradeCount to 0', () => {
      gear.resetUpgrade();

      expect(gear.scrollUpgradeCount).toBe(0);
    });
  });

  describe('canApplyScroll', () => {
    it('is false', () => {
      expect(gear.canApplyScroll).toBe(false);
    });

    it('is true for scrollUpgradeableCount == 1', () => {
      gear.data.scrollUpgradeableCount = 1;

      expect(gear.canApplyScroll).toBe(true);
    });
  });

  describe('applyScroll', () => {
    it('throws TypeError', () => {
      const scroll = { name: '', option: {} };

      expect(() => {
        gear.applyScroll(scroll);
      }).toThrow();
    });

    it('adds int = 100 to upgradeOption for scrollUpgradeableCount == 1', () => {
      gear.data.scrollUpgradeableCount = 1;
      const scroll = { name: '', option: { int: 100 } };
      const intBefore = gear.upgradeOption.int;

      gear.applyScroll(scroll);

      expect(gear.upgradeOption.int).toBe(intBefore + 100);
    });

    it('sets scrollUpgradeCount from 8 to 9', () => {
      gear.data.scrollUpgradeableCount = 1;
      const scroll = { name: '', option: { int: 100 } };

      gear.applyScroll(scroll);

      expect(gear.scrollUpgradeCount).toBe(9);
    });
  });

  describe('applySpellTrace', () => {
    it('throws TypeError', () => {
      expect(() => {
        gear.applySpellTrace(SpellTraceType.dex, 30);
      }).toThrow();
    });

    it('adds magicPower = 9 to upgradeOption for scrollUpgradeableCount == 1', () => {
      gear.data.scrollUpgradeableCount = 1;
      const magicPowerBefore = gear.upgradeOption.magicPower;

      gear.applySpellTrace(SpellTraceType.int, 15);

      expect(gear.upgradeOption.magicPower).toBe(magicPowerBefore + 9);
    });
  });

  describe('supportsStarforce', () => {
    it('is true', () => {
      expect(gear.supportsStarforce).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'supportsStarforce' because it is a read-only property.
      expect(() => (gear.supportsStarforce = false)).toThrow();
    });
  });

  describe('canStarforce', () => {
    it('is true', () => {
      expect(gear.canApplyStarforce).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'canApplyStarforce' because it is a read-only property.
      expect(() => (gear.canApplyStarforce = false)).toThrow();
    });
  });

  describe('starforce', () => {
    it('sets star to 23', () => {
      gear.applyStarforce();

      expect(gear.star).toBe(23);
    });

    it('modifies starforceOption', () => {
      const original = { ...gear.starforceOption };

      gear.applyStarforce();

      expect(gear.starforceOption).not.toEqual(original);
    });
  });

  describe('canStarforceIgnoringMaxStar', () => {
    it('is true', () => {
      expect(gear.canApplyStarforceIgnoringMaxStar).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'canApplyStarforceIgnoringMaxStar' because it is a read-only property.
      expect(() => (gear.canApplyStarforceIgnoringMaxStar = false)).toThrow();
    });
  });

  describe('starforceIgnoringMaxStar', () => {
    it('sets star to 23', () => {
      gear.applyStarforceIgnoringMaxStar();

      expect(gear.star).toBe(23);
    });

    it('modifies starforceOption', () => {
      const original = { ...gear.starforceOption };

      gear.applyStarforceIgnoringMaxStar();

      expect(gear.starforceOption).not.toEqual(original);
    });
  });

  describe('canStarScroll', () => {
    it('is false', () => {
      expect(gear.canApplyStarScroll).toBe(false);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'canApplyStarScroll' because it is a read-only property.
      expect(() => (gear.canApplyStarScroll = true)).toThrow();
    });
  });

  describe('applyStarScroll', () => {
    it('throws TypeError', () => {
      expect(() => {
        gear.applyStarScroll();
      }).toThrow(TypeError);
    });
  });

  describe('canStarScrollIgnoringMaxStar', () => {
    it('is false', () => {
      expect(gear.canApplyStarScrollIgnoringMaxStar).toBe(false);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'canApplyStarScrollIgnoringMaxStar' because it is a read-only property.
      expect(() => (gear.canApplyStarScrollIgnoringMaxStar = true)).toThrow();
    });
  });

  describe('applyStarScrollIgnoringMaxStar', () => {
    it('throws TypeError', () => {
      expect(() => {
        gear.applyStarScrollIgnoringMaxStar();
      }).toThrow(TypeError);
    });
  });

  describe('canResetStarforce', () => {
    it('is true', () => {
      expect(gear.canResetStarforce).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'canResetStarforce' because it is a read-only property.
      expect(() => (gear.canResetStarforce = true)).toThrow();
    });
  });

  describe('resetStarforce', () => {
    it('resets star and starforceOption', () => {
      gear.resetStarforce();

      expect(gear.star).toBe(0);
      expect(gear.starforceOption).toEqual({});
    });
  });

  describe('supportsPotential', () => {
    it('is true', () => {
      expect(gear.supportsPotential).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'supportsPotential' because it is a read-only property.
      expect(() => (gear.supportsPotential = false)).toThrow();
    });
  });

  describe('canSetPotential', () => {
    it('is true', () => {
      expect(gear.canSetPotential).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'canSetPotential' because it is a read-only property.
      expect(() => (gear.canSetPotential = false)).toThrow();
    });
  });

  describe('setPotential', () => {
    it('sets potentialGrade to Unique', () => {
      gear.setPotential(PotentialGrade.Unique, [{ summary: '', option: {} }]);

      expect(gear.potentialGrade).toBe(PotentialGrade.Unique);
    });

    it('sets potentials', () => {
      gear.setPotential(PotentialGrade.Unique, [
        { summary: '마력 : +12%', option: { magicPowerRate: 12 } },
      ]);

      expect(gear.potentials).toEqual([
        { summary: '마력 : +12%', option: { magicPowerRate: 12 } },
      ]);
    });
  });

  describe('resetPotential', () => {
    it('resets potentialGrade to Normal', () => {
      gear.resetPotential();

      expect(gear.potentialGrade).toBe(PotentialGrade.Normal);
    });

    it('resets potentials', () => {
      gear.resetPotential();

      expect(gear.potentials).toEqual([]);
    });
  });

  describe('supportsAdditionalPotential', () => {
    it('is true', () => {
      expect(gear.supportsAdditionalPotential).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'supportsAdditionalPotential' because it is a read-only property.
      expect(() => (gear.supportsAdditionalPotential = false)).toThrow();
    });
  });

  describe('canSetAdditionalPotential', () => {
    it('is true', () => {
      expect(gear.canSetAdditionalPotential).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'canSetAdditionalPotential' because it is a read-only property.
      expect(() => (gear.canSetAdditionalPotential = false)).toThrow();
    });
  });

  describe('setAdditionalPotential', () => {
    it('sets additionalPotentialGrade to Legendary', () => {
      gear.setAdditionalPotential(PotentialGrade.Legendary, [
        { summary: '', option: {} },
      ]);

      expect(gear.additionalPotentialGrade).toBe(PotentialGrade.Legendary);
    });

    it('sets additionalPotentials', () => {
      gear.setAdditionalPotential(PotentialGrade.Legendary, [
        { summary: '마력 : +12%', option: { magicPowerRate: 12 } },
      ]);

      expect(gear.additionalPotentials).toEqual([
        { summary: '마력 : +12%', option: { magicPowerRate: 12 } },
      ]);
    });
  });

  describe('resetAdditionalPotential', () => {
    it('resets additionalPotentialGrade to Normal', () => {
      gear.resetAdditionalPotential();

      expect(gear.additionalPotentialGrade).toBe(PotentialGrade.Normal);
    });

    it('resets additionalPotentials', () => {
      gear.resetAdditionalPotential();

      expect(gear.additionalPotentials).toEqual([]);
    });
  });

  describe('supportsSoul', () => {
    it('is true', () => {
      expect(gear.supportsSoul).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'supportsSoul' because it is a read-only property.
      expect(() => (gear.supportsSoul = true)).toThrow();
    });
  });

  describe('canApplySoulEnchant', () => {
    it('is false', () => {
      expect(gear.canApplySoulEnchant).toBe(false);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'canApplySoulEnchant' because it is a read-only property.
      expect(() => (gear.canApplySoulEnchant = true)).toThrow();
    });
  });

  describe('applySoulEnchant', () => {
    it('throws TypeError', () => {
      expect(() => {
        gear.applySoulEnchant();
      }).toThrow();
    });
  });

  describe('canSetSoul', () => {
    it('is true', () => {
      expect(gear.canSetSoul).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'canSetSoul' because it is a read-only property.
      expect(() => (gear.canSetSoul = true)).toThrow();
    });
  });

  describe('setSoul', () => {
    it('sets soul name to 위대한 카링의 소울', () => {
      gear.setSoul({
        name: '위대한 카링의 소울',
        skill: '',
        option: {},
      });

      expect(gear.soul?.name).toBe('위대한 카링의 소울');
    });

    it('sets soul charge option', () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      gear.data.soulSlot!.chargeOption = {};

      gear.setSoul({
        name: '',
        skill: '',
        option: {},
        chargeFactor: 2,
      });

      expect(gear.soulChargeOption).toEqual({ magicPower: 20 });
    });
  });

  describe('canSetSoulCharge', () => {
    it('is true', () => {
      expect(gear.canSetSoulCharge).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'canSetSoulCharge' because it is a read-only property.
      expect(() => (gear.canSetSoulCharge = true)).toThrow();
    });
  });

  describe('setSoulCharge', () => {
    it('sets soul charge option', () => {
      gear.setSoulCharge(200);

      expect(gear.soulChargeOption).toEqual({ magicPower: 12 });
    });
  });

  describe('resetSoulEnchant', () => {
    it('resets soulEnchanted', () => {
      gear.resetSoulEnchant();

      expect(gear.soulEnchanted).toBe(false);
    });
  });

  describe('supportsExceptional', () => {
    it('is false', () => {
      expect(gear.supportsExceptional).toBe(false);
    });

    it('is true for exceptionalUpgradeCount === 1', () => {
      gear.data.exceptionalUpgradeCount = 1;

      expect(gear.supportsExceptional).toBe(true);
    });
  });

  describe('canApplyExceptional', () => {
    it('is false', () => {
      expect(gear.canApplyExceptional).toBe(false);
    });

    it('is true for exceptionalUpgradeableCount === 1', () => {
      gear.data.exceptionalUpgradeableCount = 1;

      expect(gear.canApplyExceptional).toBe(true);
    });
  });

  describe('applyExceptional', () => {
    it('increments exceptionalUpgradeCount for exceptionalUpgradeableCount === 1', () => {
      gear.data.exceptionalUpgradeableCount = 1;
      const hammer = { name: '', option: {} };

      gear.applyExceptional(hammer);

      expect(gear.exceptionalUpgradeCount).toBe(1);
    });
  });

  describe('canResetExceptional', () => {
    it('is false', () => {
      expect(gear.canResetExceptional).toBe(false);
    });
  });

  describe('resetExceptional', () => {
    it('resets exceptionalOption', () => {
      gear.data.exceptionalUpgradeCount = 1;
      gear.data.exceptionalOption = { dex: 1 };

      gear.resetExceptional();

      expect(gear.exceptionalOption).toEqual({});
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
      shape: {
        name: '모루 아이템',
        icon: '1010101',
      },
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
      goldenHammer: 0,

      star: 22,
      maxStar: 25,
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
          summary: '보스 몬스터 공격 시 데미지 : +40%',
          option: {
            bossDamage: 40,
          },
        },
        {
          summary: '마력 : +12%',
          option: {
            magicPowerRate: 12,
          },
        },
        {
          summary: '마력 : +9%',
          option: {
            magicPowerRate: 9,
          },
        },
      ],
      additionalPotentialGrade: PotentialGrade.Unique,
      additionalPotentials: [
        {
          summary: '마력 : +9%',
          option: {
            magicPowerRate: 9,
          },
        },
        {
          summary: '마력 : +9%',
          option: {
            magicPowerRate: 9,
          },
        },
        {
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
