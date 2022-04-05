import { CategoryRepository } from "../../Repositories/CategoryRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


const repository = CategoryRepository.getInstance();
const useCase = new CreateCategoryUseCase(repository);
const CreateController = new CreateCategoryController(useCase);

export { CreateController }
