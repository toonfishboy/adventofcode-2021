import {getCurrentDay} from "./helper";
import {join} from "path";
import {writeFile, mkdir, copyFile} from 'fs/promises';
import {existsSync} from "fs";

const importModule = (directory: string) => {
    return import(join(directory, 'index.ts'));
}

(async () => {
    const day = getCurrentDay();
    const dir = join(__dirname, `day${day}`);
    if (!existsSync(dir)) {
        await mkdir(dir);
        await copyFile(join(__dirname, "templates/index.ts"), join(dir, "index.ts"))
        await writeFile(join(dir, "example.txt"), "");
        await writeFile(join(dir, "input.txt"), "");
    }
    const module = await importModule(dir)
    if (module.hasOwnProperty('executePart1')) {
        console.log({example1: (await module.executePart1(dir + `/example.txt`))});
        console.log({input1: (await module.executePart1(dir + `/input.txt`))})
    }
    if (module.hasOwnProperty('executePart2')) {
        console.log({example2: (await module.executePart2(dir + `/example.txt`))});
        console.log({input2: (await module.executePart2(dir + `/input.txt`))})
    }
})();