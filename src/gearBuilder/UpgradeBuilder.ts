import Gear from "../Gear";
import GearPropType from "../GearPropType";
import { addGearProp } from "../util";
import Scroll, { SpellTraceProbability, SpellTraceStatType } from "./Scroll";

/**
 * 주문서 업그레이드 관련 기능을 제공합니다.
 * 주문서 스탯 변동에 따른 스타포스 수치 변동은 계산되지 않습니다.
 */
export default class UpgradeBuilder {
    gear: Gear | undefined;

    constructor(gear?: Gear) {
        this.gear = gear;
    }

    /**
     * 업그레이드 가능 횟수
     */
    get upgradeLeft(): number {
        if(!this.gear) {
            return 0;
        }

        return this.gear.getPropValue(GearPropType.tuc);
    }

    /**
     * 장비에 황금망치를 적용합니다.
     * @returns 황금망치가 적용됐을 경우 `true`; 아닐 경우 `false`
     */
    applyGoldHammer(): boolean {
        if(!this.gear) {
            return false;
        }
        if(this.gear.getBooleanValue(GearPropType.blockGoldHammer) ||
            this.gear.getBooleanValue(GearPropType.onlyUpgrade) ||
            !this.gear.hasTuc
        ) {
            return false;
        }
        if(this.gear.hammer > 0) {
            return false;
        }
        this.gear.hammer = 1;
        this.gear.props.set(GearPropType.tuc, this.upgradeLeft + 1);
        return true;
    }

    /**
     * 장비에 주문서를 1회 적용합니다.
     *
     * 이그드라실 주문서가 적용된 장비에는 이그드라실 주문서가 다시 적용되지 않습니다.
     * @param scroll 적용할 주문서
     * @returns 주문서가 적용됐을 경우 `true`; 아닐 경우 `false`
     */
    applyScroll(scroll: Scroll): boolean {
        if(!this.gear) {
            return false;
        }
        if(this.upgradeLeft < 1) {
            return false;
        }
        if(scroll.yggdrasil > 0) {
            if(this.gear.getBooleanValue(GearPropType.yggdrasil)) {
                return false;
            }
            this.gear.props.set(GearPropType.yggdrasil, scroll.yggdrasil);
        }
        this.gear.props.set(GearPropType.tuc, this.upgradeLeft - 1);
        this.gear.scrollUp += 1;
        addGearProp(this.gear.scrollStat, scroll.stat);
        addGearProp(this.gear.props, scroll.stat);
        return true;
    }

    /**
     * 장비에 주문의 흔적 강화를 1회 적용합니다.
     * @param type 주문의 흔적 스탯 종류
     * @param probability 주문의 흔적 성공 확률 %
     * @returns 주문서가 적용됐을 경우 `true`; 아닐 경우 `false`
     */
    applySpellTrace(type: SpellTraceStatType, probability: SpellTraceProbability): boolean {
        if(!this.gear) {
            return false;
        }
        const spellTrace = Scroll.getSpellTraceScroll(this.gear, type, probability);
        if(!spellTrace) {
            return false;
        }
        return this.applyScroll(spellTrace);
    }

    /**
     * 장비의 업그레이드 가능 횟수를 1회 감소시킵니다.
     *
     * 주문서가 실패한 것과 동일한 효과입니다.
     * @returns 감소됐을 경우 `true`; 아닐 경우 `false`
     */
    addUpgradeFail(): boolean {
        if(!this.gear) {
            return false;
        }
        if(this.upgradeLeft < 1) {
            return false;
        }
        this.gear.props.set(GearPropType.tuc, this.upgradeLeft - 1);
        return true;
    }

    /**
     * 장비의 업그레이드 가능 횟수를 1회 복구합니다.
     *
     * 장비의 최대 업그레이드 가능 횟수를 초과하지 않습니다.
     * @returns 복구했을 경우 `true`; 아닐 경우 `false`
     */
    restoreUpgradeFail(): boolean {
        if(!this.gear) {
            return false;
        }
        const fails = (this.gear.standardProps.get(GearPropType.tuc) ?? 0) +
            this.gear.hammer -
            this.gear.getPropValue(GearPropType.tuc) -
            this.gear.scrollUp;
        if(fails < 1) {
            return false;
        }
        this.gear.props.set(GearPropType.tuc, this.upgradeLeft + 1);
        return true;
    }

    /**
     * 장비의 주문서, 황금망치 관련 속성을 초기화합니다.
     *
     * 아크 이노센트와 동일한 효과입니다. 놀라운 장비강화 주문서가 적용된 장비도 적용 가능하지만 오차가 발생할 수 있습니다.
     * </pre>
     * @returns 초기화했을 경우 `true`; 아닐 경우 `false`
     */
    resetUpgrade(): boolean {
        if(!this.gear) {
            return false;
        }
        this.gear.props.set(GearPropType.tuc, this.gear.standardProps.get(GearPropType.tuc) ?? 0);
        this.gear.scrollUp = 0;
        this.gear.hammer = 0;
        addGearProp(this.gear.props, this.gear.scrollStat, "sub");
        this.gear.scrollStat.clear;
        return true;
    }
}
