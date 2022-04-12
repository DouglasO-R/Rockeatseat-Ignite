import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "../UseCases/AuthenticateUserUseCase";


export class AuthUserController {

    static async handle(request: Request, response: Response): Promise<Response> {
        try {
           
            const authenticate = container.resolve(AuthenticateUserUseCase);
            const token = await authenticate.auth(request.body);

            return response.status(201).json(token);

        } catch (error) {

            return response.status(400).json({ error: error.message });
        }
    }
}