import { nodePrinters } from './nodeprinter';
import * as ts from 'typescript';

const print = (node: ts.Node): string => {
    return '';
};

nodePrinters[ts.SyntaxKind.EmptyStatement] = print;
nodePrinters[ts.SyntaxKind.InterfaceDeclaration] = print;
nodePrinters[ts.SyntaxKind.TypeAliasDeclaration] = print;
nodePrinters[ts.SyntaxKind.ImportDeclaration] = print;