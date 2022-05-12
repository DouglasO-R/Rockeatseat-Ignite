import CarsRepositoryInMemory from "@modules/Cars/Repositories/implementations/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";



describe("List car usa case", () => {
    let listAvailableCars:ListAvailableCarsUseCase;
    let carsRepository:CarsRepositoryInMemory ;

    beforeEach(() => {
        carsRepository = CarsRepositoryInMemory.getInstance();
        listAvailableCars = new ListAvailableCarsUseCase(carsRepository);
    });

    test("should be able to list all available cars", async () => {
        const car = await carsRepository.create({
            name: "Name Car",
            category_id: "category_id",
            daily_rate: 100,
            description: "Description Car",
            fine_amount: 60,
            license_plate: "ABC-123",
            brand: "Brand"
        });

        const cars = await listAvailableCars.by({});

        expect(cars).toEqual([car]);
    });

    test("should be able to list all available cars by name", async () => {
        const car = await carsRepository.create({
            name: "test Car",
            category_id: "category_id",
            daily_rate: 100,
            description: "Description Car",
            fine_amount: 60,
            license_plate: "ABC-123",
            brand: "Brand"
        });

        const cars = await listAvailableCars.by({name: "test Car"});
        expect(cars).toEqual([car]);
    });

    test("should be able to list all available cars by category_id", async () => {
        const car = await carsRepository.create({
            name: "Car two",
            category_id: "1234",
            daily_rate: 100,
            description: "Description Car",
            fine_amount: 60,
            license_plate: "ABC-123",
            brand: "Brand"
        });

        const cars = await listAvailableCars.by({category_id: "1234"});
        expect(cars).toEqual([car]);
    });

    test("should be able to list all available cars by brand", async () => {
        const car = await carsRepository.create({
            name: "test Car three",
            category_id: "6789",
            daily_rate: 100,
            description: "Description Car",
            fine_amount: 60,
            license_plate: "ABC-123",
            brand: "Audi"
        });

        const cars = await listAvailableCars.by({brand: "Audi"});
        expect(cars).toEqual([car]);
    });

});