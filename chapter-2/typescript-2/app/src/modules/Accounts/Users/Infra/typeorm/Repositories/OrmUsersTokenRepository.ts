import { ICreateUsersTokenDTO } from "@modules/Accounts/Users/Dto/ICreateUsersTokenDTO";
import { IUsersTokenRepository } from "@modules/Accounts/Users/Repository/IUsersTokenRepository";
import { appDatasource } from "@shared/Infra/typeorm";
import { Repository } from "typeorm";
import { UsersToken } from "../Entities/UsersToken";


export class OrmUsersTokenRepository implements IUsersTokenRepository {

    private repository: Repository<UsersToken>;

    constructor() {
        this.repository = appDatasource.getRepository(UsersToken);
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findByUserIdAndRefreshToken(user_id: string,token:string): Promise<UsersToken> {
        const usersToken = await this.repository.findOne({where:{user_id,refresh_token:token}});
        return usersToken;
    }

    async create({ expires_date, refresh_token, user_id }: ICreateUsersTokenDTO): Promise<UsersToken> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id
        });

        await this.repository.save(userToken);

        return userToken;
    }

    async findByByRefreshToken(refresh_token: string): Promise<UsersToken> {
        
        return await this.repository.findOneBy({refresh_token})
    }

}