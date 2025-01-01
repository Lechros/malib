import { addOptions, sumOptions } from './utils';

test('addOptions adds options', () => {
  const option = { str: 1 };

  addOptions(option, { str: 2, dex: 1 }, { dex: 1, int: 0, luk: 5 });

  expect(option).toEqual({ str: 3, dex: 2, int: 0, luk: 5 });
});

test('sumOptions returns sum of input options', () => {
  const sum = sumOptions(
    { str: 1 },
    { str: 2, dex: 1 },
    { dex: 1, int: 0, luk: 5 },
  );

  expect(sum).toEqual({ str: 3, dex: 2, int: 0, luk: 5 });
});

test('sumOptions does not modify input options', () => {
  const option1 = { str: 1 };
  const option2 = { str: 2, dex: 1 };

  sumOptions(option1, option2);

  expect(option1).toEqual({ str: 1 });
  expect(option2).toEqual({ str: 2, dex: 1 });
});

test('sumOptions return option has different reference to input options', () => {
  const option = {};

  const sum = sumOptions(option);

  expect(sum).not.toBe(option);
});
