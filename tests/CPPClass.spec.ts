import CPPClass from '../src/cpp/CPPClass';
import CPPFormatter from '../src/cpp/CPPFormatter';
import CPPFunction from '../src/cpp/CPPFunction';
import CPPVariable from '../src/cpp/CPPVariable';
import CPPVisibility from '../src/cpp/CPPVisibility';
import { expect } from 'chai';
import 'mocha';
import { multiLineString } from './helpers';

describe('C++ Classes', () => {
    describe('class names', () => {
        it('should be sanitized', () => {
            let names: { [name: string]: string } = {
                'Class With Space': 'ClassWithSpace',
                'Hello!W@rld': 'HelloWrld',
                '12345': 'GenericClass'
            };

            for (let raw in names) {
                let sanitized = names[raw];
                let cppclass = new CPPClass(raw);

                expect(cppclass.getClassName()).to.equal(sanitized);
            }
        });
    });

    describe('class includes', () => {
        it('should be empty by default', () => {
            let cppclass = new CPPClass('');

            expect(cppclass.getIncludes()).to.be.an('array').that.is.empty;
        });

        it('should be able to have new entries', () => {
            let cppclass = new CPPClass('');

            cppclass.addInclude('cstdio').addInclude('cmath');

            expect(cppclass.getIncludes())
                .to.be.an('array')
                .that.contains('cstdio')
                .that.contains('cmath');
        });

        it('should be able to have entry removed', () => {
            let cppclass = new CPPClass('');

            cppclass.addInclude('cstdio').addInclude('cmath');

            expect(cppclass.getIncludes()).has.lengthOf(2);

            cppclass.removeInclude('cstdio');

            expect(cppclass.getIncludes())
                .to.have.lengthOf(1)
                .to.contain('cmath');
        });
    });

    describe('class signature', () => {
        it('should not extend anything', () => {
            let cppclass = new CPPClass('ObliviousToast');

            expect(cppclass.writeClassSignature()).to.equal('class ObliviousToast');
        });

        it('should extend a public class', () => {
            let cppclass = new CPPClass('ObliviousToast');

            cppclass.addExtends([CPPVisibility.Public, 'AbstractClass']);

            expect(cppclass.writeClassSignature()).to.equal('class ObliviousToast : public AbstractClass');
        });
    });

    describe('Class header block', () => {
        it('should be empty', () => {
            let cppclass = new CPPClass('PetThief');
            let fmtr = new CPPFormatter({
                indentWithSpaces: true,
                indentSpaceCount: 4,
                bracesOnNewLine: true
            });

            let expected = multiLineString(`
class PetThief
{
};
            `);

            expect(cppclass.writeHeaderBlock(fmtr, 0)).to.equal(expected);
        });

        it('should have a virtual function', () => {
            let cppclass = new CPPClass('PetThief');
            let stealFxn = new CPPFunction('void', 'steal');

            stealFxn.setVirtual(true);
            stealFxn.setParentClass(cppclass, CPPVisibility.Public);

            let fmtr = new CPPFormatter({
                indentWithSpaces: true,
                indentSpaceCount: 4,
                bracesOnNewLine: true
            });
            let expected = multiLineString(`
class PetThief
{
public:
    virtual void steal();
};
            `);

            expect(cppclass.writeHeaderBlock(fmtr, 0)).to.equal(expected);
        });

        it('should have a virtual function with parameters', () => {
            let cppclass = new CPPClass('PetThief');
            let stealFxn = new CPPFunction('void', 'steal', [
                CPPVariable.createInt('owner'),
                CPPVariable.createInt('target', -1)
            ]);

            stealFxn.setVirtual(true);
            stealFxn.setParentClass(cppclass, CPPVisibility.Public);

            let fmtr = new CPPFormatter({
                indentWithSpaces: true,
                indentSpaceCount: 4,
                bracesOnNewLine: true
            });
            let expected = multiLineString(`
class PetThief
{
public:
    virtual void steal(int owner, int target = -1);
};
            `);

            expect(cppclass.writeHeaderBlock(fmtr, 0)).to.equal(expected);
        });

        it('should have a pure virtual function with parameters', () => {
            let cppclass = new CPPClass('PetThief');
            let stealFxn = new CPPFunction('void', 'steal');

            stealFxn.setPureVirtual(true);
            stealFxn.setParentClass(cppclass, CPPVisibility.Public);

            let fmtr = new CPPFormatter({
                indentWithSpaces: true,
                indentSpaceCount: 4,
                bracesOnNewLine: true
            });
            let expected = multiLineString(`
class PetThief
{
public:
    virtual void steal() = 0;
};
            `);

            expect(cppclass.writeHeaderBlock(fmtr, 0)).to.equal(expected);
        });

        it('should have a non-virtual function with parameters', () => {
            let cppclass = new CPPClass('PetThief');
            let stealFxn = new CPPFunction('void', 'release');

            stealFxn.setVirtual(false);
            stealFxn.setParentClass(cppclass, CPPVisibility.Public);

            let fmtr = new CPPFormatter({
                indentWithSpaces: true,
                indentSpaceCount: 4,
                bracesOnNewLine: true
            });
            let expected = multiLineString(`
class PetThief
{
public:
    void release();
};
            `);

            expect(cppclass.writeHeaderBlock(fmtr, 0)).to.equal(expected);
        });

        it('should have a section of protected functions', () => {
            let cppclass = new CPPClass('PetThief');
            let stealFxn = new CPPFunction('void', 'release');
            let runFxn = new CPPFunction('void', 'run');

            stealFxn.setVirtual(false);
            stealFxn.setParentClass(cppclass, CPPVisibility.Public);

            runFxn.setVirtual(false);
            runFxn.setParentClass(cppclass, CPPVisibility.Protected);

            let fmtr = new CPPFormatter({
                indentWithSpaces: true,
                indentSpaceCount: 4,
                bracesOnNewLine: true
            });
            let expected = multiLineString(`
class PetThief
{
public:
    void release();

protected:
    void run();
};
            `);

            expect(cppclass.writeHeaderBlock(fmtr, 0)).to.equal(expected);
        });

        it('should have public, protected, and private functions', () => {
            let cppclass = new CPPClass('PetThief');
            let shouldFxn = new CPPFunction('bool', 'shouldSteal');
            let stealFxn = new CPPFunction('void', 'release');
            let runFxn = new CPPFunction('void', 'run');

            shouldFxn.setVirtual(false);
            shouldFxn.setParentClass(cppclass, CPPVisibility.Private);

            stealFxn.setVirtual(false);
            stealFxn.setParentClass(cppclass, CPPVisibility.Public);

            runFxn.setVirtual(false);
            runFxn.setParentClass(cppclass, CPPVisibility.Protected);

            let fmtr = new CPPFormatter({
                indentWithSpaces: true,
                indentSpaceCount: 4,
                bracesOnNewLine: true
            });
            let expected = multiLineString(`
class PetThief
{
public:
    void release();

protected:
    void run();

private:
    bool shouldSteal();
};
            `);

            expect(cppclass.writeHeaderBlock(fmtr, 0)).to.equal(expected);
        });
    });
});
