import {promises as fs} from "fs";

export const getFileLines = async (filePath: string) => {
    const data = await fs.readFile(filePath, "binary");
    const bufferData = Buffer.from(data);
    const bufferString = bufferData.toString();
    const inputs = bufferString.split(/\r?\n/g);
    return inputs.filter(input => input);
};

export const getLinesAsNumbers = async (filePath: string) => {
    const lines = await getFileLines(filePath);
    return lines.map(line => {
        const number = parseInt(line);
        if (isNaN(number))
            throw new Error(`line cannot get parsed into a number ${line}`);
        return number;
    });
};

export const getCurrentDay = () => {
    const date = new Date();
    return date.getDate();
};