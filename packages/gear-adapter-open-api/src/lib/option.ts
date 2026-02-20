import { GearOption } from '@malib/gear';
import { ItemEquipmentTotalOption } from './data/ItemEquipmentTotalOption';

export function resolveGearOption(
  option: Partial<ItemEquipmentTotalOption>,
): Partial<GearOption> | undefined {
  const result = {} as Partial<GearOption>;
  for (const [key, valueOrStr] of Object.entries(option)) {
    if (key in TYPE_MAP) {
      const type = TYPE_MAP[key as keyof typeof TYPE_MAP];
      const value = Number(valueOrStr);
      if (value) {
        result[type] = value;
      }
    }
  }
  if (Object.keys(result).length === 0) {
    return undefined;
  }
  return result;
}

const TYPE_MAP = {
  str: 'str',
  dex: 'dex',
  int: 'int',
  luk: 'luk',
  max_hp: 'maxHp',
  max_mp: 'maxMp',
  attack_power: 'attackPower',
  magic_power: 'magicPower',
  armor: 'armor',
  speed: 'speed',
  jump: 'jump',
  boss_damage: 'bossDamage',
  ignore_monster_armor: 'ignoreMonsterArmor',
  all_stat: 'allStat',
  damage: 'damage',
  equipment_level_decrease: 'reqLevelDecrease',
  max_hp_rate: 'maxHpRate',
  max_mp_rate: 'maxMpRate',
} as const;
