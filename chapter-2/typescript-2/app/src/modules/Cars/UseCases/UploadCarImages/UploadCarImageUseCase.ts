import { ICarsImagesRepository } from "@modules/Cars/Repositories/ICarsImagesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    images_name: string[];
}
@injectable()
export class UploadCarImagesUseCase {

    constructor(
        @inject("OrmCarsImageRepository")
        private carsImagesRepository: ICarsImagesRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider,
    ) { };

    async with({ car_id, images_name }: IRequest): Promise<void> {
        images_name.map(async (image) => {
            await this.carsImagesRepository.create(car_id, image);
            await this.storageProvider.save(image,"cars");
        })
    }
}