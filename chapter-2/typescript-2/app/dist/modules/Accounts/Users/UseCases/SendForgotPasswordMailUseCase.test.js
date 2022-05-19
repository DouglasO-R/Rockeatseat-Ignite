"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailProviderInMemory = void 0;

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/Implementations/DayjsDateProvider");

var _AppError = require("@shared/errors/AppError");

var _UserRepositoryInMemory = require("../Repository/UserRepositoryInMemory");

var _UsersTokenRepositoryInMemory = require("../Repository/UsersTokenRepositoryInMemory");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

class MailProviderInMemory {
  constructor() {}

  async sendEmail(to, subject, variables, path) {}

}

exports.MailProviderInMemory = MailProviderInMemory;
describe("Send Forgot Email", () => {
  let sendForgotPasswordMail;
  let usersRepositoryInMemory;
  let usersTokenRepositoryInMemory;
  let dateProvider;
  let mailProvider;
  beforeAll(async () => {
    mailProvider = new MailProviderInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokenRepositoryInMemory = new _UsersTokenRepositoryInMemory.UsersTokenRepositoryInMemory();
    usersRepositoryInMemory = _UserRepositoryInMemory.UserRepositoryInMemory.getInstance();
    sendForgotPasswordMail = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokenRepositoryInMemory, dateProvider, mailProvider);
  });
  test("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendEmail");
    await usersRepositoryInMemory.create({
      name: "test",
      driver_license: "666789",
      email: "test@tes.com",
      password: "1234"
    });
    await sendForgotPasswordMail.by("test@tes.com");
    expect(sendMail).toHaveBeenCalled();
  });
  test("should not be able to send a email if user does not exists", async () => {
    await expect(sendForgotPasswordMail.by("fgh@sdf.com")).rejects.toEqual(new _AppError.AppError("User does not exists"));
  });
  test("should be able to create a users tokenr", async () => {
    const generateTokenMail = jest.spyOn(usersTokenRepositoryInMemory, "create");
    await usersRepositoryInMemory.create({
      name: "test",
      driver_license: "666789",
      email: "fggd@dgdfg.com",
      password: "1234"
    });
    await sendForgotPasswordMail.by("fggd@dgdfg.com");
    expect(generateTokenMail).toHaveBeenCalled();
  });
});