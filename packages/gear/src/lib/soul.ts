import { GearPropType } from "./gearproptype";

/**
 * 소울 웨폰
 */
export class SoulSlot {
  /** 소울 인챈트 여부 */
  enchanted = false;
  /** 소울 */
  soul: Soul | undefined;
  /** 소울 충전량 */
  charge = 0;
  /** 소울 충전량으로 증가하는 옵션 */
  chargeOption: Map<GearPropType, number>;

  constructor() {
    this.chargeOption = new Map();
  }
}

/**
 * 소울
 */
export class Soul {
  /** 소울 이름 */
  name = "";
  /** 스킬명 */
  skill = "";
  /** 소울 옵션 */
  option: Map<GearPropType, number>;

  multiplier = 0;

  constructor() {
    this.option = new Map();
  }
}
