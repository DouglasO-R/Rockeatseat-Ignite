import request from "supertest";
import { validate } from "uuid";
import { app } from "./../App.js";

describe("Http todos ", () => {

    test("should be able to list all user's todo", async () => {
        const userResponse = await request(app).post("/users").send({
            name: "douglas test",
            username: "doug test"
        });

        const date = new Date();
        const todoResponse = await request(app).post("/todos").send({
            title: "test todo",
            deadline: date
        }).set("username", userResponse.body.username);

        const response = await request(app).get('/todos').set("username", userResponse.body.username);
        expect(response.body).toEqual(
            expect.arrayContaining([
                todoResponse.body
            ])
        );

        expect(response.status).toBe(200);
    });

    test("should not be able to use todo system withou a valid username", async () => {
        const date = new Date();
        const response = await request(app).post("/todos").send({
            title:"test",
            deadline:date
        });

        expect(response.body.error).toBeTruthy();
        expect(response.body.error).toBe("User Not Exist");
    });

    test("should not be able to create a todo withoud title and deadline",async () => {
        const userResponse = await request(app).post('/users').send({
            name: "douglas",
            username: "doug14"
        });

        const date = new Date();
        const response = await request(app).post("/todos")
        .send().set("username", userResponse.body.username);

        expect(response.body.error).toBeTruthy();
        expect(response.body.error).toBe("inform title and deadline");
    });

    test("should be able to create a new todo", async () => {
        const userResponse = await request(app).post('/users').send({
            name: "douglas",
            username: "doug"
        });

        const date = new Date();

        const response = await request(app).post("/todos").send({
            title: "test todo",
            deadline: date
        }).set("username", userResponse.body.username);

        expect(response.status).toBe(201);
        expect(validate(response.body.id)).toBe(true);
        expect(response.body.created_at).toBeTruthy();

        expect(response.body).toMatchObject({
            title: 'test todo',
            deadline: date.toISOString(),
            done: false
        });

    });

    test("should be able to update a todo", async () => {
        const userResponse = await request(app).post('/users').send({
            name: "douglas5",
            username: "doug5"
        });

        const date = new Date();

        const todoResponse = await request(app).post("/todos").send({
            title: "test todo",
            deadline: date
        }).set("username", userResponse.body.username);


        const response = await request(app).put(`/todos/${todoResponse.body.id}`).send({
            title: "test update",
        })
            .set("username", userResponse.body.username);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            title: "test update",
            deadline: date.toISOString(),
            done: false
        })
    });

    test("should not be able to update a non exist todo", async () => {
        // create a user
        const userResponse = await request(app).post('/users').send({
            name: "douglas6",
            username: "doug6"
        });

        // invalid todo
        const date = new Date();
        const response = await request(app).put("/todos/invalid-id").send({
            title: "test invalid",
            deadline: date
        }).set("username", userResponse.body.username);

        expect(response.status).toBe(404);
        expect(response.body.error).toBeTruthy()
        expect(response.body.error).toBe("Todo Not Exist");
    });

    test("should be able to mark a todo as done", async () => {
        // create a user
        const userResponse = await request(app).post('/users').send({
            name: "douglas7",
            username: "doug7"
        });

        // create a todo
        const date = new Date();
        const todoResponse = await request(app).post("/todos").send({
            title: "test done",
            deadline: date
        }).set("username", userResponse.body.username);

        const response = await request(app).patch(`/todos/${todoResponse.body.id}/done`)
            .set("username", userResponse.body.username);

        expect(response.status).toBe(200);
        expect(response.body.done).toBe(true);
        expect(response.body).toMatchObject({
            ...todoResponse.body,
            done: true
        });
    });

    test("should not be able no mark a non existing todo as done", async () => {
        // create a user
        const userResponse = await request(app).post('/users').send({
            name: "douglas8",
            username: "doug8"
        });

        const date = new Date();
        const response = await request(app).patch("/todos/invalid-id/done").send({
            title: "test done",
            deadline: date
        }).set("username", userResponse.body.username);

        expect(response.status).toBe(404);
        expect(response.body.error).toBeTruthy();
        expect(response.body.error).toBe("Todo Not Exist");
    });

    test("should be able to delete a todo", async () => {
        const userResponse = await request(app)
            .post('/users')
            .send({
                name: 'John Doe',
                username: 'user5'
            });

        const todoDate = new Date();
        const todo1Response = await request(app)
            .post('/todos')
            .send({
                title: 'test todo',
                deadline: todoDate
            })
            .set('username', userResponse.body.username);

        await request(app)
            .delete(`/todos/${todo1Response.body.id}`)
            .set('username', userResponse.body.username)
            .expect(204);
    });

    test("should not be able to delete a todo", async () => {
        // create a user
        const userResponse = await request(app).post('/users').send({
            name: "douglas8",
            username: "doug18"
        });

        const response = await request(app).delete(`/todos/invalid-id`)
            .set("username", userResponse.body.username);

        expect(response.status).toBe(404);
        expect(response.body.error).toBeTruthy();
        expect(response.body.error).toBe("Todo Not Exist");

    });

});