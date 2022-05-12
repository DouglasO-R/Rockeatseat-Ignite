import { ISpecificationRepository } from "@modules/Cars/Repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest{
    name:string;
    description:string;
}

@injectable()
export class CreateSpecificationUseCase{
    
    constructor(@inject("OrmSpecificationRepository") private repository:ISpecificationRepository){}


    async execute({name,description}:IRequest):Promise<void>{
        
        const specificationAlreadyExists = await this.repository.findByName(name);

        if(specificationAlreadyExists){
            throw new AppError("Specification Already Exists");
        }

        await this.repository.create({name,description});
    }
}