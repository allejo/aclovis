import ILanguageWritable from '../ILanguageWritable';
import CPPFormatter from './CPPFormatter';

export default interface CPPWritable extends ILanguageWritable {
    write(formatter: CPPFormatter, indentCount: number): string;
};
