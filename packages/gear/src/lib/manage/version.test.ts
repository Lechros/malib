import { GearData, GearType } from '../data';
import { getVersion } from './version';

describe('getVersion', () => {
  it('GearDataV1에서 1을 추출한다.', () => {
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
    expect(getVersion(data)).toBe(1);
  });

  it('GearDataV2에서 2를 추출한다.', () => {
    const data = {
      id: 1000000,
      version: 2,
      name: '테스트용 장비',
      icon: '1000000',
      type: GearType.cap,
      req: {},
      attributes: {},
    } satisfies GearData;
    expect(getVersion(data)).toBe(2);
  });

  it('빈 객체인 경우 undefined를 반환한다.', () => {
    expect(getVersion({})).toBeUndefined();
  });

  it('GearDataV1에서 version이 숫자가 아닌 경우 undefined를 반환한다.', () => {
    expect(getVersion({ meta: { id: 1000000, version: '2' } })).toBeUndefined();
  });

  it('GearDataV2+에서 version이 숫자가 아닌 경우 undefined를 반환한다.', () => {
    expect(getVersion({ id: 1000000, version: '2' })).toBeUndefined();
  });
});
