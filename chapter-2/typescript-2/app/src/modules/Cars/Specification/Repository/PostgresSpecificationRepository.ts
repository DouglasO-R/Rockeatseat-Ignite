import { Repository } from "typeorm";
import { appDatasource } from "../../../../database";
import { Specification } from "../Entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "./ISpecificationRepository";


export class PostgresSpecificationRepository implements ISpecificationRepository{

    private repository:Repository<Specification>;

    constructor(){
        this.repository = appDatasource.getRepository(Specification);
    }
    

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const especification = this.repository.create({name, description});

        await this.repository.save(especification);
    }

    async list(): Promise<Specification[]> {
        const especification = await this.repository.find();
        return especification;

    }
    async findByName(name: string): Promise<Specification> {
        const especification = await this.repository.findOne({where:{name}});
        return especification;
    }
}