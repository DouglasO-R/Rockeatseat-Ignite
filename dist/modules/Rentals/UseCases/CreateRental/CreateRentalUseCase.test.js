"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/Implementations/DayjsDateProvider");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

var _RentalRepositoryInMemory = require("../../Repositories/Implementations/RentalRepositoryInMemory");

var _CarsRepositoryInMemory = _interopRequireDefault(require("@modules/Cars/Repositories/implementations/CarsRepositoryInMemory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Create Rental test", () => {
  const dayAdd24Hours = (0, _dayjs.default)().add(24, 'hours').toDate();
  let rentalRepository;
  let carsRepository;
  let dateProvider;
  let createRentalUseCase;
  beforeAll(async () => {
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    rentalRepository = _RentalRepositoryInMemory.RentalRepositoryInMemory.getInstance();
    carsRepository = _CarsRepositoryInMemory.default.getInstance();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalRepository, dateProvider, carsRepository);
  });
  test("should be able to create a Rental", async () => {
    const car = await carsRepository.create({
      name: "test",
      description: "Car test",
      daily_rate: 100,
      license_plate: "XCX-145",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    });
    const rentalToCreate = {
      user_id: "1234",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    };
    const rental = await createRentalUseCase.with(rentalToCreate);
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
    expect(rental).toMatchObject(rentalToCreate);
  });
  test("should not be able to create a new rental if there another open to the same car", async () => {
    const car = await carsRepository.create({
      name: "test",
      description: "Car test",
      daily_rate: 100,
      license_plate: "XzX-145",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    });
    const rentalToCreate = {
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    };
    const rentalToCreateErrorSameUser = {
      user_id: "12346",
      car_id: car.id,
      expected_return_date: new Date()
    };
    const rental = await createRentalUseCase.with(rentalToCreate);
    await expect(createRentalUseCase.with(rentalToCreateErrorSameUser)).rejects.toThrow("Car is Unavailable");
  });
  test("should not be able to create a new rental if there another open to the same user", async () => {
    const car1 = await carsRepository.create({
      name: "test",
      description: "Car test",
      daily_rate: 100,
      license_plate: "KZX-145",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    });
    const car2 = await carsRepository.create({
      name: "test",
      description: "Car test",
      daily_rate: 100,
      license_plate: "XKX-145",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    });
    const rentalToCreate = {
      user_id: "12345677",
      car_id: car1.id,
      expected_return_date: dayAdd24Hours
    };
    const rentalToCreateErrorSameUser = {
      user_id: "12345677",
      car_id: car2.id,
      expected_return_date: new Date()
    };
    const rental = await createRentalUseCase.with(rentalToCreate);
    await expect(createRentalUseCase.with(rentalToCreateErrorSameUser)).rejects.toThrow("There s a rental in progress for user!");
  });
  test("should not be able to rental with less than 24hours to return", async () => {
    const rentalToCreate = {
      user_id: "12345678",
      car_id: "121212568",
      expected_return_date: (0, _dayjs.default)().toDate()
    };
    await expect(createRentalUseCase.with(rentalToCreate)).rejects.toThrow("Invalid return time");
  });
});