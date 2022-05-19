import { IUserResponseDTO } from "../Dto/IUserResponseDTO";
import { instanceToInstance } from "class-transformer";

export class UserMap {

    static toDTO({ email, name, id, avatar, driver_license,avatar_url }: IUserResponseDTO) {
        const user = instanceToInstance({
            email,
            name,
            id,
            avatar,
            driver_license,
            avatar_url
        });

        return user;
    }

}