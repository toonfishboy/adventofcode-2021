import {promises as fs} from "fs";

export const getFileLines = async <T = string>(filePath: string, parse: (value: string) => T = (value: any) => value): Promise<T[]> => {
    const data = await fs.readFile(filePath, "binary");
    return Buffer.from(data)
        .toString()
        .split(/\r?\n/g)
        .filter(input => input)
        .map(parse);
};

export const getLinesAsNumbers = async (filePath: string) => {
    return await getFileLines(filePath, (value) => {
        const number = parseInt(value);
        if (isNaN(number))
            throw new Error(`line cannot get parsed into a number ${value}`);
        return number;
    });
};

export const getCurrentDay = () => {
    const date = new Date();
    return date.getDate();
};