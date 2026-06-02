import "dotenv/config.js";
import express, { response } from "express";
import { makeCreateResidentController } from "./src/controllers/factories/index.js";

const app = express();

app.use(express.json());

app.post("/api/residents", async (request, response) => {
  const createResidentController = makeCreateResidentController();

  const { statusCode, body } = await createResidentController.execute(request);

  response.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`),
);
