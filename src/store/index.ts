import {createPinia} from "pinia";
import piniaPersist from 'pinia-plugin-persist'

// modules
import useCodeStore from "./modules/code";
import useConfigsStore from "./modules/configs";

const pinia = createPinia();

pinia.use(piniaPersist);

export default pinia;

// export modules
export {
  useCodeStore,
  useConfigsStore
}
