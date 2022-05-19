import "reflect-metadata";

import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICategoryRepository } from "@modules/Cars/Repositories/ICategoryRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
export class CreateCategoryUseCase {

    constructor(
        @inject("OrmCategoryRepository")
        private repository: ICategoryRepository
    ) { }

    async with({ name, description }: IRequest): Promise<void> {

        const categoryAlreadyExist = await this.repository.findByName(name);

        if (categoryAlreadyExist) {
            throw new AppError("Category Already Exist");
        }

        await this.repository.create({ name, description });
    }
}