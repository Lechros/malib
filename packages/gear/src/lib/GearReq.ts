import { GearReqData } from './data';

/**
 * 장비 착용 제한
 */
export class GearReq implements GearReqData {
  /**
   * 장비 착용 제한 정보
   */
  data: GearReqData;

  /**
   * 장비 착용 제한 정보를 참조하는 장비 착용 제한 인스턴스를 생성합니다.
   */
  constructor(data: GearReqData) {
    this.data = data;
  }

  /**
   * 기본 착용 가능 레벨
   */
  get level(): number {
    return this.data.level ?? 0;
  }

  /**
   * 착용 가능 레벨 증가
   */
  get levelIncrease(): number {
    return this.data.levelIncrease ?? 0;
  }

  /**
   * 착용 가능 직업 분류
   * */
  get job(): number {
    return this.data.job ?? 0;
  }

  /**
   * 착용 가능 직업
   */
  get class(): number {
    return this.data.class ?? 0;
  }

  /**
   * 초보자 및 전 직업 착용 가능 여부를 계산합니다.
   * @returns 착용할 수 있을 경우 `true`; 아닐 경우 `false`.
   */
  beginner(): boolean {
    return this.job === 0;
  }

  /**
   * 전사 착용 가능 여부를 계산합니다.
   * @returns 착용할 수 있을 경우 `true`; 아닐 경우 `false`.
   */
  warrior(): boolean {
    return this.job === 0 || (this.job & 1) != 0;
  }

  /**
   * 마법사 착용 가능 여부를 계산합니다.
   * @returns 착용할 수 있을 경우 `true`; 아닐 경우 `false`.
   */
  magician(): boolean {
    return this.job === 0 || (this.job & 2) != 0;
  }

  /**
   * 궁수 착용 가능 여부를 계산합니다.
   * @returns 착용할 수 있을 경우 `true`; 아닐 경우 `false`.
   */
  bowman(): boolean {
    return this.job === 0 || (this.job & 4) != 0;
  }

  /**
   * 도적 착용 가능 여부를 계산합니다.
   * @returns 착용할 수 있을 경우 `true`; 아닐 경우 `false`.
   */
  thief(): boolean {
    return this.job === 0 || (this.job & 8) != 0;
  }

  /**
   * 해적 착용 가능 여부를 계산합니다.
   * @returns 착용할 수 있을 경우 `true`; 아닐 경우 `false`.
   */
  pirate(): boolean {
    return this.job === 0 || (this.job & 16) != 0;
  }
}
