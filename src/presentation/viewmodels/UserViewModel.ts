import { useState, useEffect } from 'react';
import { User } from '@/src/domains/models/User';
import { UserRepository, IUserRepository } from '../../data/repositories/UserRepository';
import GetUserUseCase from '@/src/domains/usecases/GetUserUseCase';
import GetEdadUseCase from '@/src/domains/usecases/GetEdadUseCase';


export interface UserViewModelType {
    user: User | null;
    edad: number | null;
    isLoading: boolean;
    refreshData: () => void;
}

export class UserViewModel {
    private userRepository: IUserRepository;
    private getUserUseCase: GetUserUseCase;
    private getEdadUseCase: GetEdadUseCase;

    constructor() {
        this.userRepository = new UserRepository();
        this.getUserUseCase = new GetUserUseCase(this.userRepository);
        this.getEdadUseCase = new GetEdadUseCase(this.userRepository);
    }

    getUser(): User {
        return this.getUserUseCase.execute();
    }

    getUserAge(): number {
        return this.getEdadUseCase.execute();
    }
}

// Hook personalizado para usar el ViewModel en React
export const useUserViewModel = (): UserViewModelType => {
    const [user, setUser] = useState<User | null>(null);
    const [edad, setEdad] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [viewModel] = useState<UserViewModel>(new UserViewModel());

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = (): void => {
        setIsLoading(true);
        try {
            const userData = viewModel.getUser();
            const userAge = viewModel.getUserAge();

            setUser(userData);
            setEdad(userAge);
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        user,
        edad,
        isLoading,
        refreshData: loadUserData
    };
};

export default UserViewModel;