import { expect } from 'chai';
import 'mocha';
import CPPFormatter from '../src/cpp/CPPFormatter';
import IFormatOptions from '../src/IFormatOptions';

describe('CPP Formatter', () => {
    describe('check default values', () => {
        let fmtr = new CPPFormatter();

        expect(fmtr.options.indentWithSpaces).to.equal(true);
        expect(fmtr.options.bracesOnNewLine).to.equal(true);
        expect(fmtr.options.bracesExist).to.equal(true);
        expect(fmtr.indentation).to.equal('    ');
    });

    describe('build formatter with custom options', () => {
        let options: IFormatOptions = {
            indentWithSpaces: false,
            bracesOnNewLine: true
        };
        let fmtr = new CPPFormatter(options);

        expect(fmtr.options.indentWithSpaces).to.equal(options.indentWithSpaces);
        expect(fmtr.options.bracesOnNewLine).to.equal(options.bracesOnNewLine);
    });

    describe('build formatter with tabs for indentation', () => {
        let options: IFormatOptions = {
            indentWithSpaces: false
        };
        let fmtr = new CPPFormatter(options);

        expect(fmtr.indentation).to.equal('\t');
    });

    describe('braces should be on new line when not specified', () => {
        let fmtr = new CPPFormatter({
            indentWithSpaces: true
        });

        expect(fmtr.options.bracesOnNewLine).to.equal(true);
    });

    describe('braces should always exist in C++', () => {
        let fmtr = new CPPFormatter({
            indentWithSpaces: true,
            bracesExist: false
        });

        expect(fmtr.options.bracesExist).to.equal(true);
    });
});
