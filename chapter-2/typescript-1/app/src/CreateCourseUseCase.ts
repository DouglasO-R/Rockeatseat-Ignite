import { Course, IUseCase } from "./IUseCase";



export class CreateCourseUseCase implements IUseCase {
    execute({ name, duration = 8, educator }: Course) {
        console.log(name, duration, educator);
    }
}