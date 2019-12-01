import { nodePrinters } from './nodeprinter';
import * as ts from 'typescript';
import { ChaiPrinter } from '../chaiprinter';
const print = (node: ts.SwitchStatement, printer: ts.Printer, source: ts.SourceFile): string => {
    let res: string = 'switch (' + ChaiPrinter.printNode(node.expression) + ') {\n';
    res += ChaiPrinter.printNode(node.caseBlock);
    res += '}';
    return res;
};

nodePrinters[ts.SyntaxKind.SwitchStatement] = print;
