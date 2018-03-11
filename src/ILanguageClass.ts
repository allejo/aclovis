import IWritable from './ILanguageWritable';

export default interface ILanguageClass extends IWritable {
    getClassName(): string;
};

declare var ILanguageClass: {
    new (name: string): ILanguageClass;
};
