import IFormatOptions from '../IFormatOptions';
import ILanguageFormatter from '../ILanguageFormatter';

export default class CPPFormatter implements ILanguageFormatter {
    readonly indentation: string;
    public options: IFormatOptions;

    constructor(options?: IFormatOptions) {
        if (!options) {
            this.options = {
                indentWithSpaces: true,
                bracesOnNewLine: true
            };
        } else {
            this.options = options;
        }

        this.indentation = this.options.indentWithSpaces ? ' '.repeat(this.options.indentSpaceCount || 4) : '\t';

        if (this.options.bracesOnNewLine == null) {
            this.options.bracesOnNewLine = true;
        }

        // Set language wide defaults
        this.options.bracesExist = true;
    }
}
