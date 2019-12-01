import { nodePrinters } from './nodeprinter';
import * as ts from 'typescript';
import { ChaiPrinter } from '../chaiprinter';

const print = (node: ts.BinaryExpression, printer: ts.Printer, source: ts.SourceFile): string => {
    return ChaiPrinter.printNode(node.left)
    + ' ' + ChaiPrinter.printNode(node.operatorToken)
    + ' ' + ChaiPrinter.printNode(node.right);
};

nodePrinters[ts.SyntaxKind.BinaryExpression] = print;
