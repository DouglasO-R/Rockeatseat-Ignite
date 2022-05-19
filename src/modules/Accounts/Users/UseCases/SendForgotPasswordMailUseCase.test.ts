import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayjsDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { EtherealMailProvider } from "@shared/container/providers/MailProvider/implementations/EtherealMailProvider";
import { AppError } from "@shared/errors/AppError";
import { UserRepositoryInMemory } from "../Repository/UserRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "../Repository/UsersTokenRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

export class MailProviderInMemory implements IMailProvider{
    constructor(){}

    async sendEmail(to: string, subject: string, variables: any, path: string): Promise<void> {
    }
}


describe("Send Forgot Email", () => {

    let sendForgotPasswordMail: SendForgotPasswordMailUseCase;
    let usersRepositoryInMemory: UserRepositoryInMemory;
    let usersTokenRepositoryInMemory:UsersTokenRepositoryInMemory;
    let dateProvider: DayjsDateProvider;
    let mailProvider: MailProviderInMemory;

    beforeAll(async () => {
        mailProvider = new MailProviderInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
        usersRepositoryInMemory = UserRepositoryInMemory.getInstance();
        sendForgotPasswordMail = new SendForgotPasswordMailUseCase(usersRepositoryInMemory,usersTokenRepositoryInMemory,dateProvider,mailProvider);
    });

    test("should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider,"sendEmail");

        await usersRepositoryInMemory.create({
            name:"test",
            driver_license:"666789",
            email:"test@tes.com",
            password:"1234",
        });

        await sendForgotPasswordMail.by("test@tes.com");
        expect(sendMail).toHaveBeenCalled();
    });

    test("should not be able to send a email if user does not exists", async () => {

        await expect(sendForgotPasswordMail.by("fgh@sdf.com")).rejects.toEqual(new AppError("User does not exists"));
    });

    test("should be able to create a users tokenr", async () => {
        const generateTokenMail = jest.spyOn(usersTokenRepositoryInMemory,"create");

        await usersRepositoryInMemory.create({
            name:"test",
            driver_license:"666789",
            email:"fggd@dgdfg.com",
            password:"1234",
        });

        await sendForgotPasswordMail.by("fggd@dgdfg.com");
        expect(generateTokenMail).toHaveBeenCalled();
    });
})