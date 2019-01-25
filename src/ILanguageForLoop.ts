import ILanguageWritable from './ILanguageWritable';

export default interface ILanguageForLoop {
}

declare var ILanguageForLoop: {
    new (
        start: number,
        end: number,
        increment: boolean,
        body: ILanguageWritable[]
    ): ILanguageForLoop;
};
