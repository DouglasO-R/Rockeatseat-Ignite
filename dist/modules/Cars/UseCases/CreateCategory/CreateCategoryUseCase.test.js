"use strict";

var _AppError = require("@shared/errors/AppError");

var _CreateCategoryUseCase = require("@modules/Cars/UseCases/CreateCategory/CreateCategoryUseCase");

var _CategoryRepositoryInMemory = require("@modules/Cars/Repositories/implementations/CategoryRepositoryInMemory");

describe("Create a new Category", () => {
  let createCategory;
  let categoryRepositoryInMemory;
  beforeEach(() => {
    categoryRepositoryInMemory = _CategoryRepositoryInMemory.CategoryRepositoryInMemory.getInstance();
    createCategory = new _CreateCategoryUseCase.CreateCategoryUseCase(categoryRepositoryInMemory);
  });
  test("should be able to create a new category", async () => {
    await createCategory.with({
      name: "test",
      description: "test"
    });
    const category = await categoryRepositoryInMemory.findByName("test");
    expect(category).toMatchObject({
      name: "test",
      description: "test"
    });
    expect(category).toHaveProperty("id");
  });
  test("should be able to create a new category", async () => {
    expect(async () => {
      await createCategory.with({
        name: "test",
        description: "test"
      });
      await createCategory.with({
        name: "test",
        description: "test"
      });
    }).rejects.toBeInstanceOf(_AppError.AppError);
  });
});