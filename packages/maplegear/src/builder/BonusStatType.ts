enum BonusStatType {
  /** STR 단일 */
  STR,
  /** DEX 단일 */
  DEX,
  /** INT 단일 */
  INT,
  /** LUK 단일 */
  LUK,
  /** STR, DEX 이중 */
  STR_DEX,
  /** STR, INT 이중 */
  STR_INT,
  /** STR, LUK 이중 */
  STR_LUK,
  /** DEX, INT 이중 */
  DEX_INT,
  /** DEX, LUK 이중 */
  DEX_LUK,
  /** INT, LUK 이중 */
  INT_LUK,
  /** 방어력 */
  PDD,
  /** 공격력 */
  PAD,
  /** 마력 */
  MAD,
  /** 최대 HP */
  MHP,
  /** 최대 MP */
  MMP,
  /** 이동속도 */
  speed,
  /** 점프력 */
  jump,
  /** 데미지 % */
  damR,
  /** 보스 데미지 % */
  bdR,
  /** 올스탯 % */
  allStatR,
  /** 착용 레벨 감소 */
  reduceReq,
}

export default BonusStatType;
