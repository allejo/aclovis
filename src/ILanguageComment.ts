export default interface ILanguageComment {
    appendBody(body: string | string[]): void;
};

declare var ILanguageComment: {
    new (body: string[], blockType: boolean): ILanguageComment;
};
