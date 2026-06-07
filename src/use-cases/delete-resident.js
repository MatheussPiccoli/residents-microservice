import { ResidentNotFoundError } from "../errors/residents.js";

export class DeleteUserUseCase {
  constrcutor(deleteResidentRepository) {
    this.deleteResidentRepository = deleteResidentRepository;
  }

  async execute(residentId) {
    const deletedResident =
      await this.deleteResidentRepository.execute(residentId);

    return deletedResident;
  }
}
