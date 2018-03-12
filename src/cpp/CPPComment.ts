import CPPFormatter from './CPPFormatter';
import ILanguageComment from '../ILanguageComment';

export default class CPPComment implements ILanguageComment {
    private body: string[];

    constructor(body: string | string[], private blockType: boolean) {
        if (body instanceof Array) {
            this.body = body;
        } else {
            this.body = [body];
        }
    }

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
                _line += ` * ${element}`;
            } else {
                _line += `// ${element}`;
            }

            output += `${_line.replace(/\s+$/, '')}\n`;
        }

        if (this.blockType) {
            output += `${indent} */`;
        }

        return output.replace(/[\s|\n]*$/g, '');
    }
}
