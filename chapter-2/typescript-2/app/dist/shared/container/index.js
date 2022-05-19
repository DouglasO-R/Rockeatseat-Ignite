"use strict";

var _tsyringe = require("tsyringe");

require("@shared/container/providers");

var _OrmCarsImageRepository = require("@modules/Cars/Infra/typeorm/Repositories/OrmCarsImageRepository");

var _OrmRentalRepository = require("@modules/Rentals/Infra/typeorm/Repositories/OrmRentalRepository");

var _OrmCategoryRepository = require("@modules/Cars/Infra/typeorm/Repositories/OrmCategoryRepository");

var _OrmSpecificationRepository = require("@modules/Cars/Infra/typeorm/Repositories/OrmSpecificationRepository");

var _OrmCarsRepository = require("@modules/Cars/Infra/typeorm/Repositories/OrmCarsRepository");

var _OrmUserRepository = require("@modules/Accounts/Users/Infra/typeorm/Repositories/OrmUserRepository");

var _OrmUsersTokenRepository = require("@modules/Accounts/Users/Infra/typeorm/Repositories/OrmUsersTokenRepository");

_tsyringe.container.registerSingleton("OrmCategoryRepository", _OrmCategoryRepository.OrmCategoryRepository);

_tsyringe.container.registerSingleton("OrmSpecificationRepository", _OrmSpecificationRepository.OrmSpecificationRepository);

_tsyringe.container.registerSingleton("OrmUserRepository", _OrmUserRepository.OrmUserRepository);

_tsyringe.container.registerSingleton("OrmCarsRepository", _OrmCarsRepository.OrmCarsRepository);

_tsyringe.container.registerSingleton("OrmCarsImageRepository", _OrmCarsImageRepository.OrmCarsImageRepository);

_tsyringe.container.registerSingleton("OrmRentalRepository", _OrmRentalRepository.OrmRentalRepository);

_tsyringe.container.registerSingleton("OrmUsersTokenRepository", _OrmUsersTokenRepository.OrmUsersTokenRepository);