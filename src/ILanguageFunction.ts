interface ILanguageFunction extends IWritable {
    getParentClass(): ILanguageClass;
    setParentClass(parentClass: ILanguageClass): void;

    getSignature(): string;
}

declare var ILanguageFunction: {
    new(returnType: string, functionName: string, parameters?: ILanguageVariable[]): ILanguageFunction
}
