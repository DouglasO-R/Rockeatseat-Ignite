import { ICategoryRepository } from "../../Repositories/ICategoryRepository";

export class ListCategoryUseCase {
    private repository:ICategoryRepository;

    constructor(repository:ICategoryRepository){
        this.repository = repository;
    }

    async categories(){
        return await this.repository.index();
    }
}