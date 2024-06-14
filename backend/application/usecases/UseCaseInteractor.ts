import {UseCase} from "../../../core/application/usecases/UseCase";

export abstract class UseCaseInteractor<T extends UseCase<Input, Output> = any, Input = any, Output = any> {

    protected constructor(public readonly useCase: T) {}

    public abstract execute(input: Input): Promise<Output>;
}