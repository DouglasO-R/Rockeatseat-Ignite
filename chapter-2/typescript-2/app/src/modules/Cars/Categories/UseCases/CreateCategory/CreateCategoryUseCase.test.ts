import { AppError } from "@errors/AppError";
import { CategoryRepositoryInMemory } from "@modules/Cars/Categories/Repositories/CategoryRepositoryInMemory";
import { CreateCategoryUseCase } from "@modules/Cars/Categories/UseCases/CreateCategory/CreateCategoryUseCase";

describe("Create a new Category", () => {
    let createCategory: CreateCategoryUseCase;
    let categoryRepositoryInMemory: CategoryRepositoryInMemory;

    beforeEach(() => {
        categoryRepositoryInMemory = CategoryRepositoryInMemory.getInstance();
        createCategory = new CreateCategoryUseCase(categoryRepositoryInMemory);
    });

    test("should be able to create a new category", async () => {
        await createCategory.with({ name: "test", description: "test" });
        const category = await categoryRepositoryInMemory.findByName("test");

        expect(category).toMatchObject({ name: "test", description: "test" });
        expect(category).toHaveProperty("id");

    });

    test("should be able to create a new category", async () => {

        expect(async () => {
            await createCategory.with({ name: "test", description: "test" });
            await createCategory.with({ name: "test", description: "test" });
        }).rejects.toBeInstanceOf(AppError);

       
    });

})