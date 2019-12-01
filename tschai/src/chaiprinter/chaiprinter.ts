import * as ts from "typescript";
import nodePrinters from "./nodeprinters";

export interface ChaiNodePrinters {
    [syntaxKind: number]: (node: ts.Node|any, /* cannot get to work with generics... */
                            tsPrinter: ts.Printer,
                            source: ts.SourceFile) => string;
}

export namespace ChaiPrinter {

    let source: ts.SourceFile;
    let printer: ts.Printer;
    export const init = (source_: ts.SourceFile) => {
        source = source_;
        printer = ts.createPrinter({
            omitTrailingSemicolon: true,
            removeComments: true
        });
    };

    const invokeNodePrinter = (node: ts.Node): string => {
        return nodePrinters[node.kind](node, printer, source);
    }

    export const printNode = (node: ts.Node|undefined): string => {
        if (node) {
            if (nodePrinters[node.kind]) {
                return invokeNodePrinter(node);
            }
            return printer.printNode(ts.EmitHint.Unspecified, node, source);
        }
        return '';
    }
} 