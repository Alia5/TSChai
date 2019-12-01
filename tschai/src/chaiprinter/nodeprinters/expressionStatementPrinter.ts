import { nodePrinters } from './nodeprinter';
import * as ts from 'typescript';
import { ChaiPrinter } from '../chaiprinter';

const print = (node: ts.ExpressionStatement, printer: ts.Printer, source: ts.SourceFile): string => {
    if (ts.isCallExpression(node.expression)) {
        let res: string = '' 
        if (ts.isIdentifier(node.expression.expression)) {
            res += (node.expression.expression as ts.Identifier).text;
        } else {
            res += ChaiPrinter.printNode(node.expression.expression);
        }
        res+= '('
        + node.expression.arguments
            .map((param) => ChaiPrinter.printNode(param))
            .join(', ')
        + ');';
        return res;
    }
    return printer.printNode(ts.EmitHint.Unspecified, node, source);
};

nodePrinters[ts.SyntaxKind.ExpressionStatement] = print;
