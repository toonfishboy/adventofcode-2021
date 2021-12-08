import {getCurrentDay} from "./helper";
import {join} from "path";
import {writeFile, mkdir, copyFile} from 'fs/promises';
import {existsSync} from "fs";

const importModule = (directory: string) => {
    return import(join(__dirname, directory, 'index.ts'));
}

(async () => {
    const day = getCurrentDay();
    if (!existsSync(join(__dirname, `day${day}`))) {
        await mkdir(join(__dirname, `day${day}`));
        await copyFile(join(__dirname, "templates/index.ts"), join(__dirname, `day${day}`, "index.ts"))
        await writeFile(join(__dirname, `day${day}`, "example.txt"), "");
        await writeFile(join(__dirname, `day${day}`, "input.txt"), "");
    }
    const module = await importModule(`day${day}`)
    if (module.hasOwnProperty('executePart1')) {
        console.log({example1: (await module.executePart1(__dirname + `/day${day}/example.txt`))});
        console.log({input1: (await module.executePart1(__dirname + `/day${day}/input.txt`))})
    }
    if (module.hasOwnProperty('executePart2')) {
        console.log({example2: (await module.executePart2(__dirname + `/day${day}/example.txt`))});
        console.log({input2: (await module.executePart2(__dirname + `/day${day}/input.txt`))})
    }
})();