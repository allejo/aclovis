import CPPCodeBlock from '../src/cpp/CPPCodeBlock';
import CPPFormatter from '../src/cpp/CPPFormatter';
import CPPVariable from '../src/cpp/CPPVariable';
import { expect } from 'chai';
import 'mocha';

describe('C++ Code Blocks', () => {
    describe('brace handling', () => {
        it('should have braces on new line', () => {
            let block = new CPPCodeBlock('int main()');
            let format = new CPPFormatter({
                indentSpaceCount: 2,
                indentWithSpaces: true,
                bracesOnNewLine: true
            });
            let output = block.write(format);

            expect(output).to.equal(
                `
int main()
{
}
            `.trim()
            );
        });

        it('should have braces on same line', () => {
            let block = new CPPCodeBlock('int main()');
            let format = new CPPFormatter({
                indentSpaceCount: 2,
                indentWithSpaces: true,
                bracesOnNewLine: false
            });
            let output = block.write(format);

            expect(output).to.equal(
                `
int main() {
}
            `.trim()
            );
        });
    });

    describe('body output', () => {
        it('should output its body indented', () => {
            let block = new CPPCodeBlock('int main()');
            let format = new CPPFormatter({
                indentSpaceCount: 4,
                indentWithSpaces: true,
                bracesOnNewLine: false
            });

            block.body.push(CPPVariable.createString('password', 'my super password'));

            let output = block.write(format);

            expect(output).to.equal(
                `
int main() {
    std::string password = "my super password";
}
            `.trim()
            );
        });

        it('should have nested code blocks with braces on new line', () => {
            let block = new CPPCodeBlock('class Toast');
            let format = new CPPFormatter({
                indentSpaceCount: 4,
                indentWithSpaces: true,
                bracesOnNewLine: true
            });

            let struct = new CPPCodeBlock('struct Cheese');
            struct.body.push(CPPVariable.createString('name'));
            block.body.push(struct);

            let output = block.write(format);

            expect(output).to.equal(
                `
class Toast
{
    struct Cheese
    {
        std::string name;
    }
}
            `.trim()
            );
        });

        it('should have nested code blocks with braces on same line', () => {
            let block = new CPPCodeBlock('class Toast');
            let format = new CPPFormatter({
                indentSpaceCount: 4,
                indentWithSpaces: true,
                bracesOnNewLine: false
            });

            let struct = new CPPCodeBlock('struct Cheese');
            struct.body.push(CPPVariable.createString('name'));
            block.body.push(struct);

            let output = block.write(format);

            expect(output).to.equal(
                `
class Toast {
    struct Cheese {
        std::string name;
    }
}
            `.trim()
            );
        });
    });
});
