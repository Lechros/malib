import { VERSION } from '../data';
import { ErrorMessage } from '../errors';
import { getVersion } from './version';

type Migrator = (data: object) => object;

const migrators: Record<number, Migrator> = {
  1: migrateV1ToV2,
  2: migrateV2ToV3,
};

/**
 * 입력 장비 정보를 목표 버전으로 마이그레이션합니다.
 * 이 함수가 성공한 이후에는 입력 장비 정보 객체를 사용할 수 없습니다.
 *
 * @param data 마이그레이션할 장비 정보.
 * @param version 목표 버전.
 * @returns 목표 버전으로 마이그레이션된 장비 정보.
 *
 * @throws {@link TypeError}
 * 입력 데이터가 유효하지 않은 경우.
 * 입력 데이터의 버전이 잘못되었거나 지원하는 버전보다 최신인 경우.
 */

export function migrate(data: object, version: number = VERSION): object {
  let currentVersion = getVersion(data);
  if (currentVersion === undefined) {
    throw new TypeError(ErrorMessage.Migrate_InvalidGearData);
  }
  if (currentVersion > version) {
    throw new TypeError(ErrorMessage.Migrate_DataVersionTooNew);
  }
  while (currentVersion < version) {
    if (!(currentVersion in migrators)) {
      throw new TypeError(ErrorMessage.Migrate_UnknownDataVersion);
    }
    data = migrators[currentVersion](data);
    currentVersion++;
  }
  return data;
}

function migrateV1ToV2(data: object): object {
  if (
    ('id' in data && data.id !== undefined) ||
    ('version' in data && data.version !== undefined)
  ) {
    throw new TypeError(ErrorMessage.Migrate_DataPropertyWillBeOverwritten);
  }
  if (
    !(
      'meta' in data &&
      typeof data.meta === 'object' &&
      data.meta !== null &&
      'id' in data.meta &&
      typeof data.meta.id === 'number'
    )
  ) {
    throw new TypeError('Assert: id should exist');
  }
  const { meta, ...rest } = data;
  return {
    ...rest,
    id: meta.id,
    version: 2,
  };
}

function migrateV2ToV3(data: object): object {
  if (
    'req' in data &&
    data.req !== undefined &&
    typeof data.req === 'object' &&
    data.req !== null &&
    'class' in data.req &&
    data.req.class !== undefined
  ) {
    if (typeof data.req.class !== 'number') {
      throw new TypeError(ErrorMessage.Migrate_InvalidGearData);
    }
    (data.req as { specJobs?: number[] }).specJobs = [data.req.class];
    delete data.req.class;
  }
  (data as { version: number }).version = 3;
  return data;
}
