import { GearOption } from './data';
import { addOptions, sumOptions, toGearOption } from './gearOption';

describe('toGearOption', () => {
  it('accepts Partial<GearOption>', () => {
    toGearOption({ str: 1 });
  });

  it('returns original value', () => {
    const original = { str: 1 };

    const option = toGearOption(original);

    expect(option.str).toBe(1);
  });

  it('returns 0 for unset key', () => {
    const original = { str: 1 };

    const option = toGearOption(original);

    expect(option.dex).toBe(0);
  });

  it('returns undefined for unknown key', () => {
    const original = { str: 1 };

    const option = toGearOption(original);

    // @ts-expect-error: unknown key test
    expect(option.unknownKey).toBeUndefined();
  });

  it('sets dex to 2, luk to 3', () => {
    const original: Partial<GearOption> = { str: 1, luk: 0 };
    const option = toGearOption(original);

    option.dex = 2;
    option.luk = 3;

    expect(original.dex).toBe(2);
    expect(original.luk).toBe(3);
  });

  it('supports iadd', () => {
    const original: Partial<GearOption> = { str: 1, dex: 0 };
    const option = toGearOption(original);

    option.str += 1;
    option.dex += 2;
    option.luk += 3;

    expect(original.str).toBe(2);
    expect(original.dex).toBe(2);
    expect(original.luk).toBe(3);
  });

  it('sets dex to 2 for nested proxy', () => {
    const original = { str: 1, dex: 0 };
    const option = toGearOption(toGearOption(toGearOption(original)));

    option.dex = 2;

    expect(original.dex).toBe(2);
    expect(option.dex).toBe(2);
  });

  it('contains equal keys', () => {
    const original = { str: 1, dex: 2, magicPower: 3, bossDamage: 4 };
    const option = toGearOption(original);

    expect(Object.keys(option).sort()).toEqual(
      ['str', 'dex', 'magicPower', 'bossDamage'].sort(),
    );
  });

  it('does not iterate keys with value = 0', () => {
    const original = { str: 1, dex: -1, magicPower: 0, bossDamage: 4 };
    const option = toGearOption(original);

    expect(Object.keys(option).sort()).toEqual(
      ['str', 'dex', 'bossDamage'].sort(),
    );
  });
});

describe('addOptions', () => {
  it('adds options', () => {
    const option = { str: 1 };

    addOptions(option, { str: 2, dex: 1 }, { dex: 1, int: 0, luk: 5 });

    expect(option).toEqual({ str: 3, dex: 2, int: 0, luk: 5 });
  });
});

describe('sumOptions', () => {
  it('returns sum of input options', () => {
    const sum = sumOptions(
      { str: 1 },
      { str: 2, dex: 1 },
      { dex: 1, int: 0, luk: 5 },
    );
    expect(sum).toEqual({ str: 3, dex: 2, int: 0, luk: 5 });
  });

  it('does not modify input options', () => {
    const option1 = { str: 1 };
    const option2 = { str: 2, dex: 1 };

    sumOptions(option1, option2);

    expect(option1).toEqual({ str: 1 });
    expect(option2).toEqual({ str: 2, dex: 1 });
  });

  it('return option has different reference to input options', () => {
    const option = {};

    const sum = sumOptions(option);

    expect(sum).not.toBe(option);
  });

  it('returns empty object for no input options', () => {
    const sum = sumOptions();

    expect(sum).toEqual({});
  });
});
