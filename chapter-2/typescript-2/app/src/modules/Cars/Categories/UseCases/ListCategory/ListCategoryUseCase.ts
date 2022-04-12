import { inject, injectable } from "tsyringe";
import { Category } from "../../Entities/Category";
import { ICategoryRepository } from "../../Repositories/ICategoryRepository";

@injectable()
export class ListCategoryUseCase {

    constructor(
        @inject("PostgresCategoryRepository") 
        private repository:ICategoryRepository){}

    async categories():Promise<Category[]>{
        return await this.repository.index();
    }
}