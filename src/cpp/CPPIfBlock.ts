import CPPCodeBlock from './CPPCodeBlock';
import CPPFormatter from './CPPFormatter';
import CPPWritable from './CPPWritable';
import ILanguageIfBlock from '../ILanguageIfBlock';

export default class CPPIfBlock implements CPPWritable, ILanguageIfBlock {
    conditions: { [condition: string]: CPPWritable[] } = {};
    elseCondition: CPPWritable[] = [];

    constructor() {}

    defineCondition(condition: string, body: CPPWritable[]): this {
        this.conditions[condition] = body;

        return this;
    }

    defineElseCondition(body: CPPWritable[]): this {
        this.elseCondition = body;

        return this;
    }

    write(formatter: CPPFormatter, indentCount: number = 0): string {
        if (Object.keys(this.conditions).length == 0) {
            return '';
        }

        let ifBlocks: CPPCodeBlock[] = [];
        let first: boolean = true;

        for (let condition in this.conditions) {
            let signature = `if (${condition})`;

            if (!first) {
                signature = 'else ' + signature;
            }

            ifBlocks.push(new CPPCodeBlock(signature, this.conditions[condition]));
            first = false;
        }

        if (this.elseCondition.length > 0) {
            ifBlocks.push(new CPPCodeBlock('else', this.elseCondition));
        }

        let output: string = '';

        ifBlocks.forEach(element => {
            output += element.write(formatter, indentCount) + '\n';
        });

        return output.replace(/[\s\n]*$/g, '');
    }
}
