import { Category } from "../Infra/typeorm/Entities/Category";

export interface ICreateCategoryDTO {
    name: string;
    description: string;
}

export interface ICategoryRepository{
    create({ name, description }: ICreateCategoryDTO): Promise<void>;

    index(): Promise<Category[]>;

    findByName(name:string):Promise<Category>;
}