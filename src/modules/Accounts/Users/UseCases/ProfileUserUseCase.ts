import { inject, injectable } from "tsyringe";
import { IUserResponseDTO } from "../Dto/IUserResponseDTO";
import { UserMap } from "../mapper/UserMap";
import { IUserRepository } from "../Repository/IUserRepository";


@injectable()
export class ProfileUserUseCase {

    constructor(
        @inject("OrmUserRepository")
        private userRepository: IUserRepository
    ) { }

    async by(id:string):Promise<IUserResponseDTO>{
        const user = await this.userRepository.findById(id);

        return UserMap.toDTO(user);
    }
}