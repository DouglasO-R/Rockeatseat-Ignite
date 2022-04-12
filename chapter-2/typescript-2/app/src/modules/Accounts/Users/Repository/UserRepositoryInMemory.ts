import { ICreateUserDTO } from "../Dto/ICreateUserDTO";
import { User } from "../Entities/User";
import { IUserRepository } from "./IUserRepository";


export class UserRepositoryInMemory implements IUserRepository {

    private users: User[];
    private static INSTANCE: UserRepositoryInMemory;

    private constructor() {
        this.users = [];
    }

    public static getInstance(): UserRepositoryInMemory {
        if (!UserRepositoryInMemory.INSTANCE) {
            UserRepositoryInMemory.INSTANCE = new UserRepositoryInMemory();
        }
        return UserRepositoryInMemory.INSTANCE;
    }

    async create(data: ICreateUserDTO): Promise<void> {
        const user = new User();
        Object.assign(user, { ...data });

        await this.users.push(user);
    }


    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email);
    }

    async findById(id: string): Promise<User> {
        return this.users.find((user) => user.id === id);
    }

}
