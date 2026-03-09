import { GearGender, GearReqData, GearReqJobData } from './data';

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
   * 착용 가능 직업
   */
  get job(): GearReqJob {
    return new GearReqJob(this.data.job ?? {});
  }

  /**
   * 착용 가능 성별
   */
  get gender(): GearGender | undefined {
    return this.data.gender;
  }
}

/**
 * 장비 착용 제한 직업
 */
export class GearReqJob implements GearReqJobData {
  /**
   * 장비 착용 제한 직업 정보
   */
  data: GearReqJobData;

  /**
   * 장비 착용 제한 직업 정보를 참조하는 장비 착용 제한 직업 인스턴스를 생성합니다.
   */
  constructor(data: GearReqJobData) {
    this.data = data;
  }

  /**
   * 착용 가능 전직 계열 비트마스크 (전사, 마법사, 궁수, 도적, 해적)
   */
  get class(): number {
    return this.data.class ?? 0;
  }

  /**
   * 착용 가능 직업 코드 목록
   *
   * 차수 무관한 직업 코드 목록입니다.
   */
  get jobs(): number[] {
    return this.data.jobs ?? [];
  }

  /**
   * 착용 가능 세부 직업 코드 목록
   *
   * 차수를 고려한 직업 코드 목록입니다.
   */
  get fullJobs(): number[] {
    return this.data.fullJobs ?? [];
  }

  /**
   * 초보자 착용 가능 여부를 계산합니다.
   * @returns 착용할 수 있을 경우 `true`; 아닐 경우 `false`.
   */
  beginner(): boolean {
    return this.class <= 0;
  }

  /**
   * 전사 착용 가능 여부를 계산합니다.
   * @returns 착용할 수 있을 경우 `true`; 아닐 경우 `false`.
   */
  warrior(): boolean {
    return this.class === 0 || (this.class & 1) != 0;
  }

  /**
   * 마법사 착용 가능 여부를 계산합니다.
   * @returns 착용할 수 있을 경우 `true`; 아닐 경우 `false`.
   */
  magician(): boolean {
    return this.class === 0 || (this.class & 2) != 0;
  }

  /**
   * 궁수 착용 가능 여부를 계산합니다.
   * @returns 착용할 수 있을 경우 `true`; 아닐 경우 `false`.
   */
  bowman(): boolean {
    return this.class === 0 || (this.class & 4) != 0;
  }

  /**
   * 도적 착용 가능 여부를 계산합니다.
   * @returns 착용할 수 있을 경우 `true`; 아닐 경우 `false`.
   */
  thief(): boolean {
    return this.class === 0 || (this.class & 8) != 0;
  }

  /**
   * 해적 착용 가능 여부를 계산합니다.
   * @returns 착용할 수 있을 경우 `true`; 아닐 경우 `false`.
   */
  pirate(): boolean {
    return this.class === 0 || (this.class & 16) != 0;
  }
}
