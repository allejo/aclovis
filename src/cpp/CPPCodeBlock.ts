import CPPFormatter from './CPPFormatter';
import ILanguageCodeBlock from '../ILanguageCodeBlock';
import ILanguageWritable from '../ILanguageWritable';

export default class CPPCodeBlock implements ILanguageCodeBlock {
    private disableBraces: boolean = false;
    private suffix: string[] = [];

    constructor(readonly signature: string, public body: ILanguageWritable[] = []) {}

    setDisableBraces(disable: boolean) {
        this.disableBraces = disable;
    }

    setSuffix(suffix: string | string[]) {
        if (suffix instanceof Array) {
            this.suffix = suffix;
        } else {
            this.suffix = suffix.split('\n');
        }
    }

    write(formatter: CPPFormatter, indentCount: number = 0): string {
        const indent = formatter.indentation.repeat(indentCount);
        let output = indent + this.signature;
        output += (formatter.options.bracesOnNewLine ? '\n' + indent : ' ');

        if (!this.disableBraces) {
            output += '{\n';
        } else {
            output = output.replace(/\s*$/, '');
        }

        for (let element of this.body) {
            let bodyIndent = indentCount + 1;

            output += element.write(formatter, bodyIndent).replace(/\s*$/, '') + '\n';
        }

        if (!this.disableBraces) {
            output += indent + '}';
        }

        if (this.suffix.length > 0) {
            output += this.suffix[0];

            let rest = this.suffix.splice(1, this.suffix.length - 1);
            rest.forEach(function(value) {
                output += `\n${indent}${value}`;
            });
        }

        return output;
    }
}
