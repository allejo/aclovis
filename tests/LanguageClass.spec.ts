import { LanguageClass } from "../src/LanguageClass";
import { expect } from 'chai';
import 'mocha';

describe('Name function', () => {
    it('should return class name', () => {
        const instance = new LanguageClass('SamplePlugin');
        expect(instance.getName()).to.equal('SamplePlugin');
    });
});
