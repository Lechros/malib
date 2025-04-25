import {
  GearType,
  isDragonGear,
  isMechanicGear,
  StarforceCan,
} from '@malib/gear';
import { WzGear } from './wz';

export function getCanStarforce(info: WzGear, type: GearType): StarforceCan {
  if (!info.tuc) {
    return StarforceCan.Cannot;
  }
  if (info.onlyUpgrade) {
    return StarforceCan.Cannot;
  }
  if (isMechanicGear(type) || isDragonGear(type)) {
    return StarforceCan.Cannot;
  }
  if (info.exceptUpgrade) {
    return StarforceCan.Fixed;
  }
  return StarforceCan.Can;
}
