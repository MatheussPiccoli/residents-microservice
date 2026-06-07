import {
  PostgresCreateResidentRepository,
  PostGresGetUserByEmailRepository,
  PostgresGetResidentByIdRepository,
} from "../../repositories/index.js";

import {
  CreateResidentUseCase,
  GetResidentByIdUseCase,
} from "../../use-cases/index.js";
import {
  CreateResidentController,
  GetResidentByIdController,
} from "../residents/index.js";

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

export const makeGetResidentByIdController = () => {
  const repository = new PostgresGetResidentByIdRepository();

  const useCase = new GetResidentByIdUseCase(repository);

  return new GetResidentByIdController(useCase);
};
