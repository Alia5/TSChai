import { nodePrinters } from './nodeprinter';
import { ChaiPrinter } from '../chaiprinter';
import * as ts from 'typescript';

const print = (node: ts.FunctionDeclaration): string => {
    let res: string = 'def ' + node.name!.text + '(';
    if (node.parameters) {
        res += node.parameters.map((param) => (param.name as ts.Identifier).text).join(', ');
    }
    res += ')';
    res += ' {\n';
    if (node.body) {
        res += ChaiPrinter.printNode(node.body);
    }
    res += '\n}';
    return res;
};

nodePrinters[ts.SyntaxKind.FunctionDeclaration] = print;
nodePrinters[ts.SyntaxKind.MethodDeclaration] = print;
