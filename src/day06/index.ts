import {getFileLines} from "../helper";

const executeDay = async () => {
    const example1 = await getLanternFishes(__dirname + "/example.txt", 18);
    //const input1 = await getLanternFishes(__dirname + "/input.txt", 80);
    //const example2 = await getLanternFishes(__dirname + "/example.txt", 256);
    //const input2 = await findOverlappingPoints(__dirname + "/input.txt", true);
    console.log({example1});
};

const getLanternFishes = async (filePath: string, days: number) => {
    const fishesAll = (await getFileLines(filePath, (line) => line.split(",").map(value => parseInt(value))))[0];
    const fishes: bigint[] = [];
    fishesAll.forEach(fish => fishes[fish] ? fishes[fish] += BigInt(1) : fishes[fish] = BigInt(1));
    console.log(0, fishes.join());
    for (let i = 0; i < days; i++) {
        if (fishes[0]) {
            fishes[8] ? fishes[8] += BigInt(fishes[0]) : fishes[8] = BigInt(fishes[0])
            fishes[6] ? fishes[6] += BigInt(fishes[0]) : fishes[6] = BigInt(fishes[0])
        }
        fishes.shift();
        console.log(i + 1, fishes.join());
    }
    return fishes.reduce((result, value) => result + (value ?? BigInt(0)), BigInt(0));
};
executeDay();