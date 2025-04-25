import { ScrollCan } from '@malib/gear';
import { WzGear } from './wz';

export function getCanScroll(info: WzGear): ScrollCan {
  if (!info.tuc) {
    return ScrollCan.Cannot;
  }
  if (info.exceptUpgrade) {
    return ScrollCan.Fixed;
  }
  return ScrollCan.Can;
}
