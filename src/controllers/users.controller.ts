import { QueryBuilder } from "../db";
import { User } from "../models";

type UserWithoutPassword = Omit<User, "password">;

export const getUser = async (
  userId: User["id"]
): Promise<UserWithoutPassword> => {
  const rows: UserWithoutPassword[] = await new QueryBuilder()
    .select(
      "id",
      "first_name",
      "last_name",
      "phone_number",
      "email",
      "customer_id",
      "active_vehicle_id"
    )
    .from("users")
    .where({ id: userId })
    .execute();

  return rows[0];
};

export const upsertUser = async (): Promise<void> => {
  return;
};
