import { ICarsImagesRepository } from "@modules/Cars/Repositories/ICarsImagesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    images_name: string[];
}
@injectable()
export class UploadCarImagesUseCase {

    constructor(
        @inject("OrmCarsImageRepository")
        private carsImagesRepository: ICarsImagesRepository
    ) { };

    async with({ car_id, images_name }: IRequest):Promise<void> {
        images_name.map(async(image)=> {
            await this.carsImagesRepository.create(car_id,image);
        })
    }
}