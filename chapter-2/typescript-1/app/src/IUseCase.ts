interface Course {
    name: string;
    duration?: number; //optional attribute ? before :
    educator: string;
}

type Course2 = {
    name: string;
    duration: number;
    educator: string;
}

interface IUseCase{
    execute({ name, duration, educator }: Course):any;
}

export {
    Course,
    Course2,
    IUseCase
}