import {getFileLines} from "../helper";

export const executePart1 = (filePath: string) => getLanternFishes(filePath,80);
export const executePart2 = (filePath: string) => getLanternFishes(filePath, 256);

const getLanternFishes = async (filePath: string, days: number) => {
    const fishesAll = (await getFileLines(filePath, (line) => line.split(",").map(value => parseInt(value))))[0];
    const fishes: bigint[] = [];
    fishesAll.forEach(fish => fishes[fish] ? fishes[fish] += BigInt(1) : fishes[fish] = BigInt(1));
    for (let i = 0; i < days; i++) {
        const newFishes = fishes.shift();
        if (newFishes) {
            fishes[8] ? fishes[8] += BigInt(newFishes) : fishes[8] = BigInt(newFishes)
            fishes[6] ? fishes[6] += BigInt(newFishes) : fishes[6] = BigInt(newFishes)
        }
    }
    return fishes.reduce((result, value) => result + (value ?? BigInt(0)), BigInt(0));
};