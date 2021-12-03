import {getFileLines} from "../helper";

const executeDay = async () => {
    const example1 = await getPosition(__dirname + "/example.txt");
    const input1 = await getPosition(__dirname + "/input.txt");
    const example2 = await getPositionWithAim(__dirname + "/example.txt");
    const input2 = await getPositionWithAim(__dirname + "/input.txt");
    console.log({example1, input1, example2, input2});
};

const getPosition = async (filePath: string) => {
    const lines = await getFileLines(filePath, parseCommands);
    const result = lines.reduce(({horizontal, depth}, {direction, amount}) => {
        if (direction === "forward") return {horizontal: horizontal + amount, depth};
        return {horizontal, depth: direction === "up" ? depth - amount : depth + amount};
    }, {horizontal: 0, depth: 0});
    return result.horizontal * result.depth;
};

const getPositionWithAim = async (filePath: string) => {
    const lines = await getFileLines(filePath, parseCommands);
    const result = lines.reduce(({horizontal, depth, aim}, {direction, amount}) => {
        if (direction === "forward") return {horizontal: horizontal + amount, depth: (depth + (aim * amount)), aim};
        return {horizontal, depth, aim: direction === "up" ? aim - amount : aim + amount};
    }, {horizontal: 0, depth: 0, aim: 0});
    return result.horizontal * result.depth;
};

const parseCommands = (value: string) => {
    const [direction, amount] = value.split(" ");
    const amountValue = parseInt(amount);
    return {direction, amount: amountValue};
}

executeDay();