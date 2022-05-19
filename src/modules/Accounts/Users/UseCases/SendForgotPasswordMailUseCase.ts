import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { IUserRepository } from "../Repository/IUserRepository";
import { IUsersTokenRepository } from "../Repository/IUsersTokenRepository";
import { resolve } from "path";


@injectable()
export class SendForgotPasswordMailUseCase {

    constructor(
        @inject("OrmUserRepository")
        private userRepository: IUserRepository,
        @inject("OrmUsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider,
    ) { }
    async by(email: string) {
        const user = await this.userRepository.findByEmail(email);
        const templatePath = resolve(__dirname,"..","Views","email");

        if (!user) {
            throw new AppError("User does not exists");
        }

        const token = uuidV4();

        const expires_date = this.dateProvider.addHours(3);

        await this.usersTokenRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date
        });
        const variables = {
            name:user.name,
            link:`${process.env.FORGOT_MAIL_URL}${token}`,
        };
        
        await this.mailProvider.sendEmail(email, "Recuperação de senha", variables,templatePath);

    }
}