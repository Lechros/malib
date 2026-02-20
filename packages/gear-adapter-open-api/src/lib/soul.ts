import type { SoulData, SoulOption } from '@malib/gear';

export function resolveSoul(
  soulName: string | null,
  soulOption: string | null,
): SoulData | undefined {
  if (soulName === null) {
    return undefined;
  }
  return {
    name: soulName.replace(/ 적용$/, ''),
    skill: '(알 수 없음)',
    option: resolveSoulOption(soulOption),
  };
}

function resolveSoulOption(optionStr: string | null): Partial<SoulOption> {
  if (optionStr === null) {
    return {};
  }
  const regex = /(.+) \+([0-9]+)(%)?/;
  const match = regex.exec(optionStr);
  if (match === null) {
    return {};
  }
  const [, name, value, rate] = match;
  const types = getOptionTypes(name, rate === '%');
  return Object.fromEntries(
    types.map((type) => [type, Number.parseInt(value)]),
  );
}

function getOptionTypes(name: string, isRate: boolean): (keyof SoulOption)[] {
  switch (name) {
    case 'STR':
      return isRate ? ['strRate'] : ['str'];
    case 'DEX':
      return isRate ? ['dexRate'] : ['dex'];
    case 'INT':
      return isRate ? ['intRate'] : ['int'];
    case 'LUK':
      return isRate ? ['lukRate'] : ['luk'];
    case '최대 HP':
      return isRate ? [] : ['maxHp'];
    case '최대 MP':
      return isRate ? [] : ['maxMp'];
    case '공격력':
      return isRate ? ['attackPowerRate'] : ['attackPower'];
    case '마력':
      return isRate ? ['magicPowerRate'] : ['magicPower'];
    case '보스 몬스터 데미지':
      return isRate ? ['bossDamage'] : [];
    case '몬스터 방어율 무시':
      return isRate ? ['ignoreMonsterArmor'] : [];
    case '크리티컬 확률':
      return isRate ? ['criticalRate'] : [];
    case '올스탯':
      return isRate
        ? ['strRate', 'dexRate', 'intRate', 'lukRate']
        : ['str', 'dex', 'int', 'luk'];
    default:
      return [];
  }
}
