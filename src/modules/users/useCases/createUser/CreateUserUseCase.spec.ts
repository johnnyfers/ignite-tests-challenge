import {InMemoryUsersRepository} from '../../repositories/in-memory/InMemoryUsersRepository'
import {CreateUserUseCase} from './CreateUserUseCase'

let createUserUseCase: CreateUserUseCase
let inMemoryUsersRepository: InMemoryUsersRepository

describe('Create Statement', ()=> {

    beforeEach(()=>{
        inMemoryUsersRepository = new InMemoryUsersRepository()
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    })

    it('should be abe to create a statement', async()=>{
        const user = await createUserUseCase.execute({
            name: 'test',
            email: 'teste@test.com',
            password: 'test'
        })

        expect(user).toHaveProperty('id')
    })
})