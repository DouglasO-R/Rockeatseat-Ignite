import { Request, Response } from "express";
import { CreateCourseUseCase } from "./CreateCourseUseCase";

export class Controller {

    static create(request: Request, response: Response) {

        // const { name, duration, educator } = request.body;
        // new CreateCourseUseCase().execute(name, duration, educator);
        const course = new CreateCourseUseCase().execute(request.body);

        return response.status(200).json(course);
    }
}