import CPPSwitchBlock from '../src/cpp/CPPSwitchBlock';
import CPPFormatter from '../src/cpp/CPPFormatter';
import { CPPVariable } from '../src';
import { multiLineString } from './helpers';
import { expect } from 'chai';
import 'mocha';

describe('C++ Switch Block', () => {
    let format = new CPPFormatter({
        indentSpaceCount: 4,
        indentWithSpaces: true,
        bracesOnNewLine: false
    });

    it('should only have a default case with nothing else', () => {
        let blk = new CPPSwitchBlock('anEnum');

        let output = blk.write(format, 0);
        let expected = multiLineString(`
switch (anEnum) {
    default:
        break;
}
        `);

        expect(output).to.equal(expected);
    });

    it('should only have a single case and a default', () => {
        let blk = new CPPSwitchBlock('anEnum');

        blk.defineCase('ePoweredOn', []);

        let output = blk.write(format, 0);
        let expected = multiLineString(`
switch (anEnum) {
    case ePoweredOn: {
    }
    break;

    default:
        break;
}
        `);

        expect(output).to.equal(expected);
    });

    it('should only have a two cases and a default', () => {
        let blk = new CPPSwitchBlock('anEnum');

        blk.defineCase('ePoweredOn', []);
        blk.defineCase('ePoweredOff', []);

        let output = blk.write(format, 0);
        let expected = multiLineString(`
switch (anEnum) {
    case ePoweredOn: {
    }
    break;

    case ePoweredOff: {
    }
    break;

    default:
        break;
}
        `);

        expect(output).to.equal(expected);
    });

    it('should only have a case with a body and a default', () => {
        let blk = new CPPSwitchBlock('anEnum');

        blk.defineCase('ePoweredOn', [
            CPPVariable.createString('hello', 'world')
        ]);

        let output = blk.write(format, 0);
        let expected = multiLineString(`
switch (anEnum) {
    case ePoweredOn: {
        std::string hello = "world";
    }
    break;

    default:
        break;
}
        `);

        expect(output).to.equal(expected);
    });

    it('should have a default with content', () => {
        let blk = new CPPSwitchBlock('anEnum');

        blk.defineDefault([
            CPPVariable.createString('hello', 'world')
        ])

        let output = blk.write(format, 0);
        let expected = multiLineString(`
switch (anEnum) {
    default: {
        std::string hello = "world";
    }
    break;
}
        `);

        expect(output).to.equal(expected);
    });

    it('should be indented respectively with just a default', () => {
        let blk = new CPPSwitchBlock('anEnum');

        let output = blk.write(format, 1);
        let expected = multiLineString(`
    switch (anEnum) {
        default:
            break;
    }
        `);

        expect(output).to.equal(expected);
    });
});
