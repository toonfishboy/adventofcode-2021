import {getLinesAsNumbers} from "../helper";

const executeDay = async () => {
    const example1 = await getIncreaseCount(__dirname + "/example.txt")
    const input1 = await getIncreaseCount(__dirname + "/input.txt")
    const example2 = await getIncreaseCountWindow(__dirname  + "/example.txt")
    const input2 = await getIncreaseCountWindow(__dirname + "/input.txt")
    console.log({example1, input1, example2, input2});
};

export const getIncreaseCount = async (filePath: string) => {
    const numbers = await getLinesAsNumbers(filePath);
    return numbers
        .filter((input, index, array) => {
            return index > 0 && input > array[index - 1];
        })
        .length;
};

export const getIncreaseCountWindow = async (filePath: string) => {
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

executeDay();