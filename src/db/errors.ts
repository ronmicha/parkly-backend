export { DatabaseError } from "pg";

export enum PgErrorCodes {
  UNIQUE_VIOLATION = "23505",
}
