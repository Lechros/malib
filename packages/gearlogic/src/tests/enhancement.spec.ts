import { Gear, GearPropType, GearType } from "@malib/gear";
import { fail } from "assert";
import { EnhancementLogic } from "../lib/enhancement";
import { createGearFromID } from "./util";

test("init EnhancementLogic", () => {
  const gear = new Gear();
  const el = new EnhancementLogic(gear);
  expect(el.gear).toBe(gear);
});

describe("starforce return value", () => {
  it("normal gear", () => {
    const el = new EnhancementLogic();
    el.gear = new Gear();
    el.gear.type = GearType.cap;
    el.gear.maxStar = 3;
    for (let i = 0; i < 3; i++) {
      expect(el.addStarforce()).toBe(true);
    }
    expect(el.addStarforce()).toBe(false);
  });
  it("normal weapon gear", () => {
    const el = new EnhancementLogic();
    el.gear = new Gear();
    el.gear.type = GearType.bow;
    el.gear.maxStar = 17;
    for (let i = 0; i < 17; i++) {
      expect(el.addStarforce()).toBe(true);
    }
    expect(el.addStarforce()).toBe(false);
  });
  it("exceptUpgrade gear", () => {
    const el = new EnhancementLogic();
    el.gear = new Gear();
    el.gear.props.set(GearPropType.exceptUpgrade, 1);
    el.gear.maxStar = 5;
    expect(el.addStarforce()).toBe(true);
  });
  it("gear with maxStar value 0", () => {
    const el = new EnhancementLogic();
    el.gear = new Gear();
    el.gear.maxStar = 0;
    expect(el.addStarforce()).toBe(false);
  });
  it("gear with star over maxStar", () => {
    const el = new EnhancementLogic();
    el.gear = new Gear();
    el.gear.star = 14;
    el.gear.maxStar = 12;
    expect(el.addStarforce()).toBe(false);
  });
  it("superior gear", () => {
    const el = new EnhancementLogic();
    el.gear = new Gear();
    el.gear.props.set(GearPropType.superiorEqp, 1);
    el.gear.maxStar = 7;
    for (let i = 0; i < 7; i++) {
      expect(el.addStarforce()).toBe(true);
    }
    expect(el.addStarforce()).toBe(false);
  });
  it("gear with amazing enhancement", () => {
    const el = new EnhancementLogic();
    el.gear = new Gear();
    el.gear.star = 3;
    el.gear.amazing = true;
    el.gear.maxStar = 12;
    expect(el.addStarforce()).toBe(true);
  });
  it("ignoreMaxStar", () => {
    const el = new EnhancementLogic();
    el.gear = new Gear();
    el.gear.star = 11;
    el.gear.maxStar = 12;
    expect(el.addStarforce(false)).toBe(true);
    expect(el.addStarforce(false)).toBe(false);
    expect(el.addStarforce(true)).toBe(true);
  });
});

describe("amazing enhancement return value", () => {
  it("normal gear", () => {
    const el = new EnhancementLogic();
    el.gear = new Gear();
    el.gear.type = GearType.cap;
    el.gear.maxStar = 3;
    for (let i = 0; i < 3; i++) {
      expect(el.addAmazingEnhancement()).toBe(true);
    }
    expect(el.addAmazingEnhancement()).toBe(false);
  });
  it("exceptUpgrade gear", () => {
    const el = new EnhancementLogic();
    el.gear = new Gear();
    el.gear.props.set(GearPropType.exceptUpgrade, 1);
    el.gear.maxStar = 5;
    expect(el.addAmazingEnhancement()).toBe(true);
  });
  it("gear with req level 160", () => {
    const el = new EnhancementLogic();
    el.gear = new Gear();
    el.gear.req.level = 160;
    expect(el.addAmazingEnhancement()).toBe(false);
  });
  it("gear with maxStar value 0", () => {
    const el = new EnhancementLogic();
    el.gear = new Gear();
    el.gear.maxStar = 0;
    expect(el.addAmazingEnhancement()).toBe(false);
  });
  it("gear with star over maxStar", () => {
    const el = new EnhancementLogic();
    el.gear = new Gear();
    el.gear.star = 14;
    el.gear.maxStar = 12;
    expect(el.addAmazingEnhancement()).toBe(false);
  });
  it("superior gear", () => {
    const el = new EnhancementLogic();
    el.gear = new Gear();
    el.gear.props.set(GearPropType.superiorEqp, 1);
    el.gear.maxStar = 7;
    expect(el.addAmazingEnhancement()).toBe(false);
  });
  it("gear with starforce", () => {
    const el = new EnhancementLogic();
    el.gear = new Gear();
    el.gear.star = 3;
    el.gear.maxStar = 12;
    expect(el.addAmazingEnhancement()).toBe(true);
  });
  it("ignoreMaxStar", () => {
    const el = new EnhancementLogic();
    el.gear = new Gear();
    el.gear.star = 11;
    el.gear.maxStar = 12;
    expect(el.addAmazingEnhancement(false, false)).toBe(true);
    expect(el.addAmazingEnhancement(false, false)).toBe(false);
    expect(el.addAmazingEnhancement(false, true)).toBe(true);
  });
});

describe("starforce stat", () => {
  it("normal weapon", () => {
    const el = new EnhancementLogic();
    el.gear = createGearFromID(1372000); // 페어리 완드
    if (!el.gear) {
      fail();
    }
    for (let i = 0; i < 5; i++) {
      el.addStarforce();
    }
    expect(el.gear.option(GearPropType.incINT).enchant).toBe(10);
    expect(el.gear.option(GearPropType.incSTR).enchant).toBe(0);
    expect(el.gear.option(GearPropType.incMAD).enchant).toBe(10);
  });
  it("weapon with bonus and upgrade pad", () => {
    const el = new EnhancementLogic();
    el.gear = createGearFromID(1482013); // 용아주조
    if (!el.gear) {
      fail();
    }
    el.gear.option(GearPropType.incPAD).bonus = 18;
    el.gear.option(GearPropType.incPAD).upgrade = 35;
    for (let i = 0; i < 4; i++) {
      el.addStarforce();
    }
    expect(el.gear.option(GearPropType.incPAD).enchant).toBe(12);
    for (let i = 4; i < 8; i++) {
      el.addStarforce();
    }
    expect(el.gear.option(GearPropType.incPAD).enchant).toBe(24);
  });
  it("armor with req level 160", () => {
    const el = new EnhancementLogic();
    el.gear = createGearFromID(1003797); // 하이네스 워리어헬름
    if (!el.gear) {
      fail();
    }
    el.gear.option(GearPropType.incINT).upgrade = 1;
    for (let i = 0; i < 22; i++) {
      el.addStarforce();
    }
    expect(el.gear.option(GearPropType.incSTR).enchant).toBe(117);
    expect(el.gear.option(GearPropType.incINT).enchant).toBe(77);
    expect(el.gear.option(GearPropType.incPAD).enchant).toBe(85);
  });
  it("weapon with req level 200", () => {
    const el = new EnhancementLogic();
    el.gear = createGearFromID(1452266); // 제네시스 보우
    if (!el.gear) {
      fail();
    }
    el.gear.option(GearPropType.incPAD).upgrade = 9 * 8;
    for (let i = 0; i < 22; i++) {
      el.addStarforce();
    }
    expect(el.gear.option(GearPropType.incSTR).enchant).toBe(145);
    expect(el.gear.option(GearPropType.incMHP).enchant).toBe(255);
    expect(el.gear.option(GearPropType.incMMP).enchant).toBe(255);
    expect(el.gear.option(GearPropType.incPAD).enchant).toBe(246);
  });
  it("glove bonus stat", () => {
    const el = new EnhancementLogic();
    el.gear = new Gear();
    el.gear.req.level = 120;
    el.gear.maxStar = 15;
    el.gear.type = GearType.glove;
    let i = 0;
    for (; i < 4; i++) {
      el.addStarforce();
    }
    expect(el.gear.option(GearPropType.incPAD).enchant).toBe(0);
    for (; i < 5; i++) {
      el.addStarforce();
    }
    expect(el.gear.option(GearPropType.incPAD).enchant).toBe(1);
    for (; i < 9; i++) {
      el.addStarforce();
    }
    expect(el.gear.option(GearPropType.incPAD).enchant).toBe(3);
    for (; i < 14; i++) {
      el.addStarforce();
    }
    expect(el.gear.option(GearPropType.incPAD).enchant).toBe(6);
    for (; i < 15; i++) {
      el.addStarforce();
    }
    expect(el.gear.option(GearPropType.incPAD).enchant).toBe(7);
  });
});

describe("amazing enhancement stat", () => {
  it("normal gear", () => {
    const el = new EnhancementLogic();
    el.gear = createGearFromID(1062167); // 트릭스터 레인져팬츠
    if (!el.gear) {
      fail();
    }
    el.gear.option(GearPropType.incLUK).bonus = 40;
    for (let i = 0; i < 12; i++) {
      el.addAmazingEnhancement();
    }
    expect(el.gear.option(GearPropType.incSTR).enchant).toBe(115);
    expect(el.gear.option(GearPropType.incDEX).enchant).toBe(115);
    expect(el.gear.option(GearPropType.incINT).enchant).toBe(0);
    expect(el.gear.option(GearPropType.incLUK).enchant).toBe(115);
    expect(el.gear.option(GearPropType.incPAD).enchant).toBe(85);
    expect(el.gear.option(GearPropType.incMAD).enchant).toBe(0);
  });
  it("accessory bonus stat", () => {
    const el = new EnhancementLogic();
    el.gear = createGearFromID(1113055); // 마이스터링
    if (!el.gear) {
      fail();
    }
    for (let i = 0; i < 12; i++) {
      el.addAmazingEnhancement(true);
    }
    expect(el.gear.option(GearPropType.incSTR).enchant).toBe(124);
  });
});
