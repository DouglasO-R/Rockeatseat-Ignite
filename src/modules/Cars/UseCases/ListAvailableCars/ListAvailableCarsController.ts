import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";


export class ListAvailableCarsController {

    static async handle(request: Request, response: Response): Promise<Response> {
        const { brand, name, category_id } = request.query;

        const listAvailableCars = container.resolve(ListAvailableCarsUseCase);

        const cars = await listAvailableCars.by({
            brand:brand as string, 
            name: name as string, 
            category_id: category_id as string 
        });

        return response.status(200).json(cars);
    }
}