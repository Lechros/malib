import { GearCuttable, GearShare, GearTrade, PotentialCan } from './data';
import { GearAttribute } from './GearAttribute';

describe('GearAttribute', () => {
  let attr: GearAttribute;

  describe('only', () => {
    it('returns false by default', () => {
      expect(attr.only).toBe(false);
    });

    it('returns true', () => {
      attr.data.only = true;

      expect(attr.only).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (attr.only = true)).toThrow();
    });
  });

  describe('trade', () => {
    it('returns Tradeable by default', () => {
      expect(attr.trade).toBe(GearTrade.Tradeable);
    });

    it('returns TradeBlock', () => {
      attr.data.trade = GearTrade.TradeBlock;

      expect(attr.trade).toBe(GearTrade.TradeBlock);
    });

    it('is settable to EquipTradeBlock', () => {
      attr.trade = GearTrade.EquipTradeBlock;

      expect(attr.data.trade).toBe(GearTrade.EquipTradeBlock);
    });
  });

  describe('onlyEquip', () => {
    it('returns false by default', () => {
      expect(attr.onlyEquip).toBe(false);
    });

    it('returns true', () => {
      attr.data.onlyEquip = true;

      expect(attr.onlyEquip).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (attr.onlyEquip = true)).toThrow();
    });
  });

  describe('share', () => {
    it('returns None by default', () => {
      expect(attr.share).toBe(GearShare.None);
    });

    it('returns AccountSharable', () => {
      attr.data.share = GearShare.AccountSharable;

      expect(attr.share).toBe(GearShare.AccountSharable);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (attr.share = GearShare.AccountSharable)).toThrow();
    });
  });

  describe('blockGoldHammer', () => {
    it('returns false by default', () => {
      expect(attr.blockGoldHammer).toBe(false);
    });

    it('returns true', () => {
      attr.data.blockGoldHammer = true;

      expect(attr.blockGoldHammer).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (attr.blockGoldHammer = true)).toThrow();
    });
  });

  describe('superior', () => {
    it('returns false by default', () => {
      expect(attr.superior).toBe(false);
    });

    it('returns true', () => {
      attr.data.superior = true;

      expect(attr.superior).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (attr.superior = true)).toThrow();
    });
  });

  describe('cannotUpgrade', () => {
    it('returns false by default', () => {
      expect(attr.cannotUpgrade).toBe(false);
    });

    it('returns true', () => {
      attr.data.cannotUpgrade = true;

      expect(attr.cannotUpgrade).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (attr.cannotUpgrade = true)).toThrow();
    });
  });

  describe('potential', () => {
    it('returns false by default', () => {
      expect(attr.potential).toBe(PotentialCan.Can);
    });

    it('returns Fixed', () => {
      attr.data.potential = PotentialCan.Fixed;

      expect(attr.potential).toBe(PotentialCan.Fixed);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (attr.potential = PotentialCan.Fixed)).toThrow();
    });
  });

  describe('additionalPotential', () => {
    it('returns Can by default', () => {
      expect(attr.additionalPotential).toBe(PotentialCan.Can);
    });

    it('returns Cannot', () => {
      attr.data.additionalPotential = PotentialCan.Cannot;

      expect(attr.additionalPotential).toBe(PotentialCan.Cannot);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (attr.additionalPotential = PotentialCan.Cannot)).toThrow();
    });
  });

  describe('reqLevelIncrease', () => {
    it('returns 0 by default', () => {
      expect(attr.reqLevelIncrease).toBe(0);
    });

    it('returns 20', () => {
      attr.data.reqLevelIncrease = 20;

      expect(attr.reqLevelIncrease).toBe(20);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (attr.reqLevelIncrease = 10)).toThrow();
    });
  });

  describe('cuttable', () => {
    it('returns None by default', () => {
      expect(attr.cuttable).toBe(GearCuttable.None);
    });

    it('returns Platinum', () => {
      attr.data.cuttable = GearCuttable.Platinum;

      expect(attr.cuttable).toBe(GearCuttable.Platinum);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (attr.cuttable = GearCuttable.Platinum)).toThrow();
    });
  });

  describe('cuttableCount', () => {
    it('returns undefined by default', () => {
      expect(attr.cuttableCount).toBe(undefined);
    });

    it('returns 10', () => {
      attr.data.cuttableCount = 10;

      expect(attr.cuttableCount).toBe(10);
    });

    it('is settable to 20', () => {
      attr.cuttableCount = 20;

      expect(attr.data.cuttableCount).toBe(20);
    });
  });

  describe('accountShareTag', () => {
    it('returns false by default', () => {
      expect(attr.accountShareTag).toBe(false);
    });

    it('returns true', () => {
      attr.data.accountShareTag = true;

      expect(attr.accountShareTag).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (attr.accountShareTag = true)).toThrow();
    });
  });

  describe('lucky', () => {
    it('returns false by default', () => {
      expect(attr.lucky).toBe(false);
    });

    it('returns true', () => {
      attr.data.lucky = true;

      expect(attr.lucky).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (attr.lucky = true)).toThrow();
    });
  });

  describe('incline', () => {
    it('returns all stats set to 0 by default', () => {
      expect(attr.incline).toEqual({
        charisma: 0,
        insight: 0,
        will: 0,
        craft: 0,
        sense: 0,
        charm: 0,
      });
    });

    it('returns data value', () => {
      attr.data.incline = { will: 50, charisma: 10, sense: 50 };

      expect(attr.incline).toEqual({
        charisma: 10,
        insight: 0,
        will: 50,
        craft: 0,
        sense: 50,
        charm: 0,
      });
    });

    it('is settable to Incline', () => {
      attr.incline = { will: 50, charisma: 10, sense: 50 };

      expect(attr.data.incline).toEqual({ will: 50, charisma: 10, sense: 50 });
    });
  });

  describe('bossReward', () => {
    it('returns false by default', () => {
      expect(attr.bossReward).toBe(false);
    });

    it('returns true', () => {
      attr.data.bossReward = true;

      expect(attr.bossReward).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error
      expect(() => (attr.bossReward = true)).toThrow();
    });
  });

  describe('growthExp', () => {
    it('returns undefined by default', () => {
      expect(attr.growthExp).toBe(undefined);
    });

    it('returns 50', () => {
      attr.data.growthExp = 50;

      expect(attr.growthExp).toBe(50);
    });

    it('is settable to 100', () => {
      attr.growthExp = 100;

      expect(attr.data.growthExp).toBe(100);
    });
  });

  describe('growthLevel', () => {
    it('returns undefined by default', () => {
      expect(attr.growthLevel).toBe(undefined);
    });

    it('returns 5', () => {
      attr.data.growthLevel = 5;

      expect(attr.growthLevel).toBe(5);
    });

    it('is settable to 6', () => {
      attr.growthLevel = 6;

      expect(attr.data.growthLevel).toBe(6);
    });
  });

  describe('dateExpire', () => {
    it('returns undefined by default', () => {
      expect(attr.dateExpire).toBe(undefined);
    });

    it('returns 2023-12-21T17:28+09:00', () => {
      attr.data.dateExpire = '2023-12-21T17:28+09:00';

      expect(attr.dateExpire).toBe('2023-12-21T17:28+09:00');
    });

    it('is settable to 2023-12-21T17:28+09:00', () => {
      attr.dateExpire = '2023-12-21T17:28+09:00';

      expect(attr.data.dateExpire).toBe('2023-12-21T17:28+09:00');
    });
  });

  beforeEach(() => {
    attr = new GearAttribute({});
  });
});
