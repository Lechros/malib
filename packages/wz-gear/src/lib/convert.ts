import {
  GearBaseOption,
  GearData,
  GearIncline,
  GearShare,
  GearTrade,
  PotentialGrade,
} from '@malib/gear';
import { getCanAddOption } from './addOption';
import { getGearType } from './gearType';
import { getCanAdditionalPotential, getCanPotential } from './potential';
import { getCanStarforce } from './starforce';
import { WzGear } from './wz';
import { getCanScroll } from './upgrade';

/**
 * WzGear 형식의 아이템 정보를 GearData 객체로 변환합니다.
 * @param info WzGear 형식의 아이템 정보.
 * @returns GearData 객체.
 */
export function convert(info: WzGear): GearData {
  const data: GearData = {
    meta: {
      id: info.id,
      version: 1,
    },
    name: info.name,
    icon: info.icon,
    type: getGearType(info.id),
    req: {},
    attributes: {},
  };

  if (info.desc) {
    data.desc = info.desc;
  }

  // BaseOption
  const baseOption = getBaseOption(info);
  if (baseOption) {
    data.baseOption = baseOption;
  }

  // Req
  if (info.reqLevel) {
    data.req.level = info.reqLevel;
  }
  if (info.reqJob) {
    data.req.job = info.reqJob;
  }
  if (info.reqSpecJob) {
    data.req.class = info.reqSpecJob;
  }

  // Equip, trade
  if (info.only) {
    data.attributes.only = true;
  }
  if (info.tradeBlock) {
    data.attributes.trade = GearTrade.TradeBlock;
  } else if (info.equipTradeBlock) {
    data.attributes.trade = GearTrade.EquipTradeBlock;
  }
  if (info.onlyEquip) {
    data.attributes.onlyEquip = true;
  }
  if (info.accountSharable) {
    if (info.sharableOnce) {
      data.attributes.share = GearShare.AccountSharableOnce;
    } else {
      data.attributes.share = GearShare.AccountSharable;
    }
  }
  if (info.tradeAvailable) {
    data.attributes.cuttable = info.tradeAvailable;
  }
  if (info.CuttableCount) {
    data.attributes.cuttableCount = info.CuttableCount;
    data.attributes.totalCuttableCount = info.CuttableCount;
  }
  if (info.accountShareTag) {
    data.attributes.accountShareTag = true;
  }

  // Etc
  if (info.attackSpeed) {
    data.attributes.attackSpeed = info.attackSpeed;
  }
  if (info.jokerToSetItem) {
    data.attributes.lucky = true;
  }
  if (info.bossReward) {
    data.attributes.bossReward = true;
  }

  // Upgrade
  if (info.superiorEqp) {
    data.attributes.superior = true;
  }
  if (info.tuc) {
    data.scrollUpgradeableCount = info.tuc;
  }

  // Starforce
  if (info.incCHUC) {
    data.star = info.incCHUC;
  }

  // Potential
  if (info.specialGrade) {
    data.attributes.specialGrade = true;
  }
  if (info.fixedGrade) {
    data.potentialGrade = getFixedGrade(info.fixedGrade);
  }
  if (info.potentials) {
    data.potentials = info.potentials.map((pot) => ({
      grade:
        pot.grade === 6 && data.potentialGrade
          ? data.potentialGrade
          : pot.grade,
      summary: pot.summary,
      option: pot.option,
    }));
  }

  // Incline
  const incline = getIncline(info);
  if (incline) {
    data.attributes.incline = incline;
  }

  // Exceptional
  if (info.Etuc) {
    data.exceptionalUpgradeableCount = info.Etuc;
  }

  // Capabilities
  const canStarforce = getCanStarforce(info, data.type);
  if (canStarforce) {
    data.attributes.canStarforce = canStarforce;
  }
  const canScroll = getCanScroll(info);
  if (canScroll) {
    data.attributes.canScroll = canScroll;
  }
  const canAddOption = getCanAddOption(info, data.type);
  if (canAddOption) {
    data.attributes.canAddOption = canAddOption;
  }
  const canPotential = getCanPotential(info, data.type);
  if (canPotential) {
    data.attributes.canPotential = canPotential;
  }
  const canAdditionalPotential = getCanAdditionalPotential(info, data.type);
  if (canAdditionalPotential) {
    data.attributes.canAdditionalPotential = canAdditionalPotential;
  }

  return data;
}

function getBaseOption(info: WzGear): Partial<GearBaseOption> | undefined {
  const baseOption: Partial<GearBaseOption> = {};
  if (info.incSTR) {
    baseOption.str = info.incSTR;
  }
  if (info.incDEX) {
    baseOption.dex = info.incDEX;
  }
  if (info.incINT) {
    baseOption.int = info.incINT;
  }
  if (info.incLUK) {
    baseOption.luk = info.incLUK;
  }
  if (info.incMHP) {
    baseOption.maxHp = info.incMHP;
  }
  if (info.incMHPr) {
    baseOption.maxHpRate = info.incMHPr;
  }
  if (info.incMMP) {
    baseOption.maxMp = info.incMMP;
  }
  if (info.incMMPr) {
    baseOption.maxMpRate = info.incMMPr;
  }
  if (info.incPAD) {
    baseOption.attackPower = info.incPAD;
  }
  if (info.incMAD) {
    baseOption.magicPower = info.incMAD;
  }
  if (info.incPDD) {
    baseOption.armor = info.incPDD;
  }
  if (info.incSpeed) {
    baseOption.speed = info.incSpeed;
  }
  if (info.incJump) {
    baseOption.jump = info.incJump;
  }
  if (info.bdR) {
    baseOption.bossDamage = info.bdR;
  }
  if (info.imdR) {
    baseOption.ignoreMonsterArmor = info.imdR;
  }
  if (info.damR) {
    baseOption.damage = info.damR;
  }
  if (info.reduceReq) {
    baseOption.reqLevelDecrease = info.reduceReq;
  }
  return Object.keys(baseOption).length >= 0 ? baseOption : undefined;
}

function getIncline(info: WzGear): Partial<GearIncline> | undefined {
  const incline: Partial<GearIncline> = {};
  if (info.charismaEXP) {
    incline.charisma = info.charismaEXP;
  }
  if (info.senseEXP) {
    incline.sense = info.senseEXP;
  }
  if (info.insightEXP) {
    incline.insight = info.insightEXP;
  }
  if (info.willEXP) {
    incline.will = info.willEXP;
  }
  if (info.craftEXP) {
    incline.craft = info.craftEXP;
  }
  if (info.charmEXP) {
    incline.charm = info.charmEXP;
  }
  return Object.keys(incline).length > 0 ? incline : undefined;
}

function getFixedGrade(fixedGrade: number): PotentialGrade {
  switch (fixedGrade) {
    case 2:
      return PotentialGrade.Rare;
    case 3:
      return PotentialGrade.Epic;
    case 5:
      return PotentialGrade.Unique;
    case 7:
      return PotentialGrade.Legendary;
    default:
      return fixedGrade - 1;
  }
}
