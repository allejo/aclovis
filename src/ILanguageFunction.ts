import ILanguageClass from './ILanguageClass';
import ILanguageVariable from './ILanguageVariable';
import IWritable from './IWritable';

export default interface ILanguageFunction extends IWritable {
    getParentClass(): ILanguageClass | null;
    setParentClass(parentClass: ILanguageClass, visibility?: any): void;

    getSignature(): string;
};

declare var ILanguageFunction: {
    new (returnType: string, functionName: string, parameters?: ILanguageVariable[]): ILanguageFunction;
};
