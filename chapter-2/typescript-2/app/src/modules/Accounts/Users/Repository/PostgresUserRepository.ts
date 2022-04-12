import { Repository } from "typeorm";
import { appDatasource } from "../../../../database";
import { ICreateUserDTO } from "../Dto/ICreateUserDTO";
import { User } from "../Entities/User";
import { IUserRepository } from "./IUserRepository";


export class PostgresUserRepository implements IUserRepository {

    private repository: Repository<User>;

    constructor() {
        this.repository = appDatasource.getRepository(User);
    }

    async create(data: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({...data});

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.repository.findOne({where:{email}});
    }

    async findById(id: string): Promise<User> {
        return await this.repository.findOne({where:{id}});
    }
}