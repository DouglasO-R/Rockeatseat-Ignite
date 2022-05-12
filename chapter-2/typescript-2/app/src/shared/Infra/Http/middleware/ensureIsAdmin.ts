import { OrmUserRepository } from "@modules/Accounts/Users/Infra/typeorm/Repositories/OrmUserRepository";
import { AppError } from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";


export async function ensureIsAdmin(request: Request, response: Response, next: NextFunction) {
    const { id } = request.user;
    const userRepository = new OrmUserRepository();

    const user = await userRepository.findById(id);

    if(!user.isAdmin){
        throw new AppError("User isn't admin",401);
    }

    return next();
}