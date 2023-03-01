import { GearOption } from "..";

test("empty should return true if all fields are 0", () => {
  const option = new GearOption();
  expect(option.empty).toBe(true);

  option.base = 1;
  expect(option.empty).toBe(false);
  option.base = 0;

  option.upgrade = -2;
  expect(option.empty).toBe(false);
});

test("sum should return nonnegative sum of fields", () => {
  const option = new GearOption();
  expect(option.sum).toBe(0);

  option.base = 2;
  option.enchant = 4;
  expect(option.sum).toBe(6);

  option.upgrade = -99;
  expect(option.sum).toBe(0);
});

test("diff should return sum of bonus/upgrade/enchant", () => {
  const option = new GearOption();
  expect(option.diff).toBe(0);

  option.base = 4;
  option.bonus = 20;
  option.upgrade = 300;
  option.enchant = 8000;
  expect(option.diff).toBe(8320);
});
