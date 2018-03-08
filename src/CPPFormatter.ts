import IFormatOptions from './IFormatOptions';
import ILanguageFormatter from './ILanguageFormatter';

export default class CPPFormatter implements ILanguageFormatter {
    readonly indentation: string;

    constructor(public options: IFormatOptions) {
        this.indentation = this.options.indentWithSpaces ? ' '.repeat(this.options.indentSpaceCount) : '\t';

        // Set language wide defaults
        options.bracesExist = true;
    }
}
