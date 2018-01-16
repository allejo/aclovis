import { CPPComment } from "../src/CPPComment";
import { CPPFormatter } from "../src/CPPFormatter";
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

            expect(output).to.equal(`
/*
 */
            `.trim());
        });

        it('should have asterisks and content', () => {
            let comment = new CPPComment([
                'My first line',
                'A second line for my comment',
                '',
                'A non-empty line following an empty line'
            ], true);
            let format = new CPPFormatter({
                indentSpaceCount: 2,
                indentWithSpaces: true
            });
            let output = comment.write(format);

            expect(output).to.equal(`
/*
 * My first line
 * A second line for my comment
 *
 * A non-empty line following an empty line
 */
            `.trim());
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

            expect(output).to.equal(`
            `.trim());
        });

        it('should have an empty "//" with an empty string', () => {
            let comment = new CPPComment([''], false);
            let format = new CPPFormatter({
                indentSpaceCount: 2,
                indentWithSpaces: true
            });
            let output = comment.write(format);

            expect(output).to.equal(`
//
            `.trim());
        });
    });

    it('should have a single line comment using "//"', () => {
        let comment = new CPPComment([
            'A single line comment',
        ], false);
        let format = new CPPFormatter({
            indentSpaceCount: 2,
            indentWithSpaces: true
        });
        let output = comment.write(format);

        expect(output).to.equal(`
// A single line comment
        `.trim());
    });

    it('should multiple single line comments should each use "//"', () => {
        let comment = new CPPComment([
            'My first comment',
            'A second line',
            '',
            'an empty comment before this line'
        ], false);
        let format = new CPPFormatter({
            indentSpaceCount: 2,
            indentWithSpaces: true
        });
        let output = comment.write(format);

        expect(output).to.equal(`
// My first comment
// A second line
//
// an empty comment before this line
        `.trim());
    });
});
