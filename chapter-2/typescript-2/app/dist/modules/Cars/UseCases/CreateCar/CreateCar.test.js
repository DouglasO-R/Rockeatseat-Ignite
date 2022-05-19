"use strict";

var _CarsRepositoryInMemory = _interopRequireDefault(require("@modules/Cars/Repositories/implementations/CarsRepositoryInMemory"));

var _CreateCarUseCase = require("./CreateCarUseCase");

var _uuid = require("uuid");

var _AppError = require("@shared/errors/AppError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Create car", () => {
  let carsRepository;
  let createCar;
  beforeEach(() => {
    carsRepository = _CarsRepositoryInMemory.default.getInstance();
    createCar = new _CreateCarUseCase.CreateCarUseCase(carsRepository);
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
    };
    const carCreated = await createCar.with(car);
    expect(carCreated).toMatchObject(car);
    expect(carCreated).toHaveProperty("id");
    expect((0, _uuid.validate)(carCreated.id)).toBeTruthy();
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
    }).rejects.toBeInstanceOf(_AppError.AppError);
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
    };
    const carCreated = await createCar.with(car);
    expect(carCreated).toHaveProperty("available");
    expect(carCreated.available).toBeTruthy();
  });
});