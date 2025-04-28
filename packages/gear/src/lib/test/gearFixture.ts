import { GearData } from '../data';
import { Gear } from '../Gear';
import { ReadonlyGear } from '../ReadonlyGear';
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

export function createReadonlyGear(
  name?: GearNames,
  data?: Partial<GearData>,
): ReadonlyGear;
export function createReadonlyGear(data: Partial<GearData>): ReadonlyGear;
export function createReadonlyGear(
  name_data: GearNames | Partial<GearData> = '',
  data?: Partial<GearData>,
): ReadonlyGear {
  if (typeof name_data === 'string') {
    if (typeof data === 'undefined') {
      // createReadonlyGear(name)
      return new ReadonlyGear(createGearData(name_data));
    } else {
      // createReadonlyGear(name, data)
      return new ReadonlyGear(createGearData(name_data, data));
    }
  } else if (typeof name_data === 'object') {
    // createReadonlyGear(data)
    return new ReadonlyGear(createGearData('', name_data));
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
  const base = structuredClone(resources[name]);
  if (data) {
    return mergeGearData(base, data);
  } else {
    return base;
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
