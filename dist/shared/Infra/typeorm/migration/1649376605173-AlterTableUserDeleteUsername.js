"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterTableUserDeleteUsername1649376605173 = void 0;

var _typeorm = require("typeorm");

class AlterTableUserDeleteUsername1649376605173 {
  async up(queryRunner) {
    await queryRunner.dropColumn("users", "username");
  }

  async down(queryRunner) {
    await queryRunner.addColumn("users", new _typeorm.TableColumn({
      name: "username",
      type: "varchar",
      isNullable: true
    }));
  }

}

exports.AlterTableUserDeleteUsername1649376605173 = AlterTableUserDeleteUsername1649376605173;