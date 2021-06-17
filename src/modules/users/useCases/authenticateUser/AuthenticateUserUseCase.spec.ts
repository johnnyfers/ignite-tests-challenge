import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let createUserUseCase: CreateUserUseCase
let inMemoryUsersRepository: InMemoryUsersRepository
let authUserUseCase: AuthenticateUserUseCase

describe('User Auth', ()=> {

    beforeEach(()=>{
        inMemoryUsersRepository = new InMemoryUsersRepository()
        authUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository)
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    })

    it('should be able to auth an user', async ()=>{
        const user = {
            name: 'test',
            email: 'teste@test.com',
            password: 'testPassword'
        }
        await createUserUseCase.execute(user)
    
        const { token } = await authUserUseCase.execute({email: user.email, password: user.password})

        expect(token).not.toBeNull()
    })
})