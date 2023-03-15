import { Gear, GearPropType, GearType, Soul } from "..";

describe("enchant", () => {
  it("should fail on already enchanted gear", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulWeapon.enchanted = true;
    expect(gear.soulWeapon.enchant()).toBe(false);
  });
  it("should fail on not weapon gear", () => {
    const gear = new Gear();
    gear.type = GearType.coat;
    expect(gear.soulWeapon.enchant()).toBe(false);
  });
  it("should success on not enchanted weapon gear", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    expect(gear.soulWeapon.enchant()).toBe(true);
  });
  it("should set fields on success", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    expect(gear.soulWeapon.enchant()).toBe(true);
    expect(gear.soulWeapon.enchanted).toBe(true);
    expect(gear.soulWeapon.charge).toBe(0);
    expect(gear.soulWeapon.chargeOption).toEqual(new Map());
    expect(gear.soulWeapon.soul).toBe(undefined);
  });
});

describe("disenchant", () => {
  it("should fail on not enchanted gear", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    expect(gear.soulWeapon.disenchant()).toBe(false);
  });
  it("should success on enchanted gear without soul", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulWeapon.enchanted = true;
    expect(gear.soulWeapon.disenchant()).toBe(true);
  });
  it("should success on enchanted gear with soul", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulWeapon.enchanted = true;
    gear.soulWeapon.soul = new Soul();
    expect(gear.soulWeapon.disenchant()).toBe(true);
  });
  it("should set fields on success", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulWeapon.enchanted = true;
    expect(gear.soulWeapon.disenchant()).toBe(true);
    expect(gear.soulWeapon.enchanted).toBe(false);
    expect(gear.soulWeapon.charge).toBe(0);
    expect(gear.soulWeapon.chargeOption).toEqual(new Map());
    expect(gear.soulWeapon.soul).toBe(undefined);
  });
});

describe("setSoul", () => {
  it("should fail on not enchanted gear", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    const soul = new Soul();
    expect(gear.soulWeapon.setSoul(soul)).toBe(false);
  });
  it("should success on enchanted gear", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulWeapon.enchanted = true;
    const soul = new Soul();
    expect(gear.soulWeapon.setSoul(soul)).toBe(true);
  });
  it("should success on enchanted gear with soul", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulWeapon.enchanted = true;
    gear.soulWeapon.soul = new Soul();
    const soul = new Soul();
    expect(gear.soulWeapon.setSoul(soul)).toBe(true);
  });
  it("should set fields on success", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.option(GearPropType.incPAD).base = 100;
    gear.soulWeapon.charge = 200;
    gear.soulWeapon.chargeOption.set(GearPropType.incSTR, 10);
    gear.soulWeapon.enchanted = true;
    const soul = new Soul();
    soul.multiplier = 2;
    soul.name = "test soul";
    soul.skill = "test soul skill";
    expect(gear.soulWeapon.setSoul(soul)).toBe(true);
    expect(gear.soulWeapon.enchanted).toBe(true);
    expect(gear.soulWeapon.charge).toBe(200);
    expect(gear.soulWeapon.chargeOption).toEqual(
      new Map([[GearPropType.incPAD, 12]])
    );
    expect(gear.soulWeapon.soul).toEqual(soul);
  });
});

describe("removeSoul", () => {
  it("should fail on not enchanted gear", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    expect(gear.soulWeapon.removeSoul()).toBe(false);
  });
  it("should fail on enchanted gear without soul", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulWeapon.enchanted = true;
    expect(gear.soulWeapon.removeSoul()).toBe(false);
  });
  it("should success on enchanted gear with soul", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulWeapon.enchanted = true;
    gear.soulWeapon.soul = new Soul();
    const soul = new Soul();
    expect(gear.soulWeapon.setSoul(soul)).toBe(true);
  });
  it("should set fields on success", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulWeapon.enchanted = true;
    gear.soulWeapon.soul = new Soul();
    gear.soulWeapon.charge = 50;
    gear.soulWeapon.chargeOption = new Map([[GearPropType.incMAD, 3]]);
    expect(gear.soulWeapon.removeSoul()).toBe(true);
    expect(gear.soulWeapon.enchanted).toBe(true);
    expect(gear.soulWeapon.charge).toBe(50);
    expect(gear.soulWeapon.chargeOption).toEqual(
      new Map([[GearPropType.incPAD, 5]])
    );
    expect(gear.soulWeapon.soul).toBeUndefined();
  });
});

describe("soul setCharge", () => {
  it("should fail on not enchanted gear", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    expect(gear.soulWeapon.setCharge(100)).toBe(false);
  });
  it("should success on enchanted gear", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulWeapon.enchanted = true;
    expect(gear.soulWeapon.setCharge(100)).toBe(true);
  });
  it("should only success on charge value [0, 1000]", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulWeapon.enchanted = true;

    expect(gear.soulWeapon.setCharge(0)).toBe(true);
    expect(gear.soulWeapon.setCharge(1000)).toBe(true);
    expect(gear.soulWeapon.setCharge(500)).toBe(true);
    expect(gear.soulWeapon.setCharge(999)).toBe(true);

    expect(gear.soulWeapon.setCharge(-1)).toBe(false);
    expect(gear.soulWeapon.setCharge(-1000)).toBe(false);
    expect(gear.soulWeapon.setCharge(1001)).toBe(false);
    expect(gear.soulWeapon.setCharge(3000)).toBe(false);
  });
  describe("should set correct charge option", () => {
    it("PAD gear: type", () => {
      const gear = new Gear();
      gear.name = "PAD gear";
      gear.type = GearType.bow;
      gear.option(GearPropType.incPAD).base = 50;
      gear.soulWeapon.enchanted = true;
      expect(gear.soulWeapon.setCharge(1000)).toBe(true);
      expect(gear.soulWeapon.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 10]])
      );
    });
    it("MAD gear: type", () => {
      const gear = new Gear();
      gear.name = "MAD gear";
      gear.type = GearType.staff;
      gear.option(GearPropType.incMAD).base = 50;
      gear.soulWeapon.enchanted = true;
      expect(gear.soulWeapon.setCharge(1000)).toBe(true);
      expect(gear.soulWeapon.chargeOption).toEqual(
        new Map([[GearPropType.incMAD, 10]])
      );
    });
    it("gear without soul: value", () => {
      const gear = new Gear();
      gear.name = "PAD gear";
      gear.type = GearType.bow;
      gear.option(GearPropType.incPAD).base = 50;
      gear.soulWeapon.enchanted = true;

      gear.soulWeapon.setCharge(1);
      expect(gear.soulWeapon.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 5]])
      );
      gear.soulWeapon.setCharge(300);
      expect(gear.soulWeapon.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 7]])
      );
      gear.soulWeapon.setCharge(500);
      expect(gear.soulWeapon.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 9]])
      );
      gear.soulWeapon.setCharge(1000);
      expect(gear.soulWeapon.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 10]])
      );
    });
    it("gear with soul: value", () => {
      const gear = new Gear();
      gear.name = "PAD gear";
      gear.type = GearType.bow;
      gear.option(GearPropType.incPAD).base = 50;
      gear.soulWeapon.enchanted = true;
      gear.soulWeapon.soul = new Soul();
      gear.soulWeapon.soul.multiplier = 2;

      gear.soulWeapon.setCharge(1);
      expect(gear.soulWeapon.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 10]])
      );
      gear.soulWeapon.setCharge(101);
      expect(gear.soulWeapon.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 12]])
      );
      gear.soulWeapon.setCharge(213);
      expect(gear.soulWeapon.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 14]])
      );
      gear.soulWeapon.setCharge(302);
      expect(gear.soulWeapon.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 16]])
      );
      gear.soulWeapon.setCharge(500);
      expect(gear.soulWeapon.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 18]])
      );
      gear.soulWeapon.setCharge(502);
      expect(gear.soulWeapon.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 20]])
      );
      gear.soulWeapon.setCharge(1000);
      expect(gear.soulWeapon.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 20]])
      );
    });
  });
});