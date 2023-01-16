import { EnhancementLogic, Gear, GearPropType, GearType } from "../..";

describe("starforce return value", () => {
  it("normal gear", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.type = GearType.cap;
    gear.maxStar = 3;
    for (let i = 0; i < 3; i++) {
      expect(el.addStarforce(gear)).toBe(true);
    }
    expect(el.addStarforce(gear)).toBe(false);
  });
  it("normal weapon gear", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.type = GearType.bow;
    gear.maxStar = 17;
    for (let i = 0; i < 17; i++) {
      expect(el.addStarforce(gear)).toBe(true);
    }
    expect(el.addStarforce(gear)).toBe(false);
  });
  it("exceptUpgrade gear", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.props.set(GearPropType.exceptUpgrade, 1);
    gear.maxStar = 5;
    expect(el.addStarforce(gear)).toBe(true);
  });
  it("gear with maxStar value 0", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.maxStar = 0;
    expect(el.addStarforce(gear)).toBe(false);
  });
  it("gear with star over maxStar", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.star = 14;
    gear.maxStar = 12;
    expect(el.addStarforce(gear)).toBe(false);
  });
  it("superior gear", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.props.set(GearPropType.superiorEqp, 1);
    gear.maxStar = 7;
    for (let i = 0; i < 7; i++) {
      expect(el.addStarforce(gear)).toBe(true);
    }
    expect(el.addStarforce(gear)).toBe(false);
  });
  it("gear with amazing enhancement", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.star = 3;
    gear.amazing = true;
    gear.maxStar = 12;
    expect(el.addStarforce(gear)).toBe(true);
  });
  it("ignoreMaxStar", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.star = 11;
    gear.maxStar = 12;
    expect(el.addStarforce(gear, false)).toBe(true);
    expect(el.addStarforce(gear, false)).toBe(false);
    expect(el.addStarforce(gear, true)).toBe(true);
  });
});

describe("amazing enhancement return value", () => {
  it("normal gear", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.type = GearType.cap;
    gear.maxStar = 3;
    for (let i = 0; i < 3; i++) {
      expect(el.addAmazingEnhancement(gear)).toBe(true);
    }
    expect(el.addAmazingEnhancement(gear)).toBe(false);
  });
  it("exceptUpgrade gear", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.props.set(GearPropType.exceptUpgrade, 1);
    gear.maxStar = 5;
    expect(el.addAmazingEnhancement(gear)).toBe(true);
  });
  it("gear with req level 160", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.req.level = 160;
    expect(el.addAmazingEnhancement(gear)).toBe(false);
  });
  it("gear with maxStar value 0", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.maxStar = 0;
    expect(el.addAmazingEnhancement(gear)).toBe(false);
  });
  it("gear with star over maxStar", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.star = 14;
    gear.maxStar = 12;
    expect(el.addAmazingEnhancement(gear)).toBe(false);
  });
  it("superior gear", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.props.set(GearPropType.superiorEqp, 1);
    gear.maxStar = 7;
    expect(el.addAmazingEnhancement(gear)).toBe(false);
  });
  it("gear with starforce", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.star = 3;
    gear.maxStar = 12;
    expect(el.addAmazingEnhancement(gear)).toBe(true);
  });
  it("ignoreMaxStar", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.star = 11;
    gear.maxStar = 12;
    expect(el.addAmazingEnhancement(gear, false, false)).toBe(true);
    expect(el.addAmazingEnhancement(gear, false, false)).toBe(false);
    expect(el.addAmazingEnhancement(gear, false, true)).toBe(true);
  });
});

describe("starforce stat", () => {
  it("normal weapon", () => {
    const el = new EnhancementLogic();
    const gear = createGearFromID(1372000); // 페어리 완드
    for (let i = 0; i < 5; i++) {
      el.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incINT).enchant).toBe(10);
    expect(gear.option(GearPropType.incSTR).enchant).toBe(0);
    expect(gear.option(GearPropType.incMAD).enchant).toBe(10);
  });
  it("weapon with bonus and upgrade pad", () => {
    const el = new EnhancementLogic();
    const gear = createGearFromID(1482013); // 용아주조
    gear.option(GearPropType.incPAD).bonus = 18;
    gear.option(GearPropType.incPAD).upgrade = 35;
    for (let i = 0; i < 4; i++) {
      el.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incPAD).enchant).toBe(12);
    for (let i = 4; i < 8; i++) {
      el.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incPAD).enchant).toBe(24);
  });
  it("armor with req level 160", () => {
    const el = new EnhancementLogic();
    const gear = createGearFromID(1003797); // 하이네스 워리어헬름
    gear.option(GearPropType.incINT).upgrade = 1;
    for (let i = 0; i < 22; i++) {
      el.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incSTR).enchant).toBe(117);
    expect(gear.option(GearPropType.incINT).enchant).toBe(77);
    expect(gear.option(GearPropType.incPAD).enchant).toBe(85);
  });
  it("weapon with req level 200", () => {
    const el = new EnhancementLogic();
    const gear = createGearFromID(1452266); // 제네시스 보우
    gear.option(GearPropType.incPAD).upgrade = 9 * 8;
    for (let i = 0; i < 22; i++) {
      el.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incSTR).enchant).toBe(145);
    expect(gear.option(GearPropType.incMHP).enchant).toBe(255);
    expect(gear.option(GearPropType.incMMP).enchant).toBe(255);
    expect(gear.option(GearPropType.incPAD).enchant).toBe(246);
  });
  it("glove bonus stat", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.req.level = 120;
    gear.maxStar = 15;
    gear.type = GearType.glove;
    let i = 0;
    for (; i < 4; i++) {
      el.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incPAD).enchant).toBe(0);
    for (; i < 5; i++) {
      el.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incPAD).enchant).toBe(1);
    for (; i < 9; i++) {
      el.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incPAD).enchant).toBe(3);
    for (; i < 14; i++) {
      el.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incPAD).enchant).toBe(6);
    for (; i < 15; i++) {
      el.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incPAD).enchant).toBe(7);
  });
  it("superior gear", () => {
    const el = new EnhancementLogic();
    const gear = createGearFromID(1132174); // 타일런트 히아데스 벨트
    for (let i = 0; i < 10; i++) {
      el.addStarforce(gear);
    }
    expect(gear.option(GearPropType.incSTR).enchant).toBe(115);
    expect(gear.option(GearPropType.incPAD).enchant).toBe(55);
    expect(gear.option(GearPropType.incMAD).enchant).toBe(55);
  });
});

describe("amazing enhancement stat", () => {
  it("normal gear", () => {
    const el = new EnhancementLogic();
    const gear = createGearFromID(1062167); // 트릭스터 레인져팬츠
    gear.option(GearPropType.incLUK).bonus = 40;
    for (let i = 0; i < 12; i++) {
      el.addAmazingEnhancement(gear);
    }
    expect(gear.option(GearPropType.incSTR).enchant).toBe(115);
    expect(gear.option(GearPropType.incDEX).enchant).toBe(115);
    expect(gear.option(GearPropType.incINT).enchant).toBe(0);
    expect(gear.option(GearPropType.incLUK).enchant).toBe(115);
    expect(gear.option(GearPropType.incPAD).enchant).toBe(85);
    expect(gear.option(GearPropType.incMAD).enchant).toBe(0);
  });
  it("accessory bonus stat", () => {
    const el = new EnhancementLogic();
    const gear = createGearFromID(1113055); // 마이스터링
    for (let i = 0; i < 12; i++) {
      el.addAmazingEnhancement(true);
    }
    expect(gear.option(GearPropType.incSTR).enchant).toBe(124);
  });
});

describe("recalculate", () => {
  it("should not update enhancement stat implicitly / check value", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.type = GearType.tuner;
    gear.req.level = 200;
    gear.option(GearPropType.incPAD).base = 295;
    for (let i = 0; i < 17; i++) {
      el.addStarforce(gear, true);
    }
    expect(gear.option(GearPropType.incPAD).enchant).toBe(137);
    gear.option(GearPropType.incPAD).upgrade = 72;
    expect(gear.option(GearPropType.incPAD).enchant).toBe(137);
    el.recalculate(gear);
    expect(gear.option(GearPropType.incPAD).enchant).toBe(161);
  });
  it("should return true on 0 star gear", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    expect(el.recalculate()).toBe(true);
  });
  it("should work on gear with star > maxStar", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.star = 8;
    gear.maxStar = 5;
    expect(el.recalculate(gear)).toBe(true);
    expect(gear.star).toBe(8);
  });
  it("should return false on amazing enhancement gear", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.amazing = true;
    expect(el.recalculate(gear)).toBe(false);
  });
});

describe("resetEnhancement", () => {
  it("should return true on 0 star gear", () => {
    const el = new EnhancementLogic();
    const gear = new Gear();
    gear.star = 0;
    expect(el.resetEnhancement(gear)).toBe(true);
  });
  it("should reset maxStar", () => {
    const el = new EnhancementLogic();
    const gear = createGearFromID(1113055); // 마이스터링
    const refMaxStar = gear.maxStar;
    el.addAmazingEnhancement(gear);
    expect(el.resetEnhancement(gear)).toBe(true);
    expect(gear.maxStar).toBe(refMaxStar);
  });
  it("should reset all gear stat", () => {
    const el = new EnhancementLogic();
    const gear = createGearFromID(1062167); // 트릭스터 레인져팬츠
    for (let i = 0; i < 17; i++) {
      el.addStarforce(gear);
    }
    expect(el.resetEnhancement(gear)).toBe(true);
    expect(gear.option(GearPropType.incDEX).enchant).toBe(0);
    expect(gear.option(GearPropType.incMAD).enchant).toBe(0);
  });
});
