import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";


export class ListRentalsByUserController {

    static async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const listRentalsByUser = container.resolve(ListRentalsByUserUseCase);
        
        const rentals = await listRentalsByUser.by(id);

        return response.status(201).json(rentals);
    }
}