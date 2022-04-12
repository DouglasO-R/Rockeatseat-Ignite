import { container } from "tsyringe";
import { IUserRepository } from "../../modules/Accounts/Users/Repository/IUserRepository";
import { PostgresUserRepository } from "../../modules/Accounts/Users/Repository/PostgresUserRepository";

import { ICategoryRepository } from "../../modules/Cars/Categories/Repositories/ICategoryRepository";
import { PostgresCategoryRepository } from "../../modules/Cars/Categories/Repositories/PostgresCategoryRepository";
import { ISpecificationRepository } from "../../modules/Cars/Specification/Repository/ISpecificationRepository";
import { PostgresSpecificationRepository } from "../../modules/Cars/Specification/Repository/PostgresSpecificationRepository";


container.registerSingleton<ICategoryRepository>(
    "PostgresCategoryRepository",
    PostgresCategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
    "PostgresSpecificationRepository",
    PostgresSpecificationRepository
);

container.registerSingleton<IUserRepository>(
    "PostgresUserRepository",
    PostgresUserRepository
);