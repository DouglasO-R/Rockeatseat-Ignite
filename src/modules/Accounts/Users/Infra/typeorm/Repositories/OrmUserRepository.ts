import { appDatasource } from "@shared/Infra/typeorm";
import { Repository } from "typeorm";
import { ICreateUserDTO } from "@modules/Accounts/Users/Dto/ICreateUserDTO";
import { IUserRepository } from "@modules/Accounts/Users/Repository/IUserRepository";
import { User } from "../Entities/User";




export class OrmUserRepository implements IUserRepository {

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