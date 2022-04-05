import { CategoryRepository } from "../../Repositories/CategoryRepository";
import { ListCategoryController } from "./ListCategoryController";
import { ListCategoryUseCase } from "./ListCategoryUseCase";



const repository = CategoryRepository.getInstance();
const useCase = new ListCategoryUseCase(repository);
const ListController = new ListCategoryController(useCase);

export { ListController }
