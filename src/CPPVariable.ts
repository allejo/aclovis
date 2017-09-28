/// <reference path="ILanguageVariable.ts" />

import { CPPFormatter } from './CPPFormatter';

export class CPPVariable implements ILanguageVariable {
    constructor(private dataType: string, private variableName: string, private variableValue?: any) {}

    getDataType(): string {
        return this.dataType;
    }
    setDataType(value: string): this {
        this.dataType = value;
        return this;
    }

    getVariableName(): string {
        return this.variableName;
    }
    setVariableName(value: string): this {
        this.variableName = value;
        return this;
    }

    getVariableValue(): any {
        return this.variableValue;
    }
    setVariableValue(value: any): this {
        this.variableValue = value;
        return this;
    }

    write(formatter: CPPFormatter, indentCount: number = 0): string {
        let output = `${this.dataType} ${this.variableName}`;

        if (this.variableValue) {
            output += ` = ${this.variableValue}`;
        }

        output += ';'

        if (indentCount > 0) {
            output = formatter.indentation.repeat(indentCount) + output;
        }

        return output;
    }

    static createString(name: string, value: string = null) : CPPVariable {
        if (value === null) {
            return (new CPPVariable('std::string', name));
        }

        return (new CPPVariable('std::string', name, `"${value}"`));
    }
}
