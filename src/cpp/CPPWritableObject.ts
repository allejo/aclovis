import CPPFormatter from './CPPFormatter';
import CPPWritable from './CPPWritable';

export default class CPPWritableObject implements CPPWritable {
    constructor(readonly content: string) {}

    write(formatter: CPPFormatter, indentCount: number = 0): string {
        const indent = formatter.indentation.repeat(indentCount);

        return indent + this.content;
    }
}
