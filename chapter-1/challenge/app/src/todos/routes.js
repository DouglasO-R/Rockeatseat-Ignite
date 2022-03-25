import { Router } from "express";
import { users } from "../databse/userDb.js";
import { v4 as uuidV4 } from "uuid";

const routes = Router();

function verifyIfUsernameExist(request, response, next) {
    try {
        const { username } = request.headers;
        const user = users.find((user) => user.username === username);

        if (!user) {
            throw new Error("User Not Exist");
        }

        request.user = user;

        return next();

    } catch (error) {
        return response.status(404).json({ error: error.message });
    }

}

routes.get('/todos', verifyIfUsernameExist, async (request, response) => {
    try {
        const { user } = request;

        return response.status(200).json(user.todos);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }

});

routes.post('/todos', verifyIfUsernameExist, async (request, response) => {
    try {
        const { user } = request;
        const { title, deadline } = request.body;

        if (!title || !deadline) {
            throw new Error("inform title and deadline");

        }

        const todo = {
            id: uuidV4(),
            title,
            done: false,
            deadline: new Date(deadline),
            created_at: new Date()
        }

        user.todos.push(todo);

        return response.status(201).json(todo);

    } catch (error) {
        return response.status(400).json({ error: error.message })
    }
});

routes.put('/todos/:id', verifyIfUsernameExist, async (request, response) => {
    try {
        const { user } = request;
        const { id } = request.params;
        const { title, deadline } = request.body;


        const todo = user.todos.find((todo) => todo.id === id);

        if (!todo) {
            throw new Error("Todo Not Exist");
        }

        todo.title = title;
        todo.dealine = new Date(deadline);

        return response.status(200).json(todo);

    } catch (error) {
        return response.status(404).json({ error: error.message });

    }
});

routes.patch('/todos/:id/done', verifyIfUsernameExist, async (request, response) => {
    try {
        const { user } = request;
        const { id } = request.params;
        const todo = user.todos.find((todo) => todo.id === id);

        if (!todo) {
            throw new Error("Todo Not Exist");
        }

        todo.done = true;

        return response.status(200).json(todo);

    } catch (error) {

        return response.status(404).json({ error: error.message });
    }

});

routes.delete('/todos/:id', verifyIfUsernameExist, async (request, response) => {
    try {
        const { user } = request;
        const { id } = request.params;

        const todoIndex = user.todos.findIndex((todo) => todo.id === id);

        if (todoIndex === -1) {
            throw new Error("Todo Not Exist");
        }
        user.todos.splice(todoIndex, 1);

        return response.status(204).location("/todos").send();

    } catch (error) {

        return response.status(404).json({ error: error.message });
    }
});

export default routes;