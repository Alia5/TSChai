import { nodePrinters } from './nodeprinter';
import * as ts from 'typescript';
import { ChaiPrinter } from '../chaiprinter';

const print = (node: ts.Node, printer: ts.Printer, source: ts.SourceFile): string => {
    return '!=';
};

nodePrinters[ts.SyntaxKind.ExclamationEqualsEqualsToken] = print;
