import { QueryBuilder } from "../../db";
import { DB_User, User } from "../../models";
import { encrypt, isEncryptedEqual } from "../../utils";
import { InvalidLogin, UserDoesntExist } from "./errors";

const tableName = "users";

export const getUser = async (options: Partial<DB_User>): Promise<DB_User> => {
  const rows: DB_User[] = await new QueryBuilder()
    .select(
      "id",
      "first_name",
      "last_name",
      "phone_number",
      "email",
      "password",
      "customer_id",
      "active_vehicle_id"
    )
    .from(tableName)
    .where(options)
    .execute();

  return rows[0];
};

export const upsertUser = async (user: Partial<User>): Promise<DB_User> => {
  const dataToUpsert: Partial<DB_User> = {
    id: user.id,
    first_name: user.firstName,
    last_name: user.lastName,
    phone_number: user.phoneNumber,
    email: user.email,
    password: user.password,
    customer_id: user.customerId,
    active_vehicle_id: user.activeVehicleId,
  };

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

export const validateLogin = async (
  phoneNumber: string,
  password: string
): Promise<DB_User> => {
  const userData = await getUser({
    phone_number: phoneNumber,
  });

  if (!userData) {
    throw new UserDoesntExist({ phoneNumber });
  }

  const isCorrectPassword = await isEncryptedEqual(password, userData.password);

  if (!isCorrectPassword) {
    throw new InvalidLogin({ phoneNumber });
  }

  return userData;
};