import {getFileLines} from "../helper";

export const executePart1 = (filePath: string) => findOverlappingPoints(filePath);
export const executePart2 = (filePath: string) => findOverlappingPoints(filePath, true);

const findOverlappingPoints = async (filePath: string, hasDiagonal: boolean = false) => {
    const inputs = await getFileLines(filePath);
    const lines = inputs.map(input => {
        const [start, end] = input.split("->");
        const parseCoords = (cords: string) => cords.split(",").map(cord => parseInt(cord.trim()));
        return [parseCoords(start), parseCoords(end)];
    });
    const numbers: number[] = [];
    for (const line of lines)
        for (const points of line)
            numbers.push(...points);

    const highest = Math.max(...numbers);
    const grid: number[][] = [];
    for (let i = 0; i < highest + 1; i++) {
        grid[i] = [];
        for (let j = 0; j < highest + 1; j++) {
            grid[i][j] = 0;
        }
    }
    for (const line of lines) {
        const wayPoints = getWaypoints(line, hasDiagonal).filter(points => points.length > 0);
        wayPoints.forEach(([i, j]) => {
            grid[j][i] += 1;
        });
    }

    let result = 0;
    for (const row of grid)
        for (const number of row)
            if (number > 1) result++;
    return result;
};

const getWaypoints = (line: number[][], hasDiagonal: boolean) => {
    const wayPoints: number[][] = [];
    const [[x1, y1], [x2, y2]] = line;
    if (x1 === x2) {
        const [v1, v2] = y1 < y2 ? [y1, y2] : [y2, y1];
        for (let i = v1; i < v2 + 1; i++)
            wayPoints.push([x1, i]);
    } else if (y1 === y2) {
        const [v1, v2] = x1 < x2 ? [x1, x2] : [x2, x1];
        for (let i = v1; i < v2 + 1; i++)
            wayPoints.push([i, y1]);
    } else if (hasDiagonal && Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
        const diff = Math.abs(x1 - x2);
        for (let i = 0; i < diff + 1; i++) {
            const nextX = x1 < x2 ? x1 + i : x1 - i;
            const nextY = y1 < y2 ? y1 + i : y1 - i;
            wayPoints.push([nextX, nextY]);
        }
    }
    return wayPoints;
}