import { nodePrinters } from './nodeprinter';
import * as ts from 'typescript';

const print = (node: ts.StringLiteral, printer: ts.Printer, source: ts.SourceFile): string => {
    const printRes = printer.printNode(ts.EmitHint.Unspecified, node, source);
    if (printRes.startsWith("'")) {
        return printRes
            .replace(/\"/g, '\\"') 
            .replace(/^'/g, '"')
            .replace(/'$/g, '"')
    }
    return printRes;
};

nodePrinters[ts.SyntaxKind.StringLiteral] = print;
