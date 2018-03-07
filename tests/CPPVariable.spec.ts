import { CPPVariable } from '../src/CPPVariable';
import { CPPFormatter } from '../src/CPPFormatter';
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
});
