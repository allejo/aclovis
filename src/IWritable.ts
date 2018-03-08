import ILanguageFormatter from './ILanguageFormatter';

export default interface IWritable {
    write(formatter: ILanguageFormatter, indentCount: number): string;
};
