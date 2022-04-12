import { inject, injectable } from "tsyringe";
import { Specification } from "../../Entities/Specification";
import { ISpecificationRepository } from "../../Repository/ISpecificationRepository";

@injectable()
export class ListSpecificationUseCase{
    constructor(@inject("PostgresSpecificationRepository") private repository:ISpecificationRepository){ }

    async execute():Promise<Specification[]>{
        return this.repository.list();
    }
}