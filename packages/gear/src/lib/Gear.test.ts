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
import { defaultGear } from './testUtils';

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

      potentials: [null, null, null],
      additionalPotentials: [null, null, null],
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
      expect(gear.upgradeOption).toEqual({
        int: 32,
        magicPower: 72,
      });
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.upgradeOption = {})).toThrow();
    });

    it('is readonly object', () => {
      // @ts-expect-error
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
        skill: '파멸의 검',
        option: {
          attackPowerRate: 3,
        },
        chargeFactor: 2,
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
      // @ts-expect-error
      expect(() => (gear.supportsUpgrade = false)).toThrow();
    });
  });

  describe('canGoldenHammer', () => {
    it('is true', () => {
      expect(gear.canApplyGoldenHammer).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error
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
      // @ts-expect-error
      expect(() => (gear.canApplyFailScroll = true)).toThrow();
    });
  });

  describe('failScroll', () => {
    it('throws TypeError', () => {
      expect(() => gear.applyScrollFail()).toThrow();
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
      // @ts-expect-error
      expect(() => (gear.canApplyResileScroll = true)).toThrow();
    });
  });

  describe('resileScroll', () => {
    it('throws TypeError', () => {
      expect(() => gear.applyScrollResile()).toThrow();
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
      // @ts-expect-error
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

      expect(() => gear.applyScroll(scroll)).toThrow();
    });

    it('adds int = 100 to upgradeOption for scrollUpgradeableCount == 1', () => {
      gear.data.scrollUpgradeableCount = 1;
      const scroll = { name: '', option: { int: 100 } };
      const intBefore = gear.upgradeOption.int ?? 0;

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
      expect(() => gear.applySpellTrace(SpellTraceType.dex, 30)).toThrow();
    });

    it('adds magicPower = 9 to upgradeOption for scrollUpgradeableCount == 1', () => {
      gear.data.scrollUpgradeableCount = 1;
      const magicPowerBefore = gear.upgradeOption.magicPower ?? 0;

      gear.applySpellTrace(SpellTraceType.int, 15);

      expect(gear.upgradeOption.magicPower).toBe(magicPowerBefore + 9);
    });
  });

  describe('supportsStarforce', () => {
    it('is true', () => {
      expect(gear.supportsStarforce).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.supportsStarforce = false)).toThrow();
    });
  });

  describe('canStarforce', () => {
    it('is true', () => {
      expect(gear.canApplyStarforce).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error
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
      // @ts-expect-error
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
      // @ts-expect-error
      expect(() => (gear.canApplyStarScroll = true)).toThrow();
    });
  });

  describe('applyStarScroll', () => {
    it('throws TypeError', () => {
      expect(() => gear.applyStarScroll()).toThrow(TypeError);
    });
  });

  describe('canStarScrollIgnoringMaxStar', () => {
    it('is false', () => {
      expect(gear.canApplyStarScrollIgnoringMaxStar).toBe(false);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.canApplyStarScrollIgnoringMaxStar = true)).toThrow();
    });
  });

  describe('applyStarScrollIgnoringMaxStar', () => {
    it('throws TypeError', () => {
      expect(() => gear.applyStarScrollIgnoringMaxStar()).toThrow(TypeError);
    });
  });

  describe('canResetStarforce', () => {
    it('is true', () => {
      expect(gear.canResetStarforce).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error
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

  describe('supportsSoulWeapon', () => {
    it.each([
      GearType.shiningRod,
      GearType.ritualFan,
      GearType.longSword,
      GearType.tuner,
      GearType.dagger,
    ])('is true for weapon gears, type == %d', (type) => {
      const gear = defaultGear({ type, req: { level: 120 } });

      expect(gear.supportsSoulWeapon).toBe(true);
    });

    it.each([
      GearType.cap,
      GearType.pants,
      GearType.cape,
      GearType.belt,
      GearType.pendant,
      GearType.katara,
      GearType.shield,
    ])('is false for non weapon gears, type == %d', (type) => {
      const gear = defaultGear({ type, req: { level: 120 } });

      expect(gear.supportsSoulWeapon).toBe(false);
    });

    it.each([
      [0, false],
      [20, false],
      [29, false],
      [30, true],
      [75, true],
      [200, true],
    ])('for reqLevel == %d is %p', (reqLevel, expected) => {
      const gear = defaultGear({
        type: GearType.thSword,
        req: { level: reqLevel },
      });

      expect(gear.supportsSoulWeapon).toBe(expected);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.supportsSoulWeapon = true)).toThrow();
    });
  });

  describe('canApplySoulEnchant', () => {
    it('is false', () => {
      expect(gear.canApplySoulEnchant).toBe(false);
    });

    it('is true for unenchanted gear', () => {
      const gear = defaultGear({ type: GearType.tuner, req: { level: 120 } });

      expect(gear.canApplySoulEnchant).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (gear.canApplySoulEnchant = true)).toThrow();
    });
  });

  describe('applySoulEnchant', () => {
    it('throws TypeError', () => {
      expect(() => gear.applySoulEnchant()).toThrow();
    });

    it('sets soulEnchanted to true', () => {
      const gear = defaultGear({ type: GearType.bow, req: { level: 150 } });

      gear.applySoulEnchant();

      expect(gear.soulEnchanted).toBe(true);
    });
  });

  describe('canSetSoul', () => {
    it('is true', () => {
      expect(gear.canSetSoul).toBe(true);
    });

    it('is false for unenchanted gear', () => {
      const gear = defaultGear({ type: GearType.bow, req: { level: 150 } });

      expect(gear.canSetSoul).toBe(false);
    });

    it('is readonly property', () => {
      // @ts-expect-error
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
      gear.data.soulSlot!.chargeOption = {};

      gear.setSoul({
        name: '위대한 카링의 소울',
        skill: '',
        option: {},
        chargeFactor: 2,
      });

      expect(gear.soulChargeOption).toEqual({ magicPower: 20 });
    });

    it('throws for unenchanted gear', () => {
      const gear = defaultGear({ type: GearType.bow, req: { level: 150 } });
      const soul = {
        name: '위대한 카링의 소울',
        skill: '',
        option: {},
      };

      expect(() => gear.setSoul(soul)).toThrow();
    });
  });

  describe('setSoulCharge', () => {
    it.each([0, 1, 100, 500, 999, 1000])('sets soul charge', (charge) => {
      gear.setSoulCharge(charge);

      expect(gear.soulCharge).toBe(charge);
    });

    it('sets soul charge option', () => {
      gear.setSoulCharge(200);

      expect(gear.soulChargeOption).toEqual({ magicPower: 12 });
    });

    it.each([-1000, -100, -1, 1001, 2000])(
      'throws TypeError for charge == %d',
      (charge) => {
        expect(() => gear.setSoulCharge(charge)).toThrow();
      },
    );

    it('throws TypeError for unenchanted gear', () => {
      const gear = defaultGear({
        type: GearType.ancientBow,
        req: { level: 200 },
      });

      expect(() => gear.setSoulCharge(700)).toThrow();
    });
  });

  describe('resetSoulEnchant', () => {
    it('resets soulEnchanted', () => {
      gear.resetSoulEnchant();

      expect(gear.soulEnchanted).toBe(false);
    });

    it('resets soul', () => {
      gear.resetSoulEnchant();

      expect(gear.soul).toBeUndefined();
    });

    it('resets soulCharge', () => {
      gear.resetSoulEnchant();

      expect(gear.soulCharge).toBe(0);
    });

    it('resets soulChargeOption', () => {
      gear.resetSoulEnchant();

      expect(gear.soulChargeOption).toEqual({});
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
