import { EnhancementLogic, Gear, GearPropType, GearType } from "../..";

describe("starforce return value", () => {
  it("normal gear", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.type = GearType.cap;
    gear.maxStar = 3;
    for (let i = 0; i < 3; i++) {
      expect(logic.addStarforce(gear)).toBe(true);
    }
    expect(logic.addStarforce(gear)).toBe(false);
  });
  it("normal weapon gear", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.maxStar = 17;
    for (let i = 0; i < 17; i++) {
      expect(logic.addStarforce(gear)).toBe(true);
    }
    expect(logic.addStarforce(gear)).toBe(false);
  });
  it("exceptUpgrade gear", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.props.set(GearPropType.exceptUpgrade, 1);
    gear.maxStar = 5;
    expect(logic.addStarforce(gear)).toBe(true);
  });
  it("gear with maxStar value 0", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.maxStar = 0;
    expect(logic.addStarforce(gear)).toBe(false);
  });
  it("gear with star over maxStar", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.star = 14;
    gear.maxStar = 12;
    expect(logic.addStarforce(gear)).toBe(false);
  });
  it("superior gear", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.props.set(GearPropType.superiorEqp, 1);
    gear.maxStar = 7;
    for (let i = 0; i < 7; i++) {
      expect(logic.addStarforce(gear)).toBe(true);
    }
    expect(logic.addStarforce(gear)).toBe(false);
  });
  it("gear with amazing enhancement", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.star = 3;
    gear.amazing = true;
    gear.maxStar = 12;
    expect(logic.addStarforce(gear)).toBe(true);
  });
  it("ignoreMaxStar", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.star = 11;
    gear.maxStar = 12;
    expect(logic.addStarforce(gear, false)).toBe(true);
    expect(logic.addStarforce(gear, false)).toBe(false);
    expect(logic.addStarforce(gear, true)).toBe(true);
  });
});

describe("amazing enhancement return value", () => {
  it("normal gear", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.type = GearType.cap;
    gear.maxStar = 3;
    for (let i = 0; i < 3; i++) {
      expect(logic.addAmazingEnhancement(gear)).toBe(true);
    }
    expect(logic.addAmazingEnhancement(gear)).toBe(false);
  });
  it("exceptUpgrade gear", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.props.set(GearPropType.exceptUpgrade, 1);
    gear.maxStar = 5;
    expect(logic.addAmazingEnhancement(gear)).toBe(true);
  });
  it("gear with req level 160", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.req.level = 160;
    expect(logic.addAmazingEnhancement(gear)).toBe(false);
  });
  it("gear with maxStar value 0", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.maxStar = 0;
    expect(logic.addAmazingEnhancement(gear)).toBe(false);
  });
  it("gear with star over maxStar", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.star = 14;
    gear.maxStar = 12;
    expect(logic.addAmazingEnhancement(gear)).toBe(false);
  });
  it("superior gear", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.props.set(GearPropType.superiorEqp, 1);
    gear.maxStar = 7;
    expect(logic.addAmazingEnhancement(gear)).toBe(false);
  });
  it("gear with starforce", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.star = 3;
    gear.maxStar = 12;
    expect(logic.addAmazingEnhancement(gear)).toBe(true);
  });
  it("ignoreMaxStar", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.star = 11;
    gear.maxStar = 12;
    expect(logic.addAmazingEnhancement(gear, false, false)).toBe(true);
    expect(logic.addAmazingEnhancement(gear, false, false)).toBe(false);
    expect(logic.addAmazingEnhancement(gear, false, true)).toBe(true);
  });
});

describe("starforce stat", () => {
  it("normal weapon", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.name = "페어리 완드";
    gear.itemID = 1372000;
    gear.type = Gear.getGearType(gear.itemID);
    gear.req.level = 38;
    gear.req.job = 2;
    gear.option(GearPropType.incPAD).base = 33;
    gear.option(GearPropType.incMAD).base = 53;
    gear.totalUpgradeCount = 7;
    gear.maxStar = Gear.getMaxStar(gear);

    for (let i = 0; i < 5; i++) {
      logic.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incINT).enchant).toBe(10);
    expect(gear.option(GearPropType.incSTR).enchant).toBe(0);
    expect(gear.option(GearPropType.incMAD).enchant).toBe(10);
  });
  it("weapon with bonus and upgrade pad", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.name = "용아주조";
    gear.itemID = 1482013;
    gear.type = Gear.getGearType(gear.itemID);
    gear.req.level = 110;
    gear.req.job = 16;
    gear.option(GearPropType.incPAD).base = 78;
    gear.totalUpgradeCount = 7;
    gear.maxStar = Gear.getMaxStar(gear);

    gear.option(GearPropType.incPAD).bonus = 18;
    gear.option(GearPropType.incPAD).upgrade = 35;
    for (let i = 0; i < 4; i++) {
      logic.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incPAD).enchant).toBe(12);
    for (let i = 4; i < 8; i++) {
      logic.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incPAD).enchant).toBe(24);
  });
  it("armor with req level 160", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.name = "하이네스 워리어헬름";
    gear.itemID = 1003797;
    gear.type = Gear.getGearType(gear.itemID);
    gear.req.level = 150;
    gear.req.job = 1;
    gear.props.set(GearPropType.bossReward, 1);
    gear.option(GearPropType.incSTR).base = 40;
    gear.option(GearPropType.incDEX).base = 40;
    gear.option(GearPropType.incPDD).base = 390;
    gear.option(GearPropType.incPAD).base = 2;
    gear.option(GearPropType.incMHP).base = 360;
    gear.option(GearPropType.incMMP).base = 360;
    gear.option(GearPropType.imdR).base = 10;
    gear.totalUpgradeCount = 11;
    gear.maxStar = Gear.getMaxStar(gear);

    gear.option(GearPropType.incINT).upgrade = 1;
    for (let i = 0; i < 22; i++) {
      logic.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incSTR).enchant).toBe(117);
    expect(gear.option(GearPropType.incINT).enchant).toBe(77);
    expect(gear.option(GearPropType.incPAD).enchant).toBe(85);
  });
  it("weapon with req level 200", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.name = "제네시스 보우";
    gear.itemID = 1452265;
    gear.type = Gear.getGearType(gear.itemID);
    gear.req.level = 200;
    gear.req.job = 4;
    gear.props.set(GearPropType.bossReward, 1);
    gear.props.set(GearPropType.exceptUpgrade, 1);
    gear.option(GearPropType.incDEX).base = 150;
    gear.option(GearPropType.incSTR).base = 150;
    gear.option(GearPropType.incPAD).base = 318;
    gear.option(GearPropType.knockback).base = 80;
    gear.option(GearPropType.imdR).base = 20;
    gear.option(GearPropType.bdR).base = 30;
    gear.option(GearPropType.incSpeed).base = 19;
    gear.totalUpgradeCount = 11;
    gear.maxStar = Gear.getMaxStar(gear);

    gear.option(GearPropType.incPAD).upgrade = 9 * 8;
    for (let i = 0; i < 22; i++) {
      logic.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incSTR).enchant).toBe(145);
    expect(gear.option(GearPropType.incMHP).enchant).toBe(255);
    expect(gear.option(GearPropType.incMMP).enchant).toBe(255);
    expect(gear.option(GearPropType.incPAD).enchant).toBe(246);
  });
  it("glove bonus stat", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.req.level = 120;
    gear.maxStar = 15;
    gear.type = GearType.glove;
    let i = 0;
    for (; i < 4; i++) {
      logic.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incPAD).enchant).toBe(0);
    for (; i < 5; i++) {
      logic.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incPAD).enchant).toBe(1);
    for (; i < 9; i++) {
      logic.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incPAD).enchant).toBe(3);
    for (; i < 14; i++) {
      logic.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incPAD).enchant).toBe(6);
    for (; i < 15; i++) {
      logic.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incPAD).enchant).toBe(7);
  });
  it("superior gear", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.name = "타일런트 히아데스 벨트";
    gear.itemID = 1132174;
    gear.type = Gear.getGearType(gear.itemID);
    gear.req.level = 150;
    gear.req.job = 1;
    gear.props.set(GearPropType.superiorEqp, 1);
    gear.props.set(GearPropType.bossReward, 1);
    gear.option(GearPropType.incPDD).base = 105;
    gear.option(GearPropType.incPAD).base = 25;
    gear.option(GearPropType.incMAD).base = 25;
    gear.option(GearPropType.incSTR).base = 50;
    gear.option(GearPropType.incINT).base = 50;
    gear.option(GearPropType.incDEX).base = 50;
    gear.option(GearPropType.incLUK).base = 50;
    gear.totalUpgradeCount = 1;
    gear.maxStar = Gear.getMaxStar(gear);

    for (let i = 0; i < 10; i++) {
      logic.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incSTR).enchant).toBe(115);
    expect(gear.option(GearPropType.incPAD).enchant).toBe(55);
    expect(gear.option(GearPropType.incMAD).enchant).toBe(55);
  });
});

describe("amazing enhancement stat", () => {
  it("normal gear", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.name = "트릭스터 레인져팬츠";
    gear.itemID = 1062167;
    gear.type = Gear.getGearType(gear.itemID);
    gear.req.level = 150;
    gear.req.job = 4;
    gear.props.set(GearPropType.bossReward, 1);
    gear.option(GearPropType.incPDD).base = 135;
    gear.option(GearPropType.incSTR).base = 30;
    gear.option(GearPropType.incDEX).base = 30;
    gear.option(GearPropType.incPAD).base = 2;
    gear.option(GearPropType.imdR).base = 5;
    gear.totalUpgradeCount = 7;
    gear.maxStar = Gear.getMaxStar(gear);

    gear.option(GearPropType.incLUK).bonus = 40;
    for (let i = 0; i < 12; i++) {
      logic.addAmazingEnhancement(gear);
    }
    expect(gear.option(GearPropType.incSTR).enchant).toBe(115);
    expect(gear.option(GearPropType.incDEX).enchant).toBe(115);
    expect(gear.option(GearPropType.incINT).enchant).toBe(0);
    expect(gear.option(GearPropType.incLUK).enchant).toBe(115);
    expect(gear.option(GearPropType.incPAD).enchant).toBe(85);
    expect(gear.option(GearPropType.incMAD).enchant).toBe(0);
  });
  it("accessory bonus stat", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.name = "마이스터링";
    gear.itemID = 1113055;
    gear.type = Gear.getGearType(gear.itemID);
    gear.req.level = 140;
    gear.props.set(GearPropType.bossReward, 1);
    gear.option(GearPropType.incSTR).base = 5;
    gear.option(GearPropType.incDEX).base = 5;
    gear.option(GearPropType.incLUK).base = 5;
    gear.option(GearPropType.incINT).base = 5;
    gear.option(GearPropType.incMHP).base = 200;
    gear.option(GearPropType.incMMP).base = 200;
    gear.option(GearPropType.incPDD).base = 150;
    gear.option(GearPropType.incPAD).base = 1;
    gear.option(GearPropType.incMAD).base = 1;
    gear.totalUpgradeCount = 1;
    gear.maxStar = Gear.getMaxStar(gear);

    for (let i = 0; i < 12; i++) {
      logic.addAmazingEnhancement(gear, true);
    }
    expect(gear.option(GearPropType.incSTR).enchant).toBe(124);
  });
});

describe("recalculate", () => {
  it("should not update enhancement stat implicitly / check value", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.type = GearType.tuner;
    gear.req.level = 200;
    gear.option(GearPropType.incPAD).base = 295;
    for (let i = 0; i < 17; i++) {
      logic.addStarforce(gear, true);
    }
    expect(gear.option(GearPropType.incPAD).enchant).toBe(137);
    gear.option(GearPropType.incPAD).upgrade = 72;
    expect(gear.option(GearPropType.incPAD).enchant).toBe(137);
    logic.recalculate(gear);
    expect(gear.option(GearPropType.incPAD).enchant).toBe(161);
  });
  it("should return true on 0 star gear", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    expect(logic.recalculate(gear)).toBe(true);
  });
  it("should work on gear with star > maxStar", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.star = 8;
    gear.maxStar = 5;
    expect(logic.recalculate(gear)).toBe(true);
    expect(gear.star).toBe(8);
  });
  it("should return false on amazing enhancement gear", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.amazing = true;
    expect(logic.recalculate(gear)).toBe(false);
  });
});

describe("resetEnhancement", () => {
  it("should return true on 0 star gear", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.star = 0;
    expect(logic.resetEnhancement(gear)).toBe(true);
  });
  it("should reset maxStar", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.name = "마이스터링";
    gear.itemID = 1113055;
    gear.type = Gear.getGearType(gear.itemID);
    gear.req.level = 140;
    gear.props.set(GearPropType.bossReward, 1);
    gear.option(GearPropType.incSTR).base = 5;
    gear.option(GearPropType.incDEX).base = 5;
    gear.option(GearPropType.incLUK).base = 5;
    gear.option(GearPropType.incINT).base = 5;
    gear.option(GearPropType.incMHP).base = 200;
    gear.option(GearPropType.incMMP).base = 200;
    gear.option(GearPropType.incPDD).base = 150;
    gear.option(GearPropType.incPAD).base = 1;
    gear.option(GearPropType.incMAD).base = 1;
    gear.totalUpgradeCount = 1;
    gear.maxStar = Gear.getMaxStar(gear);

    const refMaxStar = gear.maxStar;
    logic.addAmazingEnhancement(gear);
    expect(logic.resetEnhancement(gear)).toBe(true);
    expect(gear.maxStar).toBe(refMaxStar);
  });
  it("should reset all gear stat", () => {
    const logic = new EnhancementLogic();
    const gear = new Gear();
    gear.name = "트릭스터 레인져팬츠";
    gear.itemID = 1062167;
    gear.type = Gear.getGearType(gear.itemID);
    gear.req.level = 150;
    gear.req.job = 4;
    gear.props.set(GearPropType.bossReward, 1);
    gear.option(GearPropType.incPDD).base = 135;
    gear.option(GearPropType.incSTR).base = 30;
    gear.option(GearPropType.incDEX).base = 30;
    gear.option(GearPropType.incPAD).base = 2;
    gear.option(GearPropType.imdR).base = 5;
    gear.totalUpgradeCount = 7;
    gear.maxStar = Gear.getMaxStar(gear);

    for (let i = 0; i < 17; i++) {
      logic.addStarforce(gear);
    }
    expect(logic.resetEnhancement(gear)).toBe(true);
    expect(gear.option(GearPropType.incDEX).enchant).toBe(0);
    expect(gear.option(GearPropType.incMAD).enchant).toBe(0);
  });
});
