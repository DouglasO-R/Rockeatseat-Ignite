import { CarImage } from "@modules/Cars/Infra/typeorm/Entities/CarImage";
import { ICarsRepository } from "@modules/Cars/Repositories/ICarsRepository";
import { Rental } from "@modules/Rentals/Infra/typeorm/Entities/Rental";
import { IRentalRepository } from "@modules/Rentals/Repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest{
    id:string;
    user_id:string;
}

@injectable()
export class DevolutionRentalUseCase{

    constructor(
        @inject("OrmRentalRepository")
        private rentalRepository:IRentalRepository,
        @inject("OrmCarsRepository")
        private carsRepository:ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider:IDateProvider
    ){}

    async with({id,user_id}:IRequest):Promise<Rental>{
        const rental = await this.rentalRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id);

        const minimum_daily = 1;

        if(!rental){
            throw new AppError("Rental does not exist");
        }
        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            dateNow
        );

        if(daily <=0){
            daily = minimum_daily;
        }

        const delay = this.dateProvider.compareInDays(
            dateNow,
            rental.expected_return_date
        )
        let total = 0;

        if(delay > 0){
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;
        rental.end_date = dateNow;
        rental.total = total;

        await this.rentalRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id,true);

        return rental;
    }
}