import { nodePrinters } from './nodeprinter';
import { ChaiPrinter } from '../chaiprinter';
import * as ts from 'typescript';

const print = (node: ts.ForInStatement | ts.ForOfStatement): string => {
    let res: string = 'for (auto '
    + ChaiPrinter.printNode((node.initializer as any).declarations[0])
    + ' : '
    + ChaiPrinter.printNode(node.expression) + ') {\n';
    res += ChaiPrinter.printNode(node.statement);
    res += '\n}';
    return res;
};

nodePrinters[ts.SyntaxKind.ForInStatement] = print;
nodePrinters[ts.SyntaxKind.ForOfStatement] = print;
