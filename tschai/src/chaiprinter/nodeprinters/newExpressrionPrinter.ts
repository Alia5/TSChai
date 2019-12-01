import { nodePrinters } from './nodeprinter';
import * as ts from 'typescript';
import { ChaiPrinter } from '../chaiprinter';

const print = (node: ts.NewExpression, printer: ts.Printer, source: ts.SourceFile): string => {
    let res: string = ChaiPrinter.printNode(node.expression)+'(';
    if (node.arguments) {
        res += node.arguments.map((arg) => ChaiPrinter.printNode(arg)).join(', ');
    }
    res += ')';
    return res;
};

nodePrinters[ts.SyntaxKind.NewExpression] = print;
