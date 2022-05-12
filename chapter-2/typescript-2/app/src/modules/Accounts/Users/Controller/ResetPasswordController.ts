import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUseCase } from "../UseCases/ResetPasswordUseCase";

export class ResetPasswordController {

    static async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.query;
        const { password } = request.body;

        const resetPassword = container.resolve(ResetPasswordUseCase);
        await resetPassword.by({token:String(token),password})

        return response.status(201).json();
    }

}

