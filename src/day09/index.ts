import {getFileLines} from "../helper";

export const executePart1 = async (filePath: string) => {
    const lines = await getFileLines(filePath, (line) => line.split("").map(value => parseInt(value)));
    const lowPoints = getLowPoints(lines);
    return lowPoints.reduce((result, [i, j]) => result + lines[i][j] + 1, 0)
};

export const executePart2 = async (filePath: string) => {
    const lines = await getFileLines(filePath, (line) => line.split("").map(value => parseInt(value)));
    const lowPoints = getLowPoints(lines);
    const basinLengths = lowPoints.map(point => findBasins(lines, point, []).length).sort((a, b) => a - b);
    console.log(basinLengths);
};

const findBasins = (lines: number[][], point: number[], basins: number[][]) => {
    const [x, y] = point;
    const currentBasins: number[][] = [];
    const isAlreadyInBasin = ([x, y]: number[]) => basins.find(point => {
        return x === point[0] && point[1] === y
    });
    const isBasin = (value: number | undefined) => !!value && value !== 9;
    if (isAlreadyInBasin([x, y - 1]) && isBasin(lines[x][y - 1]))
        currentBasins.push(...findBasins(lines, [x, y - 1], [...basins, [x, y - 1]]));
    if (isAlreadyInBasin([x, y + 1]) && isBasin(lines[x][y - 1]))
        currentBasins.push(...findBasins(lines, [x, y + 1], [...basins, [x, y - 1]]));
    if (isAlreadyInBasin([x - 1, y]) && isBasin(lines[x - 1][y]))
        currentBasins.push(...findBasins(lines, [x - 1, y], [...basins, [x, y - 1]]));
    if (isAlreadyInBasin([x + 1, y]) && isBasin(lines[x + 1][y]))
        currentBasins.push(...findBasins(lines, [x + 1, y], [...basins, [x, y - 1]]));

    const allBasins = [...currentBasins, ...basins];

    return [...currentBasins, ...basins].filter((basin, index, arr) => {
        return index === arr.findIndex(value => value[0] === basin[0] && value[1] === basin[1]);
    });
};

const getLowPoints = (lines: number[][]) => {
    const lowPoints: number[][] = [];
    for (let i = 0; i < lines.length; i++) {
        const row = lines[i];
        for (let j = 0; j < row.length; j++) {
            const current = lines[i][j];
            const isLeft = lines[i - 1] !== undefined ? current < lines[i - 1][j] : true;
            const isRight = lines[i + 1] !== undefined ? current < lines[i + 1][j] : true;
            const isTop = row[j - 1] !== undefined ? current < lines[i][j - 1] : true;
            const isBottom = row[j + 1] !== undefined ? current < lines[i][j + 1] : true;

            if (isBottom && isRight && isTop && isLeft)
                lowPoints.push([i, j]);
        }
    }
    return lowPoints;
};