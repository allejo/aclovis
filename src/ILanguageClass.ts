export default interface ILanguageClass {
    getClassName(): string;
};

declare var ILanguageClass: {
    new (name: string): ILanguageClass;
};
