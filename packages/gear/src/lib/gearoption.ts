/**
 * 장비 옵션
 */
export class GearOption {
  /** 기본 수치 */
  base = 0;
  /** 추가옵션 수치 */
  bonus = 0;
  /** 주문서 강화 수치 */
  upgrade = 0;
  /** 장비 강화 수치 */
  enchant = 0;

  /** 모든 수치가 0일 경우 `true`; 아닐 경우 `false` */
  get empty(): boolean {
    return (
      this.base === 0 &&
      this.bonus === 0 &&
      this.upgrade === 0 &&
      this.enchant === 0
    );
  }

  /** 모든 수치의 합; 합이 음수일 경우 `0` */
  get sum(): number {
    return Math.max(0, this.base + this.bonus + this.upgrade + this.enchant);
  }

  /** 기본 수치 대비 변화량 */
  get diff(): number {
    return this.bonus + this.upgrade + this.enchant;
  }
}
