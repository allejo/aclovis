export interface ILanguageVariable extends IWritable {
    getDataType(): string;
    setDataType(value: string): this;

    getVariableName(): string;
    setVariableName(value: string): this;

    getVariableValue(): any;
    setVariableValue(value: any): this;
}

declare var ILanguageVariable: {
    new (dataType: string, variableName: string, variableValue?: any): ILanguageVariable;
};
