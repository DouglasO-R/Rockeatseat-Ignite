import { Repository } from "typeorm";
import { appDatasource } from "../../../../database";
import { Category } from "../Entities/Category";
import { ICategoryRepository, ICreateCategoryDTO } from "./ICategoryRepository";


export class PostgresCategoryRepository implements ICategoryRepository{
    
    private repository:Repository<Category>;

    constructor(){
        this.repository = appDatasource.getRepository(Category);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({name, description});

        await this.repository.save(category);
    }

    async index(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;

    }
    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({where:{name}});
        return category;
    }

}