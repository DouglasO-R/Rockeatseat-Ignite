import { Category } from "../Entities/Category";

export interface ICreateCategoryDTO {
    name: string;
    description: string;
}

export interface ICategoryRepository{
    create({ name, description }: ICreateCategoryDTO): Promise<void>;

    index(): Promise<Category[]>;

    findByName(name:string):Promise<Category>;
}