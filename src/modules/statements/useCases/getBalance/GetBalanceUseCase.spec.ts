import { InMemoryStatementsRepository } from '../../repositories/in-memory/InMemoryStatementsRepository';
import { GetBalanceUseCase } from "./GetBalanceUseCase";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";

let usersRepositoryInMemory: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let getBalanceUseCase: GetBalanceUseCase;

enum OperationType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

describe('Show User Profile', () => {

    beforeEach(() => {
        inMemoryStatementsRepository = new InMemoryStatementsRepository();
        usersRepositoryInMemory = new InMemoryUsersRepository()
        getBalanceUseCase = new GetBalanceUseCase(inMemoryStatementsRepository, usersRepositoryInMemory);
    });

    it("should be able to show the user profile.", async () => {
        const user = await usersRepositoryInMemory.create({
            name: "Test",
            email: "test@test.com",
            password: "123456",
        });

        await inMemoryStatementsRepository.create({
            user_id: user.id as string,
            type: 'deposit' as OperationType,
            amount: 20,
            description: "Test operation"
        })

        const getBalance = await getBalanceUseCase.execute({user_id: user.id as string});

        expect(getBalance.balance).toBe(20);
    });

})