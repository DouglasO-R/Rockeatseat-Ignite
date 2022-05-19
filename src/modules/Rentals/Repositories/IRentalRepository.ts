import { ICreateRentalDTO } from "@modules/Rentals/Dtos/ICreateRentalDTO";
import { Rental } from "@modules/Rentals/Infra/typeorm/Entities/Rental";



export interface IRentalRepository {
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findOpenRentalByUser(user_id: string): Promise<Rental>;
    findById(id:string):Promise<Rental>;
    create(data: ICreateRentalDTO): Promise<Rental>;
    findByUserId(user_id:string):Promise<Rental[]>;
}
