import IFormatOptions from './IFormatOptions';
import ILanguageFormatter from './ILanguageFormatter';

export default class CPPFormatter implements ILanguageFormatter {
    readonly indentation: string;

    constructor(public options: IFormatOptions) {
        this.indentation = options.indentWithSpaces ? ' '.repeat(options.indentSpaceCount) : '\t';

        // Set language wide defaults
        this.options.bracesExist = true;
    }
}
