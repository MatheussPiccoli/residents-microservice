import { PostgresHelper } from "../db/postgres/helper.js";

export class PostgresgetUserByIdRepository {
  async execute(residentId) {
    const resident = await PostgresHelper.query(
      "SELECT * FROM residents WHERE id = $1",
      [residentId],
    );
  }
}
