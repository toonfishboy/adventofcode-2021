import {executeDay01} from "./day01";
import {getCurrentDay} from "./helper";

const main = () => {
    const day = getCurrentDay();
    switch (1){
        case 1:
            return executeDay01();
        default:
            console.error(`Current day ${day} is not available`);
    }
}

main();