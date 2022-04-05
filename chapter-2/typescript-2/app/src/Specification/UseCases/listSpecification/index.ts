import { SpecificationRepository } from "../../Repository/SpecificationRepository";
import { ListSpecificationController } from "./ListSpecificationController";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";



const repository = SpecificationRepository.getInstance();
const listUseCase = new ListSpecificationUseCase(repository);
const listSpecificationController = new ListSpecificationController(listUseCase);


export { listSpecificationController }