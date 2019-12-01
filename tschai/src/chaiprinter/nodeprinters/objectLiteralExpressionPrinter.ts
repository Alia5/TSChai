import { nodePrinters } from './nodeprinter';
import * as ts from 'typescript';
import { ChaiPrinter } from '../chaiprinter';

const print = (node: ts.ObjectLiteralExpression, printer: ts.Printer, source: ts.SourceFile): string => {
    let res: string = '[ ';
    res += node.properties.map((prop) => {
        return '"' + (prop.name as ts.Identifier).text + '":'
            + ChaiPrinter.printNode((prop as ts.PropertyAssignment).initializer);
    }).join(', ');
    res += ' ]';
    return res;
};

nodePrinters[ts.SyntaxKind.ObjectLiteralExpression] = print;
