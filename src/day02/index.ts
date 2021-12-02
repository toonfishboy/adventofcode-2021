import {getFileLines} from "../helper";

export const executeDay02 = async () => {
    const example1 = await getPosition(__dirname + "/example.txt");
    const input1 = await getPosition(__dirname + "/input.txt");
    const example2 = await getPositionWithAim(__dirname + "/example.txt");
    const input2 = await getPositionWithAim(__dirname + "/input.txt");
    console.log({example1, input1, example2, input2});
};

const getPosition = async (filePath: string) => {
    const lines = await getFileLines(filePath);
    const result = mapCommands(lines).reduce(({horizontal, depth}, {direction, amount}) => {
        if (direction === "forward") return {horizontal: horizontal + amount, depth};
        return {horizontal, depth: direction === "up" ? depth - amount : depth + amount};
    }, {horizontal: 0, depth: 0});
    return result.horizontal * result.depth;
};

const getPositionWithAim = async (filePath: string) => {
    const lines = await getFileLines(filePath);
    const result = mapCommands(lines).reduce(({horizontal, depth, aim}, {direction, amount}) => {
        if (direction === "forward") return {horizontal: horizontal + amount, depth: (depth + (aim * amount)), aim};
        return {horizontal, depth, aim: direction === "up" ? aim - amount : aim + amount};
    }, {horizontal: 0, depth: 0, aim: 0});
    return result.horizontal * result.depth;
};

const mapCommands = (lines: string[]) => {
    return lines.map(line => {
        const [direction, amount] = line.split(" ");
        const amountValue = parseInt(amount);
        return {direction, amount: amountValue};
    });
}