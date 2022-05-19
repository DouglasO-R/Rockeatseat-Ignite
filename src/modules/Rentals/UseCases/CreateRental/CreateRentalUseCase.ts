import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { Rental } from "@modules/Rentals/Infra/typeorm/Entities/Rental";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IRentalRepository } from "../../Repositories/IRentalRepository";
import { ICarsRepository } from "@modules/Cars/Repositories/ICarsRepository";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {

    constructor(
        @inject("OrmRentalRepository")
        private rentalRepository: IRentalRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("OrmCarsRepository")
        private carsRepository:ICarsRepository
    ) { }

    async with({ car_id, expected_return_date, user_id }: IRequest): Promise<Rental> {
        const minimumHoursToCompare = 24;
        const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id);

        if (carUnavailable) {
            throw new Error("Car is Unavailable");
        }

        const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new Error("There s a rental in progress for user!");
        }

        const dateNow = this.dateProvider.dateNow();
        const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

        if (compare < minimumHoursToCompare) {
            throw new Error(" Invalid return time");
        }

        const rental = await this.rentalRepository.create({
            car_id,
            expected_return_date,
            user_id
        });
        
        await this.carsRepository.updateAvailable(car_id,false);

        return rental;
    }
}
