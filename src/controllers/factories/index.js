import {
  PostgresCreateResidentRepository,
  PostGresGetUserByEmailRepository,
} from "../../repositories/index.js";

import { CreateResidentUseCase } from "../../use-cases/create-resident.js";
import { CreateResidentController } from "../create-resident.js";

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
