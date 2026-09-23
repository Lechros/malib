import { GearReqData, GearReqJobData, VERSION } from '../data';
import { ErrorCode, GearError } from '../error';
import { GearDataV1, GearDataV2, GearDataV3, GearDataV4 } from './types';
import { getVersion } from './version';

type AnyGearData = GearDataV1 | GearDataV2 | GearDataV3 | GearDataV4;
type AnyVersion = 1 | 2 | 3 | 4;
type CurrentGearData = GearDataV4;

const migrators = {
  1: migrateV1ToV2,
  2: migrateV2ToV3,
  3: migrateV3ToV4,
};

const errorGear = {
  id: -1,
  name: '(unknown)',
  errorLanguage: 'ko' as const,
};

/**
 * 입력 장비 정보를 목표 버전으로 마이그레이션합니다.
 * 이 함수가 성공한 이후에는 입력 장비 정보 객체를 사용할 수 없습니다.
 *
 * `GearData`에 정의되지 않은 속성이 존재할 경우 마이그레이션 과정에서 유실될 수 있습니다.
 *
 * @param data 마이그레이션할 장비 정보.
 * @param version 목표 버전.
 * @returns 목표 버전으로 마이그레이션된 장비 정보.
 *
 * @throws {@link GearError}
 * 입력 데이터가 유효하지 않은 경우.
 * 입력 데이터의 버전이 잘못되었거나 지정한 버전보다 최신인 경우.
 */
export function migrate(data: AnyGearData, version: 1): GearDataV1;
export function migrate(data: AnyGearData, version: 2): GearDataV2;
export function migrate(data: AnyGearData, version: 3): GearDataV3;
export function migrate(data: AnyGearData, version: 4): GearDataV4;
export function migrate(data: AnyGearData): CurrentGearData;
export function migrate(
  data: AnyGearData,
  version: AnyVersion = VERSION,
): AnyGearData {
  const dataVersion = getVersion(data);
  if (dataVersion === undefined) {
    throw new GearError(ErrorCode.Gear_Migrate_InvalidGearData, {
      gear: errorGear,
    });
  }
  if (dataVersion > version) {
    throw new GearError(ErrorCode.Gear_Migrate_DataVersionTooNew, {
      gear: errorGear,
    });
  }
  let currentVersion: AnyVersion = dataVersion as AnyVersion;
  while (currentVersion < version) {
    if (!(currentVersion in migrators)) {
      throw new GearError(ErrorCode.Gear_Migrate_UnknownDataVersion, {
        gear: errorGear,
      });
    }
    data = migrators[currentVersion as keyof typeof migrators](data as any);
    currentVersion++;
  }
  return data;
}

function migrateV1ToV2(data: GearDataV1): GearDataV2 {
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

function migrateV3ToV4(data: GearDataV3): GearDataV4 {
  const { soulSlot, ...rest } = data;
  if (soulSlot === undefined) {
    return {
      ...rest,
      version: 4,
    };
  } else {
    return {
      ...rest,
      version: 4,
      soulSlot: {
        enchanted: true,
        ...(soulSlot.soul && {
          soul: {
            name: soulSlot.soul.name,
            option: soulSlot.soul.option,
            ...(soulSlot.soul.name.startsWith('위대한') && {
              canAmplify: true,
            }),
          },
        }),
      },
    };
  }
}
