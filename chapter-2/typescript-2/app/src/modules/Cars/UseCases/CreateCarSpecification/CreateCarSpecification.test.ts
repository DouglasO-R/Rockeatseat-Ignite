import { ICarsRepository } from "@modules/Cars/Repositories/ICarsRepository";
import CarsRepositoryInMemory from "@modules/Cars/Repositories/implementations/CarsRepositoryInMemory";
import SpecificationRepositoryInMemory from "@modules/Cars/Repositories/implementations/SpecificationRepositoryInMemory";
import { ISpecificationRepository } from "@modules/Cars/Repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";



describe("Create Car Specification ", () => {

    let createCarSpecification: CreateCarSpecificationUseCase;
    let carsRepository: ICarsRepository;
    let specificationRepository: ISpecificationRepository;

    beforeEach(() => {
        carsRepository = CarsRepositoryInMemory.getInstance()
        specificationRepository = SpecificationRepositoryInMemory.getInstance()
        createCarSpecification = new CreateCarSpecificationUseCase(carsRepository, specificationRepository);
    });


    test("should not be able to add a new specification to a non-existent car", async () => {

        await expect(createCarSpecification.with({ car_id: "not_exist", specification_id: ["not exist"] })).rejects.toBeInstanceOf(AppError);

    });

    test("should be able to create a new specification to a car", async () => {
        const car = await carsRepository.create({
            brand: "test",
            category_id: "test",
            daily_rate: 10,
            description: "test",
            fine_amount: 100,
            license_plate: "test",
            name: "test"
        });

        const specification = {
            name: "test",
            description: "test"
        };

        const spect = await specificationRepository.create(specification);

        const specificationsCars = await createCarSpecification.with({ car_id: car.id, specification_id: [spect.id] });
        
        expect(specificationsCars).toMatchObject(car);
        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
        expect(specificationsCars.specifications).toMatchObject([specification]);

    })
})