import { GearType } from '@malib/gear';
import { OpenApiValueError } from './exception';

/**
 * 부위 이름을 장비 타입으로 변환합니다.
 * @param partName 부위 이름.
 * @param jobName 직업 이름.
 * @returns 장비 타입.
 *
 * @throws {@link OpenApiValueError}
 * 부위 이름 또는 직업 이름이 이 지원하지 않는 값일 경우.
 */
export function getGearType(partName: string, jobName: string): GearType {
  switch (partName) {
    case '얼굴장식':
      return GearType.faceAccessory;
    case '눈장식':
      return GearType.eyeAccessory;
    case '귀고리':
      return GearType.earrings;
    case '펜던트':
      return GearType.pendant;
    case '벨트':
      return GearType.belt;
    case '훈장':
      return GearType.medal;
    case '어깨장식':
      return GearType.shoulder;
    case '모자':
      return GearType.cap;
    case '망토':
      return GearType.cape;
    case '상의':
      return GearType.coat;
    case '드래곤 모자':
      return GearType.dragonMask;
    case '드래곤 펜던트':
      return GearType.dragonPendant;
    case '드래곤 날개장식':
      return GearType.dragonWings;
    case '드래곤 꼬리장식':
      return GearType.dragonTail;
    case '장갑':
      return GearType.glove;
    case '한벌옷':
      return GearType.longcoat;
    case '메카닉 엔진':
      return GearType.machineEngine;
    case '메카닉 암':
      return GearType.machineArms;
    case '메카닉 레그':
      return GearType.machineLegs;
    case '메카닉 프레임':
      return GearType.machineBody;
    case '메카닉 트랜지스터':
      return GearType.machineTransistors;
    case '하의':
      return GearType.pants;
    case '반지':
      return GearType.ring;
    case '방패':
      return GearType.shield;
    case '신발':
      return GearType.shoes;
    case '샤이닝 로드':
      return GearType.shiningRod;
    case '소울 슈터':
      return GearType.soulShooter;
    case '한손검':
      return GearType.ohSword;
    case '한손도끼':
      return GearType.ohAxe;
    case '한손둔기':
      return GearType.ohBlunt;
    case '단검':
      return GearType.dagger;
    case '블레이드':
      return GearType.katara;
    case '마법화살':
      return GearType.magicArrow;
    case '카드':
      return GearType.card;
    case '오브':
      return GearType.orb;
    case '용의 정수':
      return GearType.dragonEssence;
    case '소울링':
      return GearType.soulRing;
    case '매그넘':
      return GearType.magnum;
    case '케인':
      return GearType.cane;
    case '완드':
      return GearType.wand;
    case '스태프':
      return GearType.staff;
    case '두손검':
      return GearType.thSword;
    case '두손도끼':
      return GearType.thAxe;
    case '두손둔기':
      return GearType.thBlunt;
    case '창':
      return GearType.spear;
    case '폴암':
      return GearType.polearm;
    case '활':
      return GearType.bow;
    case '석궁':
      return GearType.crossbow;
    case '아대':
      return GearType.claw;
    case '너클':
      return GearType.knuckle;
    case '건':
      return GearType.gun;
    case '안드로이드':
      return GearType.android;
    case '기계 심장':
      return GearType.machineHeart;
    case '채광 도구':
      return GearType.pickaxe;
    case '약초채집 도구':
      return GearType.shovel;
    case '포켓 아이템':
      return GearType.pocket;
    case '듀얼 보우건':
      return GearType.dualBowguns;
    case '핸드캐논':
      return GearType.handCannon;
    case '뱃지':
      return GearType.badge;
    case '엠블렘':
      return GearType.emblem;
    case '소울실드':
      return GearType.soulShield;
    case '포스실드':
      return GearType.demonShield;
    case '펫장비':
      return GearType.petEquip;
    case '대검':
      return GearType.heavySword;
    case '태도':
      return GearType.longSword;
    case '메달':
      return GearType.medallion;
    case '로자리오':
      return GearType.rosary;
    case '쇠사슬':
      return GearType.ironChain;
    case '마도서':
      if (jobName === '아크메이지(불,독)') {
        return GearType.magicBook1;
      } else if (jobName === '아크메이지(썬,콜)') {
        return GearType.magicBook2;
      } else if (jobName === '아크메이지(비숍)') {
        return GearType.magicBook3;
      } else {
        throw new OpenApiValueError(`Unknown job name: ${jobName}`);
      }
    case '화살깃':
      return GearType.arrowFletching;
    case '활골무':
      return GearType.bowThimble;
    case '단검용 검집':
      return GearType.daggerScabbard;
    case '부적':
      return GearType.charm;
    case '리스트밴드':
      return GearType.wristBand;
    case '조준기':
      return GearType.farSight;
    case '화약통':
      return GearType.powderKeg;
    case '무게추':
      return GearType.mass;
    case '문서':
      return GearType.document;
    case '마법구슬':
      return GearType.magicMarble;
    case '화살촉':
      return GearType.arrowhead;
    case '보석':
      return GearType.jewel;
    case '컨트롤러':
      return GearType.controller;
    case '여우 구슬':
      return GearType.foxMarble;
    case '체스피스':
      return GearType.chessPiece;
    case '파워소스':
      return GearType.powerSource;

    case '에너지소드':
      return GearType.energySword;
    case '데스페라도':
      return GearType.desperado;
    case 'ESP 리미터':
      return GearType.espLimiter;

    case '건틀렛 리볼버':
      return GearType.gauntletRevolver;
    case '장약':
      return GearType.charge;

    case '체인':
      return GearType.chain;
    case '매직 건틀렛':
      return GearType.magicGauntlet;
    case '무기 전송장치':
      return GearType.transmitter;
    case '매직윙':
      return GearType.magicWing;
    case '패스 오브 어비스':
      return GearType.pathOfAbyss;

    case '렐릭':
      return GearType.relic;
    case '에인션트 보우':
      return GearType.ancientBow;

    case '부채':
      return GearType.ritualFan;
    case '선추':
      return GearType.fanTassel;

    case '튜너':
      return GearType.tuner;
    case '브레이슬릿':
      return GearType.bracelet;

    case '브레스 슈터':
      return GearType.breathShooter;
    case '웨폰 벨트':
      return GearType.weaponBelt;

    case '노리개':
      return GearType.ornament;

    case '차크람':
      return GearType.chakram;
    case '헥스시커':
      return GearType.hexSeeker;

    case '장검':
      return GearType.longSword2;
    case '여의보주':
      return GearType.sacredJewel;

    case '모래시계':
      return GearType.hourGlass;

    default:
      throw new OpenApiValueError(`Unknown part name: ${partName}`);
  }
}
