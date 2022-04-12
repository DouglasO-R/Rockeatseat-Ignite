import { ICreateUserDTO } from "../Dto/ICreateUserDTO";
import { User } from "../Entities/User";

export interface IUserRepository {
    create(data:ICreateUserDTO):Promise<void>;
    findByEmail(email:string):Promise<User>;
    findById(id: string): Promise<User>;
}