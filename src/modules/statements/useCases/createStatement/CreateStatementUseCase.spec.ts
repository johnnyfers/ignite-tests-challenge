import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository"
import { CreateStatementError } from "./CreateStatementError";
import { CreateStatementUseCase } from "./CreateStatementUseCase"

let usersRepositoryInMemory: InMemoryUsersRepository;
let statementRepositoryInMemory: InMemoryStatementsRepository
let createStatementUseCase: CreateStatementUseCase

enum OperationType {
    DEPOSIT = "deposit",
    WITHDRAW = "withdraw",
}

describe('Create Statement', () => {

    beforeEach(() => {
        usersRepositoryInMemory = new InMemoryUsersRepository()
        statementRepositoryInMemory = new InMemoryStatementsRepository()
        createStatementUseCase = new CreateStatementUseCase(usersRepositoryInMemory, statementRepositoryInMemory)
    })

    it('should be abe to create a statement', async () => {
        const user = await usersRepositoryInMemory.create({
            name: "Test",
            email: "test@test.com",
            password: "123456",
        });

        const statementDeposit = await createStatementUseCase.execute({
            user_id: user.id as string,
            type: "deposit" as OperationType,
            amount: 20,
            description: "Test operation",
        });

        const statementWithdraw = await createStatementUseCase.execute({
            user_id: user.id as string,
            type: "withdraw" as OperationType,
            amount: 10,
            description: "Test operation",
        });

        expect(statementDeposit).toHaveProperty("id");
        expect(statementWithdraw).toHaveProperty("id");
    })

    it("should not to be able to withdraw with InsufficientFunds", async () => {
        expect(async () => {
            const user = await usersRepositoryInMemory.create({
                name: "Test",
                email: "test@test.com",
                password: "123456",
            });

            await createStatementUseCase.execute({
                user_id: user.id as string,
                type: "withdraw" as OperationType,
                amount: 20,
                description: "Test operation",
            });

        }).rejects.toBeInstanceOf(CreateStatementError.InsufficientFunds);
    })
})