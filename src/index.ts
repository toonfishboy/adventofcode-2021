import {getCurrentDay} from "./helper";
import {readdir} from "fs/promises";
import {join} from "path";

(async () => {
    const items = await readdir(__dirname, {withFileTypes: true});
    const dirs = items.filter(item => item.isDirectory() && item.name.startsWith("day"));
    const day = getCurrentDay();
    const dayDir = dirs.find(dir => dir.name.includes(day));
    if (!dayDir) throw new Error("Can't find direction for the current day");
    import(join(__dirname, dayDir.name, 'index.ts'));
})();