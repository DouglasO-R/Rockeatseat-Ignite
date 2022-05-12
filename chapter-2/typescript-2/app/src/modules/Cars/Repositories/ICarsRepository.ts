import { ICreateCarDTO } from "../dtos/ICreateCarDto";
import { Car } from "../Infra/typeorm/Entities/Car";


export interface ICarsRepository{
    create(data:ICreateCarDTO):Promise<Car>;
    findByLicensePlate(license_plate:string):Promise<Car>;
    findAllAvailable(brand?:string,category_id?:string,name?:string):Promise<Car[]>;
    findById(id:string):Promise<Car>;
    updateAvailable(id:string,available:boolean):Promise<void>;
}