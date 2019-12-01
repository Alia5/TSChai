import { nodePrinters } from './nodeprinter';
import * as ts from 'typescript';
import { ChaiPrinter } from '../chaiprinter';

const print = (node: ts.ReturnStatement, printer: ts.Printer, source: ts.SourceFile): string => {
    return 'return ' + ChaiPrinter.printNode(node.expression) + ';';

};

nodePrinters[ts.SyntaxKind.ReturnStatement] = print;
