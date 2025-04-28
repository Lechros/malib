import { createGear } from '../test';
import {
  applyExceptional,
  canApplyExceptional,
  canResetExceptional,
  ExceptionalHammer,
  resetExceptional,
  supportsExceptional,
} from './exceptional';

describe('supportsExceptional', () => {
  it('익셉셔널 강화 가능 횟수가 1일 경우 true를 반환한다.', () => {
    const gear = createGear({
      exceptionalUpgradeableCount: 1,
    });

    expect(supportsExceptional(gear)).toBe(true);
  });

  it('익셉셔널 강화 횟수가 1일 경우 true를 반환한다.', () => {
    const gear = createGear({
      exceptionalUpgradeCount: 1,
    });

    expect(supportsExceptional(gear)).toBe(true);
  });

  it('익셉셔널 강회 횟수 및 강화 가능 횟수가 모두 0일 경우 false를 반환한다.', () => {
    const gear = createGear({});

    expect(supportsExceptional(gear)).toBe(false);
  });
});

describe('canApplyExceptional', () => {
  it('익셉셔널 강화 가능 횟수가 1 이상일 경우 true를 반환한다.', () => {
    const gear = createGear({
      exceptionalUpgradeableCount: 1,
    });

    expect(canApplyExceptional(gear)).toBe(true);
  });

  it('익셉셔널 강화 가능 횟수가 0일 경우 false를 반환한다.', () => {
    const gear = createGear({
      exceptionalUpgradeCount: 1,
    });

    expect(canApplyExceptional(gear)).toBe(false);
  });
});

describe('applyExceptional', () => {
  it('익셉셔널 강화 횟수가 1회 증가한다.', () => {
    const gear = createGear({
      exceptionalUpgradeableCount: 1,
    });
    const hammer: ExceptionalHammer = {
      name: '',
      option: {},
    };

    applyExceptional(gear, hammer);

    expect(gear.exceptionalUpgradeCount).toBe(1);
  });

  it('익셉셔널 강화 가능 횟수가 1회 감소한다.', () => {
    const gear = createGear({
      exceptionalUpgradeableCount: 1,
    });
    const hammer: ExceptionalHammer = {
      name: '',
      option: {},
    };

    applyExceptional(gear, hammer);

    expect(gear.exceptionalUpgradeableCount).toBe(0);
  });

  it('익셉셔널 옵션에 추가된다.', () => {
    const gear = createGear({
      exceptionalUpgradeableCount: 1,
    });
    const hammer: ExceptionalHammer = {
      name: '',
      option: { str: 1, attackPower: 2 },
    };
    const expected = {
      str: 1,
      attackPower: 2,
    };

    applyExceptional(gear, hammer);

    expect(gear.exceptionalOption).toEqual(expected);
  });

  it('익셉셔널 강화 가능 횟수가 0회일 경우 TypeError가 발생한다.', () => {
    const gear = createGear();
    const hammer: ExceptionalHammer = { name: '', option: {} };

    expect(() => {
      applyExceptional(gear, hammer);
    }).toThrow(TypeError);
  });
});

describe('canResetExceptional', () => {
  it('전체 익셉셔널 강화 횟수가 1 이상일 경우 true를 반환한다.', () => {
    const gear = createGear({
      exceptionalUpgradeableCount: 1,
    });

    expect(canResetExceptional(gear)).toBe(true);
  });

  it('전체 익셉셔널 강화 횟수가 0일 경우 false를 반환한다.', () => {
    const gear = createGear();

    expect(canResetExceptional(gear)).toBe(false);
  });
});

describe('resetExceptional', () => {
  it('익셉셔널 강화 횟수를 0회로 설정한다.', () => {
    const gear = createGear({
      exceptionalUpgradeCount: 1,
      exceptionalUpgradeableCount: 1,
    });

    resetExceptional(gear);

    expect(gear.exceptionalUpgradeCount).toBe(0);
  });

  it('익셉셔널 강화 가능 횟수를 초기화한다.', () => {
    const gear = createGear({
      exceptionalUpgradeCount: 1,
      exceptionalUpgradeableCount: 1,
    });

    resetExceptional(gear);

    expect(gear.exceptionalUpgradeableCount).toBe(2);
  });

  it('익셉셔널 옵션을 초기화한다.', () => {
    const gear = createGear({
      exceptionalUpgradeCount: 1,
      exceptionalOption: { int: 1, luk: 2 },
    });

    resetExceptional(gear);

    expect(gear.exceptionalOption).toEqual({});
  });
});
