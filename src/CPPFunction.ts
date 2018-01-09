/// <reference path="./ILanguageFunction.ts" />

import { CPPClass } from './CPPClass';
import { CPPVariable } from './CPPVariable';
import { CPPCodeBlock } from './CPPCodeBlock';
import { CPPFormatter } from './CPPFormatter';
import { CPPVisibility } from './CPPVisibility';

export class CPPFunction implements ILanguageFunction {
    private parentClass: CPPClass = null;

    constructor(readonly returnType: string, readonly functionName: string, public parameters: CPPVariable[] = []) {

    }

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

        output += `${this.functionName}(${args.join(', ')})`

        return output;
    }

    getParentClass(): CPPClass {
        return this.parentClass;
    }

    setParentClass(parentClass: CPPClass, visibility: CPPVisibility): void {
        parentClass.addMethod(this, visibility);
        this.parentClass = parentClass;
    }

    write(formatter: CPPFormatter, indentCount: number = 0): string {
        let block = new CPPCodeBlock(this.getSignature());

        return block.write(formatter, indentCount);
    }
}
