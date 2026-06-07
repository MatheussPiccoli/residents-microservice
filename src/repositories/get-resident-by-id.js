import { PostgresHelper } from "../db/postgres/helper.js";

export class PostgresgetResidentByIdRepository {
  async execute(residentId) {
    const resident = await PostgresHelper.query(
      "SELECT * FROM residents WHERE id = $1",
      [residentId],
    );
  }
}
