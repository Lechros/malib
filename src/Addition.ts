import { serializable } from "serializr";
import esMap from "../serializrEsMap";
import { IAddition, IAdditionStatinc } from "./interfaces/IGearData";
import AdditionType from "./AdditionType";
import GearPropType, { asGearPropType } from "./GearPropType";

export default class Addition {
    constructor();
    constructor(type: AdditionType);
    constructor(type: AdditionType = 0) {
        this.type = type;
        this.additionProps = new Map<string, number>();
    }

    @serializable type: AdditionType;
    @serializable(esMap()) additionProps: Map<string, number>;

    get props(): Map<GearPropType, number> {
        const props = new Map<GearPropType, number>();
        switch(this.type) {
            case AdditionType.boss:
                // 보스 데미지 평균치로 계산
                props.set(GearPropType.bdR, (this.additionProps.get("prob") ?? 0) * (this.additionProps.get("damage") ?? 0));
                break;
            case AdditionType.critical:
                for(const [type, value] of this.additionProps) {
                    switch(type) {
                        case "prob": props.set(GearPropType.incCr, value); break;
                        case "damage": props.set(GearPropType.incCriticaldamage, value); break;
                    }
                }
                break;
            case AdditionType.statinc:
                for(const [type, value] of this.additionProps) {
                    const propType = asGearPropType(type);
                    if(propType && 0 < propType && propType < 100) {
                        props.set(propType, value);
                    }
                }
                break;
        }
        return props;
    }

    static createFromNode(type: AdditionType, node: IAddition | IAdditionStatinc): Addition {
        const addition: Addition = new Addition(type);
        for(const [subType, subValue] of Object.entries(node)) {
            addition.additionProps.set(subType, Number(subValue));
        }
        return addition;
    }
}
