/**
 * 장비 분류
 */
export enum GearType {
  /** 모자 */
  cap = 100,
  /** 얼굴장식 */
  faceAccessory = 101,
  /** 눈장식 */
  eyeAccessory = 102,
  /** 귀고리 */
  earrings = 103,
  /** 상의 */
  coat = 104,
  /** 한벌옷 */
  longcoat = 105,
  /** 하의 */
  pants = 106,
  /** 신발 */
  shoes = 107,
  /** 장갑 */
  glove = 108,
  /** 망토 */
  cape = 110,
  /** 반지 */
  ring = 111,
  /** 펜던트 */
  pendant = 112,
  /** 벨트 */
  belt = 113,
  /** 훈장 */
  medal = 114,
  /** 어깨장식 */
  shoulderPad = 115,
  /** 포켓 아이템 */
  pocket = 116,
  /** 뱃지 */
  badge = 118,
  /** 안드로이드 */
  android = 166,
  /** 기계 심장 */
  machineHeart = 167,
  /** 방패 */
  shield = 109,
  /** 엠블렘 */
  emblem = 119,
  /** 파워소스 */
  powerSource = 119020,
  /** 샤이닝 로드 */
  shiningRod = 1212,
  /** 튜너 */
  tuner = 1213,
  /** 브레스 슈터 */
  breathShooter = 1214,
  /** 소울 슈터 */
  soulShooter = 122,
  /** 데스페라도 */
  desperado = 123,
  /** 에너지소드 */
  energySword = 124,
  /** ESP 리미터 */
  espLimiter = 126,
  /** 체인 */
  chain2 = 127,
  /** 매직 건틀렛 */
  magicGauntlet = 128,
  /** 부채 */
  handFan = 129,
  /** 한손검 */
  ohSword = 130,
  /** 한손도끼 */
  ohAxe = 131,
  /** 한손둔기 */
  ohBlunt = 132,
  /** 단검 */
  dagger = 133,
  /** 블레이드 */
  katara = 134,
  /** 케인 */
  cane = 136,
  /** 완드 */
  wand = 137,
  /** 스태프 */
  staff = 138,
  /** 두손검 */
  thSword = 140,
  /** 차크람 */
  chakram = 1404,
  /** 두손도끼 */
  thAxe = 141,
  /** 두손둔기 */
  thBlunt = 142,
  /** 창 */
  spear = 143,
  /** 폴암 */
  polearm = 144,
  /** 활 */
  bow = 145,
  /** 석궁 */
  crossbow = 146,
  /** 아대 */
  throwingGlove = 147,
  /** 너클 */
  knuckle = 148,
  /** 건 */
  gun = 149,
  /** 삽 */
  shovel = 150,
  /** 곡괭이 */
  pickaxe = 151,
  /** 듀얼 보우건 */
  dualBow = 152,
  /** 핸드캐논 */
  handCannon = 153,
  /** 대검 */
  swordZB = 156,
  /** 태도 */
  swordZL = 157,
  /** 건틀렛 리볼버 */
  GauntletBuster = 158,
  /** 에인션트 보우 */
  ancientBow = 159,
  /** 소울실드 */
  soulShield = 1098,
  /** 포스실드 */
  demonShield = 1099,
  /** 마법화살 */
  magicArrow = 135200,
  /** 카드 */
  card = 135210,
  /** 메달 */
  heroMedal = 135220,
  /** 로자리오 */
  rosario = 135221,
  /** 쇠사슬 */
  chain = 135222,
  /** 마도서 (불,독) */
  book1 = 135223,
  /** 마도서 (얼음,번개) */
  book2 = 135224,
  /** 마도서 (비숍) */
  book3 = 135225,
  /** 화살깃 */
  bowMasterFeather = 135226,
  /** 활골무 */
  crossBowThimble = 135227,
  /** 단검용 검집 */
  shadowerSheath = 135228,
  /** 부적 */
  nightLordPoutch = 135229,
  /** 오브 */
  orb = 135240,
  /** 용의 정수 */
  novaMarrow = 135250,
  /** 소울링 */
  soulBangle = 135260,
  /**  */
  mailin = 135270,
  /** 리스트밴드 */
  viperWristband = 135290,
  /** 조준기 */
  captainSight = 135291,
  /** 화약통 */
  cannonGunPowder = 135292,
  /** 무게추 */
  aranPendulum = 135293,
  /** 문서 */
  evanPaper = 135294,
  /** 마법구슬 */
  battlemageBall = 135295,
  /** 화살촉 */
  wildHunterArrowHead = 135296,
  /** 보석 */
  cygnusGem = 135297,
  /** 화약통 */
  cannonGunPowder2 = 135298,
  /** 컨트롤러 */
  controller = 135300,
  /** 여우구슬 */
  foxPearl = 135310,
  /** 체스피스 */
  chess = 135320,
  /** 무기 전송장치 */
  transmitter = 135330,
  /** 장약 */
  ExplosivePill = 135340,
  /** 매직윙 */
  magicWing = 135350,
  /** 패스 오브 어비스 */
  pathOfAbyss = 135360,
  /** 렐릭 */
  relic = 135370,
  /** 선추 */
  fanTassel = 135380,
  /** 브레이슬릿 */
  bracelet = 135400,
  /** 웨폰 벨트 */
  weaponBelt = 135401,
  /** 노리개 */
  ornament = 135402,
  /** 헥스시커 */
  hexSeeker = 135403,
  /** 펫장비 */
  petEquip = 180,
  /** 메카닉 엔진 */
  machineEngine = 161,
  /** 메카닉 암 */
  machineArms = 162,
  /** 메카닉 레그 */
  machineLegs = 163,
  /** 메카닉 프레임 */
  machineBody = 164,
  /** 메카닉 트렌지스터 */
  machineTransistors = 165,
  /** 드래곤 모자 */
  dragonMask = 194,
  /** 드래곤 펜던트 */
  dragonPendant = 195,
  /** 드래곤 날개장식 */
  dragonWings = 196,
  /** 드랴곤 꼬리장식 */
  dragonTail = 197,
}
