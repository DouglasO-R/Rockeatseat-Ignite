"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _App = require("@shared/Infra/Http/App");

var _typeorm = require("@shared/Infra/typeorm");

var _bcrypt = require("bcrypt");

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Create Category Controller", () => {
  let dataSource;
  beforeAll(async () => {
    dataSource = await _typeorm.appDatasource.initialize();
    await dataSource.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcrypt.hash)("admin", 8);
    await dataSource.query(`INSERT INTO USERS(id,name,email,password,"isAdmin",created_At,driver_license)
                values('${id}','admin','admin@rentx.com','${password}', true, 'now()', 'XXXX')
            `);
  });
  afterAll(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
  });
  test("should be able to create a category", async () => {
    const responseToken = await (0, _supertest.default)(_App.app).post("/users/auth").send({
      password: "admin",
      email: "admin@rentx.com"
    });
    const {
      refresh_token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_App.app).post("/categories").send({
      name: "Supertest",
      description: "Supertest"
    }).set({
      authorization: `Bearer ${refresh_token}`
    });
    expect(response.status).toBe(201);
  });
  test("should not be able to create a category with name already exist", async () => {
    const responseToken = await (0, _supertest.default)(_App.app).post("/users/auth").send({
      password: "admin",
      email: "admin@rentx.com"
    });
    const {
      refresh_token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_App.app).post("/categories").send({
      name: "Supertest",
      description: "Supertest"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    expect(response.status).toBe(400);
  });
});