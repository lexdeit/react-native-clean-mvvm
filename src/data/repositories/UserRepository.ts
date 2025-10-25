import { User } from "@/src/domains/models/User";

export interface IUserRepository {
    getUserName(): string;
    getUserAge(): number;
    getUser(): User;
}

export class UserRepository implements IUserRepository {
    getUserName(): string {
        return "Emmanuel Villavicencio";
    }

    getUserAge(): number {
        return 24;
    }

    getUser(): User {
        return {
            name: this.getUserName(),
            age: this.getUserAge()
        };
    }
}