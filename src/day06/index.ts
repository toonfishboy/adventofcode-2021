import {getFileLines} from "../helper";

const executeDay = async () => {
    const example1 = await getLanternFishes(__dirname + "/example.txt", 80);
    const input1 = await getLanternFishes(__dirname + "/input.txt", 80);
    const example2 = await getLanternFishes(__dirname + "/example.txt", 256);
    const input2 = await getLanternFishes(__dirname + "/input.txt", 256);
    console.log({example1, input1, example2, input2});
};

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
executeDay();