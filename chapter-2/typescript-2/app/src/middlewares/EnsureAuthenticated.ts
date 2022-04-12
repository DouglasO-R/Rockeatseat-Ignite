import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { PostgresUserRepository } from "../modules/Accounts/Users/Repository/PostgresUserRepository";

export async function EnsureAuthenticated(request: Request, response: Response, next: NextFunction) {
    try {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new AppError("Token missing",402);

        }

        const [_, token] = authHeader.split(" ");

        const { sub } = verify(token, "secretKey");

        const userRepository = new PostgresUserRepository();

        const user = await userRepository.findById(sub.toString());

        if (!user) {
            throw new AppError(" User not exist",401);
        }

        request.user = {
            id:sub.toString()
        };

        next();
    } catch (error) {
        response.status(error.statusCode).json({error});
    }
}