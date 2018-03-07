/// <reference path="ILanguageFormatter.ts" />
/// <reference path="IFormatOptions.ts" />

export class CPPFormatter implements ILanguageFormatter {
    readonly indentation: string;

    constructor(public options: IFormatOptions) {
        this.indentation = this.options.indentWithSpaces ? ' '.repeat(this.options.indentSpaceCount) : '\t';

        // Set language wide defaults
        options.bracesExist = true;
    }
}
