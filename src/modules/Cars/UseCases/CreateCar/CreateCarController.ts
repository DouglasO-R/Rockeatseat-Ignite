import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";


export class CreateCarController{
    
    static async handle(request: Request, response: Response): Promise<Response> {

        const createCar = container.resolve(CreateCarUseCase);

        const car = await createCar.with(request.body);

        return response.status(201).json({car});

    }
}