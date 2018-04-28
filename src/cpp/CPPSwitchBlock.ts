import { ILanguageWritable, CPPIfBlock, CPPCodeBlock, CPPFormatter, CPPHelper } from '..';

export default class CPPSwitchBlock extends CPPIfBlock {
    constructor(readonly condition: string) {
        super();
    }

    defineCase(condition: string, body: ILanguageWritable[]): this {
        super.defineCondition(condition, body);

        return this;
    }

    defineDefault(body: ILanguageWritable[]): this {
        super.defineElseCondition(body);

        return this;
    }

    write(formatter: CPPFormatter, indentCount: number): string {
        let parentSwitch = new CPPCodeBlock(`switch (${this.condition})`);

        let cases: ILanguageWritable[] = [];

        for (let condition in this.conditions) {
            let caseBlock = new CPPCodeBlock(`case ${condition}:`, this.conditions[condition]);
            caseBlock.setSuffix(`\nbreak;`);

            cases.push(caseBlock);
            cases.push(CPPHelper.createEmptyLine());
        }

        let defaultBlock = new CPPCodeBlock(`default:`, this.elseCondition);

        if (this.elseCondition.length == 0) {
            defaultBlock.setDisableBraces(true);
            defaultBlock.setSuffix(`\n${formatter.indentation}break;`);
        } else {
            defaultBlock.setSuffix(`\nbreak;`);
        }

        cases.push(defaultBlock);

        parentSwitch.body = cases;

        return parentSwitch.write(formatter, indentCount);
    }
}
