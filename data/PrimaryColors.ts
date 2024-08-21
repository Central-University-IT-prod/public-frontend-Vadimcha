import {DEFAULT_THEME} from "@mantine/core";


interface IColorNames {
    [key: string]: string;
}


export const mySwatches = [
    DEFAULT_THEME.colors.red[8],
    DEFAULT_THEME.colors.pink[8],
    DEFAULT_THEME.colors.grape[8],
    DEFAULT_THEME.colors.violet[8],
    DEFAULT_THEME.colors.indigo[8],
    DEFAULT_THEME.colors.blue[8],
    DEFAULT_THEME.colors.cyan[8],
    DEFAULT_THEME.colors.teal[8],
    DEFAULT_THEME.colors.green[8],
    DEFAULT_THEME.colors.lime[8],
    DEFAULT_THEME.colors.yellow[8],
    DEFAULT_THEME.colors.orange[8]
]

export const colorNames: IColorNames = {
    [DEFAULT_THEME.colors.red[8]]: 'red',
    [DEFAULT_THEME.colors.pink[8]]: 'pink',
    [DEFAULT_THEME.colors.grape[8]]: 'grape',
    [DEFAULT_THEME.colors.violet[8]]: 'violet',
    [DEFAULT_THEME.colors.indigo[8]]: 'indigo',
    [DEFAULT_THEME.colors.blue[8]]: 'blue',
    [DEFAULT_THEME.colors.cyan[8]]: 'cyan',
    [DEFAULT_THEME.colors.teal[8]]: 'teal',
    [DEFAULT_THEME.colors.green[8]]: 'green',
    [DEFAULT_THEME.colors.lime[8]]: 'lime',
    [DEFAULT_THEME.colors.yellow[8]]: 'yellow',
    [DEFAULT_THEME.colors.orange[8]]: 'orange'
};

export const colorHexes: IColorNames = {
    red: DEFAULT_THEME.colors.red[7],
    pink: DEFAULT_THEME.colors.pink[7],
    grape: DEFAULT_THEME.colors.grape[7],
    violet: DEFAULT_THEME.colors.violet[7],
    indigo: DEFAULT_THEME.colors.indigo[7],
    blue: DEFAULT_THEME.colors.blue[7],
    cyan: DEFAULT_THEME.colors.cyan[7],
    teal: DEFAULT_THEME.colors.teal[7],
    green: DEFAULT_THEME.colors.green[7],
    lime: DEFAULT_THEME.colors.lime[7],
    yellow: DEFAULT_THEME.colors.yellow[7],
    orange: DEFAULT_THEME.colors.orange[7]
};