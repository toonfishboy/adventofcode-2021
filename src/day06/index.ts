import {getFileLines} from "../helper";
import {join} from "path";

const executeDay = async () => {
    const example1 = await getLanternFishes(__dirname + "/example.txt", 80);
    const input1 = await getLanternFishes(__dirname + "/input.txt", 80);
    const example2 = await getLanternFishes(__dirname + "/example.txt", 256);
    //const input2 = await findOverlappingPoints(__dirname + "/input.txt", true);
    console.log({example1, input1, example2});
};

const getLanternFishes = async (filePath: string, days: number) => {
    const allFishes = (await getFileLines(filePath, (line) => line.split(",").map(value => parseInt(value))))[0];
    const bigFishes: number[][] = [allFishes];

    for (let i = 0; i < days; i++) {
        const bigFishesLength = bigFishes.length;
        for (let j = 0; j < bigFishesLength; j++) {
            const fishLength = bigFishes[j]?.length ?? 0;
            const fishes = bigFishes[j] ?? [];
            for (let fishIndex = 0; fishIndex < fishLength; fishIndex++) {
                if (fishes[fishIndex] > 0) fishes[fishIndex] -= 1;
                else {
                    fishes[fishIndex] = 6;
                    if (fishLength >= 1000000) {
                        if (!bigFishes[i])
                            bigFishes[i] = [8];
                        else
                            bigFishes[i].push(8);
                    } else
                        fishes.push(8);
                }
            }
        }
    }

    let fishCount = BigInt(0);
    for (const fishes of bigFishes)
        fishCount += BigInt(fishes?.length ?? 0);

    return fishCount;
};
executeDay();