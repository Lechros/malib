import { GearIndex } from "../src";

test("test load and getGearID", () => {
  GearIndex.load();
  expect(GearIndex.getGearID("아케인셰이드 아처햇")).toBe(1004810);
  expect(GearIndex.getGearID("아케인셰이드 나이트병아리")).toBeUndefined();
  expect(GearIndex.getGearID("파프니르 골디언해머")).toBe(1322203);
  expect(GearIndex.getGearID("데이브레이크 펜던트")).toBe(1122443);
  expect(GearIndex.getGearID("데이브레이크펜던트")).toBeUndefined();
});
