import CPPWritableObject from './CPPWritableObject';

export default class CPPHelper {
    public static createEmptyLine() {
        return new CPPWritableObject('');
    }

    public static createFunctionCall(name: string, parameters: string[] = []) {
        return new CPPWritableObject(`${name}(${parameters.join(', ')});`);
    }
}
