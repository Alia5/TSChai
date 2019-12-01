import { nodePrinters } from './nodeprinter';
import * as ts from 'typescript';
import { ChaiPrinter } from '../chaiprinter';

const print = (node: ts.ClassDeclaration, printer: ts.Printer, source: ts.SourceFile): string => {
    let res: string = 'class ' + (node.name as ts.Identifier).text + ' {\n    ';
    if (node.members) {
        res += node.members.map((memb) => {
            if (memb.kind === ts.SyntaxKind.Constructor) {
                memb.parent = node;
            }
            return ChaiPrinter.printNode(memb);
        }).join('\n').replace(/\n/g, '\n    ');
    }
    res += '\n};';
    return res;
};

nodePrinters[ts.SyntaxKind.ClassDeclaration] = print;
