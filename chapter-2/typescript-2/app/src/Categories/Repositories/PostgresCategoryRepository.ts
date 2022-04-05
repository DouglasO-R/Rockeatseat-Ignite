import { Category } from "../Entities/Category";
import { ICreateCategoryDTO } from "./CategoryRepository";
import { ICategoryRepository } from "./ICategoryRepository";


export class PostgresCategoryRepository implements ICategoryRepository{
    
    create({ name, description }: ICreateCategoryDTO): Category {
        throw new Error("Method not implemented.");
    }
    index(): Category[] {
        throw new Error("Method not implemented.");
    }
    findByName(name: string): Category {
        throw new Error("Method not implemented.");
    }

}