import IWritable from './ILanguageWritable';

export default interface ILanguageCodeBlock extends IWritable {};

declare var ILanguageCodeBlock: {
    new (signature: string, body: IWritable[]): ILanguageCodeBlock;
};
