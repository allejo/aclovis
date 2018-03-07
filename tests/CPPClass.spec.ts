import { CPPClass } from '../src/CPPClass';
import { CPPVisibility } from '../src/CPPVisibility';
import { expect } from 'chai';
import 'mocha';

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

            expect(cppclass.classSignature()).to.equal('class ObliviousToast');
        });

        it('should extend a public class', () => {
            let cppclass = new CPPClass('ObliviousToast');

            cppclass.addExtends([CPPVisibility.Public, 'AbstractClass']);

            expect(cppclass.classSignature()).to.equal('class ObliviousToast : public AbstractClass');
        });
    });
});
