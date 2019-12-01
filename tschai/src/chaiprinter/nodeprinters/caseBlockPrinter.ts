import { nodePrinters } from './nodeprinter';
import * as ts from 'typescript';
import { ChaiPrinter } from '../chaiprinter';
const print = (node: ts.CaseBlock, printer: ts.Printer, source: ts.SourceFile): string => {
    let res: string = '';
    res += node.clauses.map((clause) => {
        let clRes = '';
        if (clause.kind === ts.SyntaxKind.CaseClause) {
            clRes += '    case (' + ChaiPrinter.printNode(clause.expression) + ')';
        }
        if (clause.kind === ts.SyntaxKind.DefaultClause) {
            clRes += '    default ';
        }
        if (clause.statements) {
            clRes += ' {\n    ';
            clRes += '    '+ clause.statements
            .map((child) => ChaiPrinter.printNode(child))
            .filter((str) => str.length > 0)
            .join('\n').replace(/\n/g, '\n        ');
            if (!clRes.endsWith(';')) {
                clRes += ';';
            }
            clRes += '\n    }';
        } else {
            clRes += '{ }';
        }
        return clRes;
    }).join('\n') + '\n';
    return res;
};

nodePrinters[ts.SyntaxKind.CaseBlock] = print;
