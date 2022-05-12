import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordMailUseCase } from "../UseCases/SendForgotPasswordMailUseCase";



export class SendForgotPasswordMailController {

    static async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const senForgotenPasswordMail = container.resolve(SendForgotPasswordMailUseCase);

        await senForgotenPasswordMail.by(email);
        
        return response.status(201).json("fim");
    }
}