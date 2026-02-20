import {
  AddOptionType,
  GearCapability,
  GearType,
  ReadonlyGear,
} from '@malib/gear';
import { resolveAddOptions } from './addOption';

test('resolveAddOptions', () => {
  const gear = new ReadonlyGear({
    version: 2,
    id: 1000000,
    type: GearType.cap,
    name: 'Test Gear',
    icon: 'test-icon',
    req: {
      level: 250,
    },
    attributes: {
      canAddOption: GearCapability.Can,
    },
    addOption: {
      str: 42,
      int: 149,
      luk: 35,
      allStat: 6,
    },
  });
  const addOptions = resolveAddOptions(gear);
  expect(addOptions).toEqual([
    { grade: 6, type: AddOptionType.int, value: 72 },
    { grade: 6, type: AddOptionType.str_int, value: 42 },
    { grade: 5, type: AddOptionType.int_luk, value: 35 },
    { grade: 6, type: AddOptionType.allStat, value: 6 },
  ]);
});
