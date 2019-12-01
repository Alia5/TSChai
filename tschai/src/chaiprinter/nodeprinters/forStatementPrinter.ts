import { nodePrinters } from './nodeprinter';
import { ChaiPrinter } from '../chaiprinter';
import * as ts from 'typescript';

const print = (node: ts.ForStatement): string => {
    let res: string = '';
    if ((node.initializer! as any).declarations.length > 1) {
        res += 'auto '
            + (node.initializer! as any).declarations.map(
                (decl) => {
                    return ChaiPrinter.printNode(decl);
                }).filter((str) => str !== '').slice(1).join(';\nauto ');
        res += ';\n';
    }
    res += 'for (auto ';
    res += ChaiPrinter.printNode((node.initializer! as any).declarations[0]);
    res += '; ';
    res += ChaiPrinter.printNode(node.condition);
    res += '; ';
    res += ChaiPrinter.printNode(node.incrementor);
    res += ') {\n';
    res += ChaiPrinter.printNode(node.statement);
    res += '\n}';
    return res;
};

nodePrinters[ts.SyntaxKind.ForStatement] = print;
