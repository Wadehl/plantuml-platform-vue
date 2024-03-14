import {createPinia} from "pinia";

// modules
import useCodeStore from "./modules/code";

const pinia = createPinia();

export default pinia;

// export modules
export {
    useCodeStore
}
