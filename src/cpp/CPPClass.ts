import CPPFormatter from './CPPFormatter';
import CPPFunction from './CPPFunction';
import CPPHelper from './CPPHelper';
import CPPVisibility from './CPPVisibility';
import ILanguageClass from '../ILanguageClass';
import CPPCodeBlock from './CPPCodeBlock';
import CPPWritableObject from './CPPWritableObject';

export interface CPPFunctionDefinition {
    virtual: boolean;
    visibility: CPPVisibility;
    functionDef: CPPFunction;
}

export interface CPPFunctionStorage {
    [name: string]: CPPFunctionDefinition;
}

export default class CPPClass implements ILanguageClass {
    private classIncludes: string[] = [];
    private classExtends: [string, CPPClass | string][] = [];
    private methods: CPPFunctionStorage = {};

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

    getMethods(): CPPFunctionStorage {
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
            let fxn: CPPFunctionDefinition = this.methods[key];

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
        let definitionBodies: { [key: string]: CPPWritableObject[] } = {
            [CPPVisibility.Public]: [],
            [CPPVisibility.Protected]: [],
            [CPPVisibility.Private]: []
        };
        let classDefinitionBody: CPPWritableObject[] = [];

        for (let key in this.methods) {
            let output = '';
            let fxn: CPPFunctionDefinition = this.methods[key];

            if (fxn.virtual) {
                output += 'virtual ';
            }

            output += fxn.functionDef.getSignature(true);

            definitionBodies[fxn.visibility].push(new CPPWritableObject(output));
        }

        [CPPVisibility.Public, CPPVisibility.Protected, CPPVisibility.Private].forEach(function(
            visibility: CPPVisibility
        ) {
            if (definitionBodies[visibility].length > 0) {
                classDefinitionBody.push(CPPHelper.createEmptyLine());
                classDefinitionBody.push(new CPPWritableObject(`${visibility}:`));
                classDefinitionBody.push(...definitionBodies[visibility]);
            }
        });

        classDefinitionBody.shift();

        let blk = new CPPCodeBlock(this.writeClassSignature(), classDefinitionBody);
        let output = blk.write(formatter, indentCount);

        let indentRegex = /^[ \t]+(public|protected|private):$/gm;
        output = output.replace(indentRegex, '$1:');

        return output + ';';
    }
}
