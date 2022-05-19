import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@modules/Accounts/Users/Repository/IUserRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest{
    user_id:string;
    avatar_file:string;
}

@injectable()
export class UpdateUserAvatarUseCase{

    constructor(
        @inject("OrmUserRepository")
        private userRepository:IUserRepository,
        @inject("StorageProvider")
        private storageProvider:IStorageProvider,
    ){}

    async with({user_id,avatar_file}:IRequest):Promise<void>{
        const user = await this.userRepository.findById(user_id);

        if(user.avatar){
            await this.storageProvider.delete(user.avatar,"avatar");
        }
        await this.storageProvider.save(avatar_file,"avatar");

        user.avatar = avatar_file;

        await this.userRepository.create(user);
    }
}