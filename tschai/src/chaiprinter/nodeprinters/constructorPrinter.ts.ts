import { nodePrinters } from './nodeprinter';
import * as ts from 'typescript';
import { ChaiPrinter } from '../chaiprinter';
                     // wtf ⬇️
const print = (node: ts.ConstructorDeclaration, printer: ts.Printer, source: ts.SourceFile): string => {
    let res: string = 'def ' + (node.parent.name as ts.Identifier).text + '(';
    if (node.parameters) {
        res += node.parameters.map((param) => (param.name as ts.Identifier).text).join(', ');
    }
    res += ') {\n';
    if (node.body) {
        res += ChaiPrinter.printNode(node.body);
    }
    res += '\n}';
    return res;
};

nodePrinters[ts.SyntaxKind.Constructor] = print;
            // typescript-devs ⬆️
