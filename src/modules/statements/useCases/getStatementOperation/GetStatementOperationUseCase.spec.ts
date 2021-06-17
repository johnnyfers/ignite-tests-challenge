import { InMemoryStatementsRepository } from '../../repositories/in-memory/InMemoryStatementsRepository';
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";

let usersRepositoryInMemory: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let getStatementOperationUseCase: GetStatementOperationUseCase;

enum OperationType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

describe('Show User Profile', () => {

    beforeEach(() => {
        inMemoryStatementsRepository = new InMemoryStatementsRepository();
        usersRepositoryInMemory = new InMemoryUsersRepository()
        getStatementOperationUseCase = new GetStatementOperationUseCase(usersRepositoryInMemory, inMemoryStatementsRepository );
    });

    it("should be able to show the user profile.", async () => {
        const user = await usersRepositoryInMemory.create({
            name: "Test",
            email: "test@test.com",
            password: "123456",
        });

        const getStatement = await inMemoryStatementsRepository.create({
            user_id: user.id as string,
            type: 'deposit' as OperationType,
            amount: 20,
            description: "Test operation"
        })

        const getStatementOP = await getStatementOperationUseCase.execute({user_id: user.id as string, statement_id: getStatement.id as string})

        expect(getStatementOP.id).toBe(getStatement.id);
    });

})