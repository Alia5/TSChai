import { nodePrinters } from './nodeprinter';
import * as ts from 'typescript';
import { ChaiPrinter } from '../chaiprinter';

const print = (node: ts.TemplateExpression, printer: ts.Printer, source: ts.SourceFile): string => {
    const printRes = printer.printNode(ts.EmitHint.Unspecified, node, source);
    return printRes
        .replace(/\"/g, '\\"')
        .replace(/^`/g, '"')
        .replace(/`$/g, '"');
};

nodePrinters[ts.SyntaxKind.TemplateExpression] = print;
