import { GearData } from './data';

/**
 * 장비
 */
export class Gear {
  /** 장비 정보 */
  data: GearData;

  /**
   * 장비 정보를 참조하는 장비 인스턴스를 생성합니다.
   * @param data 장비 정보.
   */
  constructor(data: GearData) {
    this.data = data;
  }
}
