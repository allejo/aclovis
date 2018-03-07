/// <reference path="./ILanguageComment.ts" />

import { CPPFormatter } from './CPPFormatter';

export class CPPComment implements ILanguageComment {
    constructor(private body: string[], private blockType: boolean) {}

    appendBody(body: string | string[]): void {
        if (body instanceof Array) {
            this.body = this.body.concat(body);
        } else {
            this.body.push(body);
        }
    }

    write(formatter: CPPFormatter, indentCount: number = 0): string {
        const indent = formatter.indentation.repeat(indentCount);
        let output = '';

        if (this.blockType) {
            output += `${indent}/*\n`;
        }

        for (let element of this.body) {
            let _line = `${indent}`;

            if (this.blockType) {
                _line = ` * ${element}`;
            } else {
                _line = `// ${element}`;
            }

            output += `${_line.replace(/\s+$/, '')}\n`;
        }

        if (this.blockType) {
            output += `${indent} */`;
        }

        return output.trim();
    }
}
