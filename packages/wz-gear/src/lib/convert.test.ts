// import { convert } from './convert';
// import _expectedData from './res/gear-data-expected.json';
// import _rawData from './res/gear-data-raw.json';
// import { WzGear } from './wz';

// const rawData = _rawData as Record<string, WzGear>;
// const expectedData = _expectedData as Record<string, unknown>;

// test.skip('Convert result is equal to WzJson version', () => {
//   for (const [id, data] of Object.entries<WzGear>(rawData)) {
//     const expected = expectedData[id];
//     if (typeof expected === 'object' && expected !== null) {
//       if ('potentials' in expected) {
//         (expected as { potentials: unknown[] }).potentials = (
//           expected as { potentials: unknown[] }
//         ).potentials.filter((pot) => pot);
//       }
//       if ('attributes' in expected && typeof expected.attributes === 'object') {
//         delete (expected as { attributes: { blockGoldenHammer?: boolean } })
//           .attributes.blockGoldenHammer;
//       }
//     }

//     const actual = convert(data);

//     expect(actual).toEqual(expected);
//   }
// });

import { AddOptionCan, Gear, PotentialCan } from '@malib/gear';
import { convert } from './convert';
import _gearData from './res/gear-data.json';
import { WzGear } from './wz';

const gearData = _gearData as Record<string, WzGear>;

const CANNOT = 0;
const CAN = 1;
const FIXED = 2;

type Can = 0 | 1 | 2;

interface Cans {
  cannotUpgrade: boolean;
  canAddOption: Can;
  canPotential: Can;
  canAdditionalPotential: Can;
  maxStar: number;
}

test('TEMP: Generate gearData can', () => {
  const result: Record<string, Cans> = {};
  for (const [id, info] of Object.entries(gearData)) {
    const data = convert(info);
    const gear = new Gear(data);
    const can: Cans = {
      cannotUpgrade: gear.attributes.cannotUpgrade,
      canAddOption: chain(
        () => toCan(gear.attributes.canAddOption),
        gear.supportsAddOption ? CAN : CANNOT,
      ),
      canPotential: chain(
        () => toCan(gear.attributes.canPotential),
        gear.supportsPotential ? CAN : CANNOT,
      ),
      canAdditionalPotential: chain(
        () => toCan(gear.attributes.canAdditionalPotential),
        gear.supportsAdditionalPotential ? CAN : CANNOT,
      ),
      maxStar: gear.maxStar,
    };
    result[id] = can;
  }
  // RUN WITH> yarn vitest run .\packages\wz-gear\src\lib\convert.test.ts > result.json
  console.log(JSON.stringify(result, null, 2));
});

function chain<T>(...args: (T | (() => T | undefined))[]): T {
  for (const arg of args) {
    if (typeof arg === 'function') {
      const result = (arg as () => T | undefined)();
      if (result !== undefined) {
        return result;
      }
    } else {
      return arg;
    }
  }
  throw new Error('No value found');
}

function toCan(value: AddOptionCan | PotentialCan): Can | undefined {
  switch (value) {
    case AddOptionCan.Can:
    case PotentialCan.Can:
      return CAN;
    case AddOptionCan.Cannot:
    case PotentialCan.Cannot:
      return CANNOT;
    case AddOptionCan.Fixed:
    case PotentialCan.Fixed:
      return FIXED;
    default:
      return undefined;
  }
}
