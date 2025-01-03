import { GearOption } from './data';
import { toGearOption } from './gearOption';

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

    // @ts-expect-error
    expect(option.alskdjf).toBeUndefined();
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
