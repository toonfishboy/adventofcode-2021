import {getFileLines} from "../helper";

const executeDay = async () => {
    const example1 = await calculatePowerConsumption(__dirname + "/example.txt");
    const input1 = await calculatePowerConsumption(__dirname + "/input.txt");
    const example2 = await calculateLifeSupportRating(__dirname + "/example.txt");
    const input2 = await calculateLifeSupportRating(__dirname + "/input.txt");
    console.log({example1, input1, example2, input2});
};

const calculatePowerConsumption = async (filePath: string) => {
    const lines = await getFileLines(filePath);
    const bits: string[][] = [];
    lines.forEach((line) => {
        line.split("").forEach((bit, index) => {
            if (!bits[index]) bits[index] = [bit];
            else bits[index].push(bit)
        });
    });
    const gamma: string[] = [];
    const epsilon: string[] = [];
    bits.forEach(bitRow => {
        const oneCount = bitRow.filter(bit => bit === "1").length;
        const zeroCount = bitRow.length - oneCount;
        gamma.push(oneCount > zeroCount ? "1" : "0");
        epsilon.push(oneCount > zeroCount ? "0" : "1");
    });
    return parseBits(gamma) * parseBits(epsilon);
};

const calculateLifeSupportRating = async (filePath: string) => {
    const lines = await getFileLines(filePath, (line) => line.split(""));
    const oxygenGeneratorRating = filterBitRows(lines, 0, "high");
    const co2ScrubberRating = filterBitRows(lines, 0, "low");
    return parseBits(oxygenGeneratorRating) * parseBits(co2ScrubberRating);
};

const filterBitRows = (bitRows: string[][], bitPos: number, criteria: "high" | "low"): string[] => {
    const bitMax = bitRows[0].length;
    const bitsAtPos = bitRows.map(bitRow => bitRow[bitPos]);
    const oneCount = bitsAtPos.filter(bit => bit === "1").length;
    const zeroCount = bitsAtPos.length - oneCount;
    const filterValue = getFilterValue(oneCount, zeroCount, criteria);
    const nextBitRows = bitRows.filter(bitRow => bitRow[bitPos] === filterValue);
    if (bitPos === bitMax|| nextBitRows.length === 1) return nextBitRows[0];
    return filterBitRows(nextBitRows, bitPos + 1, criteria);
}

const getFilterValue = (oneCount: number, zeroCount: number, criteria: "high" | "low") => {
    switch (criteria) {
        case "high":
            return oneCount >= zeroCount ? "1" : "0";
        case "low":
            return zeroCount <= oneCount ? "0" : "1";
    }
}

const parseBits = (bits: string[]) => parseInt(bits.join(""), 2);

executeDay();