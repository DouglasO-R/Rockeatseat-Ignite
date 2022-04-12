import { inject, injectable } from "tsyringe";
import { deletFile } from "@utils/file";
import { IUserRepository } from "@modules/Accounts/Users/Repository/IUserRepository";

interface IRequest{
    user_id:string;
    avatar_file:string;
}

@injectable()
export class UpdateUserAvatarUseCase{

    constructor(
        @inject("PostgresUserRepository")
        private userRepository:IUserRepository
    ){}

    async with({user_id,avatar_file}:IRequest):Promise<void>{
        const user = await this.userRepository.findById(user_id);

        if(user.avatar){
            await deletFile(`./tmp/avatar/${user.avatar}`);
        }

        user.avatar = avatar_file;

        await this.userRepository.create(user);
    }
}