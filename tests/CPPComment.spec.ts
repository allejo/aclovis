import CPPComment from '../src/cpp/CPPComment';
import CPPFormatter from '../src/cpp/CPPFormatter';
import { multiLineString } from './helpers';
import { expect } from 'chai';
import 'mocha';

describe('C++ Comments', () => {
    describe('block comments', () => {
        it('should have asterisks and be empty', () => {
            let comment = new CPPComment([], true);
            let format = new CPPFormatter({
                indentSpaceCount: 2,
                indentWithSpaces: true
            });
            let output = comment.write(format);
            let expected = multiLineString(`
/*
 */
            `);

            expect(output).to.equal(expected);
        });

        it('should have asterisks and content', () => {
            let comment = new CPPComment(
                ['My first line', 'A second line for my comment', '', 'A non-empty line following an empty line'],
                true
            );
            let format = new CPPFormatter({
                indentSpaceCount: 2,
                indentWithSpaces: true
            });
            let output = comment.write(format);
            let expected = multiLineString(`
/*
 * My first line
 * A second line for my comment
 *
 * A non-empty line following an empty line
 */
            `);

            expect(output).to.equal(expected);
        });
    });

    describe('multiple single lined comments', () => {
        it('should have no output with an empty body', () => {
            let comment = new CPPComment([], false);
            let format = new CPPFormatter({
                indentSpaceCount: 2,
                indentWithSpaces: true
            });
            let output = comment.write(format);
            let expected = ``;

            expect(output).to.equal(expected);
        });

        it('should have an empty "//" with an empty string', () => {
            let comment = new CPPComment([''], false);
            let format = new CPPFormatter({
                indentSpaceCount: 2,
                indentWithSpaces: true
            });
            let output = comment.write(format);
            let expected = `//`;

            expect(output).to.equal(expected);
        });
    });

    it('should have a single line comment using "//"', () => {
        let comment = new CPPComment(['A single line comment'], false);
        let format = new CPPFormatter({
            indentSpaceCount: 2,
            indentWithSpaces: true
        });
        let output = comment.write(format);
        let expected = `// A single line comment`;

        expect(output).to.equal(expected);
    });

    it('should multiple single line comments should each use "//"', () => {
        let comment = new CPPComment(
            ['My first comment', 'A second line', '', 'an empty comment before this line'],
            false
        );
        let format = new CPPFormatter({
            indentSpaceCount: 2,
            indentWithSpaces: true
        });
        let output = comment.write(format);
        let expected = multiLineString(`
// My first comment
// A second line
//
// an empty comment before this line
        `);

        expect(output).to.equal(expected);
    });

    it('single line comments should be indented once', () => {
        let comment = new CPPComment(
            ['My first comment', 'A second line', '', 'an empty comment before this line'],
            false
        );
        let format = new CPPFormatter({
            indentSpaceCount: 4,
            indentWithSpaces: true
        });

        let output = comment.write(format, 1);
        let expected = multiLineString(`
    // My first comment
    // A second line
    //
    // an empty comment before this line
        `);

        expect(output).to.equal(expected);
    });

    it('block comments should be indented once', () => {
        let comment = new CPPComment(
            ['My first comment', 'A second line', '', 'an empty comment before this line'],
            true
        );
        let format = new CPPFormatter({
            indentSpaceCount: 4,
            indentWithSpaces: true
        });

        let output = comment.write(format, 1);
        let expected = multiLineString(`
    /*
     * My first comment
     * A second line
     *
     * an empty comment before this line
     */
        `);

        expect(output).to.equal(expected);
    });
});
