import { nodePrinters } from './nodeprinter';
import { ChaiPrinter } from './../chaiprinter';
import * as ts from 'typescript';

const print = (node: ts.VariableStatement, printer: ts.Printer, source: ts.SourceFile): string => {
    let res =
    printer.printNode(ts.EmitHint.Unspecified, node, source).startsWith('var')
        ? 'global '
        : 'auto ';
    const declaration0 = node.declarationList.declarations[0]
    res += (declaration0.name as ts.Identifier).escapedText;
    if (declaration0.initializer) {
        res +=
            ' = '
            + ChaiPrinter.printNode(declaration0.initializer);
    }
    res += ';';
    return res;
};

nodePrinters[ts.SyntaxKind.VariableStatement] = print;
