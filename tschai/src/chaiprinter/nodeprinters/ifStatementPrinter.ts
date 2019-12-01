import { nodePrinters } from './nodeprinter';
import * as ts from 'typescript';
import { ChaiPrinter } from '../chaiprinter';

const print = (node: ts.IfStatement, printer: ts.Printer, source: ts.SourceFile): string => {
    let res: string = 'if (' + ChaiPrinter.printNode(node.expression) + ')';
    res += ' {\n'
    res += ChaiPrinter.printNode(node.thenStatement);
    res += '\n}';
    if (node.elseStatement && ts.isIfStatement(node.elseStatement)) {
        res += ' else ' + ChaiPrinter.printNode(node.elseStatement);
    } else if (node.elseStatement) {
        res += ' else {\n' + ChaiPrinter.printNode(node.elseStatement) + '\n}'; 
    } else {
        res += '\n';
    }
    return res;
};

nodePrinters[ts.SyntaxKind.IfStatement] = print;
