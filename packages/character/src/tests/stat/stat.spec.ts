import { IStat, Stat } from "../..";

describe("Stat constructor", () => {
  it("should set all values to 0 by default", () => {
    const stat = new Stat();
    for (const _type of Object.keys(stat)) {
      const type = _type as keyof Stat;
      expect(stat[type]).toBe(0);
    }
  });
  it("should set specified values", () => {
    const istat: IStat = {
      str: 5,
      mhpRate: 100,
      madFixed: 18,
      criticalRate: 10,
      bossDamage: 30,
    };
    const stat = new Stat(istat);
    for (const _type of Object.keys(stat)) {
      const type = _type as keyof IStat;
      if (type in istat) {
        expect(stat[type]).toBe(istat[type]);
      } else {
        expect(stat[type]).toBe(0);
      }
    }
  });
});

describe("Stat add", () => {
  it("should add specified normal values", () => {
    const stat = new Stat({
      str: 5,
      bossDamage: 10,
    });
    stat.add({
      dex: 10,
      bossDamage: 5,
    });
    expect(stat.str).toBe(5);
    expect(stat.dex).toBe(10);
    expect(stat.bossDamage).toBe(15);
  });
  it("should properly add finalDamage", () => {
    const stat = new Stat({
      str: 5,
      finalDamage: 10,
    });
    stat.add({
      dex: 10,
      finalDamage: 10,
    });
    expect(stat.str).toBe(5);
    expect(stat.dex).toBe(10);
    expect(stat.finalDamage).toBeCloseTo(21);
  });
  it("should properly add ignoreDefense", () => {
    const stat = new Stat({
      str: 5,
      ignoreDefense: 10,
    });
    stat.add({
      dex: 10,
      ignoreDefense: 10,
    });
    expect(stat.str).toBe(5);
    expect(stat.dex).toBe(10);
    expect(stat.ignoreDefense).toBeCloseTo(19);
  });
});

describe("Stat addFinalDamage", () => {
  it("should return 0 if no argument passed", () => {
    expect(Stat.addFinalDamage()).toBe(0);
  });
  it("should return original value if single argument passed", () => {
    for (let i = 0; i < 10; i += 0.7) {
      expect(Stat.addFinalDamage(i)).toBeCloseTo(i);
    }
  });
  it("should properly add 2 values", () => {
    expect(Stat.addFinalDamage(10, 10)).toBeCloseTo(21);
    expect(Stat.addFinalDamage(10, 50)).toBeCloseTo(65);
    expect(Stat.addFinalDamage(50, 50)).toBeCloseTo(125);
    expect(Stat.addFinalDamage(100, 100)).toBeCloseTo(300);
    expect(Stat.addFinalDamage(30, 0)).toBeCloseTo(30);
  });
  it("should properly add multiple values", () => {
    expect(Stat.addFinalDamage(10, 20, 10, 20, 50)).toBeCloseTo(161.36);
    expect(Stat.addFinalDamage(10, 0, 10, 0, 10, 0, 0)).toBeCloseTo(33.1);
  });
  it("should properly add negative values", () => {
    expect(Stat.addFinalDamage(10, -9.090909)).toBeCloseTo(0);
    expect(Stat.addFinalDamage(10, 10, 10, -24.868519)).toBeCloseTo(0);
    expect(Stat.addFinalDamage(-10)).toBeCloseTo(-10);
    expect(Stat.addFinalDamage(30, -20)).toBeCloseTo(4);
    expect(Stat.addFinalDamage(100, 1, 2, 3, 4, -100)).toBeCloseTo(-100);
  });
  it("should return same value with different argument order", () => {
    for (let i = -10; i < 10; i += 1.7) {
      for (let j = -10; j < 10; j += 2.3) {
        expect(Stat.addFinalDamage(i, j)).toBeCloseTo(
          Stat.addFinalDamage(j, i)
        );
      }
    }
  });
});

describe("Stat addIgnoreDefense", () => {
  it("should return 0 if no argument passed", () => {
    expect(Stat.addIgnoreDefense()).toBe(0);
  });
  it("should return original value if single argument passed", () => {
    for (let i = 0; i < 10; i += 0.7) {
      expect(Stat.addIgnoreDefense(i)).toBeCloseTo(i);
    }
  });
  it("should properly add 2 values", () => {
    expect(Stat.addIgnoreDefense(30, 30)).toBeCloseTo(51);
    expect(Stat.addIgnoreDefense(10, 10)).toBeCloseTo(19);
    expect(Stat.addIgnoreDefense(40, 40)).toBeCloseTo(64);
    expect(Stat.addIgnoreDefense(10, 0)).toBeCloseTo(10);
    expect(Stat.addIgnoreDefense(100, 50)).toBeCloseTo(100);
  });
  it("should properly add multiple values", () => {
    expect(Stat.addIgnoreDefense(10, 10, 10, 10, 10)).toBeCloseTo(40.951);
    expect(Stat.addIgnoreDefense(90, 30, 40)).toBeCloseTo(95.8);
  });
  it("should properly add negative values", () => {
    expect(Stat.addIgnoreDefense(-10, 10)).toBeCloseTo(0);
    expect(Stat.addIgnoreDefense(10, -10)).toBeCloseTo(0);
    expect(Stat.addIgnoreDefense(40, -10, -10, -10, -10)).toBeCloseTo(
      8.550525834476451
    );
    expect(Stat.addIgnoreDefense(100, -50)).toBeCloseTo(100);
    expect(Stat.addIgnoreDefense(-50, 100)).toBeCloseTo(100);
  });
  it("should return same value with different argument order", () => {
    for (let i = -10; i < 10; i += 1.7) {
      for (let j = -10; j < 10; j += 2.3) {
        expect(Stat.addIgnoreDefense(i, j)).toBeCloseTo(
          Stat.addIgnoreDefense(j, i)
        );
      }
    }
  });
});
