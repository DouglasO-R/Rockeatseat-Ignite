import { ISpecificationRepository } from "@modules/Cars/Repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";
import { Specification } from "../../Infra/typeorm/Entities/Specification";

@injectable()
export class ListSpecificationUseCase{
    constructor(@inject("OrmSpecificationRepository") private repository:ISpecificationRepository){ }

    async execute():Promise<Specification[]>{
        return this.repository.list();
    }
}