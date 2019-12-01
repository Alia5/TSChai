import { nodePrinters } from './nodeprinter';
import * as ts from 'typescript';
import { ChaiPrinter } from '../chaiprinter';

const print = (node: ts.PropertyDeclaration, printer: ts.Printer, source: ts.SourceFile): string => {
    let res: string = 'auto ' + (node.name as ts.Identifier).text;
    if (node.initializer) {
        res += ' = ' + ChaiPrinter.printNode(node.initializer);
    }
    res += ';';
    return res;
};

nodePrinters[ts.SyntaxKind.PropertyDeclaration] = print;
