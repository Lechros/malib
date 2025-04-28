import { GearCapability } from '@malib/gear';
import { WzGear } from './wz';

export function getCanScroll(info: WzGear): GearCapability {
  if (!info.tuc) {
    return GearCapability.Cannot;
  }
  if (info.exceptUpgrade) {
    return GearCapability.Fixed;
  }
  return GearCapability.Can;
}
