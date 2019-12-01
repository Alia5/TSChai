import { nodePrinters } from './nodeprinter';
import * as ts from 'typescript';

const print = (node: ts.Node): string => {
    return '';
};

nodePrinters[ts.SyntaxKind.EmptyStatement] = print;
