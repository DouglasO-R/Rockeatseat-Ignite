import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableCarsSpecifications1650343436269 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "cars_specifications",
                    columns: [
                        {
                            name: "car_id",
                            type: "uuid"
                        },
                        {
                            name:"specification_id",
                            type:"uuid"
                        },
                        {
                            name:"created_at",
                            type:"timestamp",
                            default:"now()"
                        }
                    ]
                }
            )
        );

        await queryRunner.createForeignKey(
            "cars_specifications",
            new TableForeignKey({
                name:"FkSpecificationCar",
                referencedTableName:"specifications",
                referencedColumnNames:["id"],
                columnNames:["specification_id"],
                onDelete:"SET NULL",
                onUpdate:"SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            "cars_specifications",
            new TableForeignKey({
                name:"FkCarSpecification",
                referencedTableName:"cars",
                referencedColumnNames:["id"],
                columnNames:["car_id"],
                onDelete:"SET NULL",
                onUpdate:"SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("cars_specifications","FkSpecificationCar");
        await queryRunner.dropForeignKey("cars_specifications","FkCarSpecification");
        await queryRunner.dropTable("cars_specifications");
    }

}
