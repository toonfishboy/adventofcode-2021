import {getFileLines} from "../helper";

const executeDay = async () => {
    const example1 = await alignCrabs(__dirname + "/example.txt");
    const input1 = await alignCrabs(__dirname + "/input.txt");
    const example2 = await alignCrabs(__dirname + "/example.txt", true);
    const input2 = await alignCrabs(__dirname + "/input.txt", true);
    console.log({example1, input1, example2, input2});
};

const alignCrabs = async (filePath: string, isSecondPart?: boolean) => {
    const crabs = (await getFileLines(filePath, (line) => line.split(",").map(value => parseInt(value))))[0];
    const positions: number[] = [];
    for (let i = 0; i < Math.max(...crabs); i++) {
        if (isSecondPart)
            positions[i] = crabs.reduce((result, crab) => {
                const diff = Math.abs(crab - i);
                for (let j = 0; j < diff; j++)
                    result = result + j + 1;
                return result;
            }, 0);
        else
            positions[i] = crabs.reduce((result, crab) => result + Math.abs(crab - i), 0);
    }
    return Math.min(...positions);
};
executeDay();