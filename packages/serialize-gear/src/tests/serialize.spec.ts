import {
  Gear,
  GearPropType,
  GearType,
  Potential,
  PotentialGrade,
} from "@malib/gear";
import { serializeGear, deserializeGear } from "../internal";

describe("serializeGear", () => {
  it("should serialize empty gear", () => {
    const original = new Gear();
    const serialized = serializeGear(original);
    expect(serialized.name).toBe("");
    expect(serialized.desc).toBe(undefined);
  });
  it("should serialize/deserialize options", () => {
    const gear = new Gear();
    gear.option(GearPropType.incSTR).base = 5;
    gear.option(GearPropType.incSTR).upgrade = 7;
    gear.option(GearPropType.incDEX).bonus = 20;
    const deserialized = deserializeGear(serializeGear(gear));
    expect(deserialized.option(GearPropType.incSTR)).toEqual(
      gear.option(GearPropType.incSTR)
    );
    expect(deserialized.option(GearPropType.incDEX).bonus).toBe(20);
  });
  it("should serialize/deserialize potential correctly", () => {
    const gear = new Gear();
    gear.grade = PotentialGrade.legendary;
    const pot1 = new Potential();
    pot1.code = 40001;
    pot1.option.set(GearPropType.incSTR, 16);
    pot1.summary = "STR : +#STR 증가";
    gear.potentials.push(pot1);
    gear.potentials.push(undefined);
    const pot3 = new Potential();
    pot3.code = 30002;
    gear.potentials.push(pot3);
    const deserialized = deserializeGear(serializeGear(gear));
    expect(deserialized.potentials[0]?.code).toBe(40001);
    expect(deserialized.potentials[2]?.code).toBe(30002);
    expect(deserialized.potentials).toEqual(gear.potentials);
    expect(deserialized.potentials[0]).toEqual(gear.potentials[0]);
    expect(deserialized.potentials[1]).toBe(undefined);
  });
  it("should serialize/deserialize every field correctly", () => {
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
    const deserialized = deserializeGear(
      JSON.parse(JSON.stringify(serializeGear(gear)))
    );
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
    expect(JSON.stringify(serializeGear(gear))).toBeTypeOf("string");
  });
});
