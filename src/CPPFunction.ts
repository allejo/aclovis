import CPPClass from './CPPClass';
import CPPCodeBlock from './CPPCodeBlock';
import CPPFormatter from './CPPFormatter';
import CPPVariable from './CPPVariable';
import { CPPVisibility } from './CPPVisibility';
import ILanguageFunction from './ILanguageFunction';
import IWritable from './IWritable';

export default class CPPFunction implements ILanguageFunction {
    private parentClass?: CPPClass;
    private body: IWritable[] = [];
    private virtual: boolean = false;
    private pureVirtual: boolean = false;

    constructor(readonly returnType: string, readonly functionName: string, public parameters: CPPVariable[] = []) {}

    getSignature(getAsDefinition: boolean = false): string {
        let output = this.returnType + ' ';

        if (!getAsDefinition && this.parentClass != null) {
            output += `${this.parentClass.getClassName()}::`;
        }

        let args: string[] = [];
        let fmtr = new CPPFormatter();
        this.parameters.forEach(function(variable) {
            let param = variable.write(fmtr);
            args.push(param.slice(0, -1));
        });

        output += `${this.functionName}(${args.join(', ')})`;

        if (this.pureVirtual && getAsDefinition) {
            output += ' = 0';
        }

        if (getAsDefinition) {
            output += ';';
        }

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

    getParentClass(): CPPClass | null {
        return this.parentClass || null;
    }

    setParentClass(parentClass: CPPClass, visibility: CPPVisibility): this {
        parentClass.setMethod(this, visibility, this.virtual);
        this.parentClass = parentClass;

        return this;
    }

    getVirtual(): boolean {
        return this.virtual;
    }

    setVirtual(virtual: boolean): this {
        this.virtual = virtual;

        return this;
    }

    getPureVirtual(): boolean {
        return this.pureVirtual;
    }

    setPureVirtual(pure: boolean): this {
        this.pureVirtual = pure;

        if (pure) {
            this.virtual = true;
        }

        return this;
    }

    write(formatter: CPPFormatter, indentCount: number = 0): string {
        let block = new CPPCodeBlock(this.getSignature(), this.body);

        return block.write(formatter, indentCount);
    }
}
