import CPPHelper from '../src/cpp/CPPHelper';
import CPPVariable from '../src/cpp/CPPVariable';
import CPPFormatter from '../src/cpp/CPPFormatter';
import { expect } from 'chai';
import 'mocha';

describe('C++ Variables', () => {
    let fmtr = new CPPFormatter({
        indentWithSpaces: true,
        indentSpaceCount: 2
    });

    describe('Declarations Only', () => {
        it('should have no indentation', () => {
            const cppvar = new CPPVariable('bool', 'turnedOn', false);

            expect(cppvar.write(fmtr)).to.equal('bool turnedOn;');
        });

        it('should be indented one level', () => {
            const cppvar = new CPPVariable('bool', 'turnedOn', false);

            expect(cppvar.write(fmtr, 1)).to.equal('  bool turnedOn;');
        });

        it('should be indented two levels', () => {
            const cppvar = new CPPVariable('bool', 'turnedOn', false);

            expect(cppvar.write(fmtr, 2)).to.equal('    bool turnedOn;');
        });
    });

    describe('Declarations + Initialization', () => {
        it('should be valid when created manually', () => {
            const cppvar = new CPPVariable('std::string', 'hola', '"hello world"');

            expect(cppvar.write(fmtr)).to.equal('std::string hola = "hello world";');
        });

        it('should be a string when using helper function', () => {
            const cppvar = CPPVariable.createString('my_string', 'toast is awesome');

            expect(cppvar.write(fmtr)).to.equal('std::string my_string = "toast is awesome";');
        });
    });

    describe('Static helper functions', () => {
        describe('Boolean functions', () => {
            it('should declare without a value', () => {
                const cppvar = CPPVariable.createBoolean('isTrue');

                expect(cppvar.write(fmtr)).to.equal('bool isTrue;');
            });

            it('should declare and initialize a false value', () => {
                const cppvar = CPPVariable.createBoolean('isTrue', false);

                expect(cppvar.write(fmtr)).to.equal('bool isTrue = false;');
            });

            it('should declare and initialize a true value', () => {
                const cppvar = CPPVariable.createBoolean('isTrue', true);

                expect(cppvar.write(fmtr)).to.equal('bool isTrue = true;');
            });
        });

        describe('Integer functions', () => {
            it('should declare without a value', () => {
                const cppvar = CPPVariable.createInt('myInt');

                expect(cppvar.write(fmtr)).to.equal('int myInt;');
            });

            it('should declare and initialize a integer value', () => {
                const cppvar = CPPVariable.createInt('myInt', 100);

                expect(cppvar.write(fmtr)).to.equal('int myInt = 100;');
            });

            it('should declare and initialize an unsigned integer value', () => {
                const cppvar = CPPVariable.createInt('myInt', 100, true);

                expect(cppvar.write(fmtr)).to.equal('unsigned int myInt = 100;');
            });
        });

        describe('Double functions', () => {
            it('should declare without a value', () => {
                const cppvar = CPPVariable.createDouble('bagPlease');

                expect(cppvar.write(fmtr)).to.equal('double bagPlease;');
            });

            it('should declare and initialize a value of -9.8', () => {
                const cppvar = CPPVariable.createDouble('gravity', -9.8);

                expect(cppvar.write(fmtr)).to.equal('double gravity = -9.8;');
            });
        });

        describe('Float functions', () => {
            it('should declare without a value', () => {
                const cppvar = CPPVariable.createFloat('gravity');

                expect(cppvar.write(fmtr)).to.equal('float gravity;');
            });

            it('should declare and initialize a value of 100.125', () => {
                const cppvar = CPPVariable.createDouble('gravity', 100.125);

                expect(cppvar.write(fmtr)).to.equal('double gravity = 100.125;');
            });
        });

        describe('const char* functions', () => {
            it('should declare without a value', () => {
                const cppvar = CPPVariable.createConstChar('bird');

                expect(cppvar.write(fmtr)).to.equal('const char* bird;');
            });

            it('should declare and initialize a value of "toast is good"', () => {
                const cppvar = CPPVariable.createConstChar('bird', 'toast is good');

                expect(cppvar.write(fmtr)).to.equal('const char* bird = "toast is good";');
            });
        });
    });

    describe('Using objects in helper functions', () => {
        it('should use the variable name with CPPVariable objects', () => {
            const myVar = CPPVariable.createInt('answer', 42);
            const secondVar = CPPVariable.createFloat('floatingAnswer', myVar);

            expect(secondVar.write(fmtr)).to.equal('float floatingAnswer = answer;');
        });

        it('should use the variable name with CPPWritable objects', () => {
            const fxnCall = CPPHelper.createFunctionCall('std::stoi', [42]);
            const intVal = CPPVariable.createInt('answer', fxnCall);

            expect(intVal.write(fmtr)).to.equal('int answer = std::stoi(42);');
        });
    });
});
