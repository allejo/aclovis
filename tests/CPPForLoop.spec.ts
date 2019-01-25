import CPPForLoop from '../src/cpp/CPPForLoop';
import CPPFormatter from '../src/cpp/CPPFormatter';
import CPPWritableObject from '../src/cpp/CPPWritableObject';
import { multiLineString } from './helpers';
import { expect } from 'chai';
import 'mocha';

const format = new CPPFormatter({
    indentSpaceCount: 4,
    indentWithSpaces: true,
    bracesOnNewLine: true,
});

describe('C++ For Loops', () => {
    it('it should be an incrementing for loop', () => {
        let block = new CPPForLoop(
            0,
            10,
            true
        );
        let output = block.write(format);
        let expected = multiLineString(`
for (int i = 0; i < 10; i++)
{
}
        `);

        expect(output).to.equal(expected);
    });

    it('it should be a decrementing for loop', () => {

        let block = new CPPForLoop(
            2,
            10,
            false
        );
        let output = block.write(format);
        let expected = multiLineString(`
for (int i = 10; i > 2; i--)
{
}
        `);

        expect(output).to.equal(expected);
    });

    it('it should be an unsigned incrementing for loop', () => {
        let block = new CPPForLoop(
            0,
            10,
            true
        );
        block.unsigned = true;
        let output = block.write(format);
        let expected = multiLineString(`
for (unsigned int i = 0; i < 10; i++)
{
}
        `);

        expect(output).to.equal(expected);
    });

    it('it should be have a body', () => {
        let block = new CPPForLoop(
            0,
            10,
            true
        );
        block.body = [
            new CPPWritableObject('continue;')
        ];
        let output = block.write(format);
        let expected = multiLineString(`
for (int i = 0; i < 10; i++)
{
    continue;
}
        `);

        expect(output).to.equal(expected);
    });
});
