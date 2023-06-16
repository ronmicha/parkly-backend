import { QueryBuilder } from "../db";
import { User } from "../models";
import { encrypt } from "../utils";

const tableName = "users";

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
    .from(tableName)
    .where({ id: userId })
    .execute();

  return rows[0];
};

type UpsertUserData = {
  id?: User["id"];
  firstName?: User["first_name"];
  lastName?: User["last_name"];
  phoneNumber?: User["phone_number"];
  email?: User["email"];
  password?: User["password"];
  vehicleIds?: string[];
  activeVehicleId?: User["active_vehicle_id"];
};

export const upsertUser = async (data: UpsertUserData): Promise<void> => {
  const dataToUpsert = { ...data };

  if (dataToUpsert.password) {
    dataToUpsert.password = await encrypt(dataToUpsert.password);
  }

  await new QueryBuilder().upsert(tableName, data).execute();
};
