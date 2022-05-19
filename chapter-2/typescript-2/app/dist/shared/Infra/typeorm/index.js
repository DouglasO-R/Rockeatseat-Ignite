"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appDatasource = void 0;

var _typeorm = require("typeorm");

const appDatasource = new _typeorm.DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "root",
  database: process.env.NODE_ENV === "test" ? "rentx_test" : "rentx",
  synchronize: false,
  logging: false,
  entities: ["src/modules/**/Infra/typeorm/Entities/**", "src/modules/Cars/Infra/typeorm/Entities/**", "src/modules/Accounts/Infra/typeorm/Entities/**", "src/modules/Rentals/Infra/typeorm/Entities/**"],
  subscribers: [],
  migrations: ["src/shared/Infra/typeorm/migration", "src/shared/Infra/typeorm/migration/**.ts"]
});
exports.appDatasource = appDatasource;