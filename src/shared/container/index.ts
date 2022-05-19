import { container } from "tsyringe";

import "@shared/container/providers";

import { IUserRepository } from "@modules/Accounts/Users/Repository/IUserRepository";
import { ICategoryRepository } from "@modules/Cars/Repositories/ICategoryRepository";
import { ISpecificationRepository } from "@modules/Cars/Repositories/ISpecificationRepository";
import { ICarsRepository } from "@modules/Cars/Repositories/ICarsRepository";
import { ICarsImagesRepository } from "@modules/Cars/Repositories/ICarsImagesRepository";
import { IRentalRepository } from "@modules/Rentals/Repositories/IRentalRepository";

import { OrmCarsImageRepository } from "@modules/Cars/Infra/typeorm/Repositories/OrmCarsImageRepository";
import { OrmRentalRepository } from "@modules/Rentals/Infra/typeorm/Repositories/OrmRentalRepository";
import { OrmCategoryRepository } from "@modules/Cars/Infra/typeorm/Repositories/OrmCategoryRepository";
import { OrmSpecificationRepository } from "@modules/Cars/Infra/typeorm/Repositories/OrmSpecificationRepository";
import { OrmCarsRepository } from "@modules/Cars/Infra/typeorm/Repositories/OrmCarsRepository";
import { OrmUserRepository } from "@modules/Accounts/Users/Infra/typeorm/Repositories/OrmUserRepository";
import { IUsersTokenRepository } from "@modules/Accounts/Users/Repository/IUsersTokenRepository";
import { OrmUsersTokenRepository } from "@modules/Accounts/Users/Infra/typeorm/Repositories/OrmUsersTokenRepository";



container.registerSingleton<ICategoryRepository>(
    "OrmCategoryRepository",
    OrmCategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
    "OrmSpecificationRepository",
    OrmSpecificationRepository
);

container.registerSingleton<IUserRepository>(
    "OrmUserRepository",
    OrmUserRepository
);

container.registerSingleton<ICarsRepository>(
    "OrmCarsRepository",
    OrmCarsRepository
);

container.registerSingleton<ICarsImagesRepository>(
    "OrmCarsImageRepository",
    OrmCarsImageRepository
);

container.registerSingleton<IRentalRepository>(
    "OrmRentalRepository",
    OrmRentalRepository
);

container.registerSingleton<IUsersTokenRepository>(
    "OrmUsersTokenRepository",
    OrmUsersTokenRepository
)
