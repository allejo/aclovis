import ILanguageForLoop from '../ILanguageForLoop';
import CPPCodeBlock from './CPPCodeBlock';
import CPPFormatter from './CPPFormatter';
import CPPWritable from './CPPWritable';

export default class CPPForLoop implements CPPWritable, ILanguageForLoop {
    public unsigned: boolean = false;

    constructor(
        readonly start: number,
        readonly end: number,
        readonly increment: boolean,
        public body: CPPWritable[] = []
    ) {}

    write(formatter: CPPFormatter, indentCount: number = 0): string {
        const block = new CPPCodeBlock(
            this.createSignature(),
            this.body
        );

        return block.write(formatter, indentCount);
    }

    private createSignature(): string {
        let start = `int i = ${this.increment ? 0 : this.end}`;

        if (this.unsigned) {
            start = 'unsigned ' + start;
        }

        const condition = this.increment ? `i < ${this.end}` : `i > ${this.start}`;
        const post = this.increment ? 'i++' : 'i--';

        return `for (${start}; ${condition}; ${post})`;
    }
}
