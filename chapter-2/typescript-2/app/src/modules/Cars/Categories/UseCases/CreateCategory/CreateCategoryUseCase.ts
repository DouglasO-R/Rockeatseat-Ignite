import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";
import { ICategoryRepository } from "@modules/Cars/Categories/Repositories/ICategoryRepository";

export interface IRequest {
    name: string;
    description: string;
}

@injectable()
export class CreateCategoryUseCase {

    constructor(
        @inject("PostgresCategoryRepository")
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