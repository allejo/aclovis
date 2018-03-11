import IWritable from './ILanguageWritable';

export default interface ILanguageComment extends IWritable {
    appendBody(body: string | string[]): void;
};

declare var ILanguageComment: {
    new (body: string[], blockType: boolean): ILanguageComment;
};
