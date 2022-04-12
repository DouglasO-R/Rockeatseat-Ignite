import { Category } from "../Entities/Category";
import { ICategoryRepository, ICreateCategoryDTO } from "./ICategoryRepository";



export class CategoryRepositoryInMemory implements ICategoryRepository {

    private categories: Category[];
    private static INSTANCE: CategoryRepositoryInMemory;

    private constructor() {
        this.categories = [];
    }

    public static getInstance(): CategoryRepositoryInMemory {
        if (!CategoryRepositoryInMemory.INSTANCE) {
            CategoryRepositoryInMemory.INSTANCE = new CategoryRepositoryInMemory();
        }
        return CategoryRepositoryInMemory.INSTANCE;
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();
        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        });

        this.categories.push(category);
    }

    async index(): Promise<Category[]> {
        return this.categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find((item) => item.name === name);
        return category;
    }
}