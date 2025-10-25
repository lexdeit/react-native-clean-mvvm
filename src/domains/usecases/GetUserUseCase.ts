import { User, UserImpl } from '../models/User';
import { IUserRepository } from '@/src/data/repositories/UserRepository';

export class GetUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    execute(): User {
        const name = this.userRepository.getUserName();
        const age = this.userRepository.getUserAge();
        return new UserImpl(name, age);
    }
}

export default GetUserUseCase;