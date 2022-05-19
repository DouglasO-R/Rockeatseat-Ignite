import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProfileUserUseCase } from "../UseCases/ProfileUserUseCase";


export class ProfileUserController {

    static async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const profileUser = container.resolve(ProfileUserUseCase);

        const userProfile = await profileUser.by(id);
        return response.status(200).json(userProfile);
    }
}