export interface IStat {
  /** STR */
  str?: number;
  /** DEX */
  dex?: number;
  /** INT */
  int?: number;
  /** LUK */
  luk?: number;
  /** STR % */
  strRate?: number;
  /** DEX % */
  dexRate?: number;
  /** INT % */
  intRate?: number;
  /** LUK % */
  lukRate?: number;
  /** STR (% 미적용) */
  strFixed?: number;
  /** DEX (% 미적용) */
  dexFixed?: number;
  /** INT (% 미적용) */
  intFixed?: number;
  /** LUK (% 미적용) */
  lukFixed?: number;
  /** 최대 HP */
  mhp?: number;
  /** 최대 MP */
  mmp?: number;
  /** 최대 HP % */
  mhpRate?: number;
  /** 최대 MP % */
  mmpRate?: number;
  /** 최대 HP (% 미적용) */
  mhpFixed?: number;
  /** 최대 MP (% 미적용) */
  mmpFixed?: number;
  /** 공격력 */
  pad?: number;
  /** 마력 */
  mad?: number;
  /** 공격력 % */
  padRate?: number;
  /** 마력 % */
  madRate?: number;
  /** 공격력 (% 미적용) */
  padFixed?: number;
  /** 마력 (% 미적용) */
  madFixed?: number;
  /** 크리티컬 확률 */
  criticalRate?: number;
  /** 크리티컬 데미지 */
  criticalDamage?: number;
  /** 데미지 */
  damage?: number;
  /** 보스 몬스터 공격 시 데미지 */
  bossDamage?: number;
  /** 일반 몬스터 공격 시 데미지 */
  normalDamage?: number;
  /** 최종 데미지 */
  finalDamage?: number;
  /** 몬스터 방어율 무시 */
  ignoreDefense?: number;
  /** 속성 내성 무시 */
  ignoreElemResist?: number;

  /** 캐릭터 기준 9레벨 당 STR 증가 */
  strLevel?: number;
  /** 캐릭터 기준 9레벨 당 DEX 증가 */
  dexLevel?: number;
  /** 캐릭터 기준 9레벨 당 INT 증가 */
  intLevel?: number;
  /** 캐릭터 기준 9레벨 당 LUK 증가 */
  lukLevel?: number;
  /** 캐릭터 기준 9레벨 당 공격력 1 증가 */
  padLevel?: number;
  /** 캐릭터 기준 9레벨 당 마력 1 증가 */
  madLevel?: number;

  /** 재사용 대기시간 감소 (초) */
  reduceCooltime?: number;
  /** 재사용 대기시간 감소 % */
  reduceCooltimeRate?: number;
  /** 버프 지속시간 증가 % */
  buffDuration?: number;
}

export class Stat implements Required<IStat> {
  str = 0;
  dex = 0;
  int = 0;
  luk = 0;
  strRate = 0;
  dexRate = 0;
  intRate = 0;
  lukRate = 0;
  strFixed = 0;
  dexFixed = 0;
  intFixed = 0;
  lukFixed = 0;
  mhp = 0;
  mmp = 0;
  mhpRate = 0;
  mmpRate = 0;
  mhpFixed = 0;
  mmpFixed = 0;
  pad = 0;
  mad = 0;
  padRate = 0;
  madRate = 0;
  padFixed = 0;
  madFixed = 0;
  criticalRate = 0;
  criticalDamage = 0;
  damage = 0;
  bossDamage = 0;
  normalDamage = 0;
  finalDamage = 0;
  ignoreDefense = 0;
  ignoreElemResist = 0;
  strLevel = 0;
  dexLevel = 0;
  intLevel = 0;
  lukLevel = 0;
  padLevel = 0;
  madLevel = 0;
  reduceCooltime = 0;
  reduceCooltimeRate = 0;
  buffDuration = 0;

  constructor(stat?: IStat) {
    if (stat) {
      this.add(stat);
    }
  }

  /**
   * 현재 객체에 스탯을 추가합니다. `finalDamage`, `ignoreDefense`를 데미지 공식대로 계산합니다.
   * @param stat 추가할 스탯.
   * @returns `stat`이 더해진 상태의 기존 객체.
   */
  add(stat: IStat): Stat {
    for (const [_type, value] of Object.entries(stat)) {
      const type = _type as keyof IStat;
      switch (type) {
        case "finalDamage":
          this[type] = Stat.addFinalDamage(this[type], value);
          break;
        case "ignoreDefense":
          this[type] = Stat.addIgnoreDefense(this[type], value);
          break;
        default:
          this[type] += value;
          break;
      }
    }
    return this;
  }

  /**
   * 현재 객체에 스탯을 추가합니다. 모든 옵션을 덧셈으로 계산합니다.
   * @param stat 추가할 스탯.
   * @returns `stat`이 더해진 상태의 기존 객체.
   */
  addExact(stat: IStat): Stat {
    for (const [_type, value] of Object.entries(stat)) {
      const type = _type as keyof IStat;
      this[type] += value;
    }
    return this;
  }

  /**
   * 현재 객체와 동일한 스탯을 가지는 새로운 객체를 생성합니다.
   * @returns 현재 객체와 동일한 스탯을 가진 새로운 객체.
   */
  clone(): Stat {
    return new Stat(this);
  }

  /**
   * `finalDamage` 옵션을 더합니다. 값이 음수일 경우 최종 데미지 `n`% 감소로 계산합니다.
   * @param values 더할 옵션들. `-100` 이상의 값만을 포함해야 합니다.
   * @returns 더한 결과.
   */
  static addFinalDamage(...values: number[]): number {
    let total = 1;
    for (const value of values) {
      total *= 1 + value * 0.01;
    }
    return total * 100 - 100;
  }

  /**
   * `ignoreDefense` 옵션을 더합니다. 값이 음수일 경우 방어율 무시 `10`%를 제외하는 방식으로 계산합니다.
   * @param values 더할 옵션들. `-100` ~ `100` 사이의 값만을 포함해야 합니다.
   * @returns 더한 결과.
   */
  static addIgnoreDefense(...values: number[]): number {
    let total = 1;
    for (const value of values) {
      if (value >= 0) {
        total *= 1 - value * 0.01;
      } else if (value > -100) {
        total /= 1 + value * 0.01;
      }
    }
    return 100 - total * 100;
  }
}
