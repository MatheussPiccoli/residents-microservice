import { PostgresHelper } from "../db/postgres/helper.js";

export class PostgresGetResidentsByLockerIdRepository {
  async execute(lockerId) {
    const residents = await PostgresHelper.query(
      `
            SELECT *
            FROM residents
            WHERE locker_id = $1
            `,
      [lockerId],
    );

    console.log("ROWS:", residents.rows);

    return residents.rows;
  }
}
