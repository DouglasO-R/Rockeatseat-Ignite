import { ICreateRentalDTO } from "@modules/Rentals/Dtos/ICreateRentalDTO";
import { Rental } from "@modules/Rentals/Infra/typeorm/Entities/Rental";
import { IRentalRepository } from "../IRentalRepository";



export class RentalRepositoryInMemory implements IRentalRepository {
    private rentals: Rental[];
    private static INSTANCE: RentalRepositoryInMemory;

    private constructor() {
        this.rentals = [];
    }

    public static getInstance(): RentalRepositoryInMemory {
        if (!RentalRepositoryInMemory.INSTANCE) {
            RentalRepositoryInMemory.INSTANCE = new RentalRepositoryInMemory();
        }
        return RentalRepositoryInMemory.INSTANCE;
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
    }

    async create(data: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();
        Object.assign(rental, { ...data, start_date: new Date() });
        this.rentals.push(rental);
        return rental;
    }

    async findById(id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.id === id);
    }

    async findByUserId(user_id: string): Promise<Rental[]> {
        return this.rentals.filter(rental => rental.user_id === user_id);
    }
}
