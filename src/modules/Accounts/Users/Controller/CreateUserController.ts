import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "../UseCases/CreateUserUseCase";


export class CreateUserController {

    static async handle(request: Request, response: Response): Promise<Response> {
        try {
            // const {driver_license,email,name,password,username} = request.body;
            const createUser = container.resolve(CreateUserUseCase);

            await createUser.with(request.body);

            return response.status(201).location("/").send();

        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}