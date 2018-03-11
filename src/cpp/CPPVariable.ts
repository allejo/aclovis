import CPPFormatter from './CPPFormatter';
import CPPWritableObject from './CPPWritableObject';
import ILanguageVariable from '../ILanguageVariable';

export default class CPPVariable implements ILanguageVariable {
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

        output += ';';

        if (indentCount > 0) {
            output = formatter.indentation.repeat(indentCount) + output;
        }

        return output;
    }

    static createBoolean(name: string, value?: boolean | CPPVariable | CPPWritableObject): CPPVariable {
        return this.createVariable('bool', name, value, value ? 'true' : 'false');
    }

    static createInt(name: string, value?: number | CPPVariable | CPPWritableObject): CPPVariable {
        return this.createVariable('int', name, value);
    }

    static createDouble(name: string, value?: number | CPPVariable | CPPWritableObject): CPPVariable {
        return this.createVariable('double', name, value);
    }

    static createFloat(name: string, value?: number | CPPVariable | CPPWritableObject): CPPVariable {
        return this.createVariable('float', name, value);
    }

    static createConstChar(name: string, value?: string | CPPVariable | CPPWritableObject): CPPVariable {
        return this.createVariable('const char*', name, value, `"${value}"`);
    }

    static createString(name: string, value?: string | CPPVariable | CPPWritableObject): CPPVariable {
        return this.createVariable('std::string', name, value, `"${value}"`);
    }

    private static createVariable(type: string, name: string, rawValue?: any, literalValue?: any) {
        let evaluatedValue: string | null = null;

        if (rawValue == null) {
            return new CPPVariable(type, name);
        } else if (rawValue instanceof CPPVariable) {
            evaluatedValue = rawValue.getVariableName();
        } else if (rawValue instanceof CPPWritableObject) {
            evaluatedValue = rawValue.write(new CPPFormatter());

            // Remove a trailing ';' if there is one
            evaluatedValue = evaluatedValue.replace(/;$/, '');
        }

        return new CPPVariable(type, name, evaluatedValue || literalValue || rawValue);
    }
}
