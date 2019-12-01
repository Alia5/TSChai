import { nodePrinters } from './nodeprinter';
import * as ts from 'typescript';
import { ChaiPrinter } from '../chaiprinter';
const print = (node: ts.ModuleDeclaration, printer: ts.Printer, source: ts.SourceFile): string => {
    const namespaceName = (node.name as ts.Identifier).text;
    let res: string = 'namespace("' + namespaceName + '");\n';
    if (node.body && (node.body as ts.ModuleBlock).statements) {
        res += (node.body as ts.ModuleBlock).statements.map((statement) => {
            let stRes = namespaceName + '.';
            const statePrintRes = ChaiPrinter.printNode(statement);
            if (statePrintRes.startsWith('auto ')) {
                stRes += statePrintRes.replace('auto ', '');
            } else if (statePrintRes.startsWith('def ')) {
                stRes += statePrintRes.replace('def ', '').replace('(', ' = fun(');
            }
            return stRes;
        }).join('\n');
    }
    return res;
};

nodePrinters[ts.SyntaxKind.ModuleDeclaration] = print;
