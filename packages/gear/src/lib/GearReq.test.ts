import { GearGender } from './data';
import { GearReq, GearReqJob } from './GearReq';

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

  describe('levelIncrease', () => {
    it('is 10', () => {
      expect(req.levelIncrease).toBe(10);
    });

    it('is 0 by default', () => {
      req.data.levelIncrease = undefined;
      expect(req.levelIncrease).toBe(0);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'levelIncrease' because it is a read-only property.
      expect(() => (req.levelIncrease = 20)).toThrow();
    });
  });

  describe('job', () => {
    it('returns GearReqJob instance', () => {
      expect(req.job).toBeInstanceOf(GearReqJob);
    });

    it('returns empty GearReqJob by default', () => {
      req.data.job = undefined;
      expect(req.job.class).toBe(0);
      expect(req.job.jobs).toEqual([]);
      expect(req.job.fullJobs).toEqual([]);
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'job' because it is a read-only property.
      expect(() => (req.job = new GearReqJob({}))).toThrow();
    });

    describe('class', () => {
      it('is 1', () => {
        expect(req.job.class).toBe(1);
      });

      it('is 0 by default', () => {
        req.data.job = {};
        expect(req.job.class).toBe(0);
      });

      it('is readonly property', () => {
        // @ts-expect-error: Cannot assign to 'class' because it is a read-only property.
        expect(() => (req.job.class = 0)).toThrow();
      });
    });

    describe('jobs', () => {
      it('is [110]', () => {
        expect(req.job.jobs).toEqual([110]);
      });

      it('is [] by default', () => {
        req.data.job = {};
        expect(req.job.jobs).toEqual([]);
      });

      it('is readonly property', () => {
        // @ts-expect-error: Cannot assign to 'jobs' because it is a read-only property.
        expect(() => (req.job.jobs = [])).toThrow();
      });
    });

    describe('fullJobs', () => {
      it('is [112]', () => {
        expect(req.job.fullJobs).toEqual([112]);
      });

      it('is [] by default', () => {
        req.data.job = {};
        expect(req.job.fullJobs).toEqual([]);
      });

      it('is readonly property', () => {
        // @ts-expect-error: Cannot assign to 'fullJobs' because it is a read-only property.
        expect(() => (req.job.fullJobs = [])).toThrow();
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
    ])('warrior() for class=%d is %p', (cls, expected) => {
      req.data.job = { class: cls };

      expect(req.job.warrior()).toBe(expected);
    });

    test.each([
      [0, true],
      [1, false],
      [2, true],
      [4, false],
      [8, false],
      [16, false],
      [24, false],
    ])('magician() for class=%d is %p', (cls, expected) => {
      req.data.job = { class: cls };

      expect(req.job.magician()).toBe(expected);
    });

    test.each([
      [0, true],
      [1, false],
      [2, false],
      [4, true],
      [8, false],
      [16, false],
      [24, false],
    ])('bowman() for class=%d is %p', (cls, expected) => {
      req.data.job = { class: cls };

      expect(req.job.bowman()).toBe(expected);
    });

    test.each([
      [0, true],
      [1, false],
      [2, false],
      [4, false],
      [8, true],
      [16, false],
      [24, true],
    ])('thief() for class=%d is %p', (cls, expected) => {
      req.data.job = { class: cls };

      expect(req.job.thief()).toBe(expected);
    });

    test.each([
      [0, true],
      [1, false],
      [2, false],
      [4, false],
      [8, false],
      [16, true],
      [24, true],
    ])('pirate() for class=%d is %p', (cls, expected) => {
      req.data.job = { class: cls };

      expect(req.job.pirate()).toBe(expected);
    });
  });

  describe('gender', () => {
    it('is undefined by default', () => {
      expect(req.gender).toBeUndefined();
    });

    it('is readonly property', () => {
      // @ts-expect-error: Cannot assign to 'gender' because it is a read-only property.
      expect(() => (req.gender = GearGender.Male)).toThrow();
    });
  });

  beforeEach(() => {
    req = new GearReq({
      level: 200,
      levelIncrease: 10,
      job: {
        class: 1,
        jobs: [110],
        fullJobs: [112],
      },
    });
  });
});
