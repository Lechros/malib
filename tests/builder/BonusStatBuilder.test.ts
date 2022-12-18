import { expect, test } from "vitest";
import { BonusStatBuilder, BonusStatType, Gear, GearPropType, GearType } from "../../src";

test("init BonusStatBuilder", () => {
  const gear = new Gear();
  gear.name = "test gear 10";
  const bb = new BonusStatBuilder(gear);
  expect(bb.gear?.name).toBe("test gear 10");
});

test("addBonusStat normal gears", () => {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const bb = new BonusStatBuilder();
  // 블루몬 고깔모자
  bb.gear = Gear.createFromID(1002102);
  bb.addBonusStat(BonusStatType.DEX, 3);
  bb.addBonusStat(BonusStatType.INT, 2);
  expect(bb.gear!.option(GearPropType.incDEX).bonus).toBe(3);
  expect(bb.gear!.option(GearPropType.incINT).bonus).toBe(2);
  // 블루 길티언
  bb.gear = Gear.createFromID(1002152);
  bb.addBonusStat(BonusStatType.MHP, 3);
  expect(bb.gear!.option(GearPropType.incMHP).bonus).toBe(360);
  // 페어리 완드
  bb.gear = Gear.createFromID(1372000);
  bb.addBonusStat(BonusStatType.MMP, 2);
  bb.addBonusStat(BonusStatType.PAD, 1);
  bb.addBonusStat(BonusStatType.allStatR, 1);
  expect(bb.gear!.option(GearPropType.incMMP).bonus).toBe(180);
  expect(bb.gear!.option(GearPropType.incPAD).bonus).toBe(1);
  expect(bb.gear!.option(GearPropType.statR).bonus).toBe(1);
  /* eslint-enable @typescript-eslint/no-non-null-assertion */
});

test("test addBonusStat invalid gears", () => {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const bb = new BonusStatBuilder();
  // 크리스탈 웬투스 뱃지
  bb.gear = Gear.createFromID(1182087);
  expect(bb.addBonusStat(BonusStatType.PAD, 1)).toBe(false);
  expect(bb.gear!.option(GearPropType.incPAD).bonus).toBe(0);
  /* eslint-enable @typescript-eslint/no-non-null-assertion */
});
