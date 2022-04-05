import { Specification } from "../../Entities/Specification";
import { ISpecificationRepository } from "../../Repository/ISpecificationRepository";


export class ListSpecificationUseCase{
    private repository:ISpecificationRepository;

    constructor(repository:ISpecificationRepository){
        this.repository = repository;
    }

    execute():Specification[]{
        return this.repository.list();
    }
}