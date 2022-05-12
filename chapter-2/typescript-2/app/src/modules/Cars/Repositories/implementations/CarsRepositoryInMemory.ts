import { ICreateCarDTO } from "@modules/Cars/dtos/ICreateCarDto";
import { Car } from "@modules/Cars/Infra/typeorm/Entities/Car";
import { ICarsRepository } from "../ICarsRepository";


export default class CarsRepositoryInMemory implements ICarsRepository {

    private cars: Car[];

    private static INSTANCE: CarsRepositoryInMemory;

    private constructor() {
        this.cars = [];
    }
    

    public static getInstance(): CarsRepositoryInMemory {
        if (!CarsRepositoryInMemory.INSTANCE) {
            CarsRepositoryInMemory.INSTANCE = new CarsRepositoryInMemory();
        }
        return CarsRepositoryInMemory.INSTANCE;
    }

    async create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name, specifications, id }: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        if (!id) {
            Object.assign(car, {
                brand,
                category_id,
                daily_rate,
                description,
                fine_amount,
                license_plate,
                name,
                specifications
            });

            this.cars.push(car);
            return car;
        }

        Object.assign(car, {
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            specifications,
            id
        });

        this.cars.push(car);
        return car;
    }

    async findAllAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const all = await this.cars.filter((car) => car.available == true);

        if (!brand && !category_id && !name) {
            return all;
        }

        const filterAll = all.filter((car) => {
            if (
                (brand && car.brand === brand) ||
                (category_id && car.category_id === category_id) ||
                (name && car.name === name)
            ) {
                return car;
            }
            return null;
        });

        return filterAll;
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find((car) => car.id === id);
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = this.cars.findIndex(car => car.id === id);
        this.cars[findIndex].available = available;
    }
}