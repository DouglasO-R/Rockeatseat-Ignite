import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { IUserRepository } from "@modules/Accounts/Users/Repository/IUserRepository";
import { AppError } from "@errors/AppError";

interface IRequestAuth {
    email: string;
    password: string;
}

interface IResponseAuth{
    user:{
        name:string,
        email:string
    },
    token:string;
}

@injectable()
export class AuthenticateUserUseCase {

    constructor(
        @inject("PostgresUserRepository")
        private userRepository: IUserRepository
    ) { }


    async auth({ email, password }: IRequestAuth):Promise<IResponseAuth> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or Password incorrect");
        }

        const passworMatch = await compare(password, user.password);

        if (!passworMatch) {
            throw new AppError("Email or Password incorrect");
        }

        const token = sign({},"secretKey",{
            subject:user.id,
            expiresIn:"1d"
        });

        const tokenReturn : IResponseAuth = {
            token,
            user:{
                name:user.name,
                email:user.email
            }
        };

        return tokenReturn;
    }
}