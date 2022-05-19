import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { IUserRepository } from "@modules/Accounts/Users/Repository/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { IUsersTokenRepository } from "../Repository/IUsersTokenRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequestAuth {
    email: string;
    password: string;
}

interface IResponseAuth {
    token: string;
    user: {
        name: string,
        email: string
    },
    refresh_token:string
}

@injectable()
export class AuthenticateUserUseCase {

    constructor(
        @inject("OrmUserRepository")
        private userRepository: IUserRepository,
        @inject("OrmUsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dateProvider:IDateProvider
    ) { }


    async auth({ email, password }: IRequestAuth): Promise<IResponseAuth> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or Password incorrect !", 400);
        }

        const passworMatch = await compare(password, user.password);

        if (!passworMatch) {
            throw new AppError("Email or Password incorrect !", 400);
        }

        const token = sign({}, auth.secret_token, {
            subject: user.id,
            expiresIn: auth.expires_in_token
        });

        const refresh_token = sign({ email }, auth.secret_refresh_token,{
            subject:user.id,
            expiresIn:auth.expires_in_refresh_token
        });

        const refresh_token_expires_date = this.dateProvider.addDays(auth.expires_in_refresh_token_days);

        await this.usersTokenRepository.create({
            expires_date:refresh_token_expires_date,
            refresh_token,
            user_id: user.id
        })

        const tokenReturn: IResponseAuth = {
            user: {
                name: user.name,
                email: user.email
            },
            token,
            refresh_token
        };

        return tokenReturn;
    }
}