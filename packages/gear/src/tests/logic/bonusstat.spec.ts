import {
  addBonusStat,
  BonusStatType,
  Gear,
  GearPropType,
  getBonusStatValue,
  resetBonusStat,
} from "../..";

describe("addBonusStat normal", () => {
  it("low req level armor", () => {
    const gear = new Gear();
    gear.name = "블루몬 고깔모자";
    gear.itemID = 1002102;
    gear.type = Gear.getGearType(gear.itemID);
    gear.req.level = 15;
    gear.req.job = 2;
    gear.option(GearPropType.incPDD).base = 8;
    gear.totalUpgradeCount = 7;

    expect(addBonusStat(gear, BonusStatType.DEX, 3)).toBe(true);
    addBonusStat(gear, BonusStatType.INT, 2);
    expect(gear.option(GearPropType.incDEX).bonus).toBe(3);
    expect(gear.option(GearPropType.incINT).bonus).toBe(2);
  });
  it("medium req level armor", () => {
    const gear = new Gear();
    gear.name = "블루 길티언";
    gear.itemID = 1002152;
    gear.type = Gear.getGearType(gear.itemID);
    gear.req.level = 40;
    gear.req.job = 2;
    gear.option(GearPropType.incPDD).base = 18;
    gear.option(GearPropType.incMMP).base = 20;
    gear.totalUpgradeCount = 7;

    addBonusStat(gear, BonusStatType.MHP, 3);
    expect(gear.option(GearPropType.incMHP).bonus).toBe(360);
  });
  it("low req level weapon", () => {
    const gear = new Gear();
    gear.name = "페어리 완드";
    gear.itemID = 1372000;
    gear.type = Gear.getGearType(gear.itemID);
    gear.req.level = 38;
    gear.req.job = 2;
    gear.option(GearPropType.incPAD).base = 33;
    gear.option(GearPropType.incMAD).base = 53;
    gear.totalUpgradeCount = 7;

    addBonusStat(gear, BonusStatType.MMP, 2);
    addBonusStat(gear, BonusStatType.PAD, 1);
    addBonusStat(gear, BonusStatType.allStatR, 1);
    expect(gear.option(GearPropType.incMMP).bonus).toBe(180);
    expect(gear.option(GearPropType.incPAD).bonus).toBe(1);
    expect(gear.option(GearPropType.statR).bonus).toBe(1);
  });
  it("high req level armor", () => {
    const gear = new Gear();
    gear.name = "앱솔랩스 나이트케이프";
    gear.itemID = 1102775;
    gear.type = Gear.getGearType(gear.itemID);
    gear.req.level = 160;
    gear.req.job = 1;
    gear.props.set(GearPropType.bossReward, 1);
    gear.option(GearPropType.incPDD).base = 250;
    gear.option(GearPropType.incSTR).base = 15;
    gear.option(GearPropType.incDEX).base = 15;
    gear.option(GearPropType.incLUK).base = 15;
    gear.option(GearPropType.incINT).base = 15;
    gear.option(GearPropType.incPAD).base = 2;
    gear.option(GearPropType.incMAD).base = 2;
    gear.totalUpgradeCount = 7;

    addBonusStat(gear, BonusStatType.STR_DEX, 4);
    expect(gear.option(GearPropType.incSTR).bonus).toBe(20);
    expect(gear.option(GearPropType.incDEX).bonus).toBe(20);
  });
  it("eternel", () => {
    const gear = new Gear();
    gear.name = "에테르넬 나이트헬름";
    gear.itemID = 1005980;
    gear.type = Gear.getGearType(gear.itemID);
    gear.req.level = 250;
    gear.req.job = 1;
    gear.props.set(GearPropType.bossReward, 1);
    gear.option(GearPropType.incSTR).base = 80;
    gear.option(GearPropType.incDEX).base = 80;
    gear.option(GearPropType.incPAD).base = 10;
    gear.option(GearPropType.incPDD).base = 750;
    gear.totalUpgradeCount = 11;

    addBonusStat(gear, BonusStatType.STR, 6);
    expect(gear.option(GearPropType.incSTR).bonus).toBe(72);

    addBonusStat(gear, BonusStatType.DEX_INT, 7);
    expect(gear.option(GearPropType.incDEX).bonus).toBe(49);

    addBonusStat(gear, BonusStatType.MHP, 6);
    expect(gear.option(GearPropType.incMHP).bonus).toBe(4200);

    addBonusStat(gear, BonusStatType.PDD, 7);
    expect(gear.option(GearPropType.incPDD).bonus).toBe(84);
  });
});

describe("addBonusStat invalid type", () => {
  it("boss reward gear with low grade", () => {
    const gear = new Gear();
    gear.name = "파프니르 페니텐시아";
    gear.itemID = 1402196;
    gear.type = Gear.getGearType(gear.itemID);
    gear.req.level = 150;
    gear.req.job = 1;
    gear.props.set(GearPropType.bossReward, 1);
    gear.option(GearPropType.incPAD).base = 171;
    gear.option(GearPropType.incSTR).base = 40;
    gear.option(GearPropType.incDEX).base = 40;
    gear.option(GearPropType.imdR).base = 10;
    gear.option(GearPropType.bdR).base = 30;
    gear.totalUpgradeCount = 8;

    expect(getBonusStatValue(gear, BonusStatType.INT_LUK, 1)).toBe(0);
    expect(addBonusStat(gear, BonusStatType.PAD, 1)).toBe(false);
    expect(gear.option(GearPropType.incPAD).bonus).toBe(0);
  });
  it("boss damage bonus stat with weapon req level", () => {
    const gear = new Gear();
    gear.name = "파프니르 페니텐시아";
    gear.itemID = 1402196;
    gear.type = Gear.getGearType(gear.itemID);
    gear.req.level = 60;
    gear.req.job = 1;
    gear.props.set(GearPropType.bossReward, 1);
    gear.option(GearPropType.incPAD).base = 171;
    gear.option(GearPropType.incSTR).base = 40;
    gear.option(GearPropType.incDEX).base = 40;
    gear.option(GearPropType.imdR).base = 10;
    gear.option(GearPropType.bdR).base = 30;
    gear.totalUpgradeCount = 8;
    expect(addBonusStat(gear, BonusStatType.bdR, 4)).toBe(false);
    expect(gear.option(GearPropType.bdR).bonus).toBe(0);

    gear.req.level = 90;
    expect(addBonusStat(gear, BonusStatType.bdR, 4)).toBe(true);
    expect(gear.option(GearPropType.bdR).bonus).toBe(8);
  });
  it("invalid type for armor", () => {
    const gear = new Gear();
    gear.name = "블루몬 고깔모자";
    gear.itemID = 1002102;
    gear.type = Gear.getGearType(gear.itemID);
    gear.req.level = 15;
    gear.req.job = 2;
    gear.option(GearPropType.incPDD).base = 8;
    gear.totalUpgradeCount = 7;

    expect(addBonusStat(gear, BonusStatType.PAD, 3)).toBe(false);
    expect(addBonusStat(gear, BonusStatType.allStatR, 3)).toBe(false);
    expect(gear.option(GearPropType.incPAD).bonus).toBe(0);
    expect(gear.option(GearPropType.statR).bonus).toBe(0);
  });
});

test("addBonusStat boss reward weapon", () => {
  const gear = new Gear();
  gear.name = "파프니르 페니텐시아";
  gear.itemID = 1402196;
  gear.type = Gear.getGearType(gear.itemID);
  gear.req.level = 150;
  gear.req.job = 1;
  gear.props.set(GearPropType.bossReward, 1);
  gear.option(GearPropType.incPAD).base = 171;
  gear.option(GearPropType.incSTR).base = 40;
  gear.option(GearPropType.incDEX).base = 40;
  gear.option(GearPropType.imdR).base = 10;
  gear.option(GearPropType.bdR).base = 30;
  gear.totalUpgradeCount = 8;

  expect(addBonusStat(gear, BonusStatType.PAD, 5)).toBe(true);
  expect(addBonusStat(gear, BonusStatType.MAD, 5)).toBe(true);
  expect(gear.option(GearPropType.incPAD).bonus).toBe(42);
  expect(gear.option(GearPropType.incMAD).bonus).toBe(42);
});

test("addBonusStat zero weapon", () => {
  let gear: Gear;

  gear = new Gear();
  gear.name = "라즐리 7형";
  gear.itemID = 1572007;
  gear.type = Gear.getGearType(gear.itemID);
  gear.req.level = 170;
  gear.req.job = 1;
  gear.req.specJob = 101;
  gear.option(GearPropType.incPAD).base = 169;
  gear.option(GearPropType.incSTR).base = 40;
  gear.option(GearPropType.incDEX).base = 40;
  gear.option(GearPropType.imdR).base = 10;
  gear.option(GearPropType.bdR).base = 30;
  gear.totalUpgradeCount = 8;

  expect(addBonusStat(gear, BonusStatType.PAD, 4)).toBe(true);
  expect(gear.option(GearPropType.incPAD).bonus).toBe(47);

  gear = new Gear();
  gear.name = "라피스 7형";
  gear.itemID = 1562007;
  gear.type = Gear.getGearType(gear.itemID);
  gear.req.level = 170;
  gear.req.job = 1;
  gear.req.specJob = 101;
  gear.option(GearPropType.incPAD).base = 173;
  gear.option(GearPropType.incSTR).base = 40;
  gear.option(GearPropType.incDEX).base = 40;
  gear.option(GearPropType.imdR).base = 10;
  gear.option(GearPropType.bdR).base = 30;
  gear.option(GearPropType.incPDD).base = 150;
  gear.totalUpgradeCount = 8;

  expect(addBonusStat(gear, BonusStatType.PAD, 4)).toBe(true);
  expect(gear.option(GearPropType.incPAD).bonus).toBe(47);

  gear = new Gear();
  gear.name = "제네시스 라즐리";
  gear.itemID = 1572010;
  gear.type = Gear.getGearType(gear.itemID);
  gear.req.level = 200;
  gear.req.job = 1;
  gear.req.specJob = 101;
  gear.props.set(GearPropType.exceptUpgrade, 1);
  gear.option(GearPropType.incPAD).base = 337;
  gear.option(GearPropType.incSTR).base = 150;
  gear.option(GearPropType.incDEX).base = 150;
  gear.option(GearPropType.imdR).base = 20;
  gear.option(GearPropType.bdR).base = 30;
  gear.totalUpgradeCount = 8;

  expect(addBonusStat(gear, BonusStatType.PAD, 5)).toBe(true);
  expect(gear.option(GearPropType.incPAD).bonus).toBe(151);

  gear = new Gear();
  gear.name = "제네시스 라피스";
  gear.itemID = 1562010;
  gear.type = Gear.getGearType(gear.itemID);
  gear.req.level = 200;
  gear.req.job = 1;
  gear.req.specJob = 101;
  gear.props.set(GearPropType.exceptUpgrade, 1);
  gear.option(GearPropType.incPAD).base = 342;
  gear.option(GearPropType.incSTR).base = 150;
  gear.option(GearPropType.incDEX).base = 150;
  gear.option(GearPropType.imdR).base = 20;
  gear.option(GearPropType.bdR).base = 30;
  gear.option(GearPropType.incPDD).base = 250;
  gear.totalUpgradeCount = 8;
  expect(addBonusStat(gear, BonusStatType.PAD, 5)).toBe(true);
  expect(gear.option(GearPropType.incPAD).bonus).toBe(151);
});

test("resetBonusStat", () => {
  const gear = new Gear();
  gear.option(GearPropType.incSTR).bonus = 15;
  gear.option(GearPropType.incPAD).bonus = 15;
  addBonusStat(gear, BonusStatType.INT, 5);
  resetBonusStat(gear);
  expect(gear.option(GearPropType.incSTR).bonus).toBe(0);
  expect(gear.option(GearPropType.incINT).bonus).toBe(0);
  expect(gear.option(GearPropType.incPAD).bonus).toBe(0);
  expect(gear.option(GearPropType.incMAD).bonus).toBe(0);
});
