import ILanguageClass from './ILanguageClass';
import ILanguageVariable from './ILanguageVariable';

export default interface ILanguageFunction {
    getParentClass(): ILanguageClass | null;
    setParentClass(parentClass: ILanguageClass, visibility?: any): void;

    getSignature(): string;
};

declare var ILanguageFunction: {
    new (returnType: string, functionName: string, parameters: ILanguageVariable[]): ILanguageFunction;
};
