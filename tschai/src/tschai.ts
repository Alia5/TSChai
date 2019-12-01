import * as ts from "typescript";
import { writeFileSync } from "fs";
import { ChaiPrinter } from "./chaiprinter/chaiprinter";
import { resolve } from "path";

function main() {
    // hardcode our input file
    const filePath = resolve('../testFiles/testFile.ts');

    // create a program instance, which is a collection of source files
    // in this case we only have one source file
    const program = ts.createProgram([filePath], {});

    // get our models.ts source file AST
    const source = program.getSourceFile(filePath);
    if (source) {

        const consoleLogTransFormer = <T extends ts.Node>(): ts.TransformerFactory<T> => {
            return (context) => {
                const visit: ts.Visitor = (node) => {
                    if (ts.isCallExpression(node)) {
                        if (node.expression.getText(source) === 'console.log') {                            
                            return ts.createCall(
                                    ts.createIdentifier('print'),
                                    undefined,
                                    node.arguments
                                );
                        }
                        return node;
                    }
                    return ts.visitEachChild(node, (child) => visit(child), context);
                };
            
                return node => ts.visitNode(node, visit);
            };
        };

        ChaiPrinter.init(source);
        const transRes = ts.transform(source,[consoleLogTransFormer()]);

        transRes.transformed[0].forEachChild((node) => {
            //console.log(syntaxToKind(node.kind));
            const transpiled = ChaiPrinter.printNode(node);
            if (transpiled.length > 0) {
                console.log(transpiled);
                writeFileSync(resolve('../testFiles/out/testFile.chai'), transpiled);
            }
            //console.log(printer.printNode(ts.EmitHint.Unspecified, transRes.transformed[0], source));
        });
    }
}
main();