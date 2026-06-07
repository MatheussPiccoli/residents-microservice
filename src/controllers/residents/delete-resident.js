import {
  serverError,
  ok,
  checkIfIdIsValid,
  invalidIdResponse,
  userNotFoundResponse,
} from "../helpers/index.js";

export class DeleteResidentController {
  constructor(deleteResidentUseCase) {
    this.deleteResidentrUseCase = deleteResidentUseCase;
  }
  async execute(httpRequest) {
    try {
      const residentId = httpRequest.params.residentId;

      const idIsValid = checkIfIdIsValid(residentId);

      if (!idIsValid) {
        return invalidIdResponse();
      }

      const deletedResident = await this.deleteUserUseCase.execute(userId);

      if (!deletedResident) {
        return userNotFoundResponse();
      }

      return ok(deletedResident);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
