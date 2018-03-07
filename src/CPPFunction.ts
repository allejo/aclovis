import { CPPClass } from './CPPClass';
import { CPPVariable } from './CPPVariable';
import { CPPCodeBlock } from './CPPCodeBlock';
import { CPPFormatter } from './CPPFormatter';
import { CPPVisibility } from './CPPVisibility';
import { ILanguageFunction } from './ILanguageFunction';

export class CPPFunction implements ILanguageFunction {
    private parentClass: CPPClass = null;
    private body: IWritable[] = [];

    constructor(readonly returnType: string, readonly functionName: string, public parameters: CPPVariable[] = []) {}

    getSignature(): string {
        let output = this.returnType + ' ';

        if (this.parentClass !== null) {
            output += `${this.parentClass.getClassName()}::`;
        }

        let args: string[] = [];
        this.parameters.forEach(function(variable) {
            let param = variable.write(null);
            args.push(param.slice(0, -1));
        });

        output += `${this.functionName}(${args.join(', ')})`;

        return output;
    }

    implementFunction(body: IWritable[]): void {
        this.body = body;
    }

    appendFunction(body: IWritable | IWritable[]): void {
        if (body instanceof Array) {
            this.body = this.body.concat(body);
        } else {
            this.body.push(body);
        }
    }

    getParentClass(): CPPClass {
        return this.parentClass;
    }

    setParentClass(parentClass: CPPClass, visibility: CPPVisibility): void {
        parentClass.setMethod(this, visibility);
        this.parentClass = parentClass;
    }

    write(formatter: CPPFormatter, indentCount: number = 0): string {
        let block = new CPPCodeBlock(this.getSignature(), this.body);

        return block.write(formatter, indentCount);
    }
}
