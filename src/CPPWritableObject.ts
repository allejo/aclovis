export class CPPWritableObject implements IWritable {
    constructor(readonly content: string) {}

    write(): string {
        return this.content;
    }
}
