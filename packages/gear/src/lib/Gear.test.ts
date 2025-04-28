import { AddOptionType, PotentialGrade } from './data';
import { SpellTraceType } from './enhance/spellTrace';
import { sumOptions } from './gearOption';
import {
  createExceptional,
  createGear,
  createPotentialData,
  createScroll,
  createSoulData,
  starforcePatch,
} from './test';
import { soulPatch } from './test/gearPatch';

describe('Gear', () => {
  describe('shape', () => {
    it('{ name: 모루 아이템, icon: 1001234 }이다.', () => {
      const gear = createGear({
        shape: {
          name: '모루 아이템',
          icon: '1001234',
        },
      });

      expect(gear.shape).toEqual({ name: '모루 아이템', icon: '1001234' });
    });

    it('직접 설정할 수 있있다.', () => {
      const gear = createGear();

      gear.shape = { name: '새로운 모루 아이템', icon: '1002000' };

      expect(gear.shape).toEqual({
        name: '새로운 모루 아이템',
        icon: '1002000',
      });
    });

    it('undefined로 설정할 수 있다.', () => {
      const gear = createGear({
        shape: {
          name: '모루 아이템',
          icon: '1001234',
        },
      });

      gear.shape = undefined;

      expect(gear.shape).toBeUndefined();
    });
  });

  describe('추가 옵션', () => {
    describe('supportsAddOption', () => {
      it('추가 옵션 부여가 가능한 장비는true를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.supportsAddOption).toBe(true);
      });

      it('추가 옵션 부여가 불가능한 장비는 false를 반환한다.', () => {
        const gear = createGear('스칼렛 링');

        expect(gear.supportsAddOption).toBe(false);
      });
    });

    describe('canApplyAddOption', () => {
      it('추가 옵션이 없는 장비는 true를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.canApplyAddOption).toBe(true);
      });

      it('추가 옵션이 4개 부여된 장비는 false를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드', {
          addOption: {
            str: 1,
            dex: 2,
            int: 3,
            luk: 4,
          },
          addOptions: [
            { type: AddOptionType.str, grade: 1, value: 1 },
            { type: AddOptionType.dex, grade: 2, value: 2 },
            { type: AddOptionType.int, grade: 3, value: 3 },
            { type: AddOptionType.luk, grade: 4, value: 4 },
          ],
        });

        expect(gear.canApplyAddOption).toBe(false);
      });
    });

    describe('applyAddOption', () => {
      it('추가 옵션을 설정한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        gear.applyAddOption(AddOptionType.allStat, 5);

        expect(gear.addOption).toEqual({
          allStat: 5,
        });
      });
    });

    describe('canResetAddOption', () => {
      it('추가 옵션 부여가 가능한 장비는 true를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.canResetAddOption).toBe(true);
      });

      it('추가 옵션 부여가 불가능한 장비는 false를 반환한다.', () => {
        const gear = createGear('스칼렛 링');

        expect(gear.canResetAddOption).toBe(false);
      });
    });

    describe('resetAddOption', () => {
      it('추가 옵션을 초기화한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드', {
          addOption: {
            str: 1,
            dex: 2,
            int: 3,
            luk: 4,
          },
        });

        gear.resetAddOption();

        expect(gear.addOption).toEqual({});
      });

      it('추가 옵션 목록을 초기화한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드', {
          addOptions: [
            { type: AddOptionType.str, grade: 1, value: 1 },
            { type: AddOptionType.dex, grade: 2, value: 2 },
            { type: AddOptionType.int, grade: 3, value: 3 },
          ],
        });

        gear.resetAddOption();

        expect(gear.addOptions).toEqual([]);
      });
    });
  });

  describe('주문서 강화', () => {
    describe('supportsUpgrade', () => {
      it('주문서 강화가 가능한 장비는 true를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.supportsUpgrade).toBe(true);
      });

      it('주문서 강화가 불가능한 장비는 false를 반환한다.', () => {
        const gear = createGear();

        expect(gear.supportsUpgrade).toBe(false);
      });
    });

    describe('canApplyFailScroll', () => {
      it('주문서 강화가 가능한 장비는 true를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.canApplyFailScroll).toBe(true);
      });

      it('주문서 강화가 불가능한 장비는 false를 반환한다.', () => {
        const gear = createGear();

        expect(gear.canApplyFailScroll).toBe(false);
      });
    });

    describe('applyScrollFail', () => {
      it('복구 가능 주문서 강화 횟수가 1 증가한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');
        const expected = gear.scrollResilienceCount + 1;

        gear.applyScrollFail();

        expect(gear.scrollResilienceCount).toBe(expected);
      });

      it('잔여 주문서 강화 횟수가 1 감소한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');
        const expected = gear.scrollUpgradeableCount - 1;

        gear.applyScrollFail();

        expect(gear.scrollUpgradeableCount).toBe(expected);
      });
    });

    describe('canApplyResileScroll', () => {
      it('복구 가능 주문서 강화 횟수가 0인 경우 false를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.canApplyResileScroll).toBe(false);
      });
    });

    describe('applyScrollResile', () => {
      it('복구 가능 주문서 강화 횟수가 0인 경우 TypeError가 발생한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(() => {
          gear.applyScrollResile();
        }).toThrow(TypeError);
      });
    });

    describe('canResetUpgrade', () => {
      it('주문서 강화가 가능한 장비는 true를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.canResetUpgrade).toBe(true);
      });

      it('주문서 강화가 불가능한 장비는 false를 반환한다.', () => {
        const gear = createGear();

        expect(gear.canResetUpgrade).toBe(false);
      });
    });

    describe('resetUpgrade', () => {
      it('주문서 옵션을 초기화한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드', {
          upgradeOption: {
            int: 1,
            magicPower: 2,
          },
        });

        gear.resetUpgrade();

        expect(gear.upgradeOption).toEqual({});
      });

      it('주문서 강화 횟수를 0으로 설정한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드', {
          scrollUpgradeCount: 1,
        });

        gear.resetUpgrade();

        expect(gear.scrollUpgradeCount).toBe(0);
      });
    });

    describe('canApplyScroll', () => {
      it('잔여 주문서 강화 횟수가 1 이상인 경우 true를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.canApplyScroll).toBe(true);
      });
    });

    describe('applyScroll', () => {
      it('주문서 옵션을 설정한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');
        const scroll = createScroll({
          option: {
            int: 100,
          },
        });

        gear.applyScroll(scroll);

        expect(gear.upgradeOption).toEqual({
          int: 100,
        });
      });

      it('주문서 강화 횟수가 1회 증가한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');
        const scroll = createScroll();
        const expected = gear.scrollUpgradeCount + 1;

        gear.applyScroll(scroll);

        expect(gear.scrollUpgradeCount).toBe(expected);
      });
    });

    describe('applySpellTrace', () => {
      it('주문서 옵션을 설정한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        gear.applySpellTrace(SpellTraceType.int, 15);

        expect(gear.upgradeOption).toEqual({
          int: 4,
          magicPower: 9,
        });
      });

      it('주문서 강화 횟수가 1회 증가한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');
        const expected = gear.scrollUpgradeCount + 1;

        gear.applySpellTrace(SpellTraceType.int, 15);

        expect(gear.scrollUpgradeCount).toBe(expected);
      });
    });
  });

  describe('스타포스 강화', () => {
    describe('supportsStarforce', () => {
      it('스타포스 강화를 지원하는 장비는 true를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.supportsStarforce).toBe(true);
      });
    });

    describe('canApplyStarforce', () => {
      it('스타포스 강화가 최대 단계보다 작은 경우 true를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.canApplyStarforce).toBe(true);
      });
    });

    describe('applyStarforce', () => {
      it('스타포스 강화 단계가 1 증가한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');
        const expected = gear.star + 1;

        gear.applyStarforce();

        expect(gear.star).toBe(expected);
      });

      it('스타포스 옵션을 설정한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');
        const expected = sumOptions(gear.starforceOption, {
          int: 2,
          luk: 2,
          maxHp: 5,
          maxMp: 5,
          attackPower: 5,
          magicPower: 7,
        });

        gear.applyStarforce();

        expect(gear.starforceOption).toEqual(expected);
      });
    });

    describe('canStarforceIgnoringMaxStar', () => {
      it('스타포스 강화가 최대 단계 이상이어도 true를 반환한다.', () => {
        const gear = createGear('노가다 목장갑', [starforcePatch(5)]);

        expect(gear.canApplyStarforceIgnoringMaxStar).toBe(true);
      });
    });

    describe('starforceIgnoringMaxStar', () => {
      it('스타포스 강화 단계가 1 증가한다.', () => {
        const gear = createGear('노가다 목장갑', [starforcePatch(5)]);
        const expected = gear.star + 1;

        gear.applyStarforceIgnoringMaxStar();

        expect(gear.star).toBe(expected);
      });

      it('스타포스 옵션을 설정한다.', () => {
        const gear = createGear('노가다 목장갑', [starforcePatch(5)]);
        const expected = sumOptions(gear.starforceOption, {
          str: 3,
          dex: 3,
          int: 3,
          luk: 3,
          armor: 1,
        });

        gear.applyStarforceIgnoringMaxStar();

        expect(gear.starforceOption).toEqual(expected);
      });
    });

    describe('canStarScroll', () => {
      it('요구 레벨이 Lv.150을 넘는 장비는 false를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.canApplyStarScroll).toBe(false);
      });
    });

    describe('applyStarScroll', () => {
      it('요구 레벨이 Lv.150을 넘는 장비는 TypeError가 발생한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(() => {
          gear.applyStarScroll();
        }).toThrow(TypeError);
      });
    });

    describe('canStarScrollIgnoringMaxStar', () => {
      it('스타포스 강화가 최대 단계 이상이어도 true를 반환한다.', () => {
        const gear = createGear('노가다 목장갑', [starforcePatch(5)]);

        expect(gear.canApplyStarScrollIgnoringMaxStar).toBe(true);
      });
    });

    describe('applyStarScrollIgnoringMaxStar', () => {
      it('스타포스 강화 단계가 1 증가한다.', () => {
        const gear = createGear('노가다 목장갑', [starforcePatch(5)]);
        const expected = gear.star + 1;

        gear.applyStarScrollIgnoringMaxStar();

        expect(gear.star).toBe(expected);
      });

      it('놀라운 장비 강화 주문서 여부를 true로 설정한다.', () => {
        const gear = createGear('노가다 목장갑', [starforcePatch(5)]);

        gear.applyStarScrollIgnoringMaxStar();

        expect(gear.starScroll).toBe(true);
      });

      it('스타포스 옵션을 설정한다.', () => {
        const gear = createGear('노가다 목장갑', [starforcePatch(5)]);
        const expected = sumOptions(gear.starforceOption, {
          attackPower: 1,
          magicPower: 1,
          armor: 1,
        });

        gear.applyStarScrollIgnoringMaxStar();

        expect(gear.starforceOption).toEqual(expected);
      });
    });

    describe('canResetStarforce', () => {
      it('스타포스 강화를 지원하는 장비는 true를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.canResetStarforce).toBe(true);
      });
    });

    describe('resetStarforce', () => {
      it('스타포스 옵션을 초기화한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드', {
          starforceOption: {
            str: 1,
            dex: 2,
            int: 3,
            luk: 4,
          },
        });

        gear.resetStarforce();

        expect(gear.starforceOption).toEqual({});
      });

      it('스타포스 강화 단계를 0으로 설정한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드', {
          star: 1,
        });

        gear.resetStarforce();

        expect(gear.star).toBe(0);
      });
    });
  });

  describe('잠재능력', () => {
    describe('supportsPotential', () => {
      it('잠재능력 설정을 지원하는 장비는 true를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.supportsPotential).toBe(true);
      });
    });

    describe('canSetPotential', () => {
      it('잠재능력 설정을 지원하는 장비는 true를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.canSetPotential).toBe(true);
      });
    });

    describe('setPotential', () => {
      it('잠재능력 등급을 설정한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        gear.setPotential(PotentialGrade.Unique, [createPotentialData()]);

        expect(gear.potentialGrade).toBe(PotentialGrade.Unique);
      });

      it('잠재능력 옵션을 설정한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');
        const potentials = [
          createPotentialData({ summary: '테스트용 잠재능력 1' }),
          createPotentialData({ summary: '테스트용 잠재능력 2' }),
          createPotentialData({ summary: '테스트용 잠재능력 3' }),
        ];

        gear.setPotential(PotentialGrade.Unique, potentials);

        expect(gear.potentials).toEqual(potentials);
      });
    });

    describe('resetPotential', () => {
      it('잠재능력 등급을 Normal로 설정한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        gear.resetPotential();

        expect(gear.potentialGrade).toBe(PotentialGrade.Normal);
      });

      it('잠재능력 옵션을 초기화한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드', {
          potentials: [
            createPotentialData({ summary: '테스트용 잠재능력 1' }),
            createPotentialData({ summary: '테스트용 잠재능력 2' }),
            createPotentialData({ summary: '테스트용 잠재능력 3' }),
          ],
        });

        gear.resetPotential();

        expect(gear.potentials).toEqual([]);
      });
    });

    describe('supportsAdditionalPotential', () => {
      it('에디셔널 잠재능력 설정을 지원하는 장비는 true를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.supportsAdditionalPotential).toBe(true);
      });
    });

    describe('canSetAdditionalPotential', () => {
      it('에디셔널 잠재능력 설정을 지원하는 장비는 true를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.canSetAdditionalPotential).toBe(true);
      });
    });

    describe('setAdditionalPotential', () => {
      it('에디셔널 잠재능력 등급을 설정한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        gear.setAdditionalPotential(PotentialGrade.Epic, [
          createPotentialData(),
        ]);

        expect(gear.additionalPotentialGrade).toBe(PotentialGrade.Epic);
      });

      it('에디셔널 잠재능력 옵션을 설정한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');
        const potentials = [
          createPotentialData({ summary: '테스트용 에디셔널 잠재능력 1' }),
          createPotentialData({ summary: '테스트용 에디셔널 잠재능력 2' }),
          createPotentialData({ summary: '테스트용 에디셔널 잠재능력 3' }),
        ];

        gear.setAdditionalPotential(PotentialGrade.Epic, potentials);

        expect(gear.additionalPotentials).toEqual(potentials);
      });
    });

    describe('resetAdditionalPotential', () => {
      it('에디셔널 잠재능력 등급을 Normal로 설정한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        gear.resetAdditionalPotential();

        expect(gear.additionalPotentialGrade).toBe(PotentialGrade.Normal);
      });

      it('에디셔널 잠재능력 옵션을 초기화한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드', {
          additionalPotentials: [
            createPotentialData({ summary: '테스트용 에디셔널 잠재능력 1' }),
            createPotentialData({ summary: '테스트용 에디셔널 잠재능력 2' }),
            createPotentialData({ summary: '테스트용 에디셔널 잠재능력 3' }),
          ],
        });

        gear.resetAdditionalPotential();

        expect(gear.additionalPotentials).toEqual([]);
      });
    });
  });

  describe('소울 웨폰', () => {
    describe('supportsSoul', () => {
      it('장비 분류가 무기일 경우 true를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.supportsSoul).toBe(true);
      });
    });

    describe('canApplySoulEnchant', () => {
      it('장비 분류가 무기일 경우 true를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.canApplySoulEnchant).toBe(true);
      });
    });

    describe('applySoulEnchant', () => {
      it('소울 인챈트를 적용한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        gear.applySoulEnchant();

        expect(gear.soulEnchanted).toBe(true);
      });
    });

    describe('canSetSoul', () => {
      it('소울 인챈트가 적용된 장비는 true를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드', [soulPatch()]);

        expect(gear.canSetSoul).toBe(true);
      });

      it('소울 인챈트가 적용되지 않은 장비는 false를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.canSetSoul).toBe(false);
      });
    });

    describe('setSoul', () => {
      it('소울을 설정한다.', () => {
        const soul = createSoulData();
        const gear = createGear('아케인셰이드 샤이닝로드', [soulPatch()]);

        gear.setSoul(soul);

        expect(gear.soul).toEqual(soul);
      });

      it('소울 인챈트가 적용되지 않은 장비는 TypeError가 발생한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(() => {
          gear.setSoul(createSoulData());
        }).toThrow(TypeError);
      });
    });

    describe('canSetSoulCharge', () => {
      it('소울 인챈트가 적용된 장비는 true를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드', [soulPatch()]);

        expect(gear.canSetSoulCharge).toBe(true);
      });

      it('소울 인챈트가 적용되지 않은 장비는 false를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.canSetSoulCharge).toBe(false);
      });
    });

    describe('setSoulCharge', () => {
      it('소울 충전량을 설정한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드', [soulPatch()]);

        gear.setSoulCharge(100);

        expect(gear.soulCharge).toBe(100);
      });

      it('소울 인챈트가 적용되지 않은 장비는 TypeError가 발생한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(() => {
          gear.setSoulCharge(100);
        }).toThrow(TypeError);
      });
    });

    describe('resetSoulEnchant', () => {
      it('소울 인챈트를 초기화한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드', {
          soulSlot: {},
        });

        gear.resetSoulEnchant();

        expect(gear.soulEnchanted).toBe(false);
      });
    });
  });

  describe('익셉셔널', () => {
    describe('supportsExceptional', () => {
      it('익셉셔널 강화를 지원하는 장비는 true를 반환한다.', () => {
        const gear = createGear('몽환의 벨트');

        expect(gear.supportsExceptional).toBe(true);
      });

      it('익셉셔널 강화를 지원하지 않는 장비는 false를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.supportsExceptional).toBe(false);
      });
    });

    describe('canApplyExceptional', () => {
      it('익셉셔널 강화를 지원하는 장비는 true를 반환한다.', () => {
        const gear = createGear('몽환의 벨트');

        expect(gear.canApplyExceptional).toBe(true);
      });

      it('익셉셔널 강화를 지원하지 않는 장비는 false를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.canApplyExceptional).toBe(false);
      });
    });

    describe('applyExceptional', () => {
      it('익셉셔널 옵션을 설정한다.', () => {
        const gear = createGear('몽환의 벨트');
        const scroll = createExceptional({
          option: {
            int: 10,
          },
        });

        gear.applyExceptional(scroll);

        expect(gear.exceptionalOption).toEqual({
          int: 10,
        });
      });

      it('익셉셔널 강화 횟수가 1회 증가한다.', () => {
        const gear = createGear('몽환의 벨트');
        const expected = gear.exceptionalUpgradeCount + 1;

        gear.applyExceptional(createExceptional());

        expect(gear.exceptionalUpgradeCount).toBe(expected);
      });

      it('익셉셔널 강화를 지원하지 않는 장비는 TypeError가 발생한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(() => {
          gear.applyExceptional(createScroll());
        }).toThrow(TypeError);
      });
    });

    describe('canResetExceptional', () => {
      it('익셉셔널 강화를 지원하는 장비는 true를 반환한다.', () => {
        const gear = createGear('몽환의 벨트');

        expect(gear.canResetExceptional).toBe(true);
      });

      it('익셉셔널 강화를 지원하지 않는 장비는 false를 반환한다.', () => {
        const gear = createGear('아케인셰이드 샤이닝로드');

        expect(gear.canResetExceptional).toBe(false);
      });
    });

    describe('resetExceptional', () => {
      it('익셉셔널 옵션을 초기화한다.', () => {
        const gear = createGear('몽환의 벨트', {
          exceptionalOption: {
            int: 10,
          },
        });

        gear.resetExceptional();

        expect(gear.exceptionalOption).toEqual({});
      });

      it('익셉셔널 강화 횟수를 0으로 설정한다.', () => {
        const gear = createGear('몽환의 벨트', {
          exceptionalUpgradeCount: 1,
        });

        gear.resetExceptional();

        expect(gear.exceptionalUpgradeCount).toBe(0);
      });
    });
  });
});
