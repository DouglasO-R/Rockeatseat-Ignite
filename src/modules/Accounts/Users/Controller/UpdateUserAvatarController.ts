import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "../UseCases/UpdateUserAvatarUseCase";


export class UpdateUserAvatarController {

    static async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.user;
            const avatar_file = request.file.filename;

            const updateUserAvatar = container.resolve(UpdateUserAvatarUseCase);
            await updateUserAvatar.with({user_id:id,avatar_file});

            return response.status(200).send();

        } catch (error) {

            return response.status(400).json({ error: error.message });
        }
    }
}