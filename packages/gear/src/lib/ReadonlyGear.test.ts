import { GearData, GearTrade, GearType, PotentialGrade } from './data';
import { createGear, createReadonlyGear, createSoulData } from './test';
import { createPotentialData } from './test/potentialFixture';

describe('ReadonlyGear', () => {
  describe('meta', () => {
    const gear = createReadonlyGear();

    it('id 속성을 포함한다.', () => {
      expect(gear.meta.id).toBe(1000000);
    });

    it('version이 1이다.', () => {
      expect(gear.meta.version).toBe(1);
    });

    it('직접 설정할 수 없다.', () => {
      // @ts-expect-error: Cannot assign to 'id' because it is a read-only property.
      expect(() => (gear.meta = { id: 0, version: 1 })).toThrow();
    });
  });

  describe('name', () => {
    const gear = createReadonlyGear();

    it('테스트용 장비 이다.', () => {
      expect(gear.name).toBe('테스트용 장비');
    });

    it('직접 설정할 수 없다.', () => {
      // @ts-expect-error: Cannot assign to 'name' because it is a read-only property.
      expect(() => (gear.name = '새로운 이름')).toThrow();
    });
  });

  describe('icon', () => {
    const gear = createReadonlyGear();

    it('1000000이다.', () => {
      expect(gear.icon).toBe('1000000');
    });

    it('직접 설정할 수 없다.', () => {
      // @ts-expect-error: Cannot assign to 'icon' because it is a read-only property.
      expect(() => (gear.icon = '1234567')).toThrow();
    });
  });

  describe('desc', () => {
    const gear = createReadonlyGear({
      desc: '테스트용 장비 설명',
    });

    it('테스트용 장비 설명 이다.', () => {
      expect(gear.desc).toBe('테스트용 장비 설명');
    });

    it('직접 설정할 수 없다.', () => {
      // @ts-expect-error: Cannot assign to 'desc' because it is a read-only property.
      expect(() => (gear.desc = '새로운 설명')).toThrow();
      // @ts-expect-error: Cannot assign to 'desc' because it is a read-only property.
      expect(() => (gear.desc = undefined)).toThrow();
    });
  });

  describe('shape', () => {
    const gear = createReadonlyGear({
      shape: {
        name: '모루 아이템',
        icon: '1001234',
      },
    });

    it('{ name: 모루 아이템, icon: 1001234 }이다.', () => {
      expect(gear.shape).toEqual({ name: '모루 아이템', icon: '1001234' });
    });

    it('직접 설정할 수 없다.', () => {
      expect(
        // @ts-expect-error: Cannot assign to 'shape' because it is a read-only property.
        () => (gear.shape = { name: '모루 아이템', icon: '1000000' }),
      ).toThrow();
    });
  });

  describe('shapeIcon', () => {
    it('외형이 적용되지 않은 경우 장비의 아이콘이다.', () => {
      const gear = createReadonlyGear();

      expect(gear.shapeIcon).toBe('1000000');
    });

    it('외형이 적용된 경우 외형의 아이콘이다.', () => {
      const gear = createReadonlyGear({
        shape: {
          name: '모루 아이템',
          icon: '1001234',
        },
      });

      expect(gear.shapeIcon).toBe('1001234');
    });

    it('직접 설정할 수 없다.', () => {
      const gear = createReadonlyGear();

      // @ts-expect-error: Cannot assign to 'shapeIcon' because it is a read-only property.
      expect(() => (gear.shapeIcon = '1001234')).toThrow();
    });
  });

  describe('type', () => {
    const gear = createReadonlyGear();

    it('GearType.cap이다.', () => {
      expect(gear.type).toBe(GearType.cap);
    });

    it('직접 설정할 수 없다.', () => {
      // @ts-expect-error: Cannot assign to 'type' because it is a read-only property.
      expect(() => (gear.type = GearType.staff)).toThrow();
    });
  });

  describe('req', () => {
    const gear = createReadonlyGear({
      req: {
        level: 100,
        levelIncrease: 10,
      },
    });

    it('level이 100이다.', () => {
      expect(gear.req.level).toBe(100);
    });

    it('levelIncrease가 10이다.', () => {
      expect(gear.req.levelIncrease).toBe(10);
    });

    it('job이 0이다.', () => {
      expect(gear.req.job).toBe(0);
    });

    it('class가 0이다.', () => {
      expect(gear.req.class).toBe(0);
    });

    it('직접 설정할 수 없다.', () => {
      expect(
        () =>
          // @ts-expect-error: Cannot assign to 'req' because it is a read-only property.
          (gear.req = {
            level: 100,
            job: 0,
          }),
      ).toThrow();
    });
  });

  describe('attributes', () => {
    const gear = createReadonlyGear({
      attributes: {
        trade: GearTrade.TradeBlock,
      },
    });

    it('only가 false다.', () => {
      expect(gear.attributes.only).toBe(false);
    });

    it('trade가 TradeBlock이다.', () => {
      expect(gear.attributes.trade).toBe(GearTrade.TradeBlock);
    });

    it('trade를 EquipTradeBlock로 설정할 수 있다.', () => {
      gear.attributes.trade = GearTrade.EquipTradeBlock;

      expect(gear.attributes.trade).toBe(GearTrade.EquipTradeBlock);
    });

    it('trade를 undefined로 설정할 수 있다.', () => {
      gear.attributes.trade = GearTrade.Tradeable;

      expect(gear.attributes.trade).toBe(GearTrade.Tradeable);
    });

    it('직접 설정할 수 없다.', () => {
      // @ts-expect-error: Cannot assign to 'attributes' because it is a read-only property.
      expect(() => (gear.attributes = {})).toThrow();
    });
  });

  describe('totalOption', () => {
    const gear = createGear({
      baseOption: {
        str: 1,
        dex: 2,
      },
      addOption: {
        str: 1,
        int: 3,
      },
      upgradeOption: {
        str: 1,
        luk: 4,
      },
      starforceOption: {
        str: 1,
        attackPower: 5,
      },
    });
    it('기본, 추가 옵션, 주문서, 스타포스의 합이다.', () => {
      expect(gear.totalOption).toEqual({
        str: 4,
        dex: 2,
        int: 3,
        luk: 4,
        attackPower: 5,
      });
    });

    it('직접 설정할 수 없다.', () => {
      // @ts-expect-error: Cannot assign to 'totalOption' because it is a read-only property.
      expect(() => (gear.totalOption = {})).toThrow();
    });

    it('Readonly 객체를 반환한다.', () => {
      // @ts-expect-error: Cannot assign to 'int' because it is a read-only property.
      gear.totalOption.int = 3;
    });
  });

  describe('baseOption', () => {
    const gear = createReadonlyGear({
      baseOption: {
        str: 1,
        bossDamage: 30,
      },
    });

    it('기본 옵션을 반환한다.', () => {
      expect(gear.baseOption).toEqual({
        str: 1,
        bossDamage: 30,
      });
    });

    it('기본 옵션이 존재하지 않을 경우 빈 객체를 반환한다.', () => {
      const gear = createReadonlyGear();

      expect(gear.baseOption).toEqual({});
    });

    it('직접 설정할 수 없다.', () => {
      // @ts-expect-error: Cannot assign to 'baseOption' because it is a read-only property.
      expect(() => (gear.baseOption = {})).toThrow();
    });

    it('Readonly 객체를 반환한다.', () => {
      // @ts-expect-error: Cannot assign to 'int' because it is a read-only property.
      gear.baseOption.int = 3;
    });
  });

  describe('addOption', () => {
    const gear = createReadonlyGear({
      addOption: {
        dex: 2,
        allStat: 4,
      },
    });

    it('추가 옵션을 반환한다.', () => {
      expect(gear.addOption).toEqual({
        dex: 2,
        allStat: 4,
      });
    });

    it('추가 옵션이 존재하지 않을 경우 빈 객체를 반환한다.', () => {
      const gear = createReadonlyGear();

      expect(gear.addOption).toEqual({});
    });

    it('직접 설정할 수 없다.', () => {
      // @ts-expect-error: Cannot assign to 'addOption' because it is a read-only property.
      expect(() => (gear.addOption = {})).toThrow();
    });

    it('Readonly 객체를 반환한다.', () => {
      // @ts-expect-error: Cannot assign to 'int' because it is a read-only property.
      gear.addOption.int = 3;
    });
  });

  describe('scrollOption', () => {
    const gear = createReadonlyGear({
      upgradeOption: {
        int: 32,
        magicPower: 72,
      },
    });

    it('주문서 옵션을 반환한다.', () => {
      expect(gear.upgradeOption).toEqual({
        int: 32,
        magicPower: 72,
      });
    });

    it('주문서 옵션이 존재하지 않을 경우 빈 객체를 반환한다.', () => {
      const gear = createReadonlyGear();

      expect(gear.upgradeOption).toEqual({});
    });

    it('직접 설정할 수 없다.', () => {
      // @ts-expect-error: Cannot assign to 'upgradeOption' because it is a read-only property.
      expect(() => (gear.upgradeOption = {})).toThrow();
    });

    it('Readonly 객체를 반환한다.', () => {
      // @ts-expect-error: Cannot assign to 'int' because it is a read-only property.
      gear.upgradeOption.int = 3;
    });
  });

  describe('starforceOption', () => {
    const gear = createReadonlyGear({
      starforceOption: {
        str: 40,
        dex: 40,
      },
    });

    it('스타포스 옵션을 반환한다.', () => {
      expect(gear.starforceOption).toEqual({
        str: 40,
        dex: 40,
      });
    });

    it('스타포스 옵션이 존재하지 않을 경우 빈 객체를 반환한다.', () => {
      const gear = createReadonlyGear();

      expect(gear.starforceOption).toEqual({});
    });

    it('직접 설정할 수 없다.', () => {
      // @ts-expect-error: Cannot assign to 'starforceOption' because it is a read-only property.
      expect(() => (gear.starforceOption = {})).toThrow();
    });

    it('Readonly 객체를 반환한다.', () => {
      // @ts-expect-error: Cannot assign to 'int' because it is a read-only property.
      gear.starforceOption.int = 3;
    });
  });

  describe('scrollUpgradeCount', () => {
    it('주문서 강화 횟수를 반환한다.', () => {
      const gear = createReadonlyGear({
        scrollUpgradeCount: 1,
      });

      expect(gear.scrollUpgradeCount).toBe(1);
    });

    it('존재하지 않을 경우 0을 반환한다.', () => {
      const gear = createReadonlyGear();

      expect(gear.scrollUpgradeCount).toBe(0);
    });

    it('직접 설정할 수 없다.', () => {
      const gear = createReadonlyGear();

      // @ts-expect-error: Cannot assign to 'scrollUpgradeCount' because it is a read-only property.
      expect(() => (gear.scrollUpgradeCount = 2)).toThrow();
    });
  });

  describe('scrollResilienceCount', () => {
    it('복구 가능 주문서 강화 횟수를 반환한다.', () => {
      const gear = createReadonlyGear({
        scrollResilienceCount: 1,
      });

      expect(gear.scrollResilienceCount).toBe(1);
    });

    it('존재하지 않을 경우 0을 반환한다.', () => {
      const gear = createReadonlyGear();

      expect(gear.scrollResilienceCount).toBe(0);
    });

    it('직접 설정할 수 없다', () => {
      const gear = createReadonlyGear();

      // @ts-expect-error: Cannot assign to 'scrollResilienceCount' because it is a read-only property.
      expect(() => (gear.scrollResilienceCount = 1)).toThrow();
    });
  });

  describe('scrollUpgradeableCount', () => {
    it('잔여 주문서 강화 횟수를 반환한다.', () => {
      const gear = createReadonlyGear({
        scrollUpgradeableCount: 1,
      });

      expect(gear.scrollUpgradeableCount).toBe(1);
    });

    it('존재하지 않을 경우 0을 반환한다.', () => {
      const gear = createReadonlyGear();

      expect(gear.scrollUpgradeableCount).toBe(0);
    });

    it('직접 설정할 수 없다', () => {
      const gear = createReadonlyGear();

      // @ts-expect-error: Cannot assign to 'scrollUpgradeableCount' because it is a read-only property.
      expect(() => (gear.scrollUpgradeableCount = 1)).toThrow();
    });
  });

  describe('scrollTotalUpgradeableCount', () => {
    const gear = createReadonlyGear({
      scrollUpgradeCount: 1,
      scrollResilienceCount: 2,
      scrollUpgradeableCount: 4,
    });

    it('전체 주문서 강화 횟수를 반환한다.', () => {
      expect(gear.scrollTotalUpgradeableCount).toBe(7);
    });

    it('주문서 강화 횟수가 변경된 경우 변경된 값을 반환한다.', () => {
      const gear = createReadonlyGear({
        scrollUpgradeCount: 1,
        scrollResilienceCount: 2,
        scrollUpgradeableCount: 4,
      });

      (gear.data as GearData).scrollUpgradeCount = 2;

      expect(gear.scrollTotalUpgradeableCount).toBe(8);
    });

    it('직접 설정할 수 없다', () => {
      const gear = createReadonlyGear();

      // @ts-expect-error: Cannot assign to 'scrollTotalUpgradeableCount' because it is a read-only property.
      expect(() => (gear.scrollTotalUpgradeableCount = 1)).toThrow();
    });
  });

  describe('star', () => {
    it('스타포스 강화 단계를 반환한다.', () => {
      const gear = createReadonlyGear({
        star: 22,
      });

      expect(gear.star).toBe(22);
    });

    it('존재하지 않을 경우 0을 반환한다.', () => {
      const gear = createReadonlyGear();

      expect(gear.star).toBe(0);
    });

    it('직접 설정할 수 없다.', () => {
      const gear = createReadonlyGear();

      // @ts-expect-error: Cannot assign to 'star' because it is a read-only property.
      expect(() => (gear.star = 20)).toThrow();
    });
  });

  describe('maxStar', () => {
    it('최대 스타포스 강화 단계를 반환한다.', () => {
      const gear = createReadonlyGear('아케인셰이드 샤이닝로드');

      expect(gear.maxStar).toBe(30);
    });

    it('놀라운 장비 강화 주문서가 사용된 경우 15를 반환한다.', () => {
      const gear = createReadonlyGear('펜살리르 스키퍼부츠');

      (gear.data as GearData).starScroll = true;

      expect(gear.maxStar).toBe(15);
    });

    it('직접 설정할 수 없다.', () => {
      const gear = createReadonlyGear();

      // @ts-expect-error: Cannot assign to 'maxStar' because it is a read-only property.
      expect(() => (gear.maxStar = 20)).toThrow();
    });
  });

  describe('starScroll', () => {
    it('놀라운 장비 강화 주문서 적용 여부를 반환한다.', () => {
      const gear = createReadonlyGear({
        starScroll: true,
      });

      expect(gear.starScroll).toBe(true);
    });

    it('존재하지 않을 경우 false를 반환한다.', () => {
      const gear = createReadonlyGear();

      expect(gear.starScroll).toBe(false);
    });

    it('직접 설정할 수 없다.', () => {
      const gear = createReadonlyGear();

      // @ts-expect-error: Cannot assign to 'starScroll' because it is a read-only property.
      expect(() => (gear.starScroll = true)).toThrow();
    });
  });

  describe('soulEnchanted', () => {
    it('soulSlot이 undefined가 아닌 경우 true를 반환한다.', () => {
      const gear = createReadonlyGear({
        soulSlot: {},
      });

      expect(gear.soulEnchanted).toBe(true);
    });

    it('soulSlot이 undefined인 경우 false를 반환한다.', () => {
      const gear = createReadonlyGear();

      expect(gear.soulEnchanted).toBe(false);
    });

    it('직접 설정할 수 없다.', () => {
      const gear = createReadonlyGear();

      // @ts-expect-error: Cannot assign to 'soulEnchanted' because it is a read-only property.
      expect(() => (gear.soulEnchanted = true)).toThrow();
    });
  });

  describe('soul', () => {
    it('장착된 소울을 반환한다.', () => {
      const soul = createSoulData();
      const gear = createReadonlyGear({
        soulSlot: {
          soul: soul,
        },
      });

      expect(gear.soul).toEqual(soul);
    });

    it('소울 웨폰에 장착된 소울이 없는 경우 undefined를 반환한다.', () => {
      const gear = createReadonlyGear({
        soulSlot: {},
      });

      expect(gear.soul).toBeUndefined();
    });

    it('소울 웨폰이 아닌 경우 undefined를 반환한다.', () => {
      const gear = createReadonlyGear({
        soulSlot: {},
      });

      expect(gear.soul).toBeUndefined();
    });

    it('직접 설정할 수 없다.', () => {
      const gear = createReadonlyGear();

      // @ts-expect-error: Cannot assign to 'soul' because it is a read-only property.
      expect(() => (gear.soul = {})).toThrow();
    });
  });

  describe('soulCharge', () => {
    it('소울 충전량을 반환한다.', () => {
      const gear = createReadonlyGear({
        soulSlot: {
          charge: 1000,
        },
      });

      expect(gear.soulCharge).toBe(1000);
    });

    it('소울 충전량이 저장되지 않은 경우 0를 반환한다.', () => {
      const gear = createReadonlyGear({
        soulSlot: {},
      });

      expect(gear.soulCharge).toBe(0);
    });

    it('소울 웨폰이 아닌 경우 0을 반환한다.', () => {
      const gear = createReadonlyGear({
        soulSlot: {},
      });

      expect(gear.soulCharge).toBe(0);
    });

    it('직접 설정할 수 없다.', () => {
      const gear = createReadonlyGear();

      // @ts-expect-error: Cannot assign to 'soulCharge' because it is a read-only property.
      expect(() => (gear.soulCharge = 1000)).toThrow();
    });
  });

  describe('soulChargeOption', () => {
    it('소울 충전 효과를 반환한다.', () => {
      const gear = createReadonlyGear({
        soulSlot: {
          chargeOption: {
            attackPower: 10,
          },
        },
      });

      expect(gear.soulChargeOption).toEqual({
        attackPower: 10,
      });
    });

    it('소울 웨폰이 아닌 경우 빈 객체를 반환한다.', () => {
      const gear = createReadonlyGear({
        soulSlot: {},
      });

      expect(gear.soulChargeOption).toEqual({});
    });
  });

  describe('potentialGrade', () => {
    it('잠재능력 등급을 반환한다.', () => {
      const gear = createReadonlyGear({
        potentialGrade: PotentialGrade.Legendary,
      });

      expect(gear.potentialGrade).toBe(PotentialGrade.Legendary);
    });

    it('잠재능력 등급이 존재하지 않을 경우 Normal을 반환한다.', () => {
      const gear = createReadonlyGear();

      expect(gear.potentialGrade).toBe(PotentialGrade.Normal);
    });

    it('직접 설정할 수 없다.', () => {
      const gear = createReadonlyGear();

      // @ts-expect-error: Cannot assign to 'potentialGrade' because it is a read-only property.
      expect(() => (gear.potentialGrade = PotentialGrade.Legendary)).toThrow();
    });
  });

  describe('potentials', () => {
    it('잠재능력을 반환한다.', () => {
      const potentials = [
        createPotentialData({ summary: '테스트용 잠재능력 1' }),
        createPotentialData({ summary: '테스트용 잠재능력 2' }),
        createPotentialData({ summary: '테스트용 잠재능력 3' }),
      ];
      const gear = createReadonlyGear({
        potentials: potentials,
      });

      expect(gear.potentials).toEqual(potentials);
    });

    it('잠재능력이 존재하지 않을 경우 빈 배열을 반환한다.', () => {
      const gear = createReadonlyGear();

      expect(gear.potentials).toEqual([]);
    });

    it('직접 설정할 수 없다.', () => {
      const gear = createReadonlyGear();

      // @ts-expect-error: Cannot assign to 'potentials' because it is a read-only property.
      expect(() => (gear.potentials = [])).toThrow();
    });

    it('Readonly 배열을 반환한다.', () => {
      const gear = createReadonlyGear({
        potentials: [createPotentialData()],
      });

      // @ts-expect-error: Index signature in type 'readonly ReadonlyPotential[]' only permits reading.
      expect(() => (gear.potentials[0] = {})).toThrow();
    });

    it('배열의 객체가 readonly이다.', () => {
      const gear = createReadonlyGear({
        potentials: [createPotentialData()],
      });

      // @ts-expect-error: Cannot assign to 'summary' because it is a read-only property.
      gear.potentials[0].summary = '새로운 잠재능력';
      // @ts-expect-error: Cannot assign to 'attackPower' because it is a read-only property.
      gear.potentials[0].option.attackPower = 50;
    });
  });

  describe('additionalPotentialGrade', () => {
    it('에디셔널 잠재능력 등급을 반환한다.', () => {
      const gear = createReadonlyGear({
        additionalPotentialGrade: PotentialGrade.Unique,
      });

      expect(gear.additionalPotentialGrade).toBe(PotentialGrade.Unique);
    });

    it('에디셔널 잠재능력 등급이 존재하지 않을 경우 Normal을 반환한다.', () => {
      const gear = createReadonlyGear();

      expect(gear.additionalPotentialGrade).toBe(PotentialGrade.Normal);
    });

    it('직접 설정할 수 없다.', () => {
      const gear = createReadonlyGear();

      expect(
        // @ts-expect-error: Cannot assign to 'additionalPotentialGrade' because it is a read-only property.
        () => (gear.additionalPotentialGrade = PotentialGrade.Unique),
      ).toThrow();
    });
  });

  describe('additionalPotentials', () => {
    it('에디셔널 잠재능력을 반환한다.', () => {
      const potentials = [
        createPotentialData({ summary: '테스트용 에디셔널 잠재능력 1' }),
        createPotentialData({ summary: '테스트용 에디셔널 잠재능력 2' }),
        createPotentialData({ summary: '테스트용 에디셔널 잠재능력 3' }),
      ];
      const gear = createReadonlyGear({
        additionalPotentials: potentials,
      });

      expect(gear.additionalPotentials).toEqual(potentials);
    });

    it('에디셔널 잠재능력이 존재하지 않을 경우 빈 배열을 반환한다.', () => {
      const gear = createReadonlyGear();

      expect(gear.additionalPotentials).toEqual([]);
    });

    it('직접 설정할 수 없다.', () => {
      const gear = createReadonlyGear();

      // @ts-expect-error: Cannot assign to 'additionalPotentials' because it is a read-only property.
      expect(() => (gear.additionalPotentials = [])).toThrow();
    });

    it('Readonly 배열을 반환한다.', () => {
      const gear = createReadonlyGear({
        additionalPotentials: [createPotentialData()],
      });

      // @ts-expect-error: Index signature in type 'readonly ReadonlyPotential[]' only permits reading.
      expect(() => (gear.additionalPotentials[0] = {})).toThrow();
    });

    it('배열의 객체가 readonly이다.', () => {
      const gear = createReadonlyGear({
        additionalPotentials: [createPotentialData()],
      });

      // @ts-expect-error: Cannot assign to 'summary' because it is a read-only property.
      gear.additionalPotentials[0].summary = '새로운 잠재능력';
      // @ts-expect-error: Cannot assign to 'attackPower' because it is a read-only property.
      gear.additionalPotentials[0].option.attackPower = 50;
    });
  });

  describe('exceptionalOption', () => {
    it('익셉셔널 강화 옵션을 반환한다.', () => {
      const gear = createReadonlyGear({
        exceptionalOption: {
          str: 10,
        },
      });

      expect(gear.exceptionalOption).toEqual({
        str: 10,
      });
    });

    it('익셉셔널 강화 옵션이 존재하지 않을 경우 빈 객체를 반환한다.', () => {
      const gear = createReadonlyGear();

      expect(gear.exceptionalOption).toEqual({});
    });

    it('직접 설정할 수 없다.', () => {
      const gear = createReadonlyGear();

      // @ts-expect-error: Cannot assign to 'exceptionalOption' because it is a read-only property.
      expect(() => (gear.exceptionalOption = {})).toThrow();
    });
  });

  describe('exceptionalUpgradeCount', () => {
    it('익셉셔널 강화 횟수를 반환한다.', () => {
      const gear = createReadonlyGear({
        exceptionalUpgradeCount: 1,
      });

      expect(gear.exceptionalUpgradeCount).toBe(1);
    });

    it('존재하지 않을 경우 0을 반환한다.', () => {
      const gear = createReadonlyGear();

      expect(gear.exceptionalUpgradeCount).toBe(0);
    });

    it('직접 설정할 수 없다.', () => {
      const gear = createReadonlyGear();

      // @ts-expect-error: Cannot assign to 'exceptionalUpgradeCount' because it is a read-only property.
      expect(() => (gear.exceptionalUpgradeCount = 1)).toThrow();
    });
  });

  describe('exceptionalUpgradeableCount', () => {
    it('익셉셔널 강화 가능 횟수를 반환한다.', () => {
      const gear = createReadonlyGear({
        exceptionalUpgradeableCount: 1,
      });

      expect(gear.exceptionalUpgradeableCount).toBe(1);
    });

    it('존재하지 않을 경우 0을 반환한다.', () => {
      const gear = createReadonlyGear();

      expect(gear.exceptionalUpgradeableCount).toBe(0);
    });

    it('직접 설정할 수 없다.', () => {
      const gear = createReadonlyGear();

      // @ts-expect-error: Cannot assign to 'exceptionalUpgradeableCount' because it is a read-only property.
      expect(() => (gear.exceptionalUpgradeableCount = 1)).toThrow();
    });
  });

  describe('exceptionalTotalUpgradeableCount', () => {
    it('전체 익셉셔널 강화 가능 횟수를 반환한다.', () => {
      const gear = createReadonlyGear({
        exceptionalUpgradeCount: 1,
        exceptionalUpgradeableCount: 1,
      });

      expect(gear.exceptionalTotalUpgradeableCount).toBe(2);
    });

    it('익셉셔널 강화 횟수가 변경된 경우 변경된 값을 반환한다.', () => {
      const gear = createReadonlyGear({
        exceptionalUpgradeCount: 1,
        exceptionalUpgradeableCount: 1,
      });

      (gear.data as GearData).exceptionalUpgradeCount = 2;

      expect(gear.exceptionalTotalUpgradeableCount).toBe(3);
    });

    it('직접 설정할 수 없다.', () => {
      const gear = createReadonlyGear();

      // @ts-expect-error: Cannot assign to 'exceptionalTotalUpgradeableCount' because it is a read-only property.
      expect(() => (gear.exceptionalTotalUpgradeableCount = 1)).toThrow();
    });
  });
});
