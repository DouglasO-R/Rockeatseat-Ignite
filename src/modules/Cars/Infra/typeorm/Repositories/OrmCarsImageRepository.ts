import { ICarsImagesRepository } from "@modules/Cars/Repositories/ICarsImagesRepository";
import { appDatasource } from "@shared/Infra/typeorm";
import { Repository } from "typeorm";
import { CarImage } from "../Entities/CarImage";

export class OrmCarsImageRepository implements ICarsImagesRepository{

    private repository:Repository<CarImage>;

    constructor(){
        this.repository = appDatasource.getRepository(CarImage);
    }

    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = this.repository.create({car_id,image_name});

        return await this.repository.save(carImage);        
    }

}