import { inject, injectable } from "tsyringe";
import { Category } from "@modules/Cars/Infra/typeorm/Entities/Category";
import { ICategoryRepository } from "@modules/Cars/Repositories/ICategoryRepository";

@injectable()
export class ListCategoryUseCase {

    constructor(
        @inject("OrmCategoryRepository")
        private repository: ICategoryRepository
    ) { }

    async categories(): Promise<Category[]> {
        return await this.repository.index();
    }
}