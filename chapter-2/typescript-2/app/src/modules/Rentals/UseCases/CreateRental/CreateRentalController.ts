import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";


export class CreateRentalController {

    static async handle(request: Request, response: Response): Promise<Response> {
        const { expected_return_date, car_id } = request.body;
        const { id } = request.user;

        const createRental = container.resolve(CreateRentalUseCase);

        const rental = await createRental.with({
            expected_return_date,
            car_id,
            user_id:id
        });

        return response.status(201).json(rental);
    }
}