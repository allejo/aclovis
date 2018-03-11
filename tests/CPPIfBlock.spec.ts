import CPPIfBlock from '../src/cpp/CPPIfBlock';
import CPPFormatter from '../src/cpp/CPPFormatter';
import CPPVariable from '../src/cpp/CPPVariable';
import { expect } from 'chai';
import 'mocha';

describe('C++ If Statement', () => {
    let format = new CPPFormatter({
        indentSpaceCount: 4,
        indentWithSpaces: true,
        bracesOnNewLine: false
    });

    it('should only have an if statement', () => {
        let ifStatement = new CPPIfBlock();

        ifStatement.defineCondition('1 == 1', [CPPVariable.createString('variable')]);

        let output = ifStatement.write(format);

        expect(output).to.equal(
            `
if (1 == 1) {
    std::string variable;
}
        `.trim()
        );
    });

    it('should have an if and an else if', () => {
        let ifStatement = new CPPIfBlock();

        ifStatement.defineCondition('var == 1', [CPPVariable.createString('variable')]);
        ifStatement.defineCondition('var == 2', [CPPVariable.createString('toast')]);

        let output = ifStatement.write(format);

        expect(output).to.equal(
            `
if (var == 1) {
    std::string variable;
}
else if (var == 2) {
    std::string toast;
}
        `.trim()
        );
    });

    it('should have an if and an else', () => {
        let ifStatement = new CPPIfBlock();

        ifStatement.defineCondition('var == 1', [CPPVariable.createString('variable')]);
        ifStatement.defineElseCondition([CPPVariable.createString('toast')]);

        let output = ifStatement.write(format);

        expect(output).to.equal(
            `
if (var == 1) {
    std::string variable;
}
else {
    std::string toast;
}
        `.trim()
        );
    });

    it('should have an if, else if, and an else', () => {
        let ifStatement = new CPPIfBlock();

        ifStatement.defineCondition('var == 1', [CPPVariable.createString('variable')]);
        ifStatement.defineCondition('var == 2', [CPPVariable.createString('bread')]);
        ifStatement.defineElseCondition([CPPVariable.createString('toast')]);

        let output = ifStatement.write(format);

        expect(output).to.equal(
            `
if (var == 1) {
    std::string variable;
}
else if (var == 2) {
    std::string bread;
}
else {
    std::string toast;
}
        `.trim()
        );
    });
});
