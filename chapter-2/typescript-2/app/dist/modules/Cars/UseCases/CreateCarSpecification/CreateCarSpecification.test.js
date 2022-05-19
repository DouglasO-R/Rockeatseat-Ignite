"use strict";

var _CarsRepositoryInMemory = _interopRequireDefault(require("@modules/Cars/Repositories/implementations/CarsRepositoryInMemory"));

var _SpecificationRepositoryInMemory = _interopRequireDefault(require("@modules/Cars/Repositories/implementations/SpecificationRepositoryInMemory"));

var _AppError = require("@shared/errors/AppError");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Create Car Specification ", () => {
  let createCarSpecification;
  let carsRepository;
  let specificationRepository;
  beforeEach(() => {
    carsRepository = _CarsRepositoryInMemory.default.getInstance();
    specificationRepository = _SpecificationRepositoryInMemory.default.getInstance();
    createCarSpecification = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepository, specificationRepository);
  });
  test("should not be able to add a new specification to a non-existent car", async () => {
    await expect(createCarSpecification.with({
      car_id: "not_exist",
      specification_id: ["not exist"]
    })).rejects.toBeInstanceOf(_AppError.AppError);
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
    const specificationsCars = await createCarSpecification.with({
      car_id: car.id,
      specification_id: [spect.id]
    });
    expect(specificationsCars).toMatchObject(car);
    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
    expect(specificationsCars.specifications).toMatchObject([specification]);
  });
});