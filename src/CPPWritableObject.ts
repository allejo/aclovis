import CPPFormatter from './CPPFormatter';
import IWritable from './IWritable';

export default class CPPWritableObject implements IWritable {
    constructor(readonly content: string) {}

    write(formatter: CPPFormatter, indentCount: number = 0): string {
        const indent = formatter.indentation.repeat(indentCount);

        return indent + this.content;
    }
}
