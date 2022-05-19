import { Repository } from "typeorm";
import { ICreateRentalDTO } from "@modules/Rentals/Dtos/ICreateRentalDTO";
import { IRentalRepository } from "@modules/Rentals/Repositories/IRentalRepository";
import { appDatasource } from "@shared/Infra/typeorm";
import { Rental } from "../Entities/Rental";


export class OrmRentalRepository implements IRentalRepository{
    
    private repository:Repository<Rental>;

    constructor(){
        this.repository = appDatasource.getRepository(Rental);
    }
    
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne({where:{car_id,end_date:null}});
        return openByCar;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOne({where:{user_id,end_date:null}});
        return openByUser;
    }

    async create(data: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({...data});
        await this.repository.save(rental);

        return rental;
    }

    async findById(id: string): Promise<Rental> {
        return await this.repository.findOne({where:{id}});
    }

    async findByUserId(user_id: string): Promise<Rental[]> {
        const rental = await this.repository.find({
            where:{user_id},
            relations:["car"]
        });
        return rental;
    }
}