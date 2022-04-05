export interface IRequest {
    id?:string;
    name: string;
    description: string;
}

export class RequestDTO implements IRequest{
    id?:string;
    name: string;
    description: string;

    constructor({id,name,description}:IRequest){
        this.id = id;
        this.name = name;
        this.description = description;
    }
}