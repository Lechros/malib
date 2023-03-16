import { GearPropType } from "..";

describe("GearPropType value tests", () => {
  // changing these value is a breaking change
  it.each([
    [GearPropType.incSTR, 1],
    [GearPropType.incAUT, 16],
    [GearPropType.damR, 28],
    [GearPropType.incCHUC, 31],
    [GearPropType.incPADr, 100],
    [GearPropType.incMADr, 101],
    [GearPropType.incTerR, 124],
    [GearPropType.incCriticaldamage, 135],
    [GearPropType.attackSpeed, 200],
    [GearPropType.reduceReq, 203],
    [GearPropType.only, 1100],
    [GearPropType.craftEXP, 1111],
    [GearPropType.blockGoldHammer, 1122],
    [GearPropType.tucIgnoreForPotential, 1126],
  ])("'%d' == '%d'", (type, expected) => {
    expect(type).toBe(expected);
  });
});
