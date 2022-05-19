"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterTableUserAddColumAvatar1649439508222 = void 0;

var _typeorm = require("typeorm");

class AlterTableUserAddColumAvatar1649439508222 {
  async up(queryRunner) {
    await queryRunner.addColumn("users", new _typeorm.TableColumn({
      name: "avatar",
      type: "varchar",
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn("users", "avatar");
  }

}

exports.AlterTableUserAddColumAvatar1649439508222 = AlterTableUserAddColumAvatar1649439508222;