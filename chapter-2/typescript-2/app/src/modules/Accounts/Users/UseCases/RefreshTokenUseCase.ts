import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUsersTokenRepository } from "../Repository/IUsersTokenRepository";

interface IPayload {
    sub:string;
    email:string;
}

interface ITokenResponse {
    token:string;
    refresh_token:string;
}

@injectable()
export class RefreshTokenUseCase {

    constructor(
        @inject("OrmUsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dateProvider:IDateProvider
    ) { }

    async by(token: string):Promise<ITokenResponse> {
        const { sub,email} = verify(token, auth.secret_refresh_token) as IPayload;
        const user_id = sub;
        const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(user_id,token);

        if (!userToken) {
            throw new AppError("Refresh Token Error!");
        }

        await this.usersTokenRepository.deleteById(userToken.id);

        const refresh_token = sign({email},auth.secret_refresh_token,{
            subject:sub,
            expiresIn:auth.expires_in_refresh_token
        });

        const expires_date = this.dateProvider.addDays(auth.expires_in_refresh_token_days);


        await this.usersTokenRepository.create({
            expires_date,
            refresh_token,
            user_id
        });

        const newToken = sign({}, auth.secret_token, {
            subject: user_id,
            expiresIn: auth.expires_in_token
        });

        return {
            refresh_token,
            token:newToken
        };
    }
}