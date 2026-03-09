import { GearReqData, GearReqJobData, VERSION } from '../data';
import { ErrorMessage } from '../errors';
import { GearDataV1, GearDataV2, GearDataV3 } from './types';
import { getVersion } from './version';

type AnyGearData = GearDataV1 | GearDataV2 | GearDataV3;
type AnyVersion = 1 | 2 | 3;

const migrators = {
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
export function migrate(data: GearDataV1): GearDataV3;
export function migrate(data: GearDataV1, version: 1): GearDataV1;
export function migrate(data: GearDataV1, version: 2): GearDataV2;
export function migrate(data: GearDataV1, version: 3): GearDataV3;
export function migrate(data: GearDataV2): GearDataV3;
export function migrate(data: GearDataV2, version: 2): GearDataV2;
export function migrate(data: GearDataV2, version: 3): GearDataV3;
export function migrate(data: GearDataV3): GearDataV3;
export function migrate(data: GearDataV3, version: 3): GearDataV3;
export function migrate(
  data: AnyGearData,
  version: AnyVersion = VERSION,
): AnyGearData {
  const dataVersion = getVersion(data);
  if (dataVersion === undefined) {
    throw new TypeError(ErrorMessage.Migrate_InvalidGearData);
  }
  if (dataVersion > version) {
    throw new TypeError(ErrorMessage.Migrate_DataVersionTooNew);
  }
  let currentVersion: AnyVersion = dataVersion as AnyVersion;
  while (currentVersion < version) {
    if (!(currentVersion in migrators)) {
      throw new TypeError(ErrorMessage.Migrate_UnknownDataVersion);
    }
    data = migrators[currentVersion as keyof typeof migrators](data as any);
    currentVersion++;
  }
  return data as GearDataV3;
}

function migrateV1ToV2(data: GearDataV1): GearDataV2 {
  if (
    ('id' in data && data.id !== undefined) ||
    ('version' in data && data.version !== undefined)
  ) {
    throw new TypeError(ErrorMessage.Migrate_DataPropertyWillBeOverwritten);
  }
  const { meta, icon, ...rest } = data;
  return {
    ...rest,
    id: meta.id,
    version: 2,
    icon: icon ?? '(null)',
  };
}

function migrateV2ToV3(data: GearDataV2): GearDataV3 {
  const { req, ...rest } = data;
  const { level, levelIncrease, job, class: classCode, gender } = req;
  let reqJob: GearReqJobData | undefined = undefined;
  if (job || classCode) {
    reqJob = {
      class: job,
      jobs: classCode ? [classCode] : undefined,
    };
  }
  const newReq: GearReqData = {};
  if (level !== undefined) {
    newReq.level = level;
  }
  if (levelIncrease !== undefined) {
    newReq.levelIncrease = levelIncrease;
  }
  if (reqJob !== undefined) {
    newReq.job = reqJob;
  }
  if (gender !== undefined) {
    newReq.gender = gender;
  }
  return {
    ...rest,
    version: 3,
    req: newReq,
  };
}
