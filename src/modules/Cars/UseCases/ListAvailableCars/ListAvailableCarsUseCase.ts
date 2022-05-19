import { inject, injectable } from "tsyringe";
import { Car } from "@modules/Cars/Infra/typeorm/Entities/Car";
import { ICarsRepository } from "@modules/Cars/Repositories/ICarsRepository";

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

@injectable()
export class ListAvailableCarsUseCase {

    constructor(
        @inject("OrmCarsRepository")
        private repository: ICarsRepository
    ) { }

    async by({ brand, category_id, name }: IRequest): Promise<Car[]> {
        return await this.repository.findAllAvailable(brand, category_id, name);
    }
}