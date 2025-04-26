import { GearData, GearType } from '../data';
import { Gear } from '../Gear';
import { Patch } from './gearPatch';

type GearNames = keyof typeof repo;

export function createGear(name?: GearNames, patches?: Patch[]): Gear;
export function createGear(data: Partial<GearData>): Gear;
export function createGear(
  name: GearNames,
  data: Partial<GearData>,
  patches?: Patch[],
): Gear;
export function createGear(
  name_data: GearNames | Partial<GearData> = '',
  data_patches?: Partial<GearData> | Patch[],
  patches?: Patch[],
): Gear {
  if (typeof name_data === 'string') {
    if (typeof data_patches === 'undefined') {
      // createGear(name)
      return new Gear(createGearData(name_data));
    } else if (Array.isArray(data_patches)) {
      // createGear(name, patches)
      return _patch(new Gear(createGearData(name_data)), patches);
    } else {
      // createGear(name, data, patches?)
      return _patch(new Gear(createGearData(name_data, data_patches)), patches);
    }
  } else if (typeof name_data === 'object') {
    // createGear(data)
    return new Gear(createGearData('', name_data));
  } else {
    throw new TypeError('Invalid argument');
  }
}

function _patch(gear: Gear, patches?: Patch[]): Gear {
  patches?.forEach((patch) => {
    patch(gear);
  });
  return gear;
}

function createGearData(
  name: keyof typeof repo,
  data?: Partial<GearData>,
): GearData {
  if (data) {
    return mergeGearData(repo[name], data);
  } else {
    return repo[name];
  }
}

function mergeGearData(data: GearData, over: Partial<GearData>): GearData {
  const { req, attributes, ...omit } = over;
  return {
    ...data,
    ...omit,
    req: {
      ...data.req,
      ...req,
    },
    attributes: {
      ...data.attributes,
      ...attributes,
    },
  };
}

const repo = {
  '': {
    meta: {
      id: 1000000,
      version: 1,
    },
    name: '테스트용 장비',
    icon: '1000000',
    type: 100,
    req: {},
    attributes: {},
  },
  '아케인셰이드 샤이닝로드': {
    meta: {
      id: 1212120,
      version: 1,
    },
    name: '아케인셰이드 샤이닝로드',
    icon: '1212120',
    type: GearType.shiningRod,
    req: {
      level: 200,
      job: 2,
    },
    attributes: {
      trade: 2,
      cuttable: 2,
      bossReward: true,
      incline: {
        charm: 200,
      },
      canStarforce: 1,
      canScroll: 1,
      canAddOption: 1,
      canPotential: 1,
      canAdditionalPotential: 1,
    },
    baseOption: {
      int: 100,
      luk: 100,
      attackPower: 206,
      magicPower: 347,
      bossDamage: 30,
      ignoreMonsterArmor: 20,
    },
    scrollUpgradeableCount: 9,
  },
} satisfies Record<string, GearData>;
