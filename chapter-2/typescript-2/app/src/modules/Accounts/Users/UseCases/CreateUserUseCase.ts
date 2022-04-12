import { inject, injectable } from "tsyringe";
import {hash} from "bcrypt";
import { ICreateUserDTO } from "@modules/Accounts/Users/Dto/ICreateUserDTO";
import { IUserRepository } from "@modules/Accounts/Users/Repository/IUserRepository";
import { AppError } from "@errors/AppError";

@injectable()
export class CreateUserUseCase {


    constructor(
        @inject("PostgresUserRepository")
        private userRepository:IUserRepository
    ){}

    async with(data:ICreateUserDTO):Promise<void>{
        const {password,driver_license,email,name} = data;

        const userAlreadyExist = await this.userRepository.findByEmail(email);

        if(userAlreadyExist){
            throw new AppError("User Already Exist");
        }

        const passwordHash = await hash(password,8);

        await this.userRepository.create({password:passwordHash,driver_license,email,name});
    }
}