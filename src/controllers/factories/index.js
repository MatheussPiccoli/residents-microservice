import {
  PostgresCreateResidentRepository,
  PostGresGetUserByEmailRepository,
  GetResidentByIdController,
} from "../../repositories/index.js";

import {
  CreateResidentUseCase,
  GetResidentByIdUseCase,
} from "../../use-cases/index.js";
import {
  CreateResidentController,
  GetResidentByIdController,
} from "../index.js";

export const makeCreateResidentController = () => {
  const createResidentRepository = new PostgresCreateResidentRepository();

  const getResidentByEmailRepository = new PostGresGetUserByEmailRepository();

  const createResidentUseCase = new CreateResidentUseCase(
    createResidentRepository,
    getResidentByEmailRepository,
  );

  const createResidentController = new CreateResidentController(
    createResidentUseCase,
  );

  return createResidentController;
};

import { GetResidentByIdController } from "../controllers/get-resident-by-id.js";
import { GetResidentByIdUseCase } from "../use-cases/get-resident-by-id.js";
import { PostgresGetResidentByIdRepository } from "../repositories/postgres-get-resident-by-id.js";

export const makeGetResidentByIdController = () => {
  const repository = new PostgresGetResidentByIdRepository();

  const useCase = new GetResidentByIdUseCase(repository);

  return new GetResidentByIdController(useCase);
};
