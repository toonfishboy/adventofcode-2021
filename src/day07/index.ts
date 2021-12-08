import {getFileLines} from "../helper";

export const executePart1 = (filePath: string) => alignCrabs(filePath);
export const executePart2 = (filePath: string) => alignCrabs(filePath, true);

const alignCrabs = async (filePath: string, isSecondPart?: boolean) => {
    const crabs = (await getFileLines(filePath, (line) => line.split(",").map(value => parseInt(value))))[0];
    const positions: number[] = [];
    for (let i = 0; i < Math.max(...crabs); i++) {
        if (isSecondPart)
            positions[i] = crabs.reduce((result, crab) => {
                const diff = Math.abs(crab - i);
                for (let j = 0; j < diff; j++)
                    result = result + j + 1;
                return result;
            }, 0);
        else
            positions[i] = crabs.reduce((result, crab) => result + Math.abs(crab - i), 0);
    }
    return Math.min(...positions);
};