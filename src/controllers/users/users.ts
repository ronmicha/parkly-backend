import { QueryBuilder } from "../../db";
import {
  DB_Customer,
  DB_CustomerEmailDomain,
  DB_User,
  User,
} from "../../models";
import { encrypt } from "../../utils";
import { getEmailDomain } from "./utils";

export type UserWithoutPassword = Omit<DB_User, "password">;

const tableName = "users";

export const getUser = async (
  userId: DB_User["id"]
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

const getCustomerIdByEmail = async (
  email: string
): Promise<DB_Customer["id"]> => {
  const emailDomain = getEmailDomain(email);

  const rows: Array<Pick<DB_CustomerEmailDomain, "customer_id">> =
    await new QueryBuilder()
      .select("customer_id")
      .from("customer_email_domain")
      .where({ email_domain: emailDomain })
      .execute();

  return rows[0].customer_id;
};

export const upsertUser = async (user: Partial<User>): Promise<DB_User> => {
  const dataToUpsert: Partial<DB_User> = {
    id: user.id,
    first_name: user.firstName,
    last_name: user.lastName,
    phone_number: user.phoneNumber,
    email: user.email,
    password: user.password,
    active_vehicle_id: user.activeVehicleId,
  };

  if (dataToUpsert.email) {
    dataToUpsert.customer_id = await getCustomerIdByEmail(dataToUpsert.email);
  }
  if (dataToUpsert.password) {
    dataToUpsert.password = await encrypt(dataToUpsert.password);
  }

  const upsertedRows: DB_User[] = await new QueryBuilder()
    .upsert({
      tableName,
      data: dataToUpsert,
      conflictingColumnNames: ["id"],
    })
    .execute();

  return upsertedRows[0];
};
