"use strict";

var _AuthenticateUserUseCase = require("@modules/Accounts/Users/UseCases/AuthenticateUserUseCase");

var _CreateUserUseCase = require("@modules/Accounts/Users/UseCases/CreateUserUseCase");

var _UserRepositoryInMemory = require("@modules/Accounts/Users/Repository/UserRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _UsersTokenRepositoryInMemory = require("../Repository/UsersTokenRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/Implementations/DayjsDateProvider");

describe("Authenticate User", () => {
  let createUser;
  let authenticate;
  let userRepositoryInMemory;
  let userTokenRepository;
  let dayjsDateProvider;
  beforeEach(() => {
    userRepositoryInMemory = _UserRepositoryInMemory.UserRepositoryInMemory.getInstance();
    userTokenRepository = new _UsersTokenRepositoryInMemory.UsersTokenRepositoryInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticate = new _AuthenticateUserUseCase.AuthenticateUserUseCase(userRepositoryInMemory, userTokenRepository, dayjsDateProvider);
    createUser = new _CreateUserUseCase.CreateUserUseCase(userRepositoryInMemory);
  });
  test("should be able to authenticate a user", async () => {
    const user = {
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
    }).rejects.toBeInstanceOf(_AppError.AppError);
  });
  test("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user = {
        driver_license: "00123",
        email: "false@email.com",
        name: "testError",
        password: "1234"
      };
      await createUser.with(user);
      await authenticate.auth({
        email: user.email,
        password: "incorrect-password"
      });
    }).rejects.toBeInstanceOf(_AppError.AppError);
  });
});