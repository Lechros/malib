import {
  Gear,
  GearPropType,
  GearType,
  Potential,
  PotentialGrade,
  gearToPlain,
  isGearLike,
  parseGear,
  plainToGear,
  stringifyGear,
} from "../..";

describe("serializeGear", () => {
  it("should serialize empty gear", () => {
    const original = new Gear();
    const serialized = gearToPlain(original);
    expect(serialized.n).toBe("");
    expect(serialized.d).toBe(undefined);
  });
  it("should serialize/deserialize options", () => {
    const gear = new Gear();
    gear.option(GearPropType.incSTR).base = 5;
    gear.option(GearPropType.incSTR).upgrade = 7;
    gear.option(GearPropType.incDEX).bonus = 20;
    const deserialized = plainToGear(gearToPlain(gear));
    expect(deserialized.option(GearPropType.incSTR)).toEqual(
      gear.option(GearPropType.incSTR)
    );
    expect(deserialized.option(GearPropType.incDEX).bonus).toBe(20);
  });
  it("should serialize/deserialize soul", () => {
    const gear = new Gear();
    gear.type = GearType.bow;
    const deserialized = plainToGear(gearToPlain(gear));
    expect(deserialized.soulWeapon.enchanted).toBe(false);
    gear.soulWeapon.charge = 500;
    gear.soulWeapon.soul = {
      name: "test",
      skill: "test-skill",
      option: new Map([[GearPropType.incDEXr, 5]]),
      multiplier: 2,
    };
    gear.soulWeapon.enchanted = true;
    const deserialized2 = plainToGear(gearToPlain(gear));
    expect(deserialized2.soulWeapon.charge).toBe(500);
    expect(deserialized2.soulWeapon.soul?.name).toBe("test");
    expect(deserialized2.soulWeapon.soul?.skill).toBe("test-skill");
    expect(
      deserialized2.soulWeapon.soul?.option.get(GearPropType.incDEXr)
    ).toBe(5);
    expect(deserialized2.soulWeapon.soul?.multiplier).toBe(2);
  });
  it("should serialize/deserialize potential", () => {
    const gear = new Gear();
    gear.grade = PotentialGrade.legendary;
    const pot1 = new Potential();
    pot1.code = 40001;
    pot1.option.set(GearPropType.incSTR, 16);
    pot1.summary = "STR : +#STR 증가";
    gear.potentials.push(pot1);
    gear.potentials.push(null);
    const pot3 = new Potential();
    pot3.code = 30002;
    gear.potentials.push(pot3);
    const deserialized = plainToGear(gearToPlain(gear));
    expect(deserialized.potentials[0]?.code).toBe(40001);
    expect(deserialized.potentials[2]?.code).toBe(30002);
    expect(deserialized.potentials).toEqual(gear.potentials);
    expect(deserialized.potentials[0]).toEqual(gear.potentials[0]);
    expect(deserialized.potentials[1]).toBe(null);
  });
  it("should serialize/deserialize every field", () => {
    const gear = new Gear();
    gear.itemID = 1082699;
    gear.name = "아케인셰이드 파이렛글러브";
    gear.props.set(GearPropType.equipTradeBlock, 1);
    gear.props.set(GearPropType.tradeAvailable, 2);
    gear.req.level = 200;
    gear.req.job = 16;
    gear.type = GearType.glove;
    gear.option(GearPropType.incSTR).base = 40;
    gear.option(GearPropType.incSTR).upgrade = 24;
    gear.option(GearPropType.incSTR).enchant = 40;
    gear.upgradeCount = 4;
    gear.hammerCount = 1;
    gear.upgradeFailCount = 1;
    gear.karma = 7;
    gear.grade = PotentialGrade.legendary;
    const pot1 = new Potential();
    pot1.code = 40001;
    pot1.option.set(GearPropType.incSTR, 16);
    pot1.summary = "STR : +#STR 증가";
    gear.potentials.push(pot1);
    const pot2 = new Potential();
    pot2.code = 30002;
    gear.potentials.push(pot2);
    const deserialized = parseGear(stringifyGear(gear));
    expect(gear).toEqual(deserialized);
  });
  it("should serialize to stringify-able object", () => {
    const gear = new Gear();
    gear.itemID = 1082699;
    gear.name = "아케인셰이드 파이렛글러브";
    gear.props.set(GearPropType.equipTradeBlock, 1);
    gear.props.set(GearPropType.tradeAvailable, 2);
    gear.req.level = 200;
    gear.req.job = 16;
    gear.type = GearType.glove;
    gear.option(GearPropType.incSTR).base = 40;
    gear.option(GearPropType.incSTR).upgrade = 24;
    gear.option(GearPropType.incSTR).enchant = 40;
    gear.upgradeCount = 4;
    gear.hammerCount = 1;
    gear.upgradeFailCount = 1;
    gear.karma = 7;
    gear.grade = PotentialGrade.legendary;
    const pot1 = new Potential();
    pot1.code = 40001;
    pot1.option.set(GearPropType.incSTR, 16);
    pot1.summary = "STR : +#STR 증가";
    gear.potentials.push(pot1);
    const pot2 = new Potential();
    pot2.code = 30002;
    gear.potentials.push(pot2);
    expect(stringifyGear(gear)).toBeTypeOf("string");
  });
});
test("isGearLike", () => {
  const str =
    '{"id":1004422,"n":"앱솔랩스 나이트헬름","i":{"id":1004422,"origin":[1,30]},"t":100,"r":{"level":160,"str":480,"luk":0,"dex":0,"int":0,"job":1,"specJob":0},"pr":[[1105,1],[1104,2],[1112,100],[1114,1],[201,504]],"o":[[1,[45,0,0,0]],[3,[45,0,0,0]],[20,[400,0,0,0]],[17,[3,0,0,0]],[26,[10,0,0,0]]],"c":11,"m":25,"cp":true}';
  expect(isGearLike(JSON.parse(str))).toBe(true);
});
