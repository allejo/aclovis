import CPPFormatter from './CPPFormatter';
import CPPFunction from './CPPFunction';
import { CPPVisibility } from './CPPVisibility';
import ILanguageClass from './ILanguageClass';
import CPPCodeBlock from './CPPCodeBlock';
import CPPWritableObject from './CPPWritableObject';

interface FunctionDefinition {
    virtual: boolean;
    visibility: CPPVisibility;
    functionDef: CPPFunction;
}

interface FunctionStorage {
    [name: string]: FunctionDefinition;
}

export default class CPPClass implements ILanguageClass {
    private classIncludes: string[] = [];
    private classExtends: [string, CPPClass | string][] = [];
    private methods: FunctionStorage = {};

    /**
     * @param name The name of the class
     */
    constructor(private name: string) {
        this.name = name.replace(/[^A-Za-z_]/g, '');

        if (this.name.trim().length === 0) {
            this.name = 'GenericClass';
        }
    }

    getClassName(): string {
        return this.name;
    }

    getMethods(): FunctionStorage {
        return this.methods;
    }

    setMethod(fxn: CPPFunction, visibility: CPPVisibility, virtual: boolean = false) {
        this.methods[fxn.getSignature()] = {
            virtual: virtual,
            visibility: visibility,
            functionDef: fxn
        };
    }

    //
    // Class includes
    //
    getIncludes(): string[] {
        return this.classIncludes;
    }

    addInclude(include: string): this {
        this.classIncludes.push(include);

        return this;
    }

    removeInclude(include: string): boolean {
        this.classIncludes.forEach((element, index) => {
            if (element === include) {
                this.classIncludes.splice(index, 1);
                return true;
            }
        });

        return false;
    }

    //
    // Class extends
    //
    getExtends(): [string, CPPClass | string][] {
        return this.classExtends;
    }

    /**
     * Define a class which this class will extend
     *
     * @param classExtends A tuple of the visibility and name of the class this class is extending
     */
    addExtends(classExtends: [CPPVisibility, CPPClass | string]) {
        this.classExtends.push(classExtends);
    }

    /**
     * Remove a parent class this one is extending
     *
     * @param classExtends A tuple of the visibility and name of the class to no longer extend
     *
     * @returns True if the deletion was successful
     */
    removeExtends(classExtends: [string, string]): boolean {
        this.classExtends.forEach((element, index) => {
            if (element[0] === classExtends[0] && element[1] === classExtends[1]) {
                this.classExtends.splice(index, 1);
                return true;
            }
        });

        return false;
    }

    write(formatter: CPPFormatter, indentCount: number): string {
        let output: string[] = [];

        output.push(this.writeHeaderBlock(formatter, indentCount));

        for (let key in this.methods) {
            let fxn: FunctionDefinition = this.methods[key];

            output.push(fxn.functionDef.write(formatter, indentCount));
        }

        return output.join('\n\n').trim();
    }

    //
    // Build the chunks of a class definition
    //

    writeClassSignature(): string {
        let signature = `class ${this.name}`;

        if (this.classExtends.length > 0) {
            let classExtensions: string[] = [];

            for (let e of this.classExtends) {
                classExtensions.push(`${e[0]} ${e[1]}`);
            }

            signature += ` : ${classExtensions.join(', ')}`;
        }

        return signature;
    }

    writeHeaderBlock(formatter: CPPFormatter, indentCount: number): string {
        let classDefinitionBody: CPPWritableObject[] = [];

        for (let key in this.methods) {
            let output = '';
            let fxn: FunctionDefinition = this.methods[key];

            if (fxn.virtual) {
                output += 'virtual ';
            }

            output += fxn.functionDef.getSignature(true);

            classDefinitionBody.push(new CPPWritableObject(output));
        }

        let blk = new CPPCodeBlock(this.writeClassSignature(), classDefinitionBody);
        let output = blk.write(formatter, indentCount);

        return output + ';';
    }
}
