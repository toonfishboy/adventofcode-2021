import {getFileLines} from "../helper";

export const executePart1 = async (filePath: string) => {
    const lines = await getFileLines(filePath, (line) => line.split("").map(value => parseInt(value)));
    const lowPoints = getLowPoints(lines);
    return lowPoints.reduce((result, [i, j]) => result + lines[i][j] + 1, 0)
};

export const executePart2 = async (filePath: string) => {
    const lines = await getFileLines(filePath, (line) => line.split("").map(value => parseInt(value)));
    const lowPoints = getLowPoints(lines);
    const basinLengths = lowPoints.map(point => {
        const basins: number[][] = [];
        findBasins(lines, point, basins);
        return basins.length;
    }).sort((a, b) => a + b);
    console.log(basinLengths);
};

const findBasins = (lines: number[][], point: number[], basins: number[][]) => {
    const [x, y] = point;
    const hasPoint = (x: number, y: number) => basins.find(point => point[0] === x && point[1] === y);
    const isBasin = (x: number, y: number) => x >= 0 && y >= 0 && !hasPoint(x, y) && lines?.[x]?.[y] !== undefined && lines[x][y] !== 9;
    const beginLength = basins.length;

    if (isBasin(x - 1, y))
        basins.push([x - 1, y]);
    if (isBasin(x + 1, y))
        basins.push([x + 1, y]);
    if (isBasin(x, y - 1))
        basins.push([x, y - 1]);
    if (isBasin(x, y + 1))
        basins.push([x, y + 1]);

    const baseBasins = [...basins];
    if (beginLength === baseBasins.length) return;
    for (let index = 0; index < baseBasins.length; index++) {
        findBasins(lines, baseBasins[index], baseBasins);
    }
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