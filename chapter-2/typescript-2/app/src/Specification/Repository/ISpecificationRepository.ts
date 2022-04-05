import { Specification } from "../Entities/Specification";

export interface ICreateSpecificationDTO{
    name: string;
    description: string;
}

export interface ISpecificationRepository{

    create({description,name}:ICreateSpecificationDTO):void;
    findByname(name:string):Specification;
    list():Specification[];
}