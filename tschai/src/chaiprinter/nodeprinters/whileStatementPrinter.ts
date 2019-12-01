import { nodePrinters } from './nodeprinter';
import { ChaiPrinter } from '../chaiprinter';
import * as ts from 'typescript';

const print = (node: ts.WhileStatement): string => {
    let res: string = 'while (' + ChaiPrinter.printNode(node.expression) + ') {\n';
    res += ChaiPrinter.printNode(node.statement);
    res += '\n}';
    return res;
};

nodePrinters[ts.SyntaxKind.WhileStatement] = print;
