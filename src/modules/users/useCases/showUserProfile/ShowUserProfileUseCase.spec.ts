import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let showUserProfileUseCase: ShowUserProfileUseCase;
let usersRepository: InMemoryUsersRepository;

describe('Show User Profile',()=>{

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        showUserProfileUseCase = new ShowUserProfileUseCase(usersRepository);
      });
    
      it("should be able to show the user profile.", async () => {
        const user = await usersRepository.create({
          name: "Test",
          email: "test@test.com",
          password: "123456",
        });
    
        const userReturn = await showUserProfileUseCase.execute(user.id as string);
    
        expect(userReturn.id).toBe(user.id);
      });
    

})