import CPPCodeBlock from './CPPCodeBlock';
import ILanguageCodeBlock from '../ILanguageCodeBlock';
import ILanguageFormatter from '../ILanguageFormatter';
import ILanguageIfBlock from '../ILanguageIfBlock';
import IWritable from '../IWritable';

export default class CPPIfBlock implements ILanguageIfBlock {
    conditions: { [condition: string]: IWritable[] } = {};
    elseCondition: IWritable[] = [];

    constructor() {}

    defineCondition(condition: string, body: IWritable[]): this {
        this.conditions[condition] = body;

        return this;
    }

    defineElseCondition(body: IWritable[]): this {
        this.elseCondition = body;

        return this;
    }

    write(formatter: ILanguageFormatter, indentCount: number = 0): string {
        if (Object.keys(this.conditions).length == 0) {
            return '';
        }

        let ifBlocks: ILanguageCodeBlock[] = [];
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
            output += element.write(formatter, indentCount) + '\n' + formatter.indentation.repeat(indentCount);
        });

        return output.trim();
    }
}
