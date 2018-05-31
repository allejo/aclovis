import IWritable from './ILanguageWritable';

export default interface ILanguageIfBlock {
    defineCondition(condition: string, body: IWritable[]): this;
    defineElseCondition(body: IWritable[]): this;
};

declare var ILanguageIfBlock: {
    new (): ILanguageIfBlock;
};
