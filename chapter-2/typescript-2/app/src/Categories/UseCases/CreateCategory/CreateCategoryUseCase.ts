import { ICategoryRepository } from "../../Repositories/ICategoryRepository";
import { Category } from "../../Entities/Category";

export interface IRequest {
    id?:string;
    name: string;
    description: string;
}


export class CreateCategoryUseCase{
    private repository:ICategoryRepository;
    
    constructor(repository:ICategoryRepository){
        this.repository = repository;
    }

    execute(requestDTO:IRequest):Category {
        const categoryAlreadyExist = this.repository.findByName(requestDTO);

        if (categoryAlreadyExist) {
            throw new Error("Category Already Exist");
        }

        const category = this.repository.create(requestDTO);
        return category;
    }
}