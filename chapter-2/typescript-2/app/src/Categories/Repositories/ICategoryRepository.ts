import { Category } from "../Entities/Category";

export interface ICreateCategoryDTO {
    name: string;
    description: string;
}

export interface ICategoryRepository{
    create({ name, description }: ICreateCategoryDTO): Category;

    index(): Category[];

    findByName({ name }: ICreateCategoryDTO):Category;
}