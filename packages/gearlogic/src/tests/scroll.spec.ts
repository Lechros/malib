import { GearPropType } from "@malib/gear";
import { fail } from "assert";
import { Scroll } from "..";
import { createGearFromID } from "./util";

describe("scroll basic functionality", () => {
  it("test constructor", () => {
    const scroll = new Scroll();
    expect(scroll.name).toBe("");
    expect(scroll.stat).not.toBeUndefined();
    expect(scroll.stat).toHaveLength(0);
    const scroll2 = new Scroll(
      "test-scroll",
      new Map([[GearPropType.incSTR, 5]])
    );
    expect(scroll2.name).toBe("test-scroll");
    expect(scroll2.stat).toHaveLength(1);
    expect(scroll2.stat.get(GearPropType.incSTR)).toBe(5);
  });
});

describe("spell trace normal", () => {
  it("low req level armor scroll name / stat", () => {
    const gear = createGearFromID(1005497); // T-boy의 모니터
    if (!gear) {
      fail();
    }
    let scroll: Scroll | undefined;
    scroll = Scroll.getSpellTraceScroll(gear, GearPropType.incSTR, 100);
    expect(scroll?.stat.get(GearPropType.incSTR)).toBe(1);
    expect(scroll?.stat.get(GearPropType.incMHP)).toBe(5);
    expect(scroll?.stat.get(GearPropType.incPDD)).toBe(1);
    expect(scroll?.name).toBe("100% 힘 주문서");

    scroll = Scroll.getSpellTraceScroll(gear, GearPropType.incLUK, 70);
    expect(scroll?.stat.get(GearPropType.incLUK)).toBe(2);
    expect(scroll?.name).toBe("70% 운 주문서");

    scroll = Scroll.getSpellTraceScroll(gear, GearPropType.incINT, 30);
    expect(scroll?.stat.get(GearPropType.incINT)).toBe(3);
    expect(scroll?.stat.get(GearPropType.incMHP)).toBe(30);
    expect(scroll?.stat.get(GearPropType.incPDD)).toBe(4);
    expect(scroll?.name).toBe("30% 지력 주문서");

    scroll = Scroll.getSpellTraceScroll(gear, GearPropType.incMHP, 30);
    expect(scroll?.stat.get(GearPropType.incMHP)).toBe(180);
    expect(scroll?.name).toBe("30% 체력 주문서");

    scroll = Scroll.getSpellTraceScroll(gear, GearPropType.incAllStat, 30);
    expect(scroll?.stat.get(GearPropType.incSTR)).toBe(1);
    expect(scroll?.stat.get(GearPropType.incDEX)).toBe(1);
    expect(scroll?.stat.get(GearPropType.incMHP)).toBe(30);
    expect(scroll?.stat.get(GearPropType.incPDD)).toBe(4);
    expect(scroll?.name).toBe("30% 올스탯 주문서");
  });
  it("medium req level weapon scroll name / stat", () => {
    const gear = createGearFromID(1382260); // 블랙 스태프
    if (!gear) {
      fail();
    }
    let scroll: Scroll | undefined;
    scroll = Scroll.getSpellTraceScroll(gear, GearPropType.incINT, 100);
    expect(scroll?.stat.get(GearPropType.incINT)).toBe(0);
    expect(scroll?.stat.get(GearPropType.incMAD)).toBe(2);
    expect(scroll?.name).toBe("100% 마력 주문서");

    scroll = Scroll.getSpellTraceScroll(gear, GearPropType.incINT, 70);
    expect(scroll?.stat.get(GearPropType.incINT)).toBe(1);
    expect(scroll?.stat.get(GearPropType.incMAD)).toBe(3);
    expect(scroll?.name).toBe("70% 마력(지력) 주문서");

    scroll = Scroll.getSpellTraceScroll(gear, GearPropType.incINT, 30);
    expect(scroll?.stat.get(GearPropType.incINT)).toBe(2);
    expect(scroll?.stat.get(GearPropType.incMAD)).toBe(5);
    expect(scroll?.name).toBe("30% 마력(지력) 주문서");

    scroll = Scroll.getSpellTraceScroll(gear, GearPropType.incINT, 15);
    expect(scroll?.stat.get(GearPropType.incINT)).toBe(3);
    expect(scroll?.stat.get(GearPropType.incMAD)).toBe(7);
    expect(scroll?.name).toBe("15% 마력(지력) 주문서");
  });
  it("high req level accessory scroll name / stat", () => {
    const gear = createGearFromID(1022232); // 블랙빈 마크
    if (!gear) {
      fail();
    }
    let scroll: Scroll | undefined;
    scroll = Scroll.getSpellTraceScroll(gear, GearPropType.incSTR, 100);
    expect(scroll?.stat.get(GearPropType.incSTR)).toBe(2);
    expect(scroll?.name).toBe("100% 힘 주문서");

    scroll = Scroll.getSpellTraceScroll(gear, GearPropType.incDEX, 70);
    expect(scroll?.stat.get(GearPropType.incDEX)).toBe(3);
    expect(scroll?.name).toBe("70% 민첩 주문서");

    scroll = Scroll.getSpellTraceScroll(gear, GearPropType.incINT, 30);
    expect(scroll?.stat.get(GearPropType.incINT)).toBe(5);
    expect(scroll?.stat.get(GearPropType.incPAD)).toBeUndefined();
    expect(scroll?.name).toBe("30% 지력 주문서");

    scroll = Scroll.getSpellTraceScroll(gear, GearPropType.incMHP, 100);
    expect(scroll?.stat.get(GearPropType.incMHP)).toBe(100);
    expect(scroll?.name).toBe("100% 체력 주문서");

    scroll = Scroll.getSpellTraceScroll(gear, GearPropType.incAllStat, 30);
    expect(scroll?.stat.get(GearPropType.incSTR)).toBe(3);
    expect(scroll?.name).toBe("30% 올스탯 주문서");
  });
});

describe("spell trace invalid case", () => {
  it("accessory with probability 15", () => {
    const gear = createGearFromID(1022232); // 블랙빈 마크
    if (!gear) {
      fail();
    }
    expect(
      Scroll.getSpellTraceScroll(gear, GearPropType.incSTR, 15)
    ).toBeUndefined();
  });
  it("all stat with probability 70", () => {
    const gear = createGearFromID(1022232); // 블랙빈 마크
    if (!gear) {
      fail();
    }
    expect(
      Scroll.getSpellTraceScroll(gear, GearPropType.incAllStat, 70)
    ).toBeUndefined();
  });
});
