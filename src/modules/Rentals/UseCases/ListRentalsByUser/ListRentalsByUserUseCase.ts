import { Rental } from "@modules/Rentals/Infra/typeorm/Entities/Rental";
import { IRentalRepository } from "@modules/Rentals/Repositories/IRentalRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListRentalsByUserUseCase {

    constructor(
        @inject("OrmRentalRepository")
        private rentalRepository: IRentalRepository
    ) { }

    async by(user_id:string): Promise<Rental[]> {
        const rentalByUser = this.rentalRepository.findByUserId(user_id);

        return rentalByUser;
    }
}