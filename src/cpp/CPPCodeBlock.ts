import CPPFormatter from './CPPFormatter';
import ILanguageCodeBlock from '../ILanguageCodeBlock';
import IWritable from '../IWritable';

export default class CPPCodeBlock implements ILanguageCodeBlock {
    constructor(readonly signature: string, public body: IWritable[] = []) {}

    write(formatter: CPPFormatter, indentCount: number = 0): string {
        const indent = formatter.indentation.repeat(indentCount);
        let output = indent + this.signature;
        output += (formatter.options.bracesOnNewLine ? '\n' + indent : ' ') + '{\n';

        for (let element of this.body) {
            let bodyIndent = indentCount + 1;

            output += element.write(formatter, bodyIndent) + '\n';
        }

        output += indent + '}';

        return output;
    }
}
