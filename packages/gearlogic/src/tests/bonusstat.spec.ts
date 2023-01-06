import { Gear, GearPropType } from "@malib/gear";
import { BonusStatLogic, BonusStatType } from "..";
import { createGearFromID } from "./util";

test("init BonusStatLogic", () => {
  const gear = new Gear();
  const bl = new BonusStatLogic(gear);
  expect(bl.gear).toBe(gear);
});

test("addBonusStat normal", () => {
  const bl = new BonusStatLogic();
  // 블루몬 고깔모자
  bl.gear = createGearFromID(1002102);
  expect(bl.addBonusStat(BonusStatType.DEX, 3)).toBe(true);
  bl.addBonusStat(BonusStatType.INT, 2);
  expect(bl.gear?.option(GearPropType.incDEX).bonus).toBe(3);
  expect(bl.gear?.option(GearPropType.incINT).bonus).toBe(2);
  // 블루 길티언
  bl.gear = createGearFromID(1002152);
  bl.addBonusStat(BonusStatType.MHP, 3);
  expect(bl.gear?.option(GearPropType.incMHP).bonus).toBe(360);
  // 페어리 완드
  bl.gear = createGearFromID(1372000);
  bl.addBonusStat(BonusStatType.MMP, 2);
  bl.addBonusStat(BonusStatType.PAD, 1);
  bl.addBonusStat(BonusStatType.allStatR, 1);
  expect(bl.gear?.option(GearPropType.incMMP).bonus).toBe(180);
  expect(bl.gear?.option(GearPropType.incPAD).bonus).toBe(1);
  expect(bl.gear?.option(GearPropType.statR).bonus).toBe(1);
  // 앱솔랩스 나이트케이프
  bl.gear = createGearFromID(1102775);
  bl.addBonusStat(BonusStatType.STR_DEX, 4);
  expect(bl.gear?.option(GearPropType.incSTR).bonus).toBe(20);
  expect(bl.gear?.option(GearPropType.incDEX).bonus).toBe(20);
});

test("addBonusStat invalid type", () => {
  const bl = new BonusStatLogic();
  // empty
  expect(bl.addBonusStat(BonusStatType.STR, 5)).toBe(false);
  // 파프니르 페니텐시아
  bl.gear = createGearFromID(1402196);
  expect(bl.getBonusStatValue(BonusStatType.INT_LUK, 1)).toBe(0);
  expect(bl.addBonusStat(BonusStatType.PAD, 1)).toBe(false);
  expect(bl.gear?.option(GearPropType.incPAD).bonus).toBe(0);
  // 광포한 스티지 채찍
  bl.gear = createGearFromID(1302161);
  expect(bl.addBonusStat(BonusStatType.bdR, 4)).toBe(false);
  expect(bl.gear?.option(GearPropType.bdR).bonus).toBe(0);
  // 분노한 스티지 채찍
  bl.gear = createGearFromID(1302162);
  expect(bl.addBonusStat(BonusStatType.bdR, 4)).toBe(true);
  expect(bl.gear?.option(GearPropType.bdR).bonus).toBe(8);
  // 블루몬 고깔모자
  bl.gear = createGearFromID(1002102);
  expect(bl.addBonusStat(BonusStatType.PAD, 3)).toBe(false);
  expect(bl.addBonusStat(BonusStatType.allStatR, 3)).toBe(false);
  expect(bl.gear?.option(GearPropType.incPAD).bonus).toBe(0);
  expect(bl.gear?.option(GearPropType.statR).bonus).toBe(0);
});

test("addBonusStat boss reward weapon", () => {
  const bl = new BonusStatLogic();
  // 파프니르 페니텐시아
  bl.gear = createGearFromID(1402196);
  expect(bl.addBonusStat(BonusStatType.PAD, 5)).toBe(true);
  expect(bl.addBonusStat(BonusStatType.MAD, 5)).toBe(true);
  expect(bl.gear?.option(GearPropType.incPAD).bonus).toBe(42);
  expect(bl.gear?.option(GearPropType.incMAD).bonus).toBe(42);
});

test("addBonusStat zero weapon", () => {
  const bl = new BonusStatLogic();
  // 라즐리 7형
  bl.gear = createGearFromID(1572007);
  expect(bl.addBonusStat(BonusStatType.PAD, 4)).toBe(true);
  expect(bl.gear?.option(GearPropType.incPAD).bonus).toBe(47);
  // 라피스 7형
  bl.gear = createGearFromID(1562007);
  expect(bl.addBonusStat(BonusStatType.PAD, 4)).toBe(true);
  expect(bl.gear?.option(GearPropType.incPAD).bonus).toBe(47);
  // 제네시스 라즐리
  bl.gear = createGearFromID(1572010);
  expect(bl.addBonusStat(BonusStatType.PAD, 5)).toBe(true);
  expect(bl.gear?.option(GearPropType.incPAD).bonus).toBe(151);
  // 제네시스 라피스
  bl.gear = createGearFromID(1562010);
  expect(bl.addBonusStat(BonusStatType.PAD, 5)).toBe(true);
  expect(bl.gear?.option(GearPropType.incPAD).bonus).toBe(151);
});
