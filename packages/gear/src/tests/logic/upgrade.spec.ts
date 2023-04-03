import {
  addUpgradeFailCount,
  applyGoldHammer,
  applyScroll,
  applySpellTrace,
  Gear,
  GearPropType,
  GearType,
  resetUpgrade,
  restoreUpgradeCount,
  Scroll,
} from "../..";

describe("golden hammer", () => {
  it("apply to blockGoldHammer gear should fail", () => {
    const gear = new Gear();
    gear.totalUpgradeCount = 1;
    gear.props.set(GearPropType.blockGoldHammer, 1);
    expect(applyGoldHammer(gear)).toBe(false);
  });
  it("apply to onlyUpgrade gear should fail", () => {
    const gear = new Gear();
    gear.totalUpgradeCount = 1;
    gear.props.set(GearPropType.onlyUpgrade, 1);
    expect(applyGoldHammer(gear)).toBe(false);
  });
  it("apply to total upgrade count = 0 should fail", () => {
    const gear = new Gear();
    gear.totalUpgradeCount = 0;
    expect(applyGoldHammer(gear)).toBe(false);
  });
  it("apply to exceptUpgrade gear should success", () => {
    const gear = new Gear();
    gear.totalUpgradeCount = 1;
    gear.props.set(GearPropType.exceptUpgrade, 1);
    expect(applyGoldHammer(gear)).toBe(true);
  });
  it("should be applied upto once", () => {
    const gear = new Gear();
    gear.totalUpgradeCount = 1;
    expect(applyGoldHammer(gear)).toBe(true);
    expect(applyGoldHammer(gear)).toBe(false);
  });
  it("should set hammer to 1", () => {
    const gear = new Gear();
    gear.totalUpgradeCount = 1;
    expect(applyGoldHammer(gear)).toBe(true);
    expect(gear.hammerCount).toBe(1);
  });
  it("should not affect unrelated count", () => {
    const gear = new Gear();
    gear.totalUpgradeCount = 2;
    applyGoldHammer(gear);
    expect(gear.upgradeCountLeft).toBe(3);
    expect(gear.upgradeFailCount).toBe(0);
    expect(gear.upgradeCount).toBe(0);
  });
});

describe("apply scroll", () => {
  it("apply to gear with no upgrade count should fail", () => {
    const gear = new Gear();
    const scroll: Scroll = { name: "", stat: new Map() };
    gear.totalUpgradeCount = 0;
    expect(applyScroll(gear, scroll)).toBe(false);
    gear.totalUpgradeCount = 1;
    expect(applyScroll(gear, scroll)).toBe(true);
  });
  it("should increase upgrade count", () => {
    const gear = new Gear();
    const scroll: Scroll = { name: "", stat: new Map() };
    gear.totalUpgradeCount = 2;
    expect(applyScroll(gear, scroll)).toBe(true);
    expect(gear.upgradeCount).toBe(1);
    expect(applyScroll(gear, scroll)).toBe(true);
    expect(gear.upgradeCount).toBe(2);
  });
  it("should not affect other upgrade related count", () => {
    const gear = new Gear();
    const scroll: Scroll = { name: "", stat: new Map() };
    gear.totalUpgradeCount = 0;
    applyScroll(gear, scroll);
    expect(gear.upgradeCountLeft).toBe(0);
    gear.totalUpgradeCount = 2;
    expect(gear.upgradeCountLeft).toBe(2);
    applyScroll(gear, scroll);
    expect(gear.upgradeCountLeft).toBe(1);
    expect(gear.upgradeFailCount).toBe(0);
    expect(gear.hammerCount).toBe(0);
  });
  it("should add stat to gear", () => {
    const gear = new Gear();
    const scroll = {
      name: "test scroll",
      stat: new Map([
        [GearPropType.incSTR, 2],
        [GearPropType.incINT, 1],
      ]),
    };
    gear.totalUpgradeCount = 2;
    expect(gear.option(GearPropType.incSTR).upgrade).toBe(0);
    expect(gear.option(GearPropType.incDEX).upgrade).toBe(0);
    expect(gear.option(GearPropType.incINT).upgrade).toBe(0);
    expect(applyScroll(gear, scroll)).toBe(true);
    expect(gear.option(GearPropType.incSTR).upgrade).toBe(2);
    expect(gear.option(GearPropType.incDEX).upgrade).toBe(0);
    expect(gear.option(GearPropType.incINT).upgrade).toBe(1);
    expect(applyScroll(gear, scroll)).toBe(true);
    expect(gear.option(GearPropType.incSTR).upgrade).toBe(4);
    expect(gear.option(GearPropType.incDEX).upgrade).toBe(0);
    expect(gear.option(GearPropType.incINT).upgrade).toBe(2);
  });
});

describe("apply spell trace scroll", () => {
  it("apply to gear with no upgrade count should fail", () => {
    const gear = new Gear();
    gear.req.level = 150;
    gear.type = GearType.cap;
    gear.totalUpgradeCount = 0;
    expect(applySpellTrace(gear, GearPropType.incSTR, 70)).toBe(false);
    gear.totalUpgradeCount = 1;
    expect(applySpellTrace(gear, GearPropType.incSTR, 70)).toBe(true);
  });
  it("should increase upgrade count", () => {
    const gear = new Gear();
    gear.req.level = 150;
    gear.type = GearType.cap;
    gear.totalUpgradeCount = 2;
    expect(applySpellTrace(gear, GearPropType.incDEX, 30)).toBe(true);
    expect(gear.upgradeCount).toBe(1);
    expect(applySpellTrace(gear, GearPropType.incDEX, 70)).toBe(true);
    expect(gear.upgradeCount).toBe(2);
  });
  it("should add stat to gear", () => {
    const gear = new Gear();
    gear.req.level = 150;
    gear.type = GearType.cap;
    gear.totalUpgradeCount = 4;
    expect(applySpellTrace(gear, GearPropType.incSTR, 30)).toBe(true);
    expect(gear.option(GearPropType.incSTR).upgrade).toBeGreaterThan(0);
  });
});

describe("fail scroll", () => {
  it("should fail on gear with no upgrade count left", () => {
    const gear = new Gear();
    gear.totalUpgradeCount = 0;
    expect(addUpgradeFailCount(gear)).toBe(false);
    gear.hammerCount = 1;
    gear.upgradeCount = 1;
    expect(addUpgradeFailCount(gear)).toBe(false);
  });
  it("should success on gear with upgrade count left", () => {
    const gear = new Gear();
    gear.totalUpgradeCount = 1;
    expect(addUpgradeFailCount(gear)).toBe(true);
    expect(addUpgradeFailCount(gear)).toBe(false);
    gear.hammerCount = 1;
    expect(addUpgradeFailCount(gear)).toBe(true);
  });
});

describe("restore scroll", () => {
  it("should fail on gear with no upgrade fail count", () => {
    const gear = new Gear();
    gear.totalUpgradeCount = 1;
    expect(restoreUpgradeCount(gear)).toBe(false);
  });
  it("should success on gear with upgrade fail count", () => {
    const gear = new Gear();
    gear.upgradeFailCount = 1;
    expect(restoreUpgradeCount(gear)).toBe(true);
  });
});

describe("reset upgrade", () => {
  it("should return true on success", () => {
    const gear = new Gear();
    expect(resetUpgrade(gear)).toBe(true);
  });
  it("should reset upgrade count related values", () => {
    const gear = new Gear();
    gear.totalUpgradeCount = 10;
    gear.hammerCount = 1;
    gear.upgradeCount = 3;
    gear.upgradeFailCount = 5;
    resetUpgrade(gear);
    expect(gear.hammerCount).toBe(0);
    expect(gear.upgradeCount).toBe(0);
    expect(gear.upgradeFailCount).toBe(0);
  });
  it("should reset options upgrade value", () => {
    const gear = new Gear();
    gear.option(GearPropType.incSTR).base = 3;
    gear.option(GearPropType.incSTR).upgrade = 2;
    gear.option(GearPropType.bdR).upgrade = 4;
    resetUpgrade(gear);
    expect(gear.option(GearPropType.incSTR).base).toBe(3);
    expect(gear.option(GearPropType.incSTR).upgrade).toBe(0);
    expect(gear.option(GearPropType.bdR).upgrade).toBe(0);
    expect(gear.option(GearPropType.incDEX).upgrade).toBe(0);
  });
});
