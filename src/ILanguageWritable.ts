import ILanguageFormatter from './ILanguageFormatter';

export default interface ILanguageWritable {
    write(formatter: ILanguageFormatter, indentCount: number): string;
};
