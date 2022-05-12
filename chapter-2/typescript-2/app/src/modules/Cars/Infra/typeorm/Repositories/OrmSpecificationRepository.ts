import { ICreateSpecificationDTO, ISpecificationRepository } from "@modules/Cars/Repositories/ISpecificationRepository";
import { appDatasource } from "@shared/Infra/typeorm";
import { In, Repository } from "typeorm";
import { Specification } from "../Entities/Specification";



export class OrmSpecificationRepository implements ISpecificationRepository{

    private repository:Repository<Specification>;

    constructor(){
        this.repository = appDatasource.getRepository(Specification);
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const especification = this.repository.create({name, description});

        return await this.repository.save(especification);
    }

    async list(): Promise<Specification[]> {
        const especification = await this.repository.find();
        return especification;

    }
    async findByName(name: string): Promise<Specification> {
        const especification = await this.repository.findOne({where:{name}});
        return especification;
    }
    
    async findByIds(ids: string[]): Promise<Specification[]> {
        return await this.repository.findBy({id:In(ids)});
        // .findBy({ id: In([1, 2, 3]) })
    }
}