import { GearPropType } from "./GearPropType";
import { SoulType } from "./SoulType";

type SoulMobName = keyof typeof soulData;

/**
 * 소울
 */
export class Soul {
  /** 소울 충전량 */
  charge = 0;
  /** 몬스터 이름 */
  mobName: SoulMobName = "" as SoulMobName;
  /** 소울 이름 */
  soulName = "";
  /** 스킬명 */
  skillName = "";
  /** 속성 */
  option: Map<GearPropType, number>;
  /** 속성 문자열 */
  optionString = "";

  constructor() {
    this.option = new Map();
  }

  isEmpty(): boolean {
    return this.soulName === "";
  }

  /**
   * 소울 충전량으로 증가하는 공격력/마력
   */
  get chargeAD(): number {
    if(this.isEmpty()) {
      return Math.floor(Math.min(500, this.charge) / 100) * 2;
    }
    if(SoulHelper.getSoulGrade(this.mobName) <= 6) {
      return Math.floor(Math.min(500, this.charge) / 100) * 4;
    }
    return Math.floor(Math.min(500, this.charge) / 100) * 3;
  }

  /**
   * 몬스터 이름, 소울 종류로부터 소울을 생성합니다.
   * @param mobName 몬스터 이름
   * @param soulType 소울 종류
   * @returns 일치하는 소울; 존재하지 않을 경우 `undefined`
   */
  static createFromName(mobName: SoulMobName, soulType: SoulType): Soul | undefined {
    const soul = new Soul();
    soul.mobName = mobName;
    soul.soulName = SoulHelper.getSoulName(mobName, soulType);
    soul.skillName = SoulHelper.getSkillName(mobName, soulType);
    const { option, optionString } = SoulHelper.getSoulOption(mobName, soulType);
    soul.option = option;
    soul.optionString = optionString;
    return soul;
  }
}

class SoulHelper {
  static getSoulGrade(mobName: SoulMobName): number {
    return soulData[mobName].grade;
  }

  static hasPostfix(mobName: SoulMobName): boolean {
    return soulData[mobName].namePostfix;
  }

  static isGreatType(soulType: SoulType): boolean {
    return soulType === SoulType.EX_PAD ||
           soulType === SoulType.EX_MAD ||
           soulType === SoulType.EX_ALL ||
           soulType === SoulType.EX_MHP ||
           soulType === SoulType.EX_CR ||
           soulType === SoulType.EX_IMD ||
           soulType === SoulType.EX_BD ||
           soulType === SoulType.EX_AS;
  }

  static getSoulName(mobName: SoulMobName, soulType: SoulType): string {
    let type: string;
    if(SoulHelper.isGreatType(soulType)) {
      type = "위대한";
    }
    else {
      type = soulType;
    }
    let postfix: string;
    if(SoulHelper.hasPostfix(mobName)) {
      postfix = "의";
    }
    else {
      postfix = "";
    }
    return type + " " + mobName + postfix + " 소울";
  }

  static getSkillName(mobName: SoulMobName, soulType: SoulType): string {
    if(this.isGreatType(soulType)) {
      return soulData[mobName].greatSkillName;
    }
    return soulData[mobName].normalSkillName;
  }

  static getSoulOption(mobName: SoulMobName, soulType: SoulType): { option: Map<GearPropType, number>, optionString: string } {
    const options = new Map<GearPropType, number>();
    const type = this.getSoulOptionType(mobName, soulType);
    const value = this.getSoulOptionValue(mobName, soulType);
    const optionString = this.getSoulOptionString(type, value);
    options.set(type, value);
    return { option: options, optionString: optionString };
  }

  static getSoulOptionType(mobName: SoulMobName, soulType: SoulType): GearPropType {
    const isRate: boolean = this.getSoulGrade(mobName) === 1;
    switch(soulType) {
      case SoulType.EX_PAD: return isRate ? GearPropType.incPADr : GearPropType.incPAD;
      case SoulType.EX_MAD: return isRate ? GearPropType.incMADr : GearPropType.incMAD;
      case SoulType.EX_ALL: return isRate ? GearPropType.statR : GearPropType.incAllStat;
      case SoulType.EX_MHP: return GearPropType.incMHP;
      case SoulType.EX_CR: return GearPropType.incCr;
      case SoulType.EX_IMD: return GearPropType.imdR;
      case SoulType.EX_BD: return GearPropType.bdR;
      case SoulType.EX_AS: return GearPropType.incAllskill;
      case SoulType.STR: return GearPropType.incSTR;
      case SoulType.DEX: return GearPropType.incDEX;
      case SoulType.INT: return GearPropType.incINT;
      case SoulType.LUK: return GearPropType.incLUK;
      case SoulType.ALL: return GearPropType.incAllStat;
      case SoulType.PAD: return GearPropType.incPAD;
      case SoulType.MAD: return GearPropType.incMAD;
      case SoulType.MHP: return GearPropType.incMHP;
      case SoulType.MMP: return GearPropType.incMMP;
      default: throw Error();
    }
  }

  static getSoulOptionString(type: GearPropType, value: number): string {
    switch(type) {
      case GearPropType.incSTR: return `STR : +${value}`;
      case GearPropType.incDEX: return `DEX : +${value}`;
      case GearPropType.incINT: return `INT : +${value}`;
      case GearPropType.incLUK: return `LUK : +${value}`;
      case GearPropType.incAllStat: return `올스탯 : +${value}`;
      case GearPropType.statR: return `올스탯 : +${value}%`;
      case GearPropType.incMHP: return `최대 HP : +${value}`;
      case GearPropType.incMMP: return `최대 MP : +${value}`;
      case GearPropType.incPAD: return `공격력 : +${value}`;
      case GearPropType.incPADr: return `공격력 : +${value}%`;
      case GearPropType.incMAD: return `마력 : +${value}`;
      case GearPropType.incMADr: return `마력 : +${value}%`;
      case GearPropType.imdR: return `몬스터 방어율 무시 : +${value}%`;
      case GearPropType.bdR: return `보스 몬스터 공격 시 데미지 : +${value}%`;
      case GearPropType.incCr: return `크리티컬 확률 : +${value}%`;
      case GearPropType.incAllskill: return `모든 스킬레벨 : +${value}(5차 제외, 스킬의 마스터 레벨까지만 증가)`;
      default: return "";
    }
  }

  static getSoulOptionValue(mobName: SoulMobName, soulType: SoulType): number {
    if(this.isGreatType(soulType)) {
      if(mobName === "모카딘" && soulType === SoulType.EX_PAD) return 10;
      if(mobName === "카리아인" && soulType === SoulType.EX_MAD) return 10;
      if(mobName === "줄라이" && soulType === SoulType.EX_MHP) return 1500;
      if(mobName === "CQ57" && soulType === SoulType.EX_CR) return 10;
      if(mobName === "플레드" && soulType === SoulType.EX_ALL) return 20;

      let grade: number = this.getSoulGrade(mobName);
      if(grade === 4 && mobName !== "반 레온") {
        grade = 3;
      }
      let typeIdx: number;
      switch(soulType) {
        case SoulType.EX_PAD: typeIdx = 0; break;
        case SoulType.EX_MAD: typeIdx = 0; break;
        case SoulType.EX_ALL: typeIdx = 1; break;
        case SoulType.EX_MHP: typeIdx = 2; break;
        case SoulType.EX_CR: typeIdx = 3; break;
        case SoulType.EX_IMD: typeIdx = 4; break;
        case SoulType.EX_BD: typeIdx = 4; break;
        case SoulType.EX_AS: typeIdx = 5; break;
        default: return 0;
      }
      return greatOptionData[grade][typeIdx];
    }
    else {
      if(mobName === "모카딘" && soulType === SoulType.STR) return 20;
      if(mobName === "카리아인" && soulType === SoulType.INT) return 20;
      if(mobName === "줄라이" && soulType === SoulType.DEX) return 20;
      if(mobName === "CQ57" && soulType === SoulType.LUK) return 20;
      if(mobName === "플레드" && soulType === SoulType.ALL) return 12;

      let typeIdx: number;
      switch(soulType) {
        case SoulType.STR: typeIdx = 0; break;
        case SoulType.DEX: typeIdx = 0; break;
        case SoulType.INT: typeIdx = 0; break;
        case SoulType.LUK: typeIdx = 0; break;
        case SoulType.ALL: typeIdx = 1; break;
        case SoulType.PAD: typeIdx = 2; break;
        case SoulType.MAD: typeIdx = 2; break;
        case SoulType.MHP: typeIdx = 3; break;
        case SoulType.MMP: typeIdx = 3; break;
        default: return 0;
      }
      return normalOptionData[this.getSoulGrade(mobName)][typeIdx];
    }
  }

  static getSoulMobNames(): SoulMobName[] {
    return Object.keys(soulData) as SoulMobName[];
  }
}

const soulData = {
  "시그너스": { grade: 1, namePostfix: true, normalSkillName: "불꽃 여제", greatSkillName: "폭풍 여제" },
  "매그너스": { grade: 1, namePostfix: true, normalSkillName: "진격! 그게 바로 나다", greatSkillName: "폭격! 그게 바로 나다" },
  "무르무르": { grade: 1, namePostfix: true, normalSkillName: "무르무르의 이상한 동행", greatSkillName: "무르무르의 수상한 동행" },
  "블러디퀸": { grade: 1, namePostfix: true, normalSkillName: "여왕의 마음은 갈대", greatSkillName: "여왕님이 함께 하셔!" },
  "벨룸": { grade: 1, namePostfix: true, normalSkillName: "기가 벨룸 레이저", greatSkillName: "주니어 벨룸 소환!" },
  "스우": { grade: 1, namePostfix: true, normalSkillName: "때렸스우~", greatSkillName: "화났스우~" },
  "데미안": { grade: 1, namePostfix: true, normalSkillName: "사냥 개시", greatSkillName: "파멸의 검" },
  "루시드": { grade: 1, namePostfix: true, normalSkillName: "악몽으로의 초대", greatSkillName: "악몽의 지배자" },
  "윌": { grade: 1, namePostfix: true, normalSkillName: "파괴의 손아귀", greatSkillName: "거미의 왕" },
  "진 힐라": { grade: 1, namePostfix: true, normalSkillName: "영혼 찢기", greatSkillName: "붉은 마녀" },
  "듄켈": { grade: 1, namePostfix: true, normalSkillName: "지면 절단", greatSkillName: "지면 파쇄" },
  "칼로스": { grade: 1, namePostfix: true, normalSkillName: "감시자의 포효", greatSkillName: "침입자 처단" },
  "핑크빈": { grade: 2, namePostfix: true, normalSkillName: "까칠한 귀여움", greatSkillName: "치명적인 귀여움" },
  "피에르": { grade: 2, namePostfix: true, normalSkillName: "피에르의 모자선물", greatSkillName: "깜짝 피에르!" },
  "반반": { grade: 2, namePostfix: true, normalSkillName: "불닭의 따끔한 맛", greatSkillName: "치킨 날다!" },
  "우르스": { grade: 2, namePostfix: true, normalSkillName: "파왕의 포효", greatSkillName: "파왕의 거친 포효" },
  "아카이럼": { grade: 3, namePostfix: true, normalSkillName: "스네이크 사우론", greatSkillName: "메두사카이럼" },
  "모카딘": { grade: 3, namePostfix: true, normalSkillName: "검은 기사 모카딘", greatSkillName: "어둠 기사 모카딘" },
  "카리아인": { grade: 3, namePostfix: true, normalSkillName: "미친 마법사 카리아인", greatSkillName: "폭주 마법사 카리아인" },
  "CQ57": { grade: 3, namePostfix: true, normalSkillName: "돌격형 CQ57", greatSkillName: "상급 돌격형 CQ57" },
  "줄라이": { grade: 3, namePostfix: true, normalSkillName: "인간 사냥꾼 줄라이", greatSkillName: "피의 사냥꾼 줄라이" },
  "플레드": { grade: 3, namePostfix: true, normalSkillName: "싸움꾼 플레드", greatSkillName: "거친 싸움꾼 플레드" },
  "반 레온": { grade: 4, namePostfix: true, normalSkillName: "야옹이 권법 : 할퀴기 초식", greatSkillName: "야옹이 권법 : 크로스 따귀 어택" },
  "힐라": { grade: 4, namePostfix: true, normalSkillName: "마른 하늘에 번개 어택", greatSkillName: "마른 하늘에 벼락 어택" },
  "파풀라투스": { grade: 4, namePostfix: true, normalSkillName: "공간의 지배자", greatSkillName: "시간의 지배자" },
  "자쿰": { grade: 5, namePostfix: true, normalSkillName: "뜨거운 토템 투하", greatSkillName: "화끈한 토템 투하" },
  "발록": { grade: 6, namePostfix: true, normalSkillName: "지옥불 트림", greatSkillName: "지옥불 재채기" },
  "돼지바": { grade: 6, namePostfix: false, normalSkillName: "돼지바 스윙!", greatSkillName: "돼지바 드랍!" },
  "프리미엄PC방": { grade: 6, namePostfix: false, normalSkillName: "PC방에서 메이플을 켰다!", greatSkillName: "프리미엄 PC방은 빵빵해" },
  "무공": { grade: 7, namePostfix: true, normalSkillName: "회춘신공", greatSkillName: "" },
  "피아누스": { grade: 7, namePostfix: true, normalSkillName: "공포의 마빡생선", greatSkillName: "" },
  "드래곤 라이더": { grade: 8, namePostfix: true, normalSkillName: "손바닥 장풍", greatSkillName: "" },
  "렉스": { grade: 8, namePostfix: true, normalSkillName: "내 앞길을 막지마", greatSkillName: "" },
  "에피네아": { grade: 9, namePostfix: true, normalSkillName: "여왕의 향기는 나빌레라", greatSkillName: "" },
  "핑크몽": { grade: 9, namePostfix: true, normalSkillName: "해피 뉴 에브리데이!", greatSkillName: "" },
  "락 스피릿": { grade: 10, namePostfix: true, normalSkillName: "로큰롤 베이비", greatSkillName: "" },
  "교도관 아니": { grade: 10, namePostfix: true, normalSkillName: "난 한놈만 패", greatSkillName: "" },
  "크세르크세스": { grade: 10, namePostfix: true, normalSkillName: "특공 염소 어택", greatSkillName: "" },
  "블랙 슬라임": { grade: 10, namePostfix: true, normalSkillName: "핑크빛 독안개", greatSkillName: "" },
};

const greatOptionData = [
  [],
  [3, 5, 2000, 12, 7, 2],
  [10, 20, 1500, 10, 5, 1],
  [8, 17, 1300, 8, 4, 1],
  [7, 15, 1200, 7, 4, 1],
  [6, 12, 1100, 6, 3, 1],
  [5, 10, 1000, 5, 3, 1],
];

const normalOptionData = [
  [],
  [24, 15, 6, 960],
  [20, 12, 5, 800],
  [18, 10, 4, 700],
  [15, 8, 3, 600],
  [12, 8, 3, 500],
  [10, 7, 3, 400],
  [7, 5, 0, 300],
  [5, 3, 0, 200],
  [4, 2, 0, 180],
  [3, 2, 0, 150],
];

export function getSoulMobNames(): string[] {
  return SoulHelper.getSoulMobNames();
}
