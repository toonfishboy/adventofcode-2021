import {getCurrentDay} from "./helper";
import {executeDay01} from "./day01";
import {executeDay02} from "./day02";
import {executeDay03} from "./day03";

const main = () => {
    const day = getCurrentDay();
    switch (day) {
        case 1:
            return executeDay01();
        case 2:
            return executeDay02();
        case 3:
            return executeDay03();
        default:
            console.error(`Current day ${day} is not available`);
    }
}

main();