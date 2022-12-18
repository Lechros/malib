import Gear from "../Gear";
import GearPropType from "../GearPropType";
import GearType from "../GearType";
import { addGearPropValue } from "../util";
/**
 * 장비 강화 관련 기능을 제공합니다.
 *
 * 스타포스 강화 이후 주문서 수치에 변동이 있을 경우 `recalculate` 함수를 사용해야 합니다.
 */
export default class EnhancementBuilder {
    private static readonly MAX_STARFORCE = 25;
    private static readonly MAX_AMAZING = 15;

    gear: Gear | undefined;

    constructor(gear?: Gear) {
        this.gear = gear;
    }

    /**
     * 장비에 스타포스 강화를 1회 적용합니다.
     *
     * 슈페리얼 장비, 놀라운 장비강화 주문서가 적용된 장비에도 사용 가능합니다.
     * @param ignoreMaxStar 장비의 최대 강화 수치 초과로 강화하는 지 여부
     * - ex) 착용 제한 레벨이 130인 장비는 최대 강화 수치가 20성이지만 `ignoreMaxStar`가 `true`일 경우 25성까지 강화 가능
     * - 단, 슈페리얼 장비는 최대 강화 수치를 초과할 수 없습니다.
     * @returns 성공했을 경우 `true`; 아닐 경우 `false`
     */
    addStarforce(ignoreMaxStar = false): boolean {
        if(!this.gear) {
            return false;
        }
        if(this.gear.getBooleanValue(GearPropType.incCHUC)) {
            return false;
        }
        if(this.gear.getBooleanValue(GearPropType.superiorEqp)) {
            return this.addSuperiorStarforce();
        }
        if(this.gear.star >= this.gear.maxStar && !ignoreMaxStar ||
            this.gear.star >= EnhancementBuilder.MAX_STARFORCE) {
            return false;
        }

        this.gear.star += 1;

        const star = this.gear.star;
        const statData = EnhancementBuilder.getStatData(this.gear, false, false);
        const attData = EnhancementBuilder.getStatData(this.gear, false, true);
        const isWeaponEnhance = Gear.isWeapon(this.gear.type) || this.gear.type === GearType.katara;

        // STR, DEX, INT, LUK
        const jobStat = [
            [GearPropType.incSTR, GearPropType.incDEX],
            [GearPropType.incINT, GearPropType.incLUK],
            [GearPropType.incDEX, GearPropType.incSTR],
            [GearPropType.incLUK, GearPropType.incDEX],
            [GearPropType.incSTR, GearPropType.incDEX],
        ];
        const statType = [GearPropType.incSTR, GearPropType.incDEX, GearPropType.incINT, GearPropType.incLUK];
        let statSet: Set<GearPropType>;
        const reqJob = this.gear.getPropValue(GearPropType.reqJob);
        if(reqJob === 0) {
            statSet = new Set([GearPropType.incSTR, GearPropType.incDEX, GearPropType.incINT, GearPropType.incLUK]);
        }
        else {
            statSet = new Set();
            for(let i = 0; i < 5; i++) {
                if((reqJob & (1 << i)) !== 0)
                    for(const type of jobStat[i])
                        statSet.add(type);
            }
        }
        for(const type of statType) {
            if(statSet.has(type)) {
                addGearPropValue(this.gear.props, type, statData[star]);
            }
            else if(star > 15 && ((this.gear.standardProps.get(type) ?? 0) > 0 || (this.gear.scrollStat.get(type) ?? 0) > 0)) {
                addGearPropValue(this.gear.props, type, statData[star]);
            }
        }
        // 공격력, 마력
        if(isWeaponEnhance) {
            const useMad = reqJob === 0 ||
                Math.floor(reqJob / 2) % 2 === 1 ||
                (this.gear.scrollStat.get(GearPropType.incMAD) ?? 0) > 0;
            if(star > 15) {
                addGearPropValue(this.gear.props, GearPropType.incPAD, attData[star]);
                if(useMad) {
                    addGearPropValue(this.gear.props, GearPropType.incMAD, attData[star]);
                }
            }
            else {
                const pad = this.gear.props.get(GearPropType.incPAD) ?? 0;
                addGearPropValue(this.gear.props, GearPropType.incPAD, Math.floor(pad / 50) + 1);
                if(useMad) {
                    const mad = this.gear.props.get(GearPropType.incMAD) ?? 0;
                    addGearPropValue(this.gear.props, GearPropType.incMAD, Math.floor(mad / 50) + 1);
                }
            }
        }
        else {
            addGearPropValue(this.gear.props, GearPropType.incPAD, attData[star]);
            addGearPropValue(this.gear.props, GearPropType.incMAD, attData[star]);

            if(this.gear.type === GearType.glove) {
                if(reqJob === 0) {
                    addGearPropValue(this.gear.props, GearPropType.incPAD, EnhancementBuilder.starforceGloveBonusAttData[star]);
                    addGearPropValue(this.gear.props, GearPropType.incMAD, EnhancementBuilder.starforceGloveBonusAttData[star]);
                }
                else if(Math.floor(reqJob / 2) % 2 === 1) {
                    addGearPropValue(this.gear.props, GearPropType.incMAD, EnhancementBuilder.starforceGloveBonusAttData[star]);
                }
                else {
                    addGearPropValue(this.gear.props, GearPropType.incPAD, EnhancementBuilder.starforceGloveBonusAttData[star]);
                }
            }
        }
        // 방어력
        if(!isWeaponEnhance && this.gear.type !== GearType.machineHeart) {
            const pdd = this.gear.props.get(GearPropType.incPDD) ?? 0;
            addGearPropValue(this.gear.props, GearPropType.incPDD, Math.floor(pdd / 20) + 1);
        }
        // 최대 HP, 최대 MP
        const mhpTypes = [
            GearType.cap,
            GearType.coat,
            GearType.longcoat,
            GearType.pants,
            GearType.cape,
            GearType.ring,
            GearType.pendant,
            GearType.belt,
            GearType.shoulderPad,
            GearType.shield
        ];
        if(isWeaponEnhance) {
            addGearPropValue(this.gear.props, GearPropType.incMHP, EnhancementBuilder.starforceMhpData[star]);
            addGearPropValue(this.gear.props, GearPropType.incMMP, EnhancementBuilder.starforceMhpData[star]);
        }
        else if(mhpTypes.includes(this.gear.type)) {
            addGearPropValue(this.gear.props, GearPropType.incMHP, EnhancementBuilder.starforceMhpData[star]);
        }
        // 이동속도, 점프력
        if(this.gear.type === GearType.shoes) {
            addGearPropValue(this.gear.props, GearPropType.incSpeed, EnhancementBuilder.starforceSpeedJumpData[star]);
            addGearPropValue(this.gear.props, GearPropType.incJump, EnhancementBuilder.starforceSpeedJumpData[star]);
        }

        return true;
    }

    /**
     * 슈페리얼 장비에 스타포스 강화를 1회 적용합니다.
     */
    private addSuperiorStarforce(): boolean {
        if(!this.gear) {
            return false;
        }
        if(this.gear.star >= this.gear.maxStar) {
            return false;
        }

        this.gear.star += 1;

        const star = this.gear.star;
        const statData = EnhancementBuilder.getStatData(this.gear, false, false);
        const attData = EnhancementBuilder.getStatData(this.gear, false, true);

        // STR, DEX, INT, LUK
        const statType = [GearPropType.incSTR, GearPropType.incDEX, GearPropType.incINT, GearPropType.incLUK];
        for(const type of statType) {
            if(this.gear.props.get(type)) {
                addGearPropValue(this.gear.props, type, statData[star]);
            }
        }
        // 공격력, 마력
        const attType = [GearPropType.incPAD, GearPropType.incMAD];
        for(const type of attType) {
            if(this.gear.props.get(type)) {
                addGearPropValue(this.gear.props, type, attData[star]);
            }
        }
        // 방어력
        const pdd = this.gear.props.get(GearPropType.incPDD) ?? 0;
        addGearPropValue(this.gear.props, GearPropType.incPDD, Math.floor(pdd / 20) + 1);

        return true;
    }

    /**
     * 장비에 놀라운 장비강화 주문서를 1회 적용합니다.
     *
     * 스타포스가 적용된 장비에도 사용 가능합니다. 슈페리얼 장비에는 적용되지 않습니다.
     * @param ignoreMaxStar 장비의 최대 강화 수치 초과로 강화하는 지 여부
     * - ex) 착용 제한 레벨이 100인 장비는 최대 강화 수치가 8성이지만 `ignoreMaxStar`가 `true`일 경우 15성까지 강화 가능
     * @param bonus 보너스 스탯 적용 여부
     * - 방어구(방패 제외): 최대 HP +50
     * - 장신구: STR, DEX, INT, LUK +1 ~ +2
     * - 주무기, 블레이드, 방패: 공격력, 마력 +1
     * @returns 성공했을 경우 `true`; 아닐 경우 `false`
     */
    addAmazingEnhancement(bonus = false, ignoreMaxStar = false): boolean {
        if(!this.gear) {
            return false;
        }
        if(this.gear.getBooleanValue(GearPropType.incCHUC)) {
            return false;
        }
        if(this.gear.star >= this.gear.maxStar && !ignoreMaxStar ||
            this.gear.star >= EnhancementBuilder.MAX_AMAZING) {
            return false;
        }

        this.gear.star += 1;

        const star = this.gear.star;
        const statData = EnhancementBuilder.getStatData(this.gear, true, false);
        const attData = EnhancementBuilder.getStatData(this.gear, true, true);
        const isWeaponEnhance = Gear.isWeapon(this.gear.type) || this.gear.type === GearType.katara;

        // STR, DEX, INT, LUK
        const statType = [GearPropType.incSTR, GearPropType.incDEX, GearPropType.incINT, GearPropType.incLUK];
        for(const type of statType) {
            const hasType = (this.gear.props.get(type) ?? 0) + (this.gear.bonusStat.get(type) ?? 0) > 0;
            if(hasType) {
                let statValue = statData[star];
                if(bonus && Gear.isAccessory(this.gear.type)) {
                    statValue += (star > 5) ? 2 : 1;
                }
                addGearPropValue(this.gear.props, type, statValue);
            }
        }
        // 공격력, 마력
        const attType = [GearPropType.incPAD, GearPropType.incMAD];
        for(const type of attType) {
            const att = (this.gear.props.get(type) ?? 0) + (this.gear.bonusStat.get(type) ?? 0);
            if(att > 0) {
                if(isWeaponEnhance) {
                    addGearPropValue(this.gear.props, type, Math.floor(att / 50) + 1);
                }
                let attValue = attData[star];
                if(bonus && (isWeaponEnhance || this.gear.type === GearType.shield)) {
                    attValue += 1;
                }
                addGearPropValue(this.gear.props, type, attValue);
            }
        }
        // 최대 HP
        if(bonus && Gear.isArmor(this.gear.type)) {
            addGearPropValue(this.gear.props, GearPropType.incMHP, 50);
        }
        // 방어력
        const pdd = (this.gear.props.get(GearPropType.incPDD) ?? 0) + (this.gear.bonusStat.get(GearPropType.incPDD) ?? 0);
        addGearPropValue(this.gear.props, GearPropType.incPDD, Math.floor(pdd / 20) + 1);

        return true;
    }

    /**
     * 장비 강화를 초기화합니다.
     * @returns 성공했을 경우 `true`; 아닐 경우 `false`
     */
    resetEnhancement(): boolean {
        if(!this.gear) {
            return false;
        }
        if(this.gear.getBooleanValue(GearPropType.incCHUC)) {
            return false;
        }

        this.gear.star = 0;
        this.gear.props.delete(GearPropType.amazingScroll);
        for(const type of this.gear.props.keys()) {
            if(type < 100) {
                const newValue = (this.gear.standardProps.get(type) ?? 0) + (this.gear.scrollStat.get(type) ?? 0);
                if(newValue !== 0) {
                    this.gear.props.set(type, newValue);
                }
                else {
                    this.gear.props.delete(newValue);
                }
            }
        }

        return true;
    }

    /**
     * 스타포스 강화로 오르는 스탯을 다시 계산합니다.
     *
     * 놀라운 장비강화 주문서가 적용된 장비에는 적용되지 않습니다.
     */
    recalculate(): boolean {
        if(!this.gear) {
            return false;
        }
        if(this.gear.getBooleanValue(GearPropType.incCHUC)) {
            return false;
        }
        if(this.gear.getBooleanValue(GearPropType.amazingScroll)) {
            return false;
        }

        const star = this.gear.star;

        this.resetEnhancement();
        for(let i = 0; i < star; i++) {
            this.addStarforce(true);
        }

        return true;
    }

    private static getStatData(gear: Gear, amazingScroll: boolean, att: boolean): number[] {
        let data: number[][];
        if(gear.getBooleanValue(GearPropType.superiorEqp)) {
            if(att) {
                data = this.superiorAttData;
            }
            else {
                data = this.superiorStatData;
            }
        }
        else if(!amazingScroll) {
            if(att) {
                if(Gear.isWeapon(gear.type) || gear.type === GearType.katara) {
                    data = this.starforceWeaponAttData;
                }
                else {
                    data = this.starforceAttData;
                }
            }
            else {
                data = this.starforceStatData;
            }
        }
        else {
            if(att) {
                data = this.amazingAttData;
            }
            else {
                data = this.amazingStatData;
            }
        }
        const reqLevel: number = gear.getPropValue(GearPropType.reqLevel);
        for(const item of [...data].reverse()) {
            if(reqLevel >= item[0]) {
                return item;
            }
        }
        throw Error("Gear has invalid reqLevel.\n" + gear);
    }

    private static superiorAttData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [110, 0, 0, 0, 0, 0, 5, 6, 7, 0, 0, 0, 0, 0, 0, 0],
        [150, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 15, 17, 19, 21, 23],
    ];

    private static superiorStatData = [
        [0, 1, 2, 4, 7, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [80, 2, 3, 5, 8, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [110, 9, 10, 12, 15, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [150, 19, 20, 22, 25, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    private static starforceWeaponAttData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 6, 7, 8, 9, 27, 28, 29],
        [118, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 6, 7, 8, 9, 10, 28, 29, 30],
        [128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 7, 8, 9, 10, 11, 29, 30, 31],
        [138, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 8, 9, 10, 11, 12, 30, 31, 32],
        [148, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9, 9, 10, 11, 12, 13, 31, 32, 33],
        [158, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 10, 11, 12, 13, 14, 32, 33, 34],
        [198, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 13, 14, 14, 15, 16, 17, 34, 35, 36],
        [248, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 16, 16, 17, 18, 19, 36, 37, 38],
    ];

    private static starforceAttData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 7, 8, 9, 10, 12, 13, 15, 17],
        [118, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 8, 9, 10, 11, 13, 14, 16, 18],
        [128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20],
        [138, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9, 10, 11, 12, 13, 15, 17, 19, 21],
        [148, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22],
        [158, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 11, 12, 13, 14, 15, 17, 19, 21, 23],
        [198, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25],
        [248, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 16, 17, 18, 19, 21, 23, 25, 27],
    ];

    private static starforceStatData = [
        [0, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [108, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0],
        [118, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
        [128, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0],
        [138, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0],
        [148, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 11, 11, 11, 11, 11, 11, 11, 0, 0, 0],
        [158, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13, 13, 13, 13, 13, 13, 13, 0, 0, 0],
        [198, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 15, 15, 15, 15, 15, 15, 15, 0, 0, 0],
        [248, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 17, 17, 17, 17, 17, 17, 17, 0, 0, 0],
    ];

    private static amazingAttData = [
        [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14],
        [80, 0, 0, 0, 0, 0, 2, 3, 4, 5, 6, 7, 9, 11, 13, 15],
        [90, 0, 0, 0, 0, 0, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16],
        [100, 0, 0, 0, 0, 0, 4, 5, 6, 7, 8, 9, 11, 13, 15, 17],
        [110, 0, 0, 0, 0, 0, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18],
        [120, 0, 0, 0, 0, 0, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19],
        [130, 0, 0, 0, 0, 0, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20],
        [140, 0, 0, 0, 0, 0, 8, 9, 10, 11, 12, 13, 15, 17, 19, 21],
        [150, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22],
    ];

    private static amazingStatData = [
        [0, 1, 2, 4, 7, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [80, 2, 3, 5, 8, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [85, 3, 4, 6, 9, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [90, 4, 5, 7, 10, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [95, 5, 6, 8, 11, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [100, 7, 8, 10, 13, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [105, 8, 9, 11, 14, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [110, 9, 10, 12, 15, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [115, 10, 11, 13, 16, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [120, 12, 13, 15, 18, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [125, 13, 14, 16, 19, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [130, 14, 15, 17, 20, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [135, 15, 16, 18, 21, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [140, 17, 18, 20, 23, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [145, 18, 19, 21, 24, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [150, 19, 20, 22, 25, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    private static starforceGloveBonusAttData = [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    private static starforceMhpData = [0, 5, 5, 5, 10, 10, 15, 15, 20, 20, 25, 25, 25, 25, 25, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    private static starforceSpeedJumpData = [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}
