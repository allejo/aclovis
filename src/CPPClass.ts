/// <reference path="ILanguageClass.ts" />

import { CPPFormatter } from './CPPFormatter';
import { CPPFunction } from './CPPFunction';
import { CPPVisibility }from './CPPVisibility';

export class CPPClass implements ILanguageClass {
    private classIncludes: string[] = [];
    private classExtends: [string, string][] = [];
    private methods: [CPPVisibility, CPPFunction][] = [];

    /**
     * @param name The name of the class
     */
    constructor(private name: string) {
        this.name = name.replace(/[^A-Za-z_]/g, '');

        if (this.name.trim().length == 0) {
            this.name = 'GenericClass';
        }
    }

    getClassName(): string {
        return this.name;
    }

    addMethod(fxn: CPPFunction, visibility: CPPVisibility) {
        this.methods.push([visibility, fxn]);
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
    getExtends(): [string, string][] {
        return this.classExtends;
    }

    /**
     * Define a class which this class will extend
     *
     * @param classExtends A tuple of the visibility and name of the class this class is extending
     */
    addExtends(classExtends: [string, string]) {
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
        console.log(formatter, indentCount);

        return '';
    }

    //
    // Build the chunks of a class definition
    //

    classSignature(): string {
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
}
