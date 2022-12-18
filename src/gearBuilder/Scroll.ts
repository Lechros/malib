import Gear from "../Gear";
import GearPropType from "../GearPropType";
import GearType from "../GearType";

export type SpellTraceProbability = 100 | 70 | 30 | 15;
export type SpellTraceStatType = GearPropType.incSTR | GearPropType.incDEX | GearPropType.incINT | GearPropType.incLUK | GearPropType.incAllStat | GearPropType.incMHP;

export default class Scroll {
    name: string;
    stat: Map<GearPropType, number>;
    yggdrasil: number;

    constructor(name = "", stats?: Map<GearPropType, number>, yggdrasil = 0) {
        this.stat = stats ?? new Map();
        this.name = name;
        this.yggdrasil = yggdrasil;
    }

    /**
     * 주문의 흔적 `Scroll`을 반환합니다.
     * @param gear 적용할 장비
     * @param type 주문의 흔적 스탯
     * @param probability 주문의 흔적 확률
     * @returns 주문의 흔적 `Scroll`; 존재하지 않을 경우 `undefined`
     */
    static getSpellTraceScroll(gear: Gear, type: SpellTraceStatType, probability: SpellTraceProbability): Scroll | undefined {
        const reqJob = gear.getPropValue(GearPropType.reqJob);
        const attackType = (type === GearPropType.incINT) ? GearPropType.incMAD : GearPropType.incPAD;
        const gearType = gear.type;
        const reqLevel = gear.getPropValue(GearPropType.reqLevel);
        const tier = reqLevel >= 115 ? 2 : (reqLevel >= 75 ? 1 : 0);

        let statName: string;
        const attackName = attackType === GearPropType.incMAD ? "마력" : "공격력";
        switch(type) {
            case GearPropType.incSTR: statName = "힘"; break;
            case GearPropType.incDEX: statName = "민첩"; break;
            case GearPropType.incINT: statName = "지력"; break;
            case GearPropType.incLUK: statName = "운"; break;
            case GearPropType.incAllStat: statName = "올스탯"; break;
            case GearPropType.incMHP: statName = "체력"; break;
        }

        // 무기
        if(Gear.isWeapon(gearType) || gearType === GearType.katara) {
            if(type === GearPropType.incAllStat) {
                return undefined;
            }
            let data: number[][];
            switch(probability) {
                case 100: data = [[1, 0],[2, 0],[3, 1]]; break;
                case 70: data = [[2, 0],[3, 1],[5, 2]]; break;
                case 30: data = [[3, 1],[5, 2],[7, 3]]; break;
                case 15: data = [[5, 2],[7, 3],[9, 4]]; break;
            }
            const attackValue = data[tier][0];
            const statValue = data[tier][1] * (type === GearPropType.incMHP ? 50 : 1);
            const name = statValue > 0
                ? `${probability}% ${attackName}(${statName}) 주문서`
                : `${probability}% ${attackName} 주문서`;
            const stat = new Map([[type, statValue], [attackType, attackValue]]);

            return new Scroll(name, stat);
        }
        // 무기가 아닌데 15%일 경우
        else if(probability === 15) {
            return undefined;
        }
        // 장갑
        if(gearType === GearType.glove) {
            let data: number[];
            switch(probability) {
                case 100: data = [0, 1, 1]; break;
                case 70: data = [1, 2, 2]; break;
                case 30: data = [2, 3, 3]; break;
            }
            const value = data[tier];
            let name: string;
            let stat: Map<GearPropType, number>;
            if(value === 0) {
                name = `${probability}% 방어력 주문서`;
                stat = new Map([[GearPropType.incPDD, 3]]);
            }
            else {
                name = `${probability}% ${attackName} 주문서`;
                stat = new Map([[attackType, value]]);
            }
            return new Scroll(name, stat);
        }
        // 방어구
        if(Gear.isArmor(gearType) || gearType === GearType.shoulderPad) {
            // 올스탯
            if(type === GearPropType.incAllStat) {
                if(probability !== 30) {
                    return undefined;
                }
                const data = [[1, 30, 4], [2, 70, 7], [3, 120, 10]];
                const statValue = data[tier][0];
                const mhpValue = data[tier][1];
                const pddValue = data[tier][2];

                const name = `${probability}% ${statName} 주문서`;
                const stat = new Map([
                    [GearPropType.incSTR, statValue],
                    [GearPropType.incDEX, statValue],
                    [GearPropType.incINT, statValue],
                    [GearPropType.incLUK, statValue],
                    [GearPropType.incMHP, mhpValue],
                    [GearPropType.incPDD, pddValue]
                ]);
                if(gear.scrollUp === 3) {
                    if(reqJob === 0) {
                        stat.set(GearPropType.incMAD, 1);
                        stat.set(GearPropType.incPAD, 1);
                    }
                    else if((Math.floor(reqJob / 2) % 2 === 1))
                        stat.set(GearPropType.incMAD, 1);
                    else
                        stat.set(GearPropType.incPAD, 1);
                }
                return new Scroll(name, stat);
            }

            let data: number[][];
            switch(probability) {
                case 100: data = [[1, 5, 1], [2, 20, 2], [3, 30, 3]]; break;
                case 70: data = [[2, 15, 2], [3, 40, 4], [4, 70, 5]]; break;
                case 30: data = [[3, 30, 4], [5, 70, 7], [7, 120, 10]]; break;
            }
            const statValue = (type !== GearPropType.incMHP) ? data[tier][0] : 0;
            const mhpValue = data[tier][1] + ((type === GearPropType.incMHP) ? data[tier][0] * 50 : 0);
            const pddValue = data[tier][2];

            const name = `${probability}% ${statName} 주문서`;
            const stat = new Map([[GearPropType.incMHP, mhpValue], [GearPropType.incPDD, pddValue]]);
            if(statValue > 0) {
                stat.set(type, statValue);
            }
            if(gear.scrollUp === 3) {
                if(reqJob === 0) {
                    stat.set(GearPropType.incMAD, 1);
                    stat.set(GearPropType.incPAD, 1);
                }
                else if((Math.floor(reqJob / 2) % 2 === 1))
                    stat.set(GearPropType.incMAD, 1);
                else
                    stat.set(GearPropType.incPAD, 1);
            }
            return new Scroll(name, stat);
        }
        // 장신구
        if(Gear.isAccessory(gearType)) {
            if(type === GearPropType.incAllStat) {
                return undefined;
            }
            let data: number[];
            switch(probability) {
                case 100: data = [1, 1, 2]; break;
                case 70: data = [2, 2, 3]; break;
                case 30: data = [3, 4, 5]; break;
            }
            const value = data[tier] * (type === GearPropType.incMHP ? 50 : 1);
            const name = `${probability}% ${statName} 주문서`;
            const stat = new Map([[type, value]]);
            return new Scroll(name, stat);
        }
        // 기계심장
        if(gearType === GearType.machineHeart) {
            let data: number[];
            switch(probability) {
                case 100: data = [1, 2, 3]; break;
                case 70: data = [2, 3, 5]; break;
                case 30: data = [3, 5, 7]; break;
            }
            const value = data[tier];
            const name = `${probability}% ${statName} 주문서`;
            const stat = new Map([[attackType, value]]);
            return new Scroll(name, stat);
        }

        return undefined;
    }
}
