import { Router } from "express";
import { v4 as uuidV4 } from "uuid";
import { User } from "./userModel.js";
import { users } from "../databse/userDb.js";

const routes = Router();

routes.post('/users', async (request, response) => {
    try {
        const { name, username } = request.body;

        if (!name || !username) {
            throw new Error("Informa name and username");
        }

        const userAlreadyExist = users.some((user) => user.username === username);

        if (userAlreadyExist) {
            throw new Error("Username Already Exists");
        }

        const user = new User(name,username);

        users.push(user);

        response.status(201).json(user);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }

});

export default routes;