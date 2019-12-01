import { nodePrinters } from './nodeprinter';
import * as ts from 'typescript';
import { ChaiPrinter } from '../chaiprinter';

const print = (node: ts.ArrayLiteralExpression, printer: ts.Printer, source: ts.SourceFile): string => {
    let res: string = '[ '
    res += node.elements.map((elem) => {
        return ChaiPrinter.printNode(elem);
    }).join(', ');
    res += ' ]'
    return res;
};

nodePrinters[ts.SyntaxKind.ArrayLiteralExpression] = print;
