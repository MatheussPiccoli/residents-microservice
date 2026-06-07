import validator from "validator";

export class CreateResidentController {
  constructor(createResidentUseCase) {
    this.createResidentUseCase = createResidentUseCase;
  }

  async execute(httpRequest) {
    try {
      const params = httpRequest.body || {};

      const requiredFields = ["name", "email", "locker_id", "password"];

      for (const field of requiredFields) {
        const fieldIsMissing = !params[field];
        const fieldIsEmpty =
          typeof checkIfIsString !== "undefined" &&
          checkIfIsString(params[field]) &&
          validator.isEmpty(params[field], { ignore_whitespace: true });

        if (fieldIsMissing || fieldIsEmpty) {
          return {
            statusCode: 400,
            body: { message: `The field ${field} is required` },
          };
        }
      }

      const passwordIsValid = params.password && params.password.length >= 6;
      if (!passwordIsValid) {
        return {
          statusCode: 400,
          body: { message: "Password must be at least 6 characters" },
        };
      }

      const emailIsValid = validator.isEmail(params.email);
      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: {
            message:
              "The provided email is not valid, please provide a valid one",
          },
        };
      }

      const createdResident = await this.createResidentUseCase.execute(params);

      return {
        statusCode: 201,
        body: createdResident,
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: error.message === "Email Already in use" ? 400 : 500,
        body: {
          message: error.message || "Internal server error",
        },
      };
    }
  }
}
