import { UsersToken } from "@modules/Accounts/Users/Infra/typeorm/Entities/UsersToken";
import { ICreateUsersTokenDTO } from "../Dto/ICreateUsersTokenDTO";


export interface IUsersTokenRepository {
    create({expires_date, refresh_token,user_id}:ICreateUsersTokenDTO):Promise<UsersToken>;
    findByUserIdAndRefreshToken(user_id:string,token:string):Promise<UsersToken>;
    deleteById(id:string):Promise<void>;
    findByByRefreshToken(refresh_token:string):Promise<UsersToken>
}