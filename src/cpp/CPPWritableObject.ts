import CPPFormatter from './CPPFormatter';
import ILanguageWritable from '../ILanguageWritable';

export default class CPPWritableObject implements ILanguageWritable {
    constructor(readonly content: string) {}

    write(formatter: CPPFormatter, indentCount: number = 0): string {
        const indent = formatter.indentation.repeat(indentCount);

        return indent + this.content;
    }
}
