import "reflect-metadata";

import { inject, injectable } from "tsyringe";

import { Car } from "@modules/Cars/Infra/typeorm/Entities/Car";
import { ICarsRepository } from "@modules/Cars/Repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface RequestToCreateCar {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

@injectable()
export class CreateCarUseCase {

    constructor(
        @inject("OrmCarsRepository")
        private repository: ICarsRepository
    ) { }

    async with({ brand, category_id, daily_rate, description, fine_amount, license_plate, name }: RequestToCreateCar): Promise<Car> {

        const carAlreadyExist = await this.repository.findByLicensePlate(license_plate);

        if (carAlreadyExist) {
            throw new AppError("Car already exist");
        }

        const car = await this.repository.create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name });

        return car;
    }
}
