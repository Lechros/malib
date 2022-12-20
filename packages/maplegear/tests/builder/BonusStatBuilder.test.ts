import { BonusStatBuilder, BonusStatType, Gear, GearPropType } from "../../src";

test("init BonusStatBuilder", () => {
  const gear = new Gear();
  gear.name = "test gear 10";
  const bb = new BonusStatBuilder(gear);
  expect(bb.gear).toBe(gear);
});

test("addBonusStat normal", () => {
  const bb = new BonusStatBuilder();
  // 블루몬 고깔모자
  bb.gear = Gear.createFromID(1002102);
  expect(bb.addBonusStat(BonusStatType.DEX, 3)).toBe(true);
  bb.addBonusStat(BonusStatType.INT, 2);
  expect(bb.gear?.option(GearPropType.incDEX).bonus).toBe(3);
  expect(bb.gear?.option(GearPropType.incINT).bonus).toBe(2);
  // 블루 길티언
  bb.gear = Gear.createFromID(1002152);
  bb.addBonusStat(BonusStatType.MHP, 3);
  expect(bb.gear?.option(GearPropType.incMHP).bonus).toBe(360);
  // 페어리 완드
  bb.gear = Gear.createFromID(1372000);
  bb.addBonusStat(BonusStatType.MMP, 2);
  bb.addBonusStat(BonusStatType.PAD, 1);
  bb.addBonusStat(BonusStatType.allStatR, 1);
  expect(bb.gear?.option(GearPropType.incMMP).bonus).toBe(180);
  expect(bb.gear?.option(GearPropType.incPAD).bonus).toBe(1);
  expect(bb.gear?.option(GearPropType.statR).bonus).toBe(1);
  // 앱솔랩스 나이트케이프
  bb.gear = Gear.createFromID(1102775);
  bb.addBonusStat(BonusStatType.STR_DEX, 4);
  expect(bb.gear?.option(GearPropType.incSTR).bonus).toBe(20);
  expect(bb.gear?.option(GearPropType.incDEX).bonus).toBe(20);
});

test("addBonusStat invalid type", () => {
  const bb = new BonusStatBuilder();
  // empty
  expect(bb.addBonusStat(BonusStatType.STR, 5)).toBe(false);
  // 파프니르 페니텐시아
  bb.gear = Gear.createFromID(1402196);
  expect(bb.getBonusStatValue(BonusStatType.INT_LUK, 1)).toBe(0);
  expect(bb.addBonusStat(BonusStatType.PAD, 1)).toBe(false);
  expect(bb.gear?.option(GearPropType.incPAD).bonus).toBe(0);
  // 광포한 스티지 채찍
  bb.gear = Gear.createFromID(1302161);
  expect(bb.addBonusStat(BonusStatType.bdR, 4)).toBe(false);
  expect(bb.gear?.option(GearPropType.bdR).bonus).toBe(0);
  // 분노한 스티지 채찍
  bb.gear = Gear.createFromID(1302162);
  expect(bb.addBonusStat(BonusStatType.bdR, 4)).toBe(true);
  expect(bb.gear?.option(GearPropType.bdR).bonus).toBe(8);
  // 블루몬 고깔모자
  bb.gear = Gear.createFromID(1002102);
  expect(bb.addBonusStat(BonusStatType.PAD, 3)).toBe(false);
  expect(bb.addBonusStat(BonusStatType.allStatR, 3)).toBe(false);
  expect(bb.gear?.option(GearPropType.incPAD).bonus).toBe(0);
  expect(bb.gear?.option(GearPropType.statR).bonus).toBe(0);
});

test("addBonusStat boss reward weapon", () => {
  const bb = new BonusStatBuilder();
  // 파프니르 페니텐시아
  bb.gear = Gear.createFromID(1402196);
  expect(bb.addBonusStat(BonusStatType.PAD, 5)).toBe(true);
  expect(bb.addBonusStat(BonusStatType.MAD, 5)).toBe(true);
  expect(bb.gear?.option(GearPropType.incPAD).bonus).toBe(42);
  expect(bb.gear?.option(GearPropType.incMAD).bonus).toBe(42);
});

test("addBonusStat zero weapon", () => {
  const bb = new BonusStatBuilder();
  // 라즐리 7형
  bb.gear = Gear.createFromID(1572007);
  expect(bb.addBonusStat(BonusStatType.PAD, 4)).toBe(true);
  expect(bb.gear?.option(GearPropType.incPAD).bonus).toBe(47);
  // 라피스 7형
  bb.gear = Gear.createFromID(1562007);
  expect(bb.addBonusStat(BonusStatType.PAD, 4)).toBe(true);
  expect(bb.gear?.option(GearPropType.incPAD).bonus).toBe(47);
  // 제네시스 라즐리
  bb.gear = Gear.createFromID(1572010);
  expect(bb.addBonusStat(BonusStatType.PAD, 5)).toBe(true);
  expect(bb.gear?.option(GearPropType.incPAD).bonus).toBe(151);
  // 제네시스 라피스
  bb.gear = Gear.createFromID(1562010);
  expect(bb.addBonusStat(BonusStatType.PAD, 5)).toBe(true);
  expect(bb.gear?.option(GearPropType.incPAD).bonus).toBe(151);
});
