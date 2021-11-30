import {promises as fs} from "fs";

export const getFileLines = async (filePath: string) => {
    const data = await fs.readFile(`./src/${filePath}`, "binary");
    const bufferData = Buffer.from(data);
    const bufferString = bufferData.toString();
    return bufferString.split(/\r?\n/g)
};

export const getCurrentDay = () => {
    const date = new Date();
    return date.getDate();
};