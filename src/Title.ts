import { serializable } from "serializr";
import esMap from "../serializrEsMap";
import { getTitleNode } from "./resource";
import GearPropType, { asGearPropType } from "./GearPropType";

/**
 * 칭호
 */
export default class Title {
    /** 이름 */
    @serializable name = "";
    /** 설명 */
    @serializable desc = "";
    /** 스타포스 수치 */
    @serializable star = 0;
    /** 속성 */
    @serializable(esMap()) props: Map<GearPropType, number>;

    constructor() {
        this.props = new Map();
    }

    /**
     * 칭호 ID로부터 칭호를 생성합니다.
     * @param gearID 칭호 ID
     * @returns 칭호; 존재하지 않을 경우 `undefined`
     */
    static createFromID(titleID: number): Title | undefined {
        const data = getTitleNode(titleID);
        if(!data) {
            return undefined;
        }

        const title = new Title();
        for(const [key, value] of Object.entries(data)) {
            switch(key) {
                case "name":
                    title.name = data.name;
                    break;
                case "desc":
                    title.desc = data.desc ?? "";
                    break;
                default:
                    title.props.set(asGearPropType(key), value);
                    break;
            }
        }
        title.star = title.props.get(GearPropType.incCHUC) ?? 0;
        return title;
    }
}
