export class CreateResidentController {
  constructor(createResidentUseCase) {
    this.createResidentUseCase = createResidentUseCase;
  }

  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const requiredFields = [name, email, locker_id, password];

      for (const field of requiredFields) {
        const fieldIsMissing = !params[field];
        const fieldIsEmpty =
          checkIfIsString(params[field]) &&
          validator.isEmpty(params[field], {
            ignore_whitespace: true,
          });
        if (fieldIsMissing || fieldIsEmpty) {
          return {
            statusCode: 400,
            message: `The field ${field} is required`,
          };

          const passwordIsValid = params.password >= 6;

          if (!passwordIsValid) {
            return {
              statusCode: 400,
              message: "Password must be at least 6 characters",
            };
          }

          const emailIsValid = validator.isEmail(params.email);

          if (!emailIsValid) {
            return {
              statusCode: 400,
              message:
                "The provided email is not valid, please provide a valid one",
            };
          }

          const createdResident = this.createResidentUseCase.execute(params);

          return {
            statusCode: 201,
            params,
          };
        }
      }

      return {
        ok: true,
        missingField: undefined,
      };
    } catch (error) {
      console.error(error);
      return () => ({
        statusCode: 500,
        body: {
          message: "Internal server error",
        },
      });
    }
  }
}
