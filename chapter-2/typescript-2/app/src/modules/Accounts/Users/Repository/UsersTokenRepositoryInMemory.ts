import { ICreateUsersTokenDTO } from "../Dto/ICreateUsersTokenDTO";
import { UsersToken } from "../Infra/typeorm/Entities/UsersToken";
import { IUsersTokenRepository } from "./IUsersTokenRepository";

export class UsersTokenRepositoryInMemory implements IUsersTokenRepository {

    private usersToken: UsersToken[];

    constructor() {
        this.usersToken = [];
    }

    async create({ expires_date, refresh_token, user_id }: ICreateUsersTokenDTO): Promise<UsersToken> {
        const userToken = new UsersToken();

        Object.assign(userToken, {
            expires_date,
            refresh_token,
            user_id
        });

        this.usersToken.push(userToken);
        return userToken;
    }

    async findByUserIdAndRefreshToken(user_id: string, token: string): Promise<UsersToken> {
        return this.usersToken.find(userToken => userToken.user_id === user_id && userToken.refresh_token === token) 
    }

    async deleteById(id: string): Promise<void> {
        const userToken = this.usersToken.find(userToken => userToken.id === id);
        this.usersToken.splice(this.usersToken.indexOf(userToken));

    }

    async findByByRefreshToken(refresh_token: string): Promise<UsersToken> {
        return this.usersToken.find(userTokern => userTokern.refresh_token === refresh_token);
    }

}