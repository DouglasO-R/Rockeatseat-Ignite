import { appDatasource } from "@shared/Infra/typeorm";
import { Repository } from "typeorm";
import { ICreateCarDTO } from "@modules/Cars/dtos/ICreateCarDto";
import { ICarsRepository } from "@modules/Cars/Repositories/ICarsRepository";
import { Car } from "../Entities/Car";


export class OrmCarsRepository implements ICarsRepository{

    private repository:Repository<Car>;

    constructor(){
        this.repository = appDatasource.getRepository(Car);
    }
    
    
    async create(data: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({...data});
        return await this.repository.save(car);
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return await this.repository.findOne({where:{license_plate}});
    }
    
    async findAllAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        
        const carsQuery = this.repository
        .createQueryBuilder("c") 
        .where("available = :available", {available:true});

        if(brand){
            carsQuery.andWhere("c.brand = :brand",{brand});    
        }
        if(category_id){
            carsQuery.andWhere("c.category_id = :category_id",{category_id});    
        }
        if(name){
            carsQuery.andWhere("c.name = :name",{name});    
        }

        const cars = await carsQuery.getMany();
        console.log(cars);
        return cars;
    }

    async findById(id: string): Promise<Car> {
        return await this.repository.findOne({where:{id}});
    }

    async updateAvailable(id:string,available:boolean): Promise<void> {
        
        await this.repository
        .createQueryBuilder()
        .update()
        .set({available})
        .where("id =:id")
        .setParameters({id})
        .execute()
    }
}