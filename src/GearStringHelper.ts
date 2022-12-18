import GearPropType from "./GearPropType";
import GearType from "./GearType";
import PotentialGrade from "./PotentialGrade";

export function getGearPropString(type: GearPropType, value: number): string {
    switch(type) {
        case GearPropType.incSTR: return "STR : +" + value;
        case GearPropType.incDEX: return "DEX : +" + value;
        case GearPropType.incINT: return "INT : +" + value;
        case GearPropType.incLUK: return "LUK : +" + value;
        case GearPropType.incAllStat: return "올스탯: +" + value;
        case GearPropType.incMHP: return "최대 HP : +" + value;
        case GearPropType.incMMP: return "최대 MP : +" + value;
        case GearPropType.incMHPr: return "최대 HP : +" + value + "%";
        case GearPropType.incMMPr: return "최대 MP : +" + value + "%";
        case GearPropType.incMDF: return "MaxDF : +" + value;
        case GearPropType.incPAD: return "공격력 : +" + value;
        case GearPropType.incMAD: return "마력 : +" + value;
        case GearPropType.incPDD: return "방어력 : +" + value;
        case GearPropType.incSpeed: return "이동속도 : +" + value;
        case GearPropType.incJump: return "점프력 : +" + value;
        case GearPropType.knockback: return "직접 타격시 " + value + "%의 확률로 넉백";
        case GearPropType.bdR: return "보스 몬스터 공격 시 데미지 : +" + value + "%";
        case GearPropType.imdR: return "몬스터 방어율 무시 : +" + value + "%";
        case GearPropType.damR: return "데미지 : +" + value + "%";
        case GearPropType.statR: return "올스탯: +" + value + "%";
        case GearPropType.reduceReq: return "착용 레벨 감소 : - " + value;

        case GearPropType.incPADr: return "공격력 : +" + value + "%";
        case GearPropType.incMADr: return "마력 : +" + value + "%";

        case GearPropType.incCr: return "크리티컬 확률 : +" + value + "%";
        case GearPropType.incAllskill: return "모든 스킬레벨 : +" + value + "(5차 제외, 스킬의 마스터 레벨까지만 증가)";

        case GearPropType.only: return value === 0 ? "" : "고유 아이템";
        // case GearPropType.quest: return value === 0 ? "" : "퀘스트 아이템";
        case GearPropType.tradeBlock: return value === 0 ? "" : "교환 불가";
        case GearPropType.equipTradeBlock: return value === 0 ? "" : "장착 시 교환 불가";
        case GearPropType.tradeOnce: return value === 0 ? "" : "1회 교환가능 (거래 후 교환불가)";
        case GearPropType.accountSharable: return value === 0 ? "" : "월드 내 나의 캐릭터 간 이동만 가능";
        case GearPropType.sharableOnce: return value === 0 ? "" : "월드 내 나의 캐릭터 간 1회 이동 가능\n(이동 후 교환불가)";
        case GearPropType.onlyEquip: return value === 0 ? "" : "고유장착 아이템";
        // case GearPropType.abilityTimeLimited: return value === 0 ? "" : "기간 한정 능력치";
        // case GearPropType.notExtend: return value === 0 ? "" : "유효기간 연장 불가";
        case GearPropType.blockGoldHammer: return value === 0 ? "" : "황금망치 사용 불가";
        case GearPropType.noPotential: return value === 0 ? "" : "잠재능력 설정 불가";
        case GearPropType.fixedPotential: return value === 0 ? "" : "잠재능력 재설정 불가";
        // case GearPropType.cantRepair: return value === 0 ? "" : "수리 불가";
        case GearPropType.exceptUpgrade: return value === 0 ? "" : "강화불가";
        // case GearPropType.karmaLeft: return value === 0 ? "" : "가위 사용 가능 횟수 : " + Math.max(0, value) + "회";
        case GearPropType.tradeAvailable:
            switch(value) {
                case 1: return "#c실버 카르마의 가위를 사용하면 1회 교환이 가능하게 할 수 있습니다.#";
                case 2: return "#c플래티넘 카르마의 가위를 사용하면 1회 교환이 가능하게 할 수 있습니다.#";
                default: return "";
            }
        case GearPropType.accountShareTag: return value === 0 ? "" : "#c쉐어 네임 텍을 사용하면 월드 내 나의 캐릭터 간 1회 이동할 수 있습니다.#";
        case GearPropType.superiorEqp: return value === 0 ? "" : "아이템 강화 성공시 더욱 높은 효과를 받을 수 있습니다.";
        case GearPropType.jokerToSetItem: return value === 0 ? "" : "#c3개 이상 착용하고 있는 모든 세트 아이템에 포함되는 럭키 아이템!#";
        case GearPropType.amazingScroll: return value === 0 ? "" : "#c놀라운 장비강화 주문서가 사용되었습니다.#";

        case GearPropType.incMHP_incMMP: return "최대 HP / 최대 MP : +" + value;
        case GearPropType.incMHPr_incMMPr: return "최대 HP / 최대 MP : +" + value + "%";
        case GearPropType.incPAD_incMAD:
        case GearPropType.incAD: return "공격력 / 마력 : +" + value;
        case GearPropType.incARC: return "ARC : +" + value;
        case GearPropType.incAUT: return "AUT : +" + value;

        // set item options
        case GearPropType.incBDR: return "보스 몬스터 공격 시 데미지 : +" + value + "%";
        case GearPropType.ignoreTargetDEF: return "몬스터 방어율 무시 : +" + value + "%";

        case GearPropType.yggdrasil:
            switch(value) {
                case 1: return "#c힘의 이그드라실의 축복 성공#";
                case 2: return "#c민첩성의 이그드라실의 축복 성공#";
                case 3: return "#c지력의 이그드라실의 축복 성공#";
                case 4: return "#c행운의 이그드라실의 축복 성공#";
                default: return "";
            }

        default: return "";
    }
}

export function getGearGradeString(rank: PotentialGrade): string {
    switch(rank) {
        case PotentialGrade.rare: return "(레어 아이템)";
        case PotentialGrade.epic: return "(에픽 아이템)";
        case PotentialGrade.unique: return "(유니크 아이템)";
        case PotentialGrade.legendary: return "(레전드리 아이템)";
        case PotentialGrade.special: return "(스페셜 아이템)";
        default: return "";
    }
}

export function getGearTypeString(type: GearType): string {
    switch(type) {
        case GearType.faceAccessory: return "얼굴장식";
        case GearType.eyeAccessory: return "눈장식";
        case GearType.earrings: return "귀고리";
        case GearType.pendant: return "펜던트";
        case GearType.belt: return "벨트";
        case GearType.medal: return "훈장";
        case GearType.shoulderPad: return "어깨장식";
        case GearType.cap: return "모자";
        case GearType.cape: return "망토";
        case GearType.coat: return "상의";
        case GearType.dragonMask: return "드래곤 모자";
        case GearType.dragonPendant: return "드래곤 펜던트";
        case GearType.dragonWings: return "드래곤 날개장식";
        case GearType.dragonTail: return "드래곤 꼬리장식";
        case GearType.glove: return "장갑";
        case GearType.longcoat: return "한벌옷";
        case GearType.machineEngine: return "메카닉 엔진";
        case GearType.machineArms: return "메카닉 암";
        case GearType.machineLegs: return "메카닉 레그";
        case GearType.machineBody: return "메카닉 프레임";
        case GearType.machineTransistors: return "메카닉 트랜지스터";
        case GearType.pants: return "하의";
        case GearType.ring: return "반지";
        case GearType.shield: return "방패";
        case GearType.shoes: return "신발";
        case GearType.shiningRod: return "샤이닝 로드";
        case GearType.soulShooter: return "소울 슈터";
        case GearType.ohSword: return "한손검";
        case GearType.ohAxe: return "한손도끼";
        case GearType.ohBlunt: return "한손둔기";
        case GearType.dagger: return "단검";
        case GearType.katara: return "블레이드";
        case GearType.magicArrow: return "마법화살";
        case GearType.card: return "카드";
        case GearType.orb: return "오브";
        case GearType.novaMarrow: return "용의 정수";
        case GearType.soulBangle: return "소울링";
        case GearType.mailin: return "매그넘";
        case GearType.cane: return "케인";
        case GearType.wand: return "완드";
        case GearType.staff: return "스태프";
        case GearType.thSword: return "두손검";
        case GearType.thAxe: return "두손도끼";
        case GearType.thBlunt: return "두손둔기";
        case GearType.spear: return "창";
        case GearType.polearm: return "폴암";
        case GearType.bow: return "활";
        case GearType.crossbow: return "석궁";
        case GearType.throwingGlove: return "아대";
        case GearType.knuckle: return "너클";
        case GearType.gun: return "건";
        case GearType.android: return "안드로이드";
        case GearType.machineHeart: return "기계 심장";
        case GearType.pickaxe: return "채광 도구";
        case GearType.shovel: return "약초채집 도구";
        case GearType.pocket: return "포켓 아이템";
        case GearType.dualBow: return "듀얼 보우건";
        case GearType.handCannon: return "핸드캐논";
        case GearType.badge: return "뱃지";
        case GearType.emblem: return "엠블렘";
        case GearType.soulShield: return "소울실드";
        case GearType.demonShield: return "포스실드";
        case GearType.petEquip: return "펫장비";
        case GearType.swordZB: return "대검";
        case GearType.swordZL: return "태도";
        case GearType.heroMedal: return "메달";
        case GearType.rosario: return "로자리오";
        case GearType.chain: return "쇠사슬";
        case GearType.book1:
        case GearType.book2:
        case GearType.book3: return "마도서";
        case GearType.bowMasterFeather: return "화살깃";
        case GearType.crossBowThimble: return "활골무";
        case GearType.shadowerSheath: return "단검용 검집";
        case GearType.nightLordPoutch: return "부적";
        case GearType.viperWristband: return "리스트밴드";
        case GearType.captainSight: return "조준기";
        case GearType.cannonGunPowder:
        case GearType.cannonGunPowder2: return "화약통";
        case GearType.aranPendulum: return "무게추";
        case GearType.evanPaper: return "문서";
        case GearType.battlemageBall: return "마법구슬";
        case GearType.wildHunterArrowHead: return "화살촉";
        case GearType.cygnusGem: return "보석";
        case GearType.controller: return "컨트롤러";
        case GearType.foxPearl: return "여우 구슬";
        case GearType.chess: return "체스피스";
        case GearType.powerSource: return "파워소스";
        case GearType.energySword: return "에너지소드";
        case GearType.desperado: return "데스페라도";
        case GearType.espLimiter: return "ESP 리미터";
        case GearType.GauntletBuster: return "건틀렛 리볼버";
        case GearType.ExplosivePill: return "장약";
        case GearType.chain2: return "체인";
        case GearType.magicGauntlet: return "매직 건틀렛";
        case GearType.transmitter: return "무기 전송장치";
        case GearType.magicWing: return "매직윙";
        case GearType.pathOfAbyss: return "패스 오브 어비스";
        case GearType.relic: return "렐릭";
        case GearType.ancientBow: return "에인션트 보우";
        case GearType.handFan: return "부채";
        case GearType.fanTassel: return "선추";
        case GearType.tuner: return "튜너";
        case GearType.bracelet: return "브레이슬릿";
        case GearType.breathShooter: return "브레스 슈터";
        case GearType.weaponBelt: return "웨폰 벨트";
        case GearType.ornament: return "노리개";
        default: return "";
    }
}

export function getAttackSpeedString(attackSpeed: number): string {
    switch(attackSpeed) {
        case 2:
        case 3: return "매우 빠름";
        case 4:
        case 5: return "빠름";
        case 6: return "보통";
        case 7:
        case 8: return "느림";
        case 9: return "매우 느림";
        default: return attackSpeed.toString();
    }
}

export function getExtraJobReqString(type: GearType | number, isNumber = false): string {
    if(!isNumber) {
        switch(type) {
            // 0xxx
            case GearType.heroMedal: return "히어로 직업군 착용 가능";
            case GearType.rosario: return "팔라딘 직업군 착용 가능";
            case GearType.chain: return "다크나이트 직업군 착용 가능";
            case GearType.book1: return "불,독 계열 마법사 착용 가능";
            case GearType.book2: return "얼음,번개 계열 마법사 착용 가능";
            case GearType.book3: return "비숍 계열 마법사 착용 가능";
            case GearType.bowMasterFeather: return "보우마스터 직업군 착용 가능";
            case GearType.crossBowThimble: return "신궁 직업군 착용 가능";
            case GearType.shadowerSheath: return "섀도어 직업군 착용 가능";
            case GearType.nightLordPoutch: return "나이트로드 직업군 착용 가능";
            case GearType.katara: return "듀얼블레이드 직업군 착용 가능";
            case GearType.viperWristband: return "바이퍼 직업군 착용 가능";
            case GearType.captainSight: return "캡틴 직업군 착용 가능";
            case GearType.cannonGunPowder: return "캐논 슈터 직업군 착용 가능";
            case GearType.relic: return "패스파인더 직업군 착용 가능";

            // 1xxx
            case GearType.cygnusGem: return "시그너스 기사단 착용 가능";

            // 2xxx
            case GearType.aranPendulum: return getExtraJobReqString(21, true);
            case GearType.evanPaper: return getExtraJobReqString(22, true);
            case GearType.magicArrow: return getExtraJobReqString(23, true);
            case GearType.card: return getExtraJobReqString(24, true);
            case GearType.foxPearl: return getExtraJobReqString(25, true);
            case GearType.orb:
            case GearType.shiningRod: return getExtraJobReqString(27, true);

            // 3xxx
            case GearType.demonShield: return getExtraJobReqString(31, true);
            case GearType.desperado: return "데몬 어벤져 착용 가능";
            case GearType.battlemageBall: return "배틀메이지 직업군 착용 가능";
            case GearType.wildHunterArrowHead: return "와일드헌터 직업군 착용 가능";
            case GearType.mailin: return "메카닉 착용 가능";
            case GearType.controller:
            case GearType.powerSource:
            case GearType.energySword: return getExtraJobReqString(36, true);
            case GearType.GauntletBuster:
            case GearType.ExplosivePill: return getExtraJobReqString(37, true);

            // 5xxx
            case GearType.soulShield: return "미하일 착용 가능";

            // 6xxx
            case GearType.novaMarrow: return getExtraJobReqString(61, true);
            case GearType.breathShooter:
            case GearType.weaponBelt: return getExtraJobReqString(63, true);
            // case GearType.chain2:
            case GearType.transmitter: return getExtraJobReqString(64, true);
            case GearType.soulBangle:
            case GearType.soulShooter: return getExtraJobReqString(65, true);

            // 10xxx
            case GearType.swordZB:
            case GearType.swordZL: return getExtraJobReqString(101, true);

            case GearType.espLimiter:
            case GearType.chess: return getExtraJobReqString(142, true);

            case GearType.magicGauntlet:
            case GearType.magicWing: return getExtraJobReqString(152, true);

            case GearType.pathOfAbyss: return getExtraJobReqString(155, true);

            case GearType.fanTassel: return getExtraJobReqString(164, true);

            case GearType.ornament: return getExtraJobReqString(162, true);

            default: return "";
        }
    }
    else {
        switch(type) {
            case 21: return "아란 직업군 착용 가능";
            case 22: return "에반 직업군 착용 가능";
            case 23: return "메르세데스 착용가능";
            case 24: return "팬텀 착용 가능";
            case 25: return "은월 착용 가능";
            case 27: return "루미너스 착용 가능";
            case 31: return "데몬 직업군 착용 가능";
            case 36: return "제논 착용 가능";
            case 37: return "블래스터 착용 가능";
            case 61: return "카이저 착용 가능";
            case 63: return "카인 착용 가능";
            case 64: return "카데나 직업군 착용 가능";
            case 65: return "엔젤릭 버스터 착용 가능";
            case 101: return "제로 착용 가능";
            case 142: return "키네시스 착용 가능";
            case 152: return "일리움 착용 가능";
            case 155: return "아크 착용 가능";
            case 162: return "라라 착용 가능";
            case 164: return "호영 직업군 착용 가능";
            default: return "";
        }
    }
}
