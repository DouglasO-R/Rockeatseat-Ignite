import CarsRepositoryInMemory from "@modules/Cars/Repositories/implementations/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { validate } from "uuid";
import { AppError } from "@shared/errors/AppError";

describe("Create car", () => {
    let carsRepository: CarsRepositoryInMemory;
    let createCar: CreateCarUseCase;

    beforeEach(() => {
        carsRepository = CarsRepositoryInMemory.getInstance();
        createCar = new CreateCarUseCase(carsRepository);
    });

    test("should be able to create a new car", async () => {
        const car = {
            name: "Name Car",
            category_id: "category_id",
            daily_rate: 100,
            description: "Description Car",
            fine_amount: 60,
            license_plate: "ABC-123",
            brand: "Brand"
        }

        const carCreated = await createCar.with(car);

        expect(carCreated).toMatchObject(car);
        expect(carCreated).toHaveProperty("id");
        expect(validate(carCreated.id)).toBeTruthy();


    });

    test("should not be able to create a car with existe license_plate", () => {
        expect(async () => {
            await createCar.with({
                name: "Car One",
                category_id: "category_id",
                daily_rate: 100,
                description: "Description Car",
                fine_amount: 60,
                license_plate: "ABC-123",
                brand: "Brand"
            });

            await createCar.with({
                name: "Car Two",
                category_id: "category_id",
                daily_rate: 100,
                description: "Description Car",
                fine_amount: 60,
                license_plate: "ABC-123",
                brand: "Brand"
            });

        }).rejects.toBeInstanceOf(AppError);
    });

    test("should be able to create a car with available true by default", async () => {
        const car = {
            name: "Car available",
            category_id: "category_id",
            daily_rate: 100,
            description: "Description Car",
            fine_amount: 60,
            license_plate: "ABCD-123",
            brand: "Brand"
        }

        const carCreated = await createCar.with(car);

        expect(carCreated).toHaveProperty("available");
        expect(carCreated.available).toBeTruthy();
    });

})