import { resolveSoul } from './soul';

test('resolveSoul', () => {
  const soul = resolveSoul('테스트 소울', 'STR +10');
  expect(soul).toEqual({
    name: '테스트 소울',
    skill: '(알 수 없음)',
    option: {
      str: 10,
    },
    chargeFactor: undefined,
  });
});

test.each([
  ['STR +10', { str: 10 }],
  ['INT +5%', { intRate: 5 }],
  ['최대 HP +2000', { maxHp: 2000 }],
  ['최대 MP +1000', { maxMp: 1000 }],
  ['올스탯 +10', { str: 10, dex: 10, int: 10, luk: 10 }],
  ['올스탯 +5%', { strRate: 5, dexRate: 5, intRate: 5, lukRate: 5 }],
  ['공격력 +5%', { attackPowerRate: 5 }],
  ['보스 몬스터 데미지 +7%', { bossDamage: 7 }],
  ['몬스터 방어율 무시 +5%', { ignoreMonsterArmor: 5 }],
  ['크리티컬 확률 +10%', { criticalRate: 10 }],
])('resolveSoulOption', (optionStr, expected) => {
  const soul = resolveSoul('테스트 소울', optionStr);
  expect(soul?.option).toEqual(expected);
});
