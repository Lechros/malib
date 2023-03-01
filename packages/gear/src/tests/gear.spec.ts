import { Gear, GearPropType, GearType } from "..";

test("test option()", () => {
  const gear = new Gear();
  expect(gear.option(GearPropType.incSTR).base).toBe(0);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  gear.options.get(GearPropType.incSTR)!.upgrade = 1;
  expect(gear.option(GearPropType.incSTR).upgrade).toBe(1);

  gear.option(GearPropType.incDEX).base = 5;
  expect(gear.options.get(GearPropType.incDEX)?.base).toBe(5);
});

test("test getPropValue()", () => {
  const gear = new Gear();
  gear.props.set(GearPropType.exceptUpgrade, 2);
  expect(gear.getPropValue(GearPropType.exceptUpgrade)).toBe(2);
  expect(gear.getPropValue(GearPropType.blockGoldHammer)).toBe(0);
});

test("test getBooleanValue()", () => {
  const gear = new Gear();
  gear.props.set(GearPropType.blockGoldHammer, 0);
  gear.props.set(GearPropType.noPotential, 1);
  gear.props.set(GearPropType.tradeBlock, 2);
  expect(gear.getBooleanValue(GearPropType.noPotential)).toBe(true);
  expect(gear.getBooleanValue(GearPropType.tradeBlock)).toBe(true);
  expect(gear.getBooleanValue(GearPropType.blockGoldHammer)).toBe(false);
  expect(gear.getBooleanValue(GearPropType.exceptUpgrade)).toBe(false);
});

test("test diff()", () => {
  const gear = new Gear();
  gear.option(GearPropType.incSTR).base = 10;
  gear.option(GearPropType.incSTR).bonus = 24;
  gear.option(GearPropType.incSTR).enchant = 15;
  gear.option(GearPropType.incMHP).bonus = 2400;
  gear.option(GearPropType.incPDD).upgrade = 56;
  expect(gear.diff).toBeCloseTo(24 + 15 + 24 + 5);
});

test("test upgradeLeft()", () => {
  const gear = new Gear();
  gear.totalUpgradeCount = 9;
  gear.hammerCount = 1;
  gear.upgradeFailCount = 3;
  gear.upgradeCount = 7;
  expect(gear.upgradeCountLeft).toBe(0);
});

test("test isLeftWeapon()", () => {
  expect(Gear.isLeftWeapon(GearType.tuner)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.soulShooter)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.desperado)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.energySword)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.espLimiter)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.chain)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.magicGauntlet)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.ritualFan)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.ohSword)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.ohAxe)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.ohBlunt)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.dagger)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.cane)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.wand)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.staff)).toBe(true);
  expect(Gear.isLeftWeapon(GearType.breathShooter)).toBe(true);

  expect(Gear.isLeftWeapon(GearType.thSword)).toBe(false);
  expect(Gear.isLeftWeapon(GearType.crossbow)).toBe(false);
  expect(Gear.isLeftWeapon(GearType.longSword)).toBe(false);
  expect(Gear.isLeftWeapon(GearType.dragonEssence)).toBe(false);
  expect(Gear.isLeftWeapon(GearType.cap)).toBe(false);
});

test("test isDoubleHandWeapon()", () => {
  expect(Gear.isDoubleHandWeapon(GearType.thSword)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.thAxe)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.thBlunt)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.spear)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.polearm)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.bow)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.crossbow)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.claw)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.knuckle)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.gun)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.dualBowguns)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.handCannon)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.heavySword)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.longSword)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.gauntletRevolver)).toBe(true);
  expect(Gear.isDoubleHandWeapon(GearType.ancientBow)).toBe(true);

  expect(Gear.isDoubleHandWeapon(GearType.tuner)).toBe(false);
  expect(Gear.isDoubleHandWeapon(GearType.chain)).toBe(false);
  expect(Gear.isDoubleHandWeapon(GearType.dagger)).toBe(false);
  expect(Gear.isDoubleHandWeapon(GearType.dragonEssence)).toBe(false);
  expect(Gear.isDoubleHandWeapon(GearType.cap)).toBe(false);
});

test("test isSubWeapon()", () => {
  expect(Gear.isSubWeapon(GearType.shield)).toBe(true);
  expect(Gear.isSubWeapon(GearType.soulShield)).toBe(true);
  expect(Gear.isSubWeapon(GearType.demonShield)).toBe(true);
  expect(Gear.isSubWeapon(GearType.magicArrow)).toBe(true);
  expect(Gear.isSubWeapon(GearType.card)).toBe(true);
  expect(Gear.isSubWeapon(GearType.medallion)).toBe(true);
  expect(Gear.isSubWeapon(GearType.rosary)).toBe(true);
  expect(Gear.isSubWeapon(GearType.ironChain)).toBe(true);
  expect(Gear.isSubWeapon(GearType.magicBook1)).toBe(true);
  expect(Gear.isSubWeapon(GearType.magicBook2)).toBe(true);
  expect(Gear.isSubWeapon(GearType.magicBook3)).toBe(true);
  expect(Gear.isSubWeapon(GearType.arrowFletching)).toBe(true);
  expect(Gear.isSubWeapon(GearType.bowThimble)).toBe(true);
  expect(Gear.isSubWeapon(GearType.daggerScabbard)).toBe(true);
  expect(Gear.isSubWeapon(GearType.charm)).toBe(true);
  expect(Gear.isSubWeapon(GearType.orb)).toBe(true);
  expect(Gear.isSubWeapon(GearType.dragonEssence)).toBe(true);
  expect(Gear.isSubWeapon(GearType.soulRing)).toBe(true);
  expect(Gear.isSubWeapon(GearType.magnum)).toBe(true);
  expect(Gear.isSubWeapon(GearType.wristBand)).toBe(true);
  expect(Gear.isSubWeapon(GearType.farSight)).toBe(true);
  expect(Gear.isSubWeapon(GearType.powderKeg)).toBe(true);
  expect(Gear.isSubWeapon(GearType.mass)).toBe(true);
  expect(Gear.isSubWeapon(GearType.document)).toBe(true);
  expect(Gear.isSubWeapon(GearType.magicMarble)).toBe(true);
  expect(Gear.isSubWeapon(GearType.arrowhead)).toBe(true);
  expect(Gear.isSubWeapon(GearType.jewel)).toBe(true);
  expect(Gear.isSubWeapon(GearType.powderKeg2)).toBe(true);
  expect(Gear.isSubWeapon(GearType.controller)).toBe(true);
  expect(Gear.isSubWeapon(GearType.foxMarble)).toBe(true);
  expect(Gear.isSubWeapon(GearType.chessPiece)).toBe(true);
  expect(Gear.isSubWeapon(GearType.transmitter)).toBe(true);
  expect(Gear.isSubWeapon(GearType.charge)).toBe(true);
  expect(Gear.isSubWeapon(GearType.magicWing)).toBe(true);
  expect(Gear.isSubWeapon(GearType.pathOfAbyss)).toBe(true);
  expect(Gear.isSubWeapon(GearType.relic)).toBe(true);
  expect(Gear.isSubWeapon(GearType.fanTassel)).toBe(true);
  expect(Gear.isSubWeapon(GearType.bracelet)).toBe(true);
  expect(Gear.isSubWeapon(GearType.weaponBelt)).toBe(true);
  expect(Gear.isSubWeapon(GearType.ornament)).toBe(true);
  expect(Gear.isSubWeapon(GearType.katara)).toBe(true);

  expect(Gear.isSubWeapon(GearType.tuner)).toBe(false);
  expect(Gear.isSubWeapon(GearType.pickaxe)).toBe(false);
  expect(Gear.isSubWeapon(GearType.cape)).toBe(false);
});

test("test isArmor()", () => {
  expect(Gear.isArmor(GearType.cap)).toBe(true);
  expect(Gear.isArmor(GearType.faceAccessory)).toBe(false);
  expect(Gear.isArmor(GearType.eyeAccessory)).toBe(false);
  expect(Gear.isArmor(GearType.earrings)).toBe(false);
  expect(Gear.isArmor(GearType.coat)).toBe(true);
  expect(Gear.isArmor(GearType.longcoat)).toBe(true);
  expect(Gear.isArmor(GearType.pants)).toBe(true);
  expect(Gear.isArmor(GearType.shoes)).toBe(true);
  expect(Gear.isArmor(GearType.glove)).toBe(true);
  expect(Gear.isArmor(GearType.cape)).toBe(true);
  expect(Gear.isArmor(GearType.ring)).toBe(false);
  expect(Gear.isArmor(GearType.pendant)).toBe(false);
  expect(Gear.isArmor(GearType.belt)).toBe(false);
  expect(Gear.isArmor(GearType.medal)).toBe(false);
  expect(Gear.isArmor(GearType.shoulder)).toBe(false);
  expect(Gear.isArmor(GearType.pocket)).toBe(false);
  expect(Gear.isArmor(GearType.badge)).toBe(false);
  expect(Gear.isArmor(GearType.shiningRod)).toBe(false);
});

test("test isAccessory()", () => {
  expect(Gear.isAccessory(GearType.cap)).toBe(false);
  expect(Gear.isAccessory(GearType.faceAccessory)).toBe(true);
  expect(Gear.isAccessory(GearType.eyeAccessory)).toBe(true);
  expect(Gear.isAccessory(GearType.earrings)).toBe(true);
  expect(Gear.isAccessory(GearType.coat)).toBe(false);
  expect(Gear.isAccessory(GearType.longcoat)).toBe(false);
  expect(Gear.isAccessory(GearType.pants)).toBe(false);
  expect(Gear.isAccessory(GearType.shoes)).toBe(false);
  expect(Gear.isAccessory(GearType.glove)).toBe(false);
  expect(Gear.isAccessory(GearType.cape)).toBe(false);
  expect(Gear.isAccessory(GearType.ring)).toBe(true);
  expect(Gear.isAccessory(GearType.pendant)).toBe(true);
  expect(Gear.isAccessory(GearType.belt)).toBe(true);
  expect(Gear.isAccessory(GearType.medal)).toBe(false);
  expect(Gear.isAccessory(GearType.shoulder)).toBe(true);
  expect(Gear.isAccessory(GearType.pocket)).toBe(false);
  expect(Gear.isAccessory(GearType.badge)).toBe(false);
  expect(Gear.isAccessory(GearType.shiningRod)).toBe(false);
});

test("test getGearType()", () => {
  expect(Gear.getGearType(1213017)).toBe(GearType.tuner);
  expect(Gear.getGearType(1222109)).toBe(GearType.soulShooter);
  expect(Gear.getGearType(1232109)).toBe(GearType.desperado);
  expect(Gear.getGearType(1242116)).toBe(GearType.energySword);
  expect(Gear.getGearType(1262017)).toBe(GearType.espLimiter);
  expect(Gear.getGearType(1272016)).toBe(GearType.chain);
  expect(Gear.getGearType(1282016)).toBe(GearType.magicGauntlet);
  expect(Gear.getGearType(1292017)).toBe(GearType.ritualFan);
  expect(Gear.getGearType(1302333)).toBe(GearType.ohSword);
  expect(Gear.getGearType(1312199)).toBe(GearType.ohAxe);
  expect(Gear.getGearType(1322250)).toBe(GearType.ohBlunt);
  expect(Gear.getGearType(1332274)).toBe(GearType.dagger);
  expect(Gear.getGearType(1342101)).toBe(GearType.katara);
  expect(Gear.getGearType(1362135)).toBe(GearType.cane);
  expect(Gear.getGearType(1372222)).toBe(GearType.wand);
  expect(Gear.getGearType(1382259)).toBe(GearType.staff);
  expect(Gear.getGearType(1402251)).toBe(GearType.thSword);
  expect(Gear.getGearType(1412177)).toBe(GearType.thAxe);
  expect(Gear.getGearType(1422184)).toBe(GearType.thBlunt);
  expect(Gear.getGearType(1432214)).toBe(GearType.spear);
  expect(Gear.getGearType(1442268)).toBe(GearType.polearm);
  expect(Gear.getGearType(1452252)).toBe(GearType.bow);
  expect(Gear.getGearType(1462239)).toBe(GearType.crossbow);
  expect(Gear.getGearType(1472261)).toBe(GearType.claw);
  expect(Gear.getGearType(1482216)).toBe(GearType.knuckle);
  expect(Gear.getGearType(1492231)).toBe(GearType.gun);
  expect(Gear.getGearType(1522138)).toBe(GearType.dualBowguns);
  expect(Gear.getGearType(1532144)).toBe(GearType.handCannon);
  expect(Gear.getGearType(1582017)).toBe(GearType.gauntletRevolver);
  expect(Gear.getGearType(1592019)).toBe(GearType.ancientBow);
  expect(Gear.getGearType(1214017)).toBe(GearType.breathShooter);
  expect(Gear.getGearType(1404013)).toBe(GearType.chakram);
});

describe("getMaxStar", () => {
  it("req level 75 gear max star should be 5", () => {
    const gear = new Gear();
    gear.type = GearType.eyeAccessory;
    gear.req.level = 75;
    gear.totalUpgradeCount = 3;
    expect(Gear.getMaxStar(gear)).toBe(5);
  });
  it("req level 100 gear max star should be 8", () => {
    const gear = new Gear();
    gear.type = GearType.cap;
    gear.req.level = 100;
    gear.totalUpgradeCount = 7;
    expect(Gear.getMaxStar(gear)).toBe(8);
  });
  it("req level 125 gear max star should be 15", () => {
    const gear = new Gear();
    gear.type = GearType.katara;
    gear.req.level = 125;
    gear.totalUpgradeCount = 8;
    expect(Gear.getMaxStar(gear)).toBe(15);
  });
  it("req level 130 gear max star should be 20", () => {
    const gear = new Gear();
    gear.type = GearType.staff;
    gear.req.level = 130;
    gear.totalUpgradeCount = 8;
    expect(Gear.getMaxStar(gear)).toBe(20);
  });
  it("req level 150 gear max star should be 25", () => {
    const gear = new Gear();
    gear.type = GearType.coat;
    gear.req.level = 150;
    gear.totalUpgradeCount = 7;
    expect(Gear.getMaxStar(gear)).toBe(25);
  });
  it("req level 250 gear max star should be 25", () => {
    const gear = new Gear();
    gear.type = GearType.glove;
    gear.req.level = 250;
    gear.totalUpgradeCount = 11;
    expect(Gear.getMaxStar(gear)).toBe(25);
  });
  it("req level 110 superior gear max star should be 8", () => {
    const gear = new Gear();
    gear.type = GearType.cape;
    gear.req.level = 110;
    gear.totalUpgradeCount = 1;
    gear.props.set(GearPropType.superiorEqp, 1);
    expect(Gear.getMaxStar(gear)).toBe(8);
  });
  it("req level 150 superior gear max star should be 15", () => {
    const gear = new Gear();
    gear.type = GearType.belt;
    gear.req.level = 150;
    gear.totalUpgradeCount = 1;
    gear.props.set(GearPropType.superiorEqp, 1);
    expect(Gear.getMaxStar(gear)).toBe(15);
  });
  it("mechanic gear max star should be 0", () => {
    const gear = new Gear();
    gear.type = GearType.machineTransistors;
    gear.req.level = 100;
    gear.totalUpgradeCount = 3;
    expect(Gear.getMaxStar(gear)).toBe(0);
  });
  it("dragon gear max star should be 0", () => {
    const gear = new Gear();
    gear.type = GearType.machineTransistors;
    gear.req.level = 125;
    gear.totalUpgradeCount = 4;
    expect(Gear.getMaxStar(gear)).toBe(0);
  });
  it("total upgrade count = 0 gear max star should be 0", () => {
    const gear = new Gear();
    gear.type = GearType.earrings;
    gear.req.level = 130;
    expect(Gear.getMaxStar(gear)).toBe(0);
  });
  it("only upgrade prop gear max star should be 0", () => {
    const gear = new Gear();
    gear.type = GearType.shoes;
    gear.req.level = 130;
    gear.totalUpgradeCount = 3;
    gear.props.set(GearPropType.onlyUpgrade, 1);
    expect(Gear.getMaxStar(gear)).toBe(0);
  });
});
