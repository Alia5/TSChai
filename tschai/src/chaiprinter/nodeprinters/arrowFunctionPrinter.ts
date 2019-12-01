import { nodePrinters } from './nodeprinter';
import * as ts from 'typescript';
import { ChaiPrinter } from '../chaiprinter';

const print = (node: ts.ArrowFunction, printer: ts.Printer, source: ts.SourceFile): string => {
    let res: string = 'fun'
    if (node.typeParameters) {
        res += '['
        + node.typeParameters
            .map((param) => (param.name as ts.Identifier).text)
            .join(', ')
        + ']'
    }
    res += '('
        + node.parameters.map((param) => (param.name as ts.Identifier).text).join(', ')
        + ')';
    if ((node.body as ts.FunctionBody).statements) {
        res += ' {\n'
        res += ChaiPrinter.printNode(node.body);
        res += '\n}'
    } else {
        res += '{ return ' + (node.body as ts.Identifier).text + '; }';
    }
    return res;
};

nodePrinters[ts.SyntaxKind.ArrowFunction] = print;
