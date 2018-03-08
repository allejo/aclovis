import IWritable from './IWritable';

export default interface ILanguageIfBlock extends IWritable {
    defineCondition(condition: string, body: IWritable[]): this;
    defineElseCondition(body: IWritable[]): this;
};

declare var ILanguageIfBlock: {
    new (): ILanguageIfBlock;
};
