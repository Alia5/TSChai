import { nodePrinters } from './nodeprinter';
import * as ts from 'typescript';
import { ChaiPrinter } from '../chaiprinter';

const print = (node: ts.Block, printer: ts.Printer, source: ts.SourceFile): string => {
    let res: string = '    ' + node.statements
    .map((child) => ChaiPrinter.printNode(child))
    .filter((str) => str.length > 0)
    .join('\n').replace(/\n/g, '    \n');
    return res;
};

nodePrinters[ts.SyntaxKind.Block] = print;
