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
      // @ts-expect-error: Cannot assign to 'only' because it is a read-only property.
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
      // @ts-expect-error: Cannot assign to 'onlyEquip' because it is a read-only property.
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
      // @ts-expect-error: Cannot assign to 'share' because it is a read-only property.
      expect(() => (attr.share = GearShare.AccountSharable)).toThrow();
    });
  });

  describe('blockGoldenHammer', () => {
    it('returns false by default', () => {
      expect(attr.blockGoldenHammer).toBe(false);
    });

    it('returns true', () => {
      attr.data.blockGoldenHammer = true;

      expect(attr.blockGoldenHammer).toBe(true);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'blockGoldenHammer' because it is a read-only property.
      expect(() => (attr.blockGoldenHammer = true)).toThrow();
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
      // @ts-expect-error: Cannot assign to 'superior' because it is a read-only property.
      expect(() => (attr.superior = true)).toThrow();
    });
  });

  describe('attackSpeed', () => {
    it('returns undefined by default', () => {
      expect(attr.attackSpeed).toBe(undefined);
    });

    it('returns 6', () => {
      attr.data.attackSpeed = 6;

      expect(attr.attackSpeed).toBe(6);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'attackSpeed' because it is a read-only property.
      expect(() => (attr.attackSpeed = 5)).toThrow();
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
      // @ts-expect-error: Cannot assign to 'cannotUpgrade' because it is a read-only property.
      expect(() => (attr.cannotUpgrade = true)).toThrow();
    });
  });

  describe('potential', () => {
    it('returns None by default', () => {
      expect(attr.canPotential).toBe(PotentialCan.None);
    });

    it('returns Fixed', () => {
      attr.data.canPotential = PotentialCan.Fixed;

      expect(attr.canPotential).toBe(PotentialCan.Fixed);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'canPotential' because it is a read-only property.
      expect(() => (attr.canPotential = PotentialCan.Fixed)).toThrow();
    });
  });

  describe('additionalPotential', () => {
    it('returns None by default', () => {
      expect(attr.canAdditionalPotential).toBe(PotentialCan.None);
    });

    it('returns Cannot', () => {
      attr.data.canAdditionalPotential = PotentialCan.Cannot;

      expect(attr.canAdditionalPotential).toBe(PotentialCan.Cannot);
    });

    it('is readonly property', () => {
      expect(
        // @ts-expect-error: Cannot assign to 'canAdditionalPotential' because it is a read-only property.
        () => (attr.canAdditionalPotential = PotentialCan.Cannot),
      ).toThrow();
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
      // @ts-expect-error: Cannot assign to 'reqLevelIncrease' because it is a read-only property.
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
      // @ts-expect-error: Cannot assign to 'cuttable' because it is a read-only property.
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
      // @ts-expect-error: Cannot assign to 'accountShareTag' because it is a read-only property.
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
      // @ts-expect-error: Cannot assign to 'lucky' because it is a read-only property.
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
      // @ts-expect-error: Cannot assign to 'bossReward' because it is a read-only property.
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
