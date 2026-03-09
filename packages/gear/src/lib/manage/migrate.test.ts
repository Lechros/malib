import { migrate } from './migrate';
import {
  GearDataV1,
  GearDataV2,
  GearTypeV1,
  GearTypeV2,
  GearTypeV3,
} from './types';

describe('migrate', () => {
  it('GearDataV1을 GearDataV2로 마이그레이션한다.', () => {
    const data = {
      meta: {
        id: 1000000,
        version: 1,
      },
      name: '테스트용 장비',
      icon: '1000000',
      type: GearTypeV1.cap,
      req: {},
      attributes: {},
    } satisfies GearDataV1;
    expect(migrate(data, 2)).toEqual({
      id: 1000000,
      version: 2,
      name: '테스트용 장비',
      icon: '1000000',
      type: GearTypeV3.cap,
      req: {},
      attributes: {},
    });
  });

  it('GearDataV2를 GearDataV2로 마이그레이션한다.', () => {
    const data = {
      id: 1000000,
      version: 2,
      name: '테스트용 장비',
      icon: '1000000',
      type: GearTypeV2.cap,
      req: {},
      attributes: {},
    } satisfies GearDataV2;
    expect(migrate(data, 2)).toEqual(data);
  });

  it('GearDataV1을 GearDataV3로 마이그레이션한다.', () => {
    const data = {
      meta: {
        id: 1000000,
        version: 1,
      },
      name: '테스트용 장비',
      icon: '1000000',
      type: GearTypeV1.cap,
      req: { job: 10, class: 123 },
      attributes: {},
    } satisfies GearDataV1;
    expect(migrate(data, 3)).toEqual({
      id: 1000000,
      version: 3,
      name: '테스트용 장비',
      icon: '1000000',
      type: GearTypeV3.cap,
      req: { job: { class: 10, jobs: [123] } },
      attributes: {},
    });
  });

  it('version 인자를 전달하지 않으면 GearDataV3로 마이그레이션한다.', () => {
    const data = {
      id: 1000000,
      version: 2,
      name: '테스트용 장비',
      icon: '1000000',
      type: GearTypeV2.cap,
      req: { job: 10, class: 123 },
      attributes: {},
    } satisfies GearDataV2;
    expect(migrate(data)).toEqual({
      id: 1000000,
      version: 3,
      name: '테스트용 장비',
      icon: '1000000',
      type: GearTypeV3.cap,
      req: { job: { class: 10, jobs: [123] } },
      attributes: {},
    });
  });

  it('GearDataV2에서 job만 있는 경우 마이그레이션한다.', () => {
    const data = {
      id: 1000000,
      version: 2,
      name: '테스트용 장비',
      icon: '1000000',
      type: GearTypeV2.cap,
      req: { job: 1 },
      attributes: {},
    } satisfies GearDataV2;
    expect(migrate(data)).toEqual({
      id: 1000000,
      version: 3,
      name: '테스트용 장비',
      icon: '1000000',
      type: GearTypeV3.cap,
      req: { job: { class: 1 } },
      attributes: {},
    });
  });

  it('GearDataV2에서 class만 있는 경우 마이그레이션한다.', () => {
    const data = {
      id: 1000000,
      version: 2,
      name: '테스트용 장비',
      icon: '1000000',
      type: GearTypeV2.cap,
      req: { class: 101 },
      attributes: {},
    } satisfies GearDataV2;
    expect(migrate(data)).toEqual({
      id: 1000000,
      version: 3,
      name: '테스트용 장비',
      icon: '1000000',
      type: GearTypeV3.cap,
      req: { job: { jobs: [101] } },
      attributes: {},
    });
  });

  it('GearDataV2에서 job, class 모두 없는 경우 마이그레이션한다.', () => {
    const data = {
      id: 1000000,
      version: 2,
      name: '테스트용 장비',
      icon: '1000000',
      type: GearTypeV2.cap,
      req: {},
      attributes: {},
    } satisfies GearDataV2;
    expect(migrate(data)).toEqual({
      id: 1000000,
      version: 3,
      name: '테스트용 장비',
      icon: '1000000',
      type: GearTypeV3.cap,
      req: {},
      attributes: {},
    });
  });
});
