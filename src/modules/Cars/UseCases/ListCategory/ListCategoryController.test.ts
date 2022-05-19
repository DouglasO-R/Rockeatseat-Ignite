import request from "supertest";
import { app } from "@shared/Infra/Http/App";
import { appDatasource } from "@shared/Infra/typeorm";
import { DataSource } from "typeorm";


describe("Create Category Controller", () => {
    let dataSource: DataSource;

    beforeAll(async () => {
        dataSource = await appDatasource.initialize();
        await dataSource.runMigrations();
    });

    afterAll(async () => {
        await dataSource.dropDatabase();
        await dataSource.destroy();
    });

    test("should be able to list all categories", async () => {

        const response = await request(app).get("/categories").send();

        expect(response.status).toBe(200);
    });

    
})