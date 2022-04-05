import { ISpecificationRepository } from "../../Repository/ISpecificationRepository";

interface IRequest{
    name:string;
    description:string;
}

export class CreateSpecificationUseCase{
    
    private repository:ISpecificationRepository;

    constructor(repository:ISpecificationRepository){
        this.repository = repository;
    }


    execute({name,description}:IRequest):void{
        
        const specificationAlreadyExists = this.repository.findByname(name);

        if(specificationAlreadyExists){
            throw new Error("Specification Already Exists");
        }

        this.repository.create({name,description});
    }
}