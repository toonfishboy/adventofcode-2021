import {getFileLines} from "../helper";

const executeDay = async () => {
    const example1 = await findBingoBoard(__dirname + "/example.txt");
    //const input1 = await findBingoBoard(__dirname + "/input.txt");
    //const example2 = await calculateLifeSupportRating(__dirname + "/example.txt");
    //const input2 = await calculateLifeSupportRating(__dirname + "/input.txt");
    console.log(example1);
};

export const findBingoBoard = async (filePath: string) => {
    const lines = await getFileLines(filePath);
    console.log(lines);
};

executeDay();