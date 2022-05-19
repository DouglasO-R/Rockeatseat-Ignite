import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../Repository/IUserRepository";
import { IUsersTokenRepository } from "../Repository/IUsersTokenRepository";


interface IRequest {
    token: string;
    password: string;
}


@injectable()
export class ResetPasswordUseCase {

    constructor(
        @inject("OrmUserRepository")
        private userRepository: IUserRepository,
        @inject("OrmUsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ) { }

    async by({ token, password }: IRequest):Promise<void> {
        const userToken = await this.usersTokenRepository.findByByRefreshToken(token);

        if (!userToken) {
            throw new AppError("Token Invalid");
        }

        const compareTokenExpireDate = this.dateProvider.compareIfBefore(userToken.expires_date,this.dateProvider.dateNow());

        if(compareTokenExpireDate){
            throw new AppError("Token expired!");
        }

        const user = await this.userRepository.findById(userToken.user_id);

        user.password = await hash(password,8);

        await this.userRepository.create(user);
        await this.usersTokenRepository.deleteById(userToken.id);
    }
}