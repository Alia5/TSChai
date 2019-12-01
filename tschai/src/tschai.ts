#!/usr/bin/env node

import * as ts from 'typescript';
import { writeFileSync, readFileSync, existsSync, readdirSync, fstat, mkdirSync } from 'fs';
import { ChaiPrinter } from './chaiprinter/chaiprinter';
import { resolve, basename } from 'path';
import { isArray } from 'util';
const glob = require('glob');

const readConfig = () => {
    const filePath = resolve('./tsconfig.json');
    if (!existsSync(filePath)) {
        console.error('tsconfig.json not found');
        process.exit(1);
    }
    return JSON.parse(readFileSync(filePath).toString());
};

const getSourceFileList = (config: any) => {
    const rootDir = config.compilerOptions.rootDir ? resolve(config.compilerOptions.rootDir) : undefined;
    const includeList = (() => {
        if (config.include) {
            if (isArray(config.include)) {
                let res: string[] = [];
                (config.include as string[]).forEach((incl) => {
                     res = [...res, ...glob.sync(incl)];
                    });
                return res;
            }
            return glob.sync(config.include);
        }
        return undefined;
    })();
    const excludeList = (() => {
        if (config.exclude) {
            if (isArray(config.exclude)) {
                let res: string[] = [];
                (config.exclude as string[]).forEach((excl) => {
                     res = [...res, ...glob.sync(excl)];
                    });
                return res;
            }
            return glob.sync(config.exclude);
        }
        return undefined;
    })();
    if (includeList) {
        if (excludeList) {
            return includeList.filter((incl) => !excludeList.includes(incl));
        }
        return includeList;
    }
    if (rootDir) {
        return readdirSync(rootDir);
    }
    if (config.files) {
        return config.files;
    }
    return [];
};

function main() {
    const config = readConfig();
    const files = getSourceFileList(config);
    const program = ts.createProgram(files, {});

    files.forEach((fileName) => {
        const source = program.getSourceFile(fileName);
        if (source) {

            // const consoleLogTransFormer = <T extends ts.Node>(): ts.TransformerFactory<T> => {
            //     return (context) => {
            //         const visit: ts.Visitor = (node) => {
            //             if (ts.isCallExpression(node)) {
            //                 if (node.expression.getText(source) === 'console.log') {
            //                     return ts.createCall(
            //                             ts.createIdentifier('print'),
            //                             undefined,
            //                             node.arguments
            //                         );
            //                 }
            //                 return node;
            //             }
            //             return ts.visitEachChild(node, (child) => visit(child), context);
            //         };

            //         return (node) => ts.visitNode(node, visit);
            //     };
            // };

            ChaiPrinter.init(source, config);
            const transRes = ts.transform(source,[ /*consoleLogTransFormer() */]);
            const transpiled: string[] = [];
            transRes.transformed[0].forEachChild((node) => {
                const res = ChaiPrinter.printNode(node);
                if (res.length > 0) {
                    //console.log(res);
                    transpiled.push(res);
                }
            });
            const outDir = config.compilerOptions.outDir ? config.compilerOptions.outDir : 'dist';
            if (!existsSync(resolve(outDir))) {
                mkdirSync(resolve(outDir));
            }
            writeFileSync(
                resolve( outDir + '/' + basename(fileName).replace(/\.(?:.(?!\.))+$/g, '') + '.chai'),
                transpiled.join('\n'));
        }
    });
}
main();
