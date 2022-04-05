import { Category } from "../Entities/Category";
import { ICreateCategoryDTO } from "./ICategoryRepository";



export class CategoryRepository {

    private categories: Category[];
    private static INSTANCE: CategoryRepository;

    private constructor() {
        this.categories = [];
    }

    public static getInstance(): CategoryRepository {
        if (!CategoryRepository.INSTANCE) {
            CategoryRepository.INSTANCE = new CategoryRepository();
        }
        return CategoryRepository.INSTANCE;
    }

    create({ name, description }: ICreateCategoryDTO): Category {
        const category = new Category(name, description);

        this.categories.push(category);
        return category;
    }

    index(): Category[] {
        return this.categories;
    }

    findByName({ name }: ICreateCategoryDTO) {
        const category = this.categories.find((item) => item.name === name);
        return category;
    }
}