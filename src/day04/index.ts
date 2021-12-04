import {getFileLines} from "../helper";

const executeDay = async () => {
    const example1 = await findWinningBingoBoard(__dirname + "/example.txt");
    const input1 = await findWinningBingoBoard(__dirname + "/input.txt");
    const example2 = await findLosingBingoBoard(__dirname + "/example.txt");
    const input2 = await findLosingBingoBoard(__dirname + "/input.txt");
    console.log({example1, input1, example2, input2});
};

const readFileAsBoards = async (filePath: string) => {
    const lines = await getFileLines(filePath);
    const drawnNumbers = lines[0].split(",").map(number => parseInt(number));
    const boards: number[][][] = [];
    lines.slice(1).forEach((line, index) => {
        const boardIndex = Math.floor(index / 5);
        const values = line.split(" ").filter(value => !!value.trim()).map(value => parseInt(value.trim()));
        boards[boardIndex] = boards[boardIndex] ? [...boards[boardIndex], values] : [values];
    });

    return {drawnNumbers, boards};
};

const getWinPossibilities = (boards: number[][][]) => {
    return boards.map((board, boardIndex) => {
        const winnerNumbers = [...board];
        for (let index = 0; index < 5; index++) {
            winnerNumbers.push(board.map(row => row[index]));
        }
        return {winnerNumbers, boardIndex};
    });
}

export const findLosingBingoBoard = async (filePath: string) => {
    const {drawnNumbers, boards} = await readFileAsBoards(filePath);
    const winners = getWinPossibilities(boards);

    let losingNumberIndex: { drawIndex: number, boardIndex: number }[] = [];

    for (let index = 0; index < drawnNumbers.length; index++) {
        const currentNumbers = drawnNumbers.slice(0, index + 1);
        const winnerBoards = winners.filter(({winnerNumbers, boardIndex}) => {
            if (losingNumberIndex.map(i => i.boardIndex).includes(boardIndex)) return;
            return winnerNumbers.find(row => {
                return row.filter(number => currentNumbers.includes(number)).length === 5;
            });
        });
        if (winnerBoards.length > 0) {
            winnerBoards.forEach(({boardIndex}) => losingNumberIndex.push({
                drawIndex: index + 1,
                boardIndex: boardIndex
            }));
        }
    }

    const lastDrawIndex = losingNumberIndex.slice(-1)[0];
    const lastBoard = boards[lastDrawIndex.boardIndex];
    console.log(lastBoard, drawnNumbers.slice(0, lastDrawIndex.drawIndex));
    return addBoardValues(lastBoard, drawnNumbers.slice(0, lastDrawIndex.drawIndex));
};

export const findWinningBingoBoard = async (filePath: string) => {
    const {drawnNumbers, boards} = await readFileAsBoards(filePath);
    const winners = getWinPossibilities(boards);

    let winningBoardIndex: number = -1;
    let drawnWinningNumbers: number[] = [];
    for (let index = 0; index < drawnNumbers.length; index++) {
        const currentNumbers = drawnNumbers.slice(0, index + 1);
        const winner = winners.find(({winnerNumbers, boardIndex}) => {
            return winnerNumbers.find(row => {
                return row.filter(number => currentNumbers.includes(number)).length === 5;
            });
        });
        if (!!winner) {
            winningBoardIndex = winner.boardIndex;
            drawnWinningNumbers = currentNumbers;
            break;
        }
    }

    if (winningBoardIndex < 0) throw new Error("no winner fount");
    const winningBoard = boards[winningBoardIndex];
    return addBoardValues(winningBoard, drawnWinningNumbers);
};

const addBoardValues = (board: number[][], drawNumbers: number[]) => {
    const addedBoard = board.reduce((result, row) => {
        return result + row.reduce((rowResult, number) => rowResult + (drawNumbers.includes(number) ? 0 : number), 0);
    }, 0);
    return addedBoard * drawNumbers.slice(-1)[0];
}

executeDay();