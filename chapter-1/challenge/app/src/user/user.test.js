import request from "supertest";
import { validate } from "uuid";
import { app } from "./../App.js";

describe("Http User ", () => {
    
    test("create user", async () => {
        const response = await request(app).post('/users').send({
            name:"douglas",
            username:"doug"
        });

        expect(response.status).toBe(201);
        expect(validate(response.body.id)).toBe(true);

        expect(response.body).toMatchObject({
            name:"douglas",
            username:"doug",
            todos:[]
        });
    });

    test("should not be able to create user when username exist",async ()=>{
        const response = await request(app).post('/users').send({
            name:"douglas",
            username:"doug"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBeTruthy();
        expect(response.body.error).toBe("Username Already Exists");

    });

    test("should not be able to create a user without name and username", async () => {
        const response = await request(app).post('/users').send();

        expect(response.status).toBe(400);
        expect(response.body.error).toBeTruthy();
        expect(response.body.error).toBe("Informa name and username");
    });
});