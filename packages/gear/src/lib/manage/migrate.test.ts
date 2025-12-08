import { GearType } from "../data";
import { migrate } from "./migrate";

describe('migrate', () => {
  it('GearDataV1을 GearDataV2로 마이그레이션한다.', () => {
    const data = {
      meta: {
        id: 1000000,
        version: 1,
      },
      name: '테스트용 장비',
      type: GearType.cap,
      req: {},
      attributes: {},
    };
    expect(migrate(data)).toEqual({
      id: 1000000,
      version: 2,
      name: '테스트용 장비',
      type: GearType.cap,
      req: {},
      attributes: {},
    });
  });

  it('GearDataV2를 GearDataV2로 마이그레이션한다.', () => {
    const data = {
      id: 1000000,
      version: 2,
      name: '테스트용 장비',
      type: GearType.cap,
      req: {},
      attributes: {},
    };
    expect(migrate(data)).toEqual(data);
  });

  it('GearDataV3을 전달하면 TypeError가 발생한다.', () => {
    const data = {
      id: 1000000,
      version: 3,
      name: '테스트용 장비',
      type: GearType.cap,
    };
    expect(() => migrate(data)).toThrow(TypeError);
  });

  it('빈 객체를 전달하면 TypeError가 발생한다.', () => {
    expect(() => migrate({})).toThrow(TypeError);
  });

  it('GearDataV1에서 id가 숫자가 아닌 경우 TypeError가 발생한다.', () => {
    const data = {
      meta: {
        id: '1000000',
        version: 1,
      },
      name: '테스트용 장비',
      type: GearType.cap,
      req: {},
      attributes: {},
    };
    expect(() => migrate(data)).toThrow(TypeError);
  });

  it('GearDataV1에서 id가 없는 경우 TypeError가 발생한다.', () => {
    const data = {
      meta: {
        version: 1,
      },
      name: '테스트용 장비',
      type: GearType.cap,
    };
    expect(() => migrate(data)).toThrow(TypeError);
  });

  it('GearData에 포함되지 않는 속성도 함께 마이그레이션한다.', () => {
    const data = {
      id: 1000000,
      version: 2,
      name: '테스트용 장비',
      type: GearType.cap,
      req: {
        unknown: 123,
      },
      attributes: {},
      unknown: 'unknown',
    };
    expect(migrate(data)).toEqual({
      id: 1000000,
      version: 2,
      name: '테스트용 장비',
      type: GearType.cap,
      req: {
        unknown: 123,
      },
      attributes: {},
      unknown: 'unknown',
    });
  });
});
