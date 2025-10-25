import { IUserRepository } from "@/src/data/repositories/UserRepository";

export class GetEdadUseCase {
    constructor(private userRepository: IUserRepository) { }

    execute(): number {
        return this.userRepository.getUserAge();
    }
}

export default GetEdadUseCase;