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
    gear.soulWeapon.soul = {
      name: "",
      skill: "",
      option: new Map(),
      multiplier: 0,
    };
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
    const soul: Soul = {
      name: "",
      skill: "",
      option: new Map(),
      multiplier: 0,
    };
    expect(gear.soulWeapon.setSoul(soul)).toBe(false);
  });
  it("should success on enchanted gear", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulWeapon.enchanted = true;
    const soul: Soul = {
      name: "",
      skill: "",
      option: new Map(),
      multiplier: 0,
    };
    expect(gear.soulWeapon.setSoul(soul)).toBe(true);
  });
  it("should success on enchanted gear with soul", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulWeapon.enchanted = true;
    gear.soulWeapon.soul = {
      name: "",
      skill: "",
      option: new Map(),
      multiplier: 0,
    };
    const soul: Soul = {
      name: "",
      skill: "",
      option: new Map(),
      multiplier: 0,
    };
    expect(gear.soulWeapon.setSoul(soul)).toBe(true);
  });
  it("should set fields on success", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.option(GearPropType.incPAD).base = 100;
    gear.soulWeapon.enchanted = true;
    gear.soulWeapon.charge = 200;
    gear.soulWeapon.chargeOption.set(GearPropType.incSTR, 10);
    const soul: Soul = {
      name: "",
      skill: "",
      option: new Map(),
      multiplier: 0,
    };
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
    gear.soulWeapon.soul = {
      name: "",
      skill: "",
      option: new Map(),
      multiplier: 0,
    };
    const soul: Soul = {
      name: "",
      skill: "",
      option: new Map(),
      multiplier: 0,
    };
    expect(gear.soulWeapon.setSoul(soul)).toBe(true);
  });
  it("should set fields on success", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulWeapon.enchanted = true;
    gear.soulWeapon.soul = {
      name: "",
      skill: "",
      option: new Map(),
      multiplier: 0,
    };
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
  it("should return false on not enchanted gear", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulWeapon.setCharge(100);
    expect(gear.soulWeapon.charge).toBe(0);
  });
  it("should set charge and return true on success", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulWeapon.enchanted = true;
    expect(gear.soulWeapon.setCharge(150)).toBe(true);
    expect(gear.soulWeapon.charge).toBe(150);
  });
  it.each([
    [true, 1000],
    [true, 999],
    [true, 0],
    [false, -1],
    [false, -1000],
    [false, 1001],
  ])("should return %s for charge value %d", (expected, charge) => {
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.soulWeapon.enchanted = true;
    gear.soulWeapon.charge = 2;

    expect(gear.soulWeapon.setCharge(charge)).toBe(expected);
    expect(gear.soulWeapon.charge).toBe(expected ? charge : 2);
  });
  describe("should set correct charge option", () => {
    it("PAD should increase for PAD gear", () => {
      const gear = new Gear();
      gear.name = "PAD gear";
      gear.type = GearType.bow;
      gear.option(GearPropType.incPAD).base = 50;
      gear.soulWeapon.enchanted = true;
      gear.soulWeapon.setCharge(1000);
      expect(gear.soulWeapon.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, 10]])
      );
    });
    it("MAD should increase for MAD gear", () => {
      const gear = new Gear();
      gear.name = "MAD gear";
      gear.type = GearType.staff;
      gear.option(GearPropType.incMAD).base = 50;
      gear.soulWeapon.enchanted = true;
      gear.soulWeapon.setCharge(1000);
      expect(gear.soulWeapon.chargeOption).toEqual(
        new Map([[GearPropType.incMAD, 10]])
      );
    });
    it.each([
      [5, 1],
      [7, 300],
      [9, 500],
      [10, 1000],
    ])("PAD %d for charge %d on gear without soul", (expectedPAD, charge) => {
      const gear = new Gear();
      gear.name = "PAD gear";
      gear.type = GearType.bow;
      gear.option(GearPropType.incPAD).base = 50;
      gear.soulWeapon.enchanted = true;

      gear.soulWeapon.setCharge(charge);
      expect(gear.soulWeapon.chargeOption).toEqual(
        new Map([[GearPropType.incPAD, expectedPAD]])
      );
    });
    it.each([
      [10, 1, 2],
      [12, 101, 2],
      [14, 213, 2],
      [16, 302, 2],
      [18, 500, 2],
      [20, 502, 2],
      [20, 1000, 2],
    ])(
      "PAD %d for charge %d on gear with soul multiplier %d",
      (expectedPAD, charge, multiplier) => {
        const gear = new Gear();
        gear.name = "PAD gear";
        gear.type = GearType.bow;
        gear.option(GearPropType.incPAD).base = 50;
        gear.soulWeapon.enchanted = true;
        gear.soulWeapon.soul = {
          name: "",
          skill: "",
          option: new Map(),
          multiplier,
        };

        gear.soulWeapon.setCharge(charge);
        expect(gear.soulWeapon.chargeOption).toEqual(
          new Map([[GearPropType.incPAD, expectedPAD]])
        );
      }
    );
  });
});
