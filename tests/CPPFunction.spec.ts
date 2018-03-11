import CPPClass from '../src/cpp/CPPClass';
import CPPFunction from '../src/cpp/CPPFunction';
import CPPFormatter from '../src/cpp/CPPFormatter';
import CPPVariable from '../src/cpp/CPPVariable';
import CPPVisibility from '../src/cpp/CPPVisibility';
import { expect } from 'chai';
import 'mocha';

describe('C++ Functions', () => {
    describe('names + parameters', () => {
        it('should not have parameters by default', () => {
            let fxn = new CPPFunction('std::string', 'printHello');
            let format = new CPPFormatter({
                indentSpaceCount: 2,
                indentWithSpaces: true,
                bracesOnNewLine: false
            });
            let output = fxn.write(format);

            expect(output).to.equal(
                `
std::string printHello() {
}
            `.trim()
            );
        });

        it('should have parameters with one default', () => {
            let p1 = CPPVariable.createString('guest');
            let p2 = CPPVariable.createString('suffix', '!');
            let fxn = new CPPFunction('std::string', 'welcomeGuest', [p1, p2]);
            let format = new CPPFormatter({
                indentSpaceCount: 2,
                indentWithSpaces: true,
                bracesOnNewLine: false
            });
            let output = fxn.write(format);

            expect(output).to.equal(
                `
std::string welcomeGuest(std::string guest, std::string suffix = "!") {
}
            `.trim()
            );
        });

        it('should have parameters with no defaults', () => {
            let p1 = CPPVariable.createString('guest');
            let p2 = CPPVariable.createString('suffix');
            let fxn = new CPPFunction('std::string', 'welcomeGuest', [p1, p2]);
            let format = new CPPFormatter({
                indentSpaceCount: 2,
                indentWithSpaces: true,
                bracesOnNewLine: true
            });
            let output = fxn.write(format);

            expect(output).to.equal(
                `
std::string welcomeGuest(std::string guest, std::string suffix)
{
}
            `.trim()
            );
        });

        it('should have class prefix on write', () => {
            let cls = new CPPClass('BaseClass');
            let fxn = new CPPFunction('void', 'burnToast');
            fxn.setParentClass(cls, CPPVisibility.Public);

            let format = new CPPFormatter({
                indentSpaceCount: 2,
                indentWithSpaces: true,
                bracesOnNewLine: true
            });
            let output = fxn.write(format);

            expect(output).to.equal(
                `
void BaseClass::burnToast()
{
}
            `.trim()
            );
        });

        it('should have a body with variables', () => {
            let fxn = new CPPFunction('void', 'myFunction');
            let myVar = new CPPVariable('int', 'life', 42);

            fxn.implementFunction([myVar]);

            let format = new CPPFormatter({
                indentSpaceCount: 2,
                indentWithSpaces: true,
                bracesOnNewLine: true
            });
            let output = fxn.write(format);

            expect(output).to.equal(
                `
void myFunction()
{
  int life = 42;
}
            `.trim()
            );
        });

        it('should support the function body being appended to', () => {
            let fxn = new CPPFunction('void', 'myAppendFunction');

            fxn.appendFunction(new CPPVariable('int', 'life', 42));
            fxn.appendFunction(new CPPVariable('bool', 'isToast', true));

            let format = new CPPFormatter({
                indentSpaceCount: 2,
                indentWithSpaces: true,
                bracesOnNewLine: true
            });
            let output = fxn.write(format);

            expect(output).to.equal(
                `
void myAppendFunction()
{
  int life = 42;
  bool isToast = true;
}
            `.trim()
            );
        });
    });
});
