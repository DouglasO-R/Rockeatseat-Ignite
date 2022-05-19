"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _App = require("@shared/Infra/Http/App");

var _typeorm = require("@shared/Infra/typeorm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Create Category Controller", () => {
  let dataSource;
  beforeAll(async () => {
    dataSource = await _typeorm.appDatasource.initialize();
    await dataSource.runMigrations();
  });
  afterAll(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
  });
  test("should be able to list all categories", async () => {
    const response = await (0, _supertest.default)(_App.app).get("/categories").send();
    expect(response.status).toBe(200);
  });
});