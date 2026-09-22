import { migrate } from './migrate';
import {
  GearDataV1,
  GearDataV2,
  GearDataV3,
  GearDataV4,
  GearTypeV1,
  GearTypeV2,
  GearTypeV3,
  GearTypeV4,
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

  it('version 인자를 전달하지 않으면 GearDataV4로 마이그레이션한다.', () => {
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
      version: 4,
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
    expect(migrate(data, 3)).toEqual({
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
    expect(migrate(data, 3)).toEqual({
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
    expect(migrate(data, 3)).toEqual({
      id: 1000000,
      version: 3,
      name: '테스트용 장비',
      icon: '1000000',
      type: GearTypeV3.cap,
      req: {},
      attributes: {},
    });
  });

  it('GearDataV3을 GearDataV4로 마이그레이션한다.', () => {
    const data = {
      id: 1452000,
      version: 3,
      name: '테스트용 무기',
      icon: '1452000',
      type: GearTypeV3.bow,
      req: {},
      attributes: {},
      soulSlot: {
        soul: {
          name: '테스트용 소울',
          skill: '테스트용 소울 스킬',
          option: { attackPowerRate: 3 },
          chargeFactor: 2,
        },
        charge: 1000,
        chargeOption: { attackPower: 20 },
      },
    } satisfies GearDataV3;
    expect(migrate(data, 4)).toEqual({
      id: 1452000,
      version: 4,
      name: '테스트용 무기',
      icon: '1452000',
      type: GearTypeV4.bow,
      req: {},
      attributes: {},
      soulSlot: {
        enchanted: true,
        soul: {
          name: '테스트용 소울',
          option: { attackPowerRate: 3 },
        },
      },
    });
  });

  it('GearDataV3의 soulSlot이 없는 경우 GearDataV4로 마이그레이션한다.', () => {
    const data = {
      id: 1452000,
      version: 3,
      name: '테스트용 무기',
      icon: '1452000',
      type: GearTypeV3.bow,
      req: {},
      attributes: {},
    } satisfies GearDataV3;
    expect(migrate(data, 4)).toEqual({
      id: 1452000,
      version: 4,
      name: '테스트용 무기',
      icon: '1452000',
      type: GearTypeV4.bow,
      req: {},
      attributes: {},
    });
  });

  it.each(['위대한 카링의 소울', '위대한 스우의 소울'])(
    'GearDataV3의 소울 이름이 위대한으로 시작하는 경우 증폭 가능한 소울로 마이그레이션한다.',
    (name) => {
      const data = {
        id: 1452000,
        version: 3,
        name: '테스트용 무기',
        icon: '1452000',
        type: GearTypeV3.bow,
        req: {},
        attributes: {},
        soulSlot: {
          soul: {
            name,
            skill: '테스트용 소울 스킬',
            option: { attackPowerRate: 3 },
          },
        },
      } satisfies GearDataV3;

      expect(migrate(data, 4).soulSlot).toEqual({
        enchanted: true,
        soul: {
          name,
          option: { attackPowerRate: 3 },
          canAmplify: true,
        },
      });
    },
  );

  it.each(['기운찬 카링의 소울', '테스트용 위대한 소울', ''])(
    'GearDataV3의 소울 이름이 위대한으로 시작하지 않는 경우 canAmplify를 추가하지 않는다.',
    (name) => {
      const data = {
        id: 1452000,
        version: 3,
        name: '테스트용 무기',
        icon: '1452000',
        type: GearTypeV3.bow,
        req: {},
        attributes: {},
        soulSlot: {
          soul: {
            name,
            skill: '테스트용 소울 스킬',
            option: { str: 24 },
          },
        },
      } satisfies GearDataV3;

      expect(migrate(data, 4).soulSlot).toEqual({
        enchanted: true,
        soul: {
          name,
          option: { str: 24 },
        },
      });
    },
  );

  it('GearDataV3의 소울 슬롯에 소울이 없는 경우 소울웨폰 상태만 마이그레이션한다.', () => {
    const data = {
      id: 1452000,
      version: 3,
      name: '테스트용 무기',
      icon: '1452000',
      type: GearTypeV3.bow,
      req: {},
      attributes: {},
      soulSlot: {},
    } satisfies GearDataV3;

    expect(migrate(data, 4).soulSlot).toEqual({ enchanted: true });
  });

  it('GearDataV4를 GearDataV4로 마이그레이션한다.', () => {
    const data = {
      id: 1452000,
      version: 4,
      name: '테스트용 무기',
      icon: '1452000',
      type: GearTypeV4.bow,
      req: {},
      attributes: {},
      soulSlot: { enchanted: false },
    } satisfies GearDataV4;
    expect(migrate(data, 4)).toEqual(data);
  });
});
