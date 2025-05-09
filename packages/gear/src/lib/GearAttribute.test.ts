import { GearCapability, GearCuttable, GearShare, GearTrade } from './data';
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

  describe('canScroll', () => {
    it('returns Cannot by default', () => {
      expect(attr.canScroll).toBe(GearCapability.Cannot);
    });

    it('returns Can', () => {
      attr.data.canScroll = GearCapability.Can;

      expect(attr.canScroll).toBe(GearCapability.Can);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'canScroll' because it is a read-only property.
      expect(() => (attr.canScroll = GearCapability.Can)).toThrow();
    });
  });

  describe('canStarforce', () => {
    it('returns Cannot by default', () => {
      expect(attr.canStarforce).toBe(GearCapability.Cannot);
    });

    it('returns Can', () => {
      attr.data.canStarforce = GearCapability.Can;

      expect(attr.canStarforce).toBe(GearCapability.Can);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'canStarforce' because it is a read-only property.
      expect(() => (attr.canStarforce = GearCapability.Can)).toThrow();
    });
  });

  describe('canAddOption', () => {
    it('returns Cannot by default', () => {
      expect(attr.canAddOption).toBe(GearCapability.Cannot);
    });

    it('returns Can', () => {
      attr.data.canAddOption = GearCapability.Can;

      expect(attr.canAddOption).toBe(GearCapability.Can);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'canAddOption' because it is a read-only property.
      expect(() => (attr.canAddOption = GearCapability.Can)).toThrow();
    });
  });

  describe('canPotential', () => {
    it('returns Cannot by default', () => {
      expect(attr.canPotential).toBe(GearCapability.Cannot);
    });

    it('returns Fixed', () => {
      attr.data.canPotential = GearCapability.Fixed;

      expect(attr.canPotential).toBe(GearCapability.Fixed);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'canPotential' because it is a read-only property.
      expect(() => (attr.canPotential = GearCapability.Fixed)).toThrow();
    });
  });

  describe('canAdditionalPotential', () => {
    it('returns Cannot by default', () => {
      expect(attr.canAdditionalPotential).toBe(GearCapability.Cannot);
    });

    it('returns Cannot', () => {
      attr.data.canAdditionalPotential = GearCapability.Cannot;

      expect(attr.canAdditionalPotential).toBe(GearCapability.Cannot);
    });

    it('is readonly property', () => {
      expect(
        // @ts-expect-error: Cannot assign to 'canAdditionalPotential' because it is a read-only property.
        () => (attr.canAdditionalPotential = GearCapability.Cannot),
      ).toThrow();
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

  describe('totalCuttableCount', () => {
    it('returns undefined by default', () => {
      expect(attr.totalCuttableCount).toBe(undefined);
    });

    it('returns 10', () => {
      attr.data.totalCuttableCount = 10;

      expect(attr.totalCuttableCount).toBe(10);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'totalCuttableCount' because it is a read-only property.
      expect(() => (attr.totalCuttableCount = 20)).toThrow();
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

  describe('setItemId', () => {
    it('returns undefined by default', () => {
      expect(attr.setItemId).toBe(undefined);
    });

    it('returns 100', () => {
      attr.data.setItemId = 100;

      expect(attr.setItemId).toBe(100);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'setItemId' because it is a read-only property.
      expect(() => (attr.setItemId = 100)).toThrow();
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

  describe('skills', () => {
    it('returns empty array by default', () => {
      expect(attr.skills).toEqual([]);
    });

    it('returns data value', () => {
      attr.data.skills = ['스킬1', '스킬2'];

      expect(attr.skills).toEqual(['스킬1', '스킬2']);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'skills' because it is a read-only property.
      expect(() => (attr.skills = ['스킬1', '스킬2'])).toThrow();
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
