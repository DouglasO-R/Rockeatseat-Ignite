import request from "supertest";
import { app } from "@shared/Infra/Http/App";
import { appDatasource } from "@shared/Infra/typeorm";
import { DataSource } from "typeorm";
import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

describe("Create Category Controller", () => {
    let dataSource: DataSource;

    beforeAll(async () => {
        dataSource = await appDatasource.initialize();
        await dataSource.runMigrations();

        const id = uuidV4();
        const password = await hash("admin", 8);
        await dataSource.query(
            `INSERT INTO USERS(id,name,email,password,"isAdmin",created_At,driver_license)
                values('${id}','admin','admin@rentx.com','${password}', true, 'now()', 'XXXX')
            `
        );

    });

    afterAll(async () => {
        await dataSource.dropDatabase();
        await dataSource.destroy();
    });

    test("should be able to create a category", async () => {
        const responseToken = await request(app).post("/users/auth").send({
            password: "admin",
            email: "admin@rentx.com"
        });
        const { refresh_token } = responseToken.body;
        
        const response = await request(app).post("/categories").send({
            name: "Supertest",
            description: "Supertest"
        }).set({
            authorization: `Bearer ${refresh_token}`,
        });

        expect(response.status).toBe(201);
    });

    test("should not be able to create a category with name already exist", async () => {
        const responseToken = await request(app).post("/users/auth").send({
            password: "admin",
            email: "admin@rentx.com"
        });
        const { refresh_token } = responseToken.body;

        const response = await request(app).post("/categories").send({
            name: "Supertest",
            description: "Supertest"
        }).set({
            Authorization: `Bearer ${refresh_token}`,
        });

        expect(response.status).toBe(400);
    });
})