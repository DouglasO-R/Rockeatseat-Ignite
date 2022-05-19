"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTableCarsSpecifications1650343436269 = void 0;

var _typeorm = require("typeorm");

class CreateTableCarsSpecifications1650343436269 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "cars_specifications",
      columns: [{
        name: "car_id",
        type: "uuid"
      }, {
        name: "specification_id",
        type: "uuid"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
    await queryRunner.createForeignKey("cars_specifications", new _typeorm.TableForeignKey({
      name: "FkSpecificationCar",
      referencedTableName: "specifications",
      referencedColumnNames: ["id"],
      columnNames: ["specification_id"],
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
    await queryRunner.createForeignKey("cars_specifications", new _typeorm.TableForeignKey({
      name: "FkCarSpecification",
      referencedTableName: "cars",
      referencedColumnNames: ["id"],
      columnNames: ["car_id"],
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey("cars_specifications", "FkSpecificationCar");
    await queryRunner.dropForeignKey("cars_specifications", "FkCarSpecification");
    await queryRunner.dropTable("cars_specifications");
  }

}

exports.CreateTableCarsSpecifications1650343436269 = CreateTableCarsSpecifications1650343436269;