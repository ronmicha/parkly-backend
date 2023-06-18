import { QueryBuilder } from "../../db";
import { User } from "../../models";
import { encrypt } from "../../utils";
import { getCustomerIdByEmail } from "./utils";
import { UpsertUserData, UserWithoutPassword } from "./types";

const tableName = "users";

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

export const upsertUser = async (data: UpsertUserData): Promise<User> => {
  const dataToUpsert: Partial<User> = {
    id: data.id,
    first_name: data.firstName,
    last_name: data.lastName,
    phone_number: data.phoneNumber,
    email: data.email,
    password: data.password,
    active_vehicle_id: data.activeVehicleId,
  };

  if (dataToUpsert.email) {
    dataToUpsert.customer_id = await getCustomerIdByEmail(dataToUpsert.email);
  }
  if (dataToUpsert.password) {
    dataToUpsert.password = await encrypt(dataToUpsert.password);
  }

  const upsertedRows: User[] = await new QueryBuilder()
    .upsert({
      tableName,
      data: dataToUpsert,
      conflictingColumnNames: ["id"],
    })
    .execute();

  return upsertedRows[0];
};
