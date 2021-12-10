import {getFileLines} from "../helper";

const openChars = ["(", "[", "{", "<"];
const closeChars = [")", "]", "}", ">"];
const illegalValues = [3, 57, 1197, 25137];

const calcLines = async (filePath: string) => {
    const lines = await getFileLines(filePath, (value) => value.split(""));
    const illegalChars: string[] = [];
    const incompleteChars: string[][] = [];
    lines.forEach((line) => {
        let open: string[] = [];
        let illegal = false;
        for (const char of line) {
            if (openChars.includes(char)) open.push(char);
            if (closeChars.includes(char)) {
                const lastOpenIndex = openChars.indexOf(open.slice(-1)[0]);
                if (char !== closeChars[lastOpenIndex]) {
                    illegalChars.push(char);
                    illegal = true;
                    break;
                } else {
                    open = open.slice(0, -1);
                }
            }
        }
        if (!illegal)
            incompleteChars.push(open.map(char => closeChars[openChars.indexOf(char)]).reverse());
    });
    return {illegalChars, incompleteChars}
}

export const executePart1 = async (filePath: string) => {
    const {illegalChars} = await calcLines(filePath);
    return illegalChars.reduce((result, char) => result + illegalValues[closeChars.indexOf(char)], 0);
};

export const executePart2 = async (filePath: string) => {
    const {incompleteChars} = await calcLines(filePath);
    const sortedScores = incompleteChars
        .map(chars => {
            return chars.reduce((result, char) => result * 5 + closeChars.indexOf(char) + 1, 0)
        })
        .sort((a, b) => a - b);
    return sortedScores[sortedScores.length / 2 - 0.5];
};