import CPPVariable from '../src/CPPVariable';
import CPPFormatter from '../src/CPPFormatter';
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

            it('should declare and initialize a false value', () => {
                const cppvar = CPPVariable.createInt('myInt', 100);

                expect(cppvar.write(fmtr)).to.equal('int myInt = 100;');
            });
        });
    });
});
