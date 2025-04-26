import {
  GearType,
  isDragonGear,
  isMechanicGear,
  GearCapability,
} from '@malib/gear';
import { WzGear } from './wz';

export function getCanStarforce(info: WzGear, type: GearType): GearCapability {
  if (!info.tuc) {
    return GearCapability.Cannot;
  }
  if (info.onlyUpgrade) {
    return GearCapability.Cannot;
  }
  if (isMechanicGear(type) || isDragonGear(type)) {
    return GearCapability.Cannot;
  }
  if (info.exceptUpgrade) {
    return GearCapability.Fixed;
  }
  return GearCapability.Can;
}
