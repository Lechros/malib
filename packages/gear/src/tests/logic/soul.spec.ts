import { Gear, GearPropType, GearType, Soul, SoulLogic } from "../..";

describe("enchant", () => {
  const logic = new SoulLogic();
  it("should fail on already enchanted gear", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulSlot.enchanted = true;
    expect(logic.enchant(gear)).toBe(false);
  });
  it("should fail on not weapon gear", () => {
    const gear = new Gear();
    gear.type = GearType.coat;
    expect(logic.enchant(gear)).toBe(false);
  });
  it("should success on not enchanted weapon gear", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    expect(logic.enchant(gear)).toBe(true);
  });
  it("should set fields on success", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    expect(logic.enchant(gear)).toBe(true);
    expect(gear.soulSlot.enchanted).toBe(true);
    expect(gear.soulSlot.charge).toBe(0);
    expect(gear.soulSlot.chargeOption).toEqual(new Map());
    expect(gear.soulSlot.soul).toBe(undefined);
  });
});

describe("disenchant", () => {
  const logic = new SoulLogic();
  it("should fail on not enchanted gear", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    expect(logic.disenchant(gear)).toBe(false);
  });
  it("should success on enchanted gear without soul", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulSlot.enchanted = true;
    expect(logic.disenchant(gear)).toBe(true);
  });
  it("should success on enchanted gear with soul", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulSlot.enchanted = true;
    gear.soulSlot.soul = new Soul();
    expect(logic.disenchant(gear)).toBe(true);
  });
  it("should set fields on success", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulSlot.enchanted = true;
    expect(logic.disenchant(gear)).toBe(true);
    expect(gear.soulSlot.enchanted).toBe(false);
    expect(gear.soulSlot.charge).toBe(0);
    expect(gear.soulSlot.chargeOption).toEqual(new Map());
    expect(gear.soulSlot.soul).toBe(undefined);
  });
});

describe("setSoul", () => {
  const logic = new SoulLogic();
  it("should fail on not enchanted gear", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    const soul = new Soul();
    expect(logic.setSoul(gear, soul)).toBe(false);
  });
  it("should success on enchanted gear", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulSlot.enchanted = true;
    const soul = new Soul();
    expect(logic.setSoul(gear, soul)).toBe(true);
  });
  it("should success on enchanted gear with soul", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulSlot.enchanted = true;
    gear.soulSlot.soul = new Soul();
    const soul = new Soul();
    expect(logic.setSoul(gear, soul)).toBe(true);
  });
  it("should set fields on success", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.option(GearPropType.incPAD).base = 100;
    gear.soulSlot.charge = 200;
    gear.soulSlot.chargeOption.set(GearPropType.incSTR, 10);
    gear.soulSlot.enchanted = true;
    const soul = new Soul();
    soul.multiplier = 2;
    soul.name = "test soul";
    soul.skill = "test soul skill";
    expect(logic.setSoul(gear, soul)).toBe(true);
    expect(gear.soulSlot.enchanted).toBe(true);
    expect(gear.soulSlot.charge).toBe(200);
    expect(gear.soulSlot.chargeOption).toEqual(
      new Map([[GearPropType.incPAD, 14]])
    );
    expect(gear.soulSlot.soul).toEqual(soul);
  });
});

describe("removeSoul", () => {
  const logic = new SoulLogic();
  it("should fail on not enchanted gear", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    expect(logic.removeSoul(gear)).toBe(false);
  });
  it("should fail on enchanted gear without soul", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulSlot.enchanted = true;
    expect(logic.removeSoul(gear)).toBe(false);
  });
  it("should success on enchanted gear with soul", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulSlot.enchanted = true;
    gear.soulSlot.soul = new Soul();
    const soul = new Soul();
    expect(logic.setSoul(gear, soul)).toBe(true);
  });
  it("should set fields on success", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulSlot.enchanted = true;
    gear.soulSlot.soul = new Soul();
    gear.soulSlot.charge = 50;
    gear.soulSlot.chargeOption = new Map([[GearPropType.incMAD, 3]]);
    expect(logic.removeSoul(gear)).toBe(true);
    expect(gear.soulSlot.enchanted).toBe(true);
    expect(gear.soulSlot.charge).toBe(50);
    expect(gear.soulSlot.chargeOption).toEqual(
      new Map([[GearPropType.incPAD, 6]])
    );
    expect(gear.soulSlot.soul).toBeUndefined();
  });
});

describe("soul setCharge", () => {
  const logic = new SoulLogic();
  it("should fail on not enchanted gear", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    expect(logic.setCharge(gear, 100)).toBe(false);
  });
  it("should success on enchanted gear", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulSlot.enchanted = true;
    expect(logic.setCharge(gear, 100)).toBe(true);
  });
  it("should only success on charge value [0, 1000]", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulSlot.enchanted = true;

    expect(logic.setCharge(gear, 0)).toBe(true);
    expect(logic.setCharge(gear, 1000)).toBe(true);
    expect(logic.setCharge(gear, 500)).toBe(true);
    expect(logic.setCharge(gear, 999)).toBe(true);

    expect(logic.setCharge(gear, -1)).toBe(false);
    expect(logic.setCharge(gear, -1000)).toBe(false);
    expect(logic.setCharge(gear, 1001)).toBe(false);
    expect(logic.setCharge(gear, 3000)).toBe(false);
  });
  describe("should set correct charge option", () => {
    it("PAD gear: type", () => {
      const gear = new Gear();
      gear.name = "PAD gear";
      gear.type = GearType.bow;
      gear.option(GearPropType.incPAD).base = 50;
      gear.soulSlot.enchanted = true;
      expect(logic.setCharge(gear, 1000)).toBe(true);
      expect(gear.soulSlot.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 10]])
      );
    });
    it("MAD gear: type", () => {
      const gear = new Gear();
      gear.name = "MAD gear";
      gear.type = GearType.staff;
      gear.option(GearPropType.incMAD).base = 50;
      gear.soulSlot.enchanted = true;
      expect(logic.setCharge(gear, 1000)).toBe(true);
      expect(gear.soulSlot.chargeOption).toEqual(
        new Map([[GearPropType.incMAD, 10]])
      );
    });
    it("gear without soul: value", () => {
      const gear = new Gear();
      gear.name = "PAD gear";
      gear.type = GearType.bow;
      gear.option(GearPropType.incPAD).base = 50;
      gear.soulSlot.enchanted = true;

      logic.setCharge(gear, 1);
      expect(gear.soulSlot.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 6]])
      );
      logic.setCharge(gear, 300);
      expect(gear.soulSlot.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 8]])
      );
      logic.setCharge(gear, 500);
      expect(gear.soulSlot.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 10]])
      );
      logic.setCharge(gear, 1000);
      expect(gear.soulSlot.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 10]])
      );
    });
    it("gear with soul: value", () => {
      const gear = new Gear();
      gear.name = "PAD gear";
      gear.type = GearType.bow;
      gear.option(GearPropType.incPAD).base = 50;
      gear.soulSlot.enchanted = true;
      gear.soulSlot.soul = new Soul();
      gear.soulSlot.soul.multiplier = 2;

      logic.setCharge(gear, 1);
      expect(gear.soulSlot.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 12]])
      );
      logic.setCharge(gear, 300);
      expect(gear.soulSlot.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 16]])
      );
      logic.setCharge(gear, 500);
      expect(gear.soulSlot.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 20]])
      );
      logic.setCharge(gear, 1000);
      expect(gear.soulSlot.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 20]])
      );
    });
  });
});
