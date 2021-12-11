import {getFileLines} from "../helper";

const matrix: [number, number][] = [[0, 1], [1, 0], [1, 1], [-1, 0], [0, -1], [-1, -1], [-1, 1], [1, -1]];

const checkOctopuses = (octopuses: number[][]) => {
    const copy = [...octopuses];
    let flashes = 0;
    for (let i = 0; i < octopuses.length; i++) {
        for (let j = 0; j < octopuses[i].length; j++) {
            if (copy[i][j] > 9) {
                //flashes++;
                matrix.forEach(([x, y]) => {
                    console.log(i, j, i + x, j + y, copy?.[i + x]?.[j + y], copy);
                    if (copy?.[i + x]?.[j + y] !== undefined) copy[i + x][j + y] += 1;
                });
            }
        }
    }
    octopuses = copy;
    return flashes;
};

const resetOctopuses = (octopuses: number[][]) => {
    for (let i = 0; i < octopuses.length; i++)
        for (let j = 0; j < octopuses[i].length; j++)
            if (octopuses[i][j] > 9) octopuses[i][j] = 0;
};

const addOctopuses = (octopuses: number[][]) => {
    for (let i = 0; i < octopuses.length; i++)
        for (let j = 0; j < octopuses[i].length; j++)
            octopuses[i][j]++;
};

const writeOctopuses = (octopuses: number[][]) => {
    octopuses.forEach(row => console.log(row.join("")));
    console.log("----------------------");
}

export const executePart1 = async (filePath: string) => {
    const octopuses = await getFileLines(filePath, (line) => line.split("").map(value => parseInt(value)));
    let allFlashes = 0;
    for (let index = 0; index < 2; index++) {
        addOctopuses(octopuses);
        checkOctopuses(octopuses);
        writeOctopuses([...octopuses]);
        resetOctopuses(octopuses);
    }
    return allFlashes;
}

export const executePart2 = async (filePath: string) => {
    const lines = await getFileLines(filePath);
};