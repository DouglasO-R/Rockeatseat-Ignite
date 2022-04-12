import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../errors/AppError";
import { ISpecificationRepository } from "../../Repository/ISpecificationRepository";

interface IRequest{
    name:string;
    description:string;
}

@injectable()
export class CreateSpecificationUseCase{
    
    constructor(@inject("PostgresSpecificationRepository") private repository:ISpecificationRepository){}


    async execute({name,description}:IRequest):Promise<void>{
        
        const specificationAlreadyExists = await this.repository.findByName(name);

        if(specificationAlreadyExists){
            throw new AppError("Specification Already Exists");
        }

        await this.repository.create({name,description});
    }
}