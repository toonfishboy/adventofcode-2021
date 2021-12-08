import {getFileLines} from "../helper";

const executeDay = async () => {
    const example1 = await findEasyDigits(__dirname + "/example.txt");
    const input1 = await findEasyDigits(__dirname + "/input.txt");
    const example2 = await findDigits(__dirname + "/example.txt");
    const input2 = await findDigits(__dirname + "/input.txt");
    console.log({example1, input1, example2, input2});
};

const isEasyNumber = (value: string) => [2, 3, 4, 7].includes(value.length);
const isNotEasyNumber = (value: string) => !isEasyNumber(value);

const findEasyDigits = async (filePath: string) => {
    const lines = await getFileLines(filePath);
    const [, output] = lines.reduce((result: string[][], line) => {
        const [, o] = line.split("|").map(value => value.trim().split(" "));
        result[1].push(...o);
        return result;
    }, [[], []]);
    return output.filter(isEasyNumber).length;
};

const findDigits = async (filePath: string) => {
    const lines = await getFileLines(filePath);
    const result = lines.map(line => {
        const [input, output] = line.split("|").map(value => value.trim().split(" ").map(v => v.split("").sort().join("")));
        const mapping: string[] = [];
        [...input, ...output].filter(isEasyNumber).forEach(i => {
            if (i.length === 2) mapping[1] = i;
            else if (i.length === 3) mapping[7] = i;
            else if (i.length === 4) mapping[4] = i;
            else if (i.length === 7) mapping[8] = i;
        });
        [...input, ...output].filter(isNotEasyNumber).forEach(i => {
            //0,6,9
            if (i.length === 6) {
                const notIncluded = mapping[8]?.split("").find(v => !i.split("").includes(v));
                if (!notIncluded) return;
                //6 includes everything from 8 except one value which is in one
                //9 includes everything from 8 except one value which is not included in 4
                if (mapping[1]?.split("").includes(notIncluded)) mapping[6] = i;
                else if (!mapping[4]?.split("").includes(notIncluded)) mapping[9] = i;
                else mapping[0] = i;
            }
            if (i.length === 5) {
                const notIncludedOne = i.split("").filter(v => !mapping[1]?.split("").includes(v));
                const notIncludedEight = mapping[8]?.split("").filter(v => !i.split("").includes(v));
                if (notIncludedOne?.length === 3) mapping[3] = i
                else if (mapping[4]?.split("").filter(v => notIncludedEight?.includes(v))?.length === 2) mapping[2] = i
                else mapping[5] = i
            }
        });
        const result = output.map(o => mapping.findIndex(value => value === o));
        return parseInt(result.join(""));
    });
    return result.reduce((a, b) => a + b, 0);
};
executeDay();