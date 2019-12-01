import { nodePrinters } from './nodeprinter';
import { readdirSync } from 'fs';
import { resolve } from 'path';

const dir = resolve(__dirname);
readdirSync(dir).forEach((file) => {
    if (file !== 'index.ts' && file != 'nodeprinter.ts') {
        require(dir + '/' + file);
    }
});

export default nodePrinters;