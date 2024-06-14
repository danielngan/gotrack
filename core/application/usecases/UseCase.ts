export enum UseCaseType {
    QUERY = 'QUERY',
    COMMAND = 'COMMAND'
}

export abstract class UseCase<Input = any, Output = any> {
    protected constructor(public readonly type: UseCaseType) {}

    public get name(): string {
        return this.constructor.name;
    }

    public toString(): string {
        return this.name;
    }

}