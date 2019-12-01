import * as ts from 'typescript';
import { writeFileSync } from 'fs';
import { ChaiPrinter } from './chaiprinter/chaiprinter';
import { resolve } from 'path';

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

                return (node) => ts.visitNode(node, visit);
            };
        };

        ChaiPrinter.init(source);
        const transRes = ts.transform(source,[consoleLogTransFormer()]);
        const transpiled: string[] = [];
        transRes.transformed[0].forEachChild((node) => {
            const res = ChaiPrinter.printNode(node);
            if (res.length > 0) {
                console.log(res);
                transpiled.push(res);
            }
        });
        writeFileSync(resolve('../testFiles/out/testFile.chai'), transpiled.join('\n'));

    }
}
main();
