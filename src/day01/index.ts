import {getLinesAsNumbers} from "../helper";

export const executePart1 = async (filePath: string) => {
    const numbers = await getLinesAsNumbers(filePath);
    return numbers
        .filter((input, index, array) => {
            return index > 0 && input > array[index - 1];
        })
        .length;
};

export const executePart2 = async (filePath: string) => {
    const numbers = await getLinesAsNumbers(filePath);
    const windows: number[][] = [];
    for (let index = 0; index < numbers.length - 2; index++)
        windows.push(numbers.slice(index, index + 3));
    return windows
        .filter((window, index, array) => {
            return index > 0 && addWindows(window) > addWindows(array[index - 1]);
        })
        .length;
};

export const addWindows = (windows: number[]) => windows.reduce((prev, next) => prev + next, 0);