import CPPClass from '../src/cpp/CPPClass';
import CPPComment from '../src/cpp/CPPComment';
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

        it('should have a public function + instance variables', () => {
            let cppclass = new CPPClass('PetThief');
            let stealFxn = new CPPFunction('void', 'release');

            stealFxn.setVirtual(false);
            stealFxn.setParentClass(cppclass, CPPVisibility.Public);

            cppclass.addVariable(CPPVariable.createInt('count'), CPPVisibility.Public);

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

    int count;
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

        it('should have a section of protected variables + a single private variable', () => {
            let cppclass = new CPPClass('PetThief');
            let stealFxn = new CPPFunction('void', 'release');
            let runFxn = new CPPFunction('void', 'run');

            stealFxn.setVirtual(false);
            stealFxn.setParentClass(cppclass, CPPVisibility.Public);

            runFxn.setVirtual(false);
            runFxn.setParentClass(cppclass, CPPVisibility.Protected);

            cppclass.addVariable(CPPVariable.createInt('petCount'), CPPVisibility.Protected);
            cppclass.addVariable(CPPVariable.createConstChar('name'), CPPVisibility.Private);

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

    int petCount;

private:
    const char* name;
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

        it('should have a constructor with a comment', () => {
            let cppclass = new CPPClass('PetThief');
            let fmtr = new CPPFormatter({
                indentWithSpaces: true,
                indentSpaceCount: 4,
                bracesOnNewLine: true
            });

            cppclass.setConstructor([new CPPComment('Hello world', false)], []);

            let expected = multiLineString(`
class PetThief
{
public:
    PetThief()
    {
        // Hello world
    }
};
            `);

            expect(cppclass.writeHeaderBlock(fmtr, 0)).to.equal(expected);
        });

        it('should have a constructor with an initializer list', () => {
            let cppclass = new CPPClass('PetThief');
            let fmtr = new CPPFormatter({
                indentWithSpaces: true,
                indentSpaceCount: 4,
                bracesOnNewLine: true
            });

            cppclass.setConstructor([
                new CPPComment('Hello world', false)
            ], [
                'superClass()',
                'roar(i)'
            ]);

            let expected = multiLineString(`
class PetThief
{
public:
    PetThief() : superClass(),
        roar(i)
    {
        // Hello world
    }
};
            `);

            expect(cppclass.writeHeaderBlock(fmtr, 0)).to.equal(expected);
        });

        it('should have a constructor with an initializer list of multiple attributes', () => {
            let cppclass = new CPPClass('PetThief');
            let fmtr = new CPPFormatter({
                indentWithSpaces: true,
                indentSpaceCount: 4,
                bracesOnNewLine: true
            });

            cppclass.setConstructor([
                new CPPComment('Hello world', false)
            ], [
                'superClass()',
                'roar(i)',
                'toast(false)',
                'something("hello")'
            ]);

            let expected = multiLineString(`
class PetThief
{
public:
    PetThief() : superClass(),
        roar(i),
        toast(false),
        something("hello")
    {
        // Hello world
    }
};
            `);

            expect(cppclass.writeHeaderBlock(fmtr, 0)).to.equal(expected);
        });

        it('should have a constructor with an initializer list and no body', () => {
            let cppclass = new CPPClass('PetThief');
            let fmtr = new CPPFormatter({
                indentWithSpaces: true,
                indentSpaceCount: 4,
                bracesOnNewLine: true
            });

            cppclass.setConstructor([], [
                'superClass()',
                'roar(i)',
            ]);

            let expected = multiLineString(`
class PetThief
{
public:
    PetThief() : superClass(),
        roar(i)
    {
    }
};
            `);

            expect(cppclass.writeHeaderBlock(fmtr, 0)).to.equal(expected);
        });

        it('should have a constructor with a single initializer item and no body', () => {
            let cppclass = new CPPClass('PetThief');
            let fmtr = new CPPFormatter({
                indentWithSpaces: true,
                indentSpaceCount: 4,
                bracesOnNewLine: true
            });

            cppclass.setConstructor([], [
                'superClass()'
            ]);

            let expected = multiLineString(`
class PetThief
{
public:
    PetThief() : superClass()
    {
    }
};
            `);

            expect(cppclass.writeHeaderBlock(fmtr, 0)).to.equal(expected);
        });
    });
});
