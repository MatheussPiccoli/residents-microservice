import {
  PostgresCreateResidentRepository,
  PostGresGetUserByEmailRepository,
  PostgresGetResidentByIdRepository,
  PostgresDeleteResidentRepository,
} from "../../repositories/index.js";

import {
  CreateResidentUseCase,
  GetResidentByIdUseCase,
  DeleteResidentUseCase,
} from "../../use-cases/index.js";
import {
  CreateResidentController,
  GetResidentByIdController,
  DeleteResidentController,
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

export const makeDeleteResidentController = () => {
  const deleteResidentRepository = new PostgresDeleteResidentRepository();

  const deleteResidentUseCase = new DeleteResidentUseCase(
    deleteResidentRepository,
  );

  const deleteResidentController = new DeleteResidentController(
    deleteResidentUseCase,
  );

  return deleteResidentController;
};

export const makeUpdateResidentController = () => {
  const updateResidentRepository = new PostgresUpdateResidentRepository();

  const getResidentByIdRepository = new PostgresGetResidentByIdRepository();

  const getResidentByEmailRepository = new PostGresGetUserByEmailRepository();

  const updateResidentUseCase = new UpdateResidentUseCase(
    updateResidentRepository,
    getResidentByIdRepository,
    getResidentByEmailRepository,
  );

  const updateResidentController = new UpdateResidentController(
    updateResidentUseCase,
  );

  return updateResidentController;
};
