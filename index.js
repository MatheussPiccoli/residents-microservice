import "dotenv/config.js";
import { PostgresCreateResidentRepository } from "./src/repositories/create-resident.js";
import { CreateResidentUseCase } from "./src/use-cases/create-resident.js";
import { PostGresGetUserByEmailRepository } from "./src/repositories/get-resident-by-email.js";
import express, { response } from "express";
import { CreateResidentController } from "./src/controllers/create-resident.js";

const app = express();

app.use(express.json());

app.post("/api/residents", async (request, response) => {
  const createResidentRepository = new PostgresCreateResidentRepository();

  const getResidentByEmailRepository = new PostGresGetUserByEmailRepository();

  const createResidentUseCase = new CreateResidentUseCase(
    createResidentRepository,
    getResidentByEmailRepository,
  );

  const createResidentController = new CreateResidentController(
    createResidentUseCase,
  );

  const { statusCode, body } = await createResidentController.execute(request);

  response.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`),
);
