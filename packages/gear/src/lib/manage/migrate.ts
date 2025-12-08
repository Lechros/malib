import { VERSION } from '../data';
import { ErrorMessage } from '../errors';
import { getVersion } from './version';

export function migrate(data: object, version: number = VERSION): object {
  const currentVersion = getVersion(data);
  if (currentVersion === undefined) {
    throw new TypeError(ErrorMessage.Migrate_InvalidGearData);
  }
  if (currentVersion > version) {
    throw new TypeError(ErrorMessage.Migrate_DataVersionTooNew);
  }
  if (currentVersion === version) {
    return data;
  }
  switch (currentVersion) {
    case 1:
      return migrateV1ToV2(data);
    default:
      throw new TypeError(ErrorMessage.Migrate_UnknownDataVersion);
  }
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
