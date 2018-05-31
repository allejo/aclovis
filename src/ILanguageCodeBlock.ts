import IWritable from './ILanguageWritable';

export default interface ILanguageCodeBlock {};

declare var ILanguageCodeBlock: {
    new (signature: string, body: IWritable[]): ILanguageCodeBlock;
};
