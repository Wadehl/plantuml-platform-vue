import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';

// modules
import useCodeStore from './modules/code';
import useConfigsStore from './modules/configs';

const pinia = createPinia();

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
pinia.use(piniaPersist);

export default pinia;

// export modules
export { useCodeStore, useConfigsStore };
