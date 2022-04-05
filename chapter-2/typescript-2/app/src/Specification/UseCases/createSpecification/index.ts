import { SpecificationRepository } from "../../Repository/SpecificationRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";


const repository = SpecificationRepository.getInstance();
const createUseCase = new CreateSpecificationUseCase(repository);
const createSpecificationController = new CreateSpecificationController(createUseCase);

export { createSpecificationController, createUseCase,repository }