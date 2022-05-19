import { CarImage } from "../Infra/typeorm/Entities/CarImage";


export interface ICarsImagesRepository {
    create(car_id: string, image_name: string):Promise<CarImage>;
}