export interface IItemOptionJson {
  [gearID: string]: IItemOption;
}

export interface IItemOption {
  optionType?: number;
  reqLevel?: number;
  string: string;
  level: {
    [level: number]: {
      [name: string]: number | string;
    };
  };
}
