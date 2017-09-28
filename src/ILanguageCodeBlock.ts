interface ILanguageCodeBlock extends IWritable {

}

declare var ILanguageCodeBlock: {
    new(signature: string, body: IWritable[]): ILanguageCodeBlock;
}
