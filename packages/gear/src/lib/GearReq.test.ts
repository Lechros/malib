import { GearReq } from './GearReq';

describe('GearReq', () => {
  let req: GearReq;

  describe('level', () => {
    it('is 200', () => {
      expect(req.level).toBe(200);
    });

    it('is 0 by default', () => {
      req.data.level = undefined;
      expect(req.level).toBe(0);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'level' because it is a read-only property.
      expect(() => (req.level = 250)).toThrow();
    });
  });

  describe('str', () => {
    it('is 400', () => {
      expect(req.str).toBe(400);
    });

    it('is 0 by default', () => {
      req.data.str = undefined;
      expect(req.str).toBe(0);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'str' because it is a read-only property.
      expect(() => (req.str = 500)).toThrow();
    });
  });

  describe('dex', () => {
    it('is 200', () => {
      expect(req.dex).toBe(200);
    });

    it('is 0 by default', () => {
      req.data.dex = undefined;
      expect(req.dex).toBe(0);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'dex' because it is a read-only property.
      expect(() => (req.dex = 500)).toThrow();
    });
  });

  describe('int', () => {
    it('is 50', () => {
      expect(req.int).toBe(50);
    });

    it('is 0 by default', () => {
      req.data.int = undefined;
      expect(req.int).toBe(0);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'int' because it is a read-only property.
      expect(() => (req.int = 500)).toThrow();
    });
  });

  describe('luk', () => {
    it('is 100', () => {
      expect(req.luk).toBe(100);
    });

    it('is 0 by default', () => {
      req.data.luk = undefined;
      expect(req.luk).toBe(0);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'luk' because it is a read-only property.
      expect(() => (req.luk = 500)).toThrow();
    });
  });

  describe('job', () => {
    it('is 1', () => {
      expect(req.job).toBe(1);
    });

    it('is 0 by default', () => {
      req.data.job = undefined;
      expect(req.job).toBe(0);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'job' because it is a read-only property.
      expect(() => (req.job = 16)).toThrow();
    });
  });

  describe('class', () => {
    it('is 12345', () => {
      expect(req.class).toBe(12345);
    });

    it('is 0 by default', () => {
      req.data.class = undefined;
      expect(req.class).toBe(0);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'class' because it
      expect(() => (req.class = 16)).toThrow();
    });
  });

  test.each([
    [0, true],
    [1, true],
    [2, false],
    [4, false],
    [8, false],
    [16, false],
    [24, false],
  ])('warrior() for job=%d is %p', (job, expected) => {
    req.data.job = job;

    const actual = req.warrior();

    expect(actual).toBe(expected);
  });

  test.each([
    [0, true],
    [1, false],
    [2, true],
    [4, false],
    [8, false],
    [16, false],
    [24, false],
  ])('magician() for job=%d is %p', (job, expected) => {
    req.data.job = job;

    const actual = req.magician();

    expect(actual).toBe(expected);
  });

  test.each([
    [0, true],
    [1, false],
    [2, false],
    [4, true],
    [8, false],
    [16, false],
    [24, false],
  ])('bowman() for job=%d is %p', (job, expected) => {
    req.data.job = job;

    const actual = req.bowman();

    expect(actual).toBe(expected);
  });

  test.each([
    [0, true],
    [1, false],
    [2, false],
    [4, false],
    [8, true],
    [16, false],
    [24, true],
  ])('thief() for job=%d is %p', (job, expected) => {
    req.data.job = job;

    const actual = req.thief();

    expect(actual).toBe(expected);
  });

  test.each([
    [0, true],
    [1, false],
    [2, false],
    [4, false],
    [8, false],
    [16, true],
    [24, true],
  ])('pirate() for job=%d is %p', (job, expected) => {
    req.data.job = job;

    const actual = req.pirate();

    expect(actual).toBe(expected);
  });

  beforeEach(() => {
    req = new GearReq({
      level: 200,
      str: 400,
      dex: 200,
      int: 50,
      luk: 100,
      job: 1,
      class: 12345,
    });
  });
});
