import { CPPWritableObject } from './CPPWritableObject';

export class CPPHelper {
    public static createFunctionCall(name: string, parameters: string[]) {
        return new CPPWritableObject(`${name}(${parameters.join(', ')});`);
    }
}
