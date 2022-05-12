import { ICreateUserDTO } from "../Dto/ICreateUserDTO"
import { AuthenticateUserUseCase } from "@modules/Accounts/Users/UseCases/AuthenticateUserUseCase";
import { CreateUserUseCase } from "@modules/Accounts/Users/UseCases/CreateUserUseCase";
import { UserRepositoryInMemory } from "@modules/Accounts/Users/Repository/UserRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { UsersTokenRepositoryInMemory } from "../Repository/UsersTokenRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayjsDateProvider";

describe("Authenticate User", () => {
    let createUser: CreateUserUseCase;
    let authenticate: AuthenticateUserUseCase;
    let userRepositoryInMemory: UserRepositoryInMemory;
    let userTokenRepository: UsersTokenRepositoryInMemory;
    let dayjsDateProvider:DayjsDateProvider;

    beforeEach(() => {
        userRepositoryInMemory = UserRepositoryInMemory.getInstance();
        userTokenRepository = new UsersTokenRepositoryInMemory;
        dayjsDateProvider = new DayjsDateProvider();
        authenticate = new AuthenticateUserUseCase(userRepositoryInMemory,userTokenRepository,dayjsDateProvider);
        createUser = new CreateUserUseCase(userRepositoryInMemory);
    });

    test("should be able to authenticate a user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "test",
            name: "test",
            password: "test"
        };

        await createUser.with(user);
        const token = await authenticate.auth({
            email: user.email,
            password: user.password
        });

        expect(token).toHaveProperty("token");
    });

    test("shloud not be able authenticate  a nonexist user", () => {
        expect(async () => {
            await authenticate.auth({
                email: "nonexist-email",
                password: "nonexist-password"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    test("should not be able to authenticate with incorrect password", () => {
        expect(async () => {
            const user = {
                driver_license:"00123",
                email:"false@email.com",
                name:"testError",
                password:"1234"
            }
            await createUser.with(user);

            await authenticate.auth({
                email:user.email,
                password:"incorrect-password"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
})