import { Specification } from "../Entities/Specification";

export interface ICreateSpecificationDTO{
    name: string;
    description: string;
}

export interface ISpecificationRepository{

    create({description,name}:ICreateSpecificationDTO):Promise<void>;
    findByName(name:string):Promise<Specification>;
    list():Promise<Specification[]>;
}