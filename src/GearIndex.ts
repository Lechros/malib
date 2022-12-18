import { GearData } from "./resource";

export default class GearIndex {
    private static readonly index: {[gearName: string]: number} = {};

    static load(): void {
        for(const [id, data] of Object.entries(GearData)) {
            if(data.name in this.index) {
                if(this.index[data.name] > Number(id)) {
                    this.index[data.name] = Number(id);
                }
            }
            else {
                this.index[data.name] = Number(id);
            }
        }
    }

    static getGearID(gearName: string): number | undefined {
        if(Object.keys(this.index).length <= 0) {
            this.load();
        }

        return this.index[gearName];
    }
}
