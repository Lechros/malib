import { GearOption } from './data';

const PROXY_KEY = '__GearOption_s87Ns2aQ';

/**
 * 장비 옵션의 설정되지 않은 속성(`undefined`)을 `0`으로 처리하는 프록시 객체를 생성합니다.
 *
 * 프록시 객체를 반복할 때 값이 `0`인 속성은 열거하지 않습니다.
 * @param option 장비 옵션.
 * @returns 장비 옵션 프록시.
 */
export function toGearOption(option: Partial<GearOption>): GearOption {
  if (PROXY_KEY in option) {
    return option as GearOption;
  }
  return new Proxy(option, {
    get(target, p: keyof typeof defaultGearOption) {
      if ((p as string) === PROXY_KEY) {
        return true;
      }
      if (p in defaultGearOption) {
        return target[p] ?? defaultGearOption[p];
      }
      return undefined;
    },
    set(target, p: keyof typeof defaultGearOption, newValue: number) {
      if (p in defaultGearOption) {
        target[p] = newValue;
        return true;
      }
      return false;
    },
    ownKeys(target) {
      return Object.entries(target)
        .filter(([, value]) => value != 0)
        .map(([key]) => key);
    },
  }) as GearOption;
}

export function addOptions(
  option: Partial<GearOption>,
  ...options: Partial<GearOption>[]
): void {
  const sum: Record<string, number> = option;
  for (const option of options) {
    for (const [stat, value] of Object.entries<number>(option)) {
      if (stat in sum) {
        sum[stat] += value;
      } else {
        sum[stat] = value;
      }
    }
  }
}

export function sumOptions(
  ...options: Partial<GearOption>[]
): Partial<GearOption> {
  const sum: Record<string, number> = {};
  addOptions(sum, ...options);
  return sum;
}

const defaultGearOption = {
  str: 0,
  dex: 0,
  int: 0,
  luk: 0,
  strRate: 0,
  dexRate: 0,
  intRate: 0,
  lukRate: 0,
  maxHp: 0,
  maxMp: 0,
  maxHpRate: 0,
  maxMpRate: 0,
  maxDemonForce: 0,
  attackPower: 0,
  magicPower: 0,
  attackPowerRate: 0,
  magicPowerRate: 0,
  armor: 0,
  armorRate: 0,
  speed: 0,
  jump: 0,
  bossDamage: 0,
  normalDamage: 0,
  ignoreMonsterArmor: 0,
  allStat: 0,
  damage: 0,
  reqLevelDecrease: 0,
  criticalRate: 0,
  criticalDamage: 0,
  cooltimeReduce: 0,
  strLv: 0,
  dexLv: 0,
  intLv: 0,
  lukLv: 0,
} satisfies GearOption;
