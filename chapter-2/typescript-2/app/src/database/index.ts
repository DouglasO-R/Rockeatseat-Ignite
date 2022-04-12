import { DataSource } from "typeorm";
import { User } from "../modules/Accounts/Users/Entities/User";
import { Category } from "../modules/Cars/Categories/Entities/Category";
import { Specification } from "../modules/Cars/Specification/Entities/Specification";

const appDatasource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "root",
    database: "rentx",
    synchronize: false,
    logging: false,
    entities: [Category, , User],
    subscribers: [],
    migrations: [
        "src/database/migration",
        "src/database/migration/**.ts",        
    ]
});


export {
    appDatasource
}