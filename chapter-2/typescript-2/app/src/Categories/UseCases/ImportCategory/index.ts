import { CategoryRepository } from "../../Repositories/CategoryRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const repository = CategoryRepository.getInstance();
const useCase = new ImportCategoryUseCase(repository);
const importCategoryController = new ImportCategoryController(useCase);


export { importCategoryController }