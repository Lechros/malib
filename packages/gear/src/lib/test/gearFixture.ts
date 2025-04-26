import { GearData } from '../data';
import { Gear } from '../Gear';
import { resources } from './gearFixtureResources';
import { Patch } from './gearPatch';

type GearNames = keyof typeof resources;

export type CreateGearParams =
  // createGear(name, patches?)
  | [name?: GearNames, patches?: Patch[]]
  // createGear(data)
  | [data: Partial<GearData>]
  // createGear(name, data, patches?)
  | [name: GearNames, data: Partial<GearData>, patches?: Patch[]];

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
      return _patch(new Gear(createGearData(name_data)), data_patches);
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

function createGearData(name: GearNames, data?: Partial<GearData>): GearData {
  if (data) {
    return mergeGearData(resources[name], data);
  } else {
    return resources[name];
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
