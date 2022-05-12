import { Car } from "@modules/Cars/Infra/typeorm/Entities/Car";
import { ICarsRepository } from "@modules/Cars/Repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/Cars/Repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    specification_id: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {

    constructor(
        @inject("OrmCarsRepository")
        private carsRepository: ICarsRepository,
        @inject("OrmSpecificationRepository")
        private specificationRepository: ISpecificationRepository
    ) { }

    async with({ car_id, specification_id }: IRequest): Promise<Car> {

        const carExist = await this.carsRepository.findById(car_id);

        if (!carExist) {
            throw new AppError("Car does not exist");
        }

        const specifications = await this.specificationRepository.findByIds(specification_id);

        carExist.specifications = specifications;

        await this.carsRepository.create(carExist);

        return carExist;
    }
}
