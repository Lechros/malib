import { Gear, GearPropType, GearType, type Soul } from "../..";
import {
  Potential,
  PotentialGrade,
  addStarforce,
  migrate,
  migrateAnvil,
  migrateBonus,
  migrateEnhancement,
  migrateExceptional,
  migratePotential,
  migrateProps,
  migrateSoul,
  migrateUpgrade,
} from "../../internal";

describe("migrateProps", () => {
  it("should migrate props", () => {
    const original = getTestGear();
    original.props.set(GearPropType.onlyEquip, 1);
    original.props.set(GearPropType.tradeBlock, 1);
    original.props.set(GearPropType.tradeAvailable, 1);
    const target = getTestGear();
    target.props.set(GearPropType.only, 1);

    migrateProps(original, target);

    expect(target.props).toEqual(
      new Map([
        [GearPropType.onlyEquip, 1],
        [GearPropType.tradeBlock, 1],
        [GearPropType.tradeAvailable, 1],
        [GearPropType.only, 1],
      ])
    );
  });
  it("should not migrate ignored props", () => {
    const original = getTestGear();
    original.props.set(GearPropType.onlyEquip, 1);
    original.props.set(GearPropType.tradeBlock, 1);
    original.props.set(GearPropType.tradeAvailable, 1);
    const target = getTestGear();
    target.props.set(GearPropType.only, 1);
    target.props.set(GearPropType.tradeAvailable, 1);

    migrateProps(original, target, [
      GearPropType.tradeBlock,
      GearPropType.tradeAvailable,
    ]);

    expect(target.props).toEqual(
      new Map([
        [GearPropType.onlyEquip, 1],
        [GearPropType.tradeAvailable, 1],
        [GearPropType.only, 1],
      ])
    );
  });
});

describe("migrateAnvil", () => {
  it("should migrate anvil data", () => {
    const original = getTestGear();
    original.anvil = { icon: { id: 1010101 }, name: "anvil name" };
    const target = getTestGear();

    migrateAnvil(original, target);

    expect(target.anvil?.icon.id).toBe(1010101);
    expect(target.anvil?.name).toBe("anvil name");
  });
});

describe("migrateBonus", () => {
  it("should migrate bouns", () => {
    const original = getTestGear();
    original.option(GearPropType.incSTR).bonus = 15;
    original.option(GearPropType.incINT).bonus = 7;
    original.option(GearPropType.incMAD).bonus = 5;
    const target = getTestGear();

    migrateBonus(original, target);

    expect(target.option(GearPropType.incSTR).bonus).toBe(15);
    expect(target.option(GearPropType.incINT).bonus).toBe(7);
    expect(target.option(GearPropType.incMAD).bonus).toBe(5);
  });
  it("should remove previous bonus", () => {
    const original = getTestGear();
    original.option(GearPropType.incSTR).bonus = 15;
    const target = getTestGear();
    target.option(GearPropType.incLUK).bonus = 99;

    migrateBonus(original, target);

    expect(target.option(GearPropType.incLUK).bonus).toBe(0);
  });
  it("should not affect other option values", () => {
    const original = getTestGear();
    original.option(GearPropType.incDEX).base = 10;
    original.option(GearPropType.incDEX).bonus = 15;
    original.option(GearPropType.incDEX).upgrade = 7;
    original.option(GearPropType.incDEX).enchant = 30;
    const target = getTestGear();
    target.option(GearPropType.incDEX).base = 8;
    target.option(GearPropType.incDEX).bonus = 40;
    target.option(GearPropType.incDEX).upgrade = 15;
    target.option(GearPropType.incDEX).enchant = 70;

    migrateBonus(original, target);

    expect(target.option(GearPropType.incDEX).base).toBe(8);
    expect(target.option(GearPropType.incDEX).bonus).toBe(15);
    expect(target.option(GearPropType.incDEX).upgrade).toBe(15);
    expect(target.option(GearPropType.incDEX).enchant).toBe(70);
  });
});

describe("migrateUpgrade", () => {
  it("should migrate upgrade count/fail/hammer", () => {
    const original = getTestGear();
    original.totalUpgradeCount = 10;
    original.upgradeCount = 3;
    original.upgradeFailCount = 2;
    original.hammerCount = 1;
    const target = getTestGear();
    target.totalUpgradeCount = 9;

    migrateUpgrade(original, target);

    // should migrate
    expect(target.upgradeCount).toBe(3);
    expect(target.upgradeFailCount).toBe(2);
    expect(target.hammerCount).toBe(1);
    // should not migrate
    expect(target.totalUpgradeCount).toBe(9);
  });
  it("should migrate upgrade option", () => {
    const original = getTestGear();
    original.option(GearPropType.incSTR).upgrade = 15;
    original.option(GearPropType.incINT).upgrade = 7;
    original.option(GearPropType.incMAD).upgrade = 5;
    const target = getTestGear();

    migrateUpgrade(original, target);

    expect(target.option(GearPropType.incSTR).upgrade).toBe(15);
    expect(target.option(GearPropType.incINT).upgrade).toBe(7);
    expect(target.option(GearPropType.incMAD).upgrade).toBe(5);
  });
  it("should remove previous upgrade option", () => {
    const original = getTestGear();
    original.option(GearPropType.incSTR).upgrade = 15;
    original.option(GearPropType.incINT).upgrade = 7;
    original.option(GearPropType.incMAD).upgrade = 5;
    const target = getTestGear();
    target.option(GearPropType.incLUK).upgrade = 99;

    migrateUpgrade(original, target);

    expect(target.option(GearPropType.incLUK).upgrade).toBe(0);
  });
  it("should not affect other option values", () => {
    const original = getTestGear();
    original.option(GearPropType.incDEX).base = 10;
    original.option(GearPropType.incDEX).bonus = 15;
    original.option(GearPropType.incDEX).upgrade = 7;
    original.option(GearPropType.incDEX).enchant = 30;
    const target = getTestGear();
    target.option(GearPropType.incDEX).base = 8;
    target.option(GearPropType.incDEX).bonus = 40;
    target.option(GearPropType.incDEX).upgrade = 15;
    target.option(GearPropType.incDEX).enchant = 70;

    migrateUpgrade(original, target);

    expect(target.option(GearPropType.incDEX).base).toBe(8);
    expect(target.option(GearPropType.incDEX).bonus).toBe(40);
    expect(target.option(GearPropType.incDEX).upgrade).toBe(7);
    expect(target.option(GearPropType.incDEX).enchant).toBe(70);
  });
});

describe("migrateEnhancement", () => {
  it("should migrate star", () => {
    const original = getTestGear();
    original.maxStar = 20;
    original.star = 17;
    const target = getTestGear();
    target.maxStar = 25;

    migrateEnhancement(original, target);

    expect(target.star).toBe(17);
  });
  it("should not migrate maxStar", () => {
    const original = getTestGear();
    original.maxStar = 20;
    original.star = 17;
    const target = getTestGear();
    target.maxStar = 25;

    migrateEnhancement(original, target);

    expect(target.maxStar).toBe(25);
  });
  it("should migrate amazing", () => {
    const original = getTestGear();
    original.maxStar = 15;
    original.star = 12;
    original.amazing = true;
    const target = getTestGear();
    target.maxStar = 20;

    migrateEnhancement(original, target);

    expect(target.amazing).toBe(true);
    expect(target.maxStar).toBe(15);
  });
  it("should recalculate starforce option", () => {
    const original = getTestGear();
    original.maxStar = 25;
    original.star = 17;
    original.option(GearPropType.incSTR).base = 1;
    original.option(GearPropType.incSTR).enchant = 1;
    original.option(GearPropType.incPAD).base = 1;
    original.option(GearPropType.incPAD).enchant = 1;
    const target = getTestGear();
    target.maxStar = 20;

    migrateEnhancement(original, target);

    expect(target.option(GearPropType.incSTR).enchant).toBeGreaterThan(1);
    expect(target.option(GearPropType.incPAD).enchant).toBeGreaterThan(1);
  });
  it("should not recalculate amazing option", () => {
    const original = getTestGear();
    original.maxStar = 15;
    original.star = 12;
    original.amazing = true;
    original.option(GearPropType.incSTR).base = 1;
    original.option(GearPropType.incSTR).enchant = 1;
    original.option(GearPropType.incPAD).base = 1;
    original.option(GearPropType.incPAD).enchant = 1;
    const target = getTestGear();
    target.maxStar = 20;

    migrateEnhancement(original, target);

    expect(target.option(GearPropType.incSTR).enchant).toBe(1);
    expect(target.option(GearPropType.incPAD).enchant).toBe(1);
    expect(target.maxStar).toBeLessThanOrEqual(15);
  });
  it("should ignore target maxStar", () => {
    const original = getTestGear();
    original.maxStar = 15;
    original.star = 17;
    original.option(GearPropType.incSTR).base = 1;
    original.option(GearPropType.incSTR).enchant = 1;
    original.option(GearPropType.incPAD).base = 1;
    original.option(GearPropType.incPAD).enchant = 1;
    const target = getTestGear();
    target.maxStar = 15;

    migrateEnhancement(original, target);

    expect(target.star).toBe(17);
  });
});

describe("migrateExceptional", () => {
  it("should migrate exceptional upgrade count", () => {
    const original = getTestGear();
    original.exceptionalUpgradeCount = 1;
    original.exceptionalTotalUpgradeCount = 1;
    const target = getTestGear();
    target.exceptionalUpgradeCount = 0;
    target.exceptionalTotalUpgradeCount = 1;

    migrateExceptional(original, target);

    expect(target.exceptionalUpgradeCount).toBe(1);
  });
  it("should not migrate exceptional total upgrade count", () => {
    const original = getTestGear();
    original.exceptionalUpgradeCount = 1;
    original.exceptionalTotalUpgradeCount = 1;
    const target = getTestGear();
    target.exceptionalTotalUpgradeCount = 2;

    migrateExceptional(original, target);

    expect(target.exceptionalTotalUpgradeCount).toBe(2);
  });
  it("should migrate exceptional option", () => {
    const original = getTestGear();
    original.exceptionalUpgradeCount = 1;
    original.exceptionalTotalUpgradeCount = 1;
    original.exceptionalOptions = new Map([
      [GearPropType.incSTR, 20],
      [GearPropType.incINT, 15],
      [GearPropType.incPAD, 10],
    ]);
    const target = getTestGear();
    target.exceptionalTotalUpgradeCount = 1;

    migrateExceptional(original, target);

    expect(target.exceptionalOptions).toEqual(
      new Map([
        [GearPropType.incSTR, 20],
        [GearPropType.incINT, 15],
        [GearPropType.incPAD, 10],
      ])
    );
  });
  it("should not reuse same object", () => {
    const original = getTestGear();
    original.exceptionalUpgradeCount = 1;
    original.exceptionalTotalUpgradeCount = 1;
    original.exceptionalOptions = new Map([
      [GearPropType.incSTR, 20],
      [GearPropType.incINT, 15],
      [GearPropType.incPAD, 10],
    ]);
    const target = getTestGear();
    target.exceptionalTotalUpgradeCount = 1;

    migrateExceptional(original, target);

    expect(target.exceptionalOptions).not.toBe(original.exceptionalOptions);
  });
});

describe("migratePotential", () => {
  it("should migrate grade", () => {
    const original = getTestGear();
    original.canPotential = true;
    original.grade = PotentialGrade.unique;
    const target = getTestGear();
    target.grade = PotentialGrade.epic;
    const func = () => undefined;

    migratePotential(original, target, func);

    expect(target.grade).toBe(PotentialGrade.unique);
  });
  it("should migrate additional grade", () => {
    const original = getTestGear();
    original.canPotential = true;
    original.additionalGrade = PotentialGrade.epic;
    const target = getTestGear();
    target.additionalGrade = PotentialGrade.legendary;
    const func = () => undefined;

    migratePotential(original, target, func);

    expect(target.additionalGrade).toBe(PotentialGrade.epic);
  });
  it("should migrate potentials", () => {
    const original = getTestGear();
    original.canPotential = true;
    original.grade = PotentialGrade.unique;
    original.potentials[0] = getTestPotential(
      1,
      Potential.getPotentialLevel(original.req.level)
    );
    original.potentials[1] = null;
    original.potentials[2] = getTestPotential(
      3,
      Potential.getPotentialLevel(original.req.level)
    );
    const target = getTestGear();

    migratePotential(original, target);

    expect(target.potentials[0]?.code).toBe(1);
    expect(target.potentials[0]?.option).toEqual(
      new Map([
        [GearPropType.incSTR, Potential.getPotentialLevel(target.req.level)],
      ])
    );
    expect(target.potentials[1]).toBe(null);
    expect(target.potentials[2]?.code).toBe(3);
    expect(target.potentials[2]?.summary).toBe("test pad: #incPAD");
  });
  it("should migrate additional potentials", () => {
    const original = getTestGear();
    original.canPotential = true;
    original.additionalGrade = PotentialGrade.unique;
    original.additionalPotentials[0] = getTestPotential(
      1,
      Potential.getPotentialLevel(original.req.level)
    );
    original.additionalPotentials[1] = null;
    original.additionalPotentials[2] = getTestPotential(
      3,
      Potential.getPotentialLevel(original.req.level)
    );
    const target = getTestGear();

    migratePotential(original, target);

    expect(target.additionalPotentials[0]?.code).toBe(1);
    expect(target.additionalPotentials[0]?.option).toEqual(
      new Map([
        [GearPropType.incSTR, Potential.getPotentialLevel(target.req.level)],
      ])
    );
    expect(target.additionalPotentials[1]).toBe(null);
    expect(target.additionalPotentials[2]?.code).toBe(3);
    expect(target.additionalPotentials[2]?.summary).toBe("test pad: #incPAD");
  });
  it("should recalculate migrate potentials", () => {
    const original = getTestGear();
    original.canPotential = true;
    original.grade = PotentialGrade.unique;
    original.potentials[0] = getTestPotential(1, 3);
    const target = getTestGear();

    migratePotential(original, target, getTestPotential);

    expect(target.potentials[0]?.code).toBe(1);
    expect(target.potentials[0]?.option).toEqual(
      new Map([
        [GearPropType.incSTR, Potential.getPotentialLevel(target.req.level)],
      ])
    );
  });
  it("should recalculate migrate additional potentials", () => {
    const original = getTestGear();
    original.canPotential = true;
    original.grade = PotentialGrade.unique;
    original.potentials[0] = getTestPotential(1, 4);
    const target = getTestGear();

    migratePotential(original, target, getTestPotential);

    expect(target.potentials[0]?.code).toBe(1);
    expect(target.potentials[0]?.option).toEqual(
      new Map([
        [GearPropType.incSTR, Potential.getPotentialLevel(target.req.level)],
      ])
    );
  });
  it("should not migrate canPotential", () => {
    const original = getTestGear();
    original.canPotential = true;
    const target = getTestGear();
    target.canPotential = false;

    migratePotential(original, target);

    expect(target.canPotential).toBe(false);
  });
  it("should not reuse same object", () => {
    const original = getTestGear();
    original.canPotential = true;
    original.grade = PotentialGrade.unique;
    original.potentials[0] = getTestPotential(
      1,
      Potential.getPotentialLevel(original.req.level)
    );
    original.potentials[1] = getTestPotential(
      3,
      Potential.getPotentialLevel(original.req.level)
    );
    const target = getTestGear();

    migratePotential(original, target);

    expect(target.potentials[0]).not.toBe(original.potentials[0]);
    expect(target.potentials[1]).not.toBe(original.potentials[1]);
  });
});

describe("migrateSoul", () => {
  it("should migrate enchanted", () => {
    const original = getTestGear();
    original.soulWeapon.enchanted = true;
    const target = getTestGear();

    migrateSoul(original, target);

    expect(target.soulWeapon.enchanted).toBe(true);
  });
  it("should migrate charge", () => {
    const original = getTestGear();
    original.soulWeapon.enchanted = true;
    original.soulWeapon.charge = 15;
    const target = getTestGear();

    migrateSoul(original, target);

    expect(target.soulWeapon.charge).toBe(15);
  });
  it("should migrate charge option", () => {
    const original = getTestGear();
    original.soulWeapon.enchanted = true;
    original.soulWeapon.setCharge(150);
    const target = getTestGear();

    migrateSoul(original, target);

    expect(target.soulWeapon.chargeOption).toEqual(
      original.soulWeapon.chargeOption
    );
    expect(target.soulWeapon.chargeOption).not.toBe(
      original.soulWeapon.chargeOption
    );
  });
  it("should migrate soul and not use same object", () => {
    const original = getTestGear();
    original.soulWeapon.enchanted = true;
    original.soulWeapon.setSoul(getTestSoul());
    const target = getTestGear();

    migrateSoul(original, target);

    expect(target.soulWeapon.soul).toEqual(original.soulWeapon.soul);
    expect(target.soulWeapon.soul).not.toBe(original.soulWeapon.soul);
  });
});

describe("migrate", () => {
  it("should migrate props", () => {
    const original = getTestGear();
    original.props.set(GearPropType.bossReward, 1);
    original.props.set(GearPropType.equipTradeBlock, 1);
    original.props.set(GearPropType.setItemID, 677);
    original.props.set(GearPropType.tradeAvailable, 2);
    const target = getTestGear();
    target.props.set(GearPropType.setItemID, 677);
    target.props.set(GearPropType.tradeBlock, 1);

    migrate(original, target, {
      ignorePropTypes: [GearPropType.equipTradeBlock],
    });

    expect(target.props).toEqual(
      new Map([
        [GearPropType.bossReward, 1],
        [GearPropType.tradeBlock, 1],
        [GearPropType.setItemID, 677],
        [GearPropType.tradeAvailable, 2],
      ])
    );
  });
  it("should migrate anvil", () => {
    const original = getTestGear();
    original.anvil = { icon: { id: 1231231 }, name: "migrate test anvil" };
    const target = getTestGear();

    migrate(original, target);

    expect(target.anvil).toEqual({
      icon: { id: 1231231 },
      name: "migrate test anvil",
    });
  });
  it("should migrate bonus", () => {
    const original = getTestGear();
    original.option(GearPropType.incDEX).bonus = 15;
    original.option(GearPropType.statR).bonus = 3;
    const target = getTestGear();
    target.option(GearPropType.incLUK).bonus = 20;

    migrate(original, target);

    expect(target.option(GearPropType.incDEX).bonus).toBe(15);
    expect(target.option(GearPropType.statR).bonus).toBe(3);
    expect(target.option(GearPropType.incLUK).bonus).toBe(0);
  });
  it("should migrate upgrade", () => {
    const original = getTestGear();
    original.totalUpgradeCount = 10;
    original.upgradeCount = 7;
    original.upgradeFailCount = 2;
    original.hammerCount = 1;
    original.option(GearPropType.incINT).upgrade = 25;
    original.option(GearPropType.incMAD).upgrade = 40;
    const target = getTestGear();
    target.totalUpgradeCount = 10;

    migrate(original, target);

    expect(target.totalUpgradeCount).toBe(10);
    expect(target.upgradeCount).toBe(7);
    expect(target.upgradeFailCount).toBe(2);
    expect(target.hammerCount).toBe(1);
    expect(target.option(GearPropType.incINT).upgrade).toBe(25);
    expect(target.option(GearPropType.incMAD).upgrade).toBe(40);
  });
  it("should migrate enhancement", () => {
    const original = getTestGear();
    original.maxStar = 25;
    for (let i = 0; i < 17; i++) {
      addStarforce(original);
    }
    const target = getTestGear();
    original.maxStar = 25;

    migrate(original, target);

    expect(target.maxStar).toBe(25);
    expect(target.star).toBe(17);
    expect(target.option(GearPropType.incSTR).enchant).toBeGreaterThan(41);
  });
  it("should migrate exceptional", () => {
    const original = getTestGear();
    original.exceptionalTotalUpgradeCount = 1;
    original.exceptionalUpgradeCount = 1;
    original.exceptionalOptions = new Map([
      [GearPropType.incSTR, 20],
      [GearPropType.incPAD, 10],
      [GearPropType.incMHP, 1000],
    ]);
    const target = getTestGear();
    target.exceptionalTotalUpgradeCount = 1;

    migrate(original, target);

    expect(target.exceptionalUpgradeCount).toBe(1);
    expect(target.exceptionalOptions).toEqual(
      new Map([
        [GearPropType.incSTR, 20],
        [GearPropType.incPAD, 10],
        [GearPropType.incMHP, 1000],
      ])
    );
  });
  it("should migrate potential", () => {
    const original = getTestGear();
    original.grade = PotentialGrade.legendary;
    original.potentials[0] = getTestPotential(
      1,
      Potential.getPotentialLevel(original.req.level)
    );
    original.potentials[1] = getTestPotential(
      2,
      Potential.getPotentialLevel(original.req.level)
    );
    original.additionalGrade = PotentialGrade.epic;
    original.additionalPotentials[0] = null;
    original.additionalPotentials[1] = getTestPotential(
      3,
      Potential.getPotentialLevel(original.req.level)
    );
    const target = getTestGear();

    migrate(original, target);

    expect(target.grade).toBe(PotentialGrade.legendary);
    expect(target.potentials[0]).toEqual(
      getTestPotential(1, Potential.getPotentialLevel(target.req.level))
    );
  });
  it("should migrate soul", () => {
    const original = getTestGear();
    original.soulWeapon.enchanted = true;
    original.soulWeapon.setSoul(getTestSoul());
    original.soulWeapon.charge = 100;
    const target = getTestGear();

    migrate(original, target);

    expect(target.soulWeapon.enchanted).toBe(true);
    expect(target.soulWeapon.soul).toEqual(original.soulWeapon.soul);
    expect(target.soulWeapon.charge).toBe(100);
  });
});

function getTestGear(): Gear {
  const gear = new Gear();
  gear.name = "test gear";
  gear.itemID = 1000000;
  gear.type = GearType.cap;
  gear.canPotential = true;
  gear.req.level = 150;
  gear.totalUpgradeCount = 1;
  return gear;
}

function getTestPotential(code: number, potentialLevel: number): Potential {
  switch (code) {
    case 1: {
      const pot = new Potential();
      pot.code = code;
      pot.option = new Map([[GearPropType.incSTR, potentialLevel]]);
      pot.summary = "test str: #incSTR";
      return pot;
    }
    case 2: {
      const pot = new Potential();
      pot.code = code;
      pot.option = new Map([[GearPropType.incINT, potentialLevel + 3]]);
      pot.summary = "test int: #incINT";
      return pot;
    }
    case 3: {
      const pot = new Potential();
      pot.code = code;
      pot.option = new Map([[GearPropType.incPAD, potentialLevel * 2]]);
      pot.summary = "test pad: #incPAD";
      return pot;
    }
    default:
      throw new Error("not implemented potential code");
  }
}

function getTestSoul(): Soul {
  const soul = {
    name: "test soul",
    skill: "test soul skill",
    option: new Map([[GearPropType.incPAD, 6]]),
    multiplier: 3,
  };
  return soul;
}
