import { QueryBuilder } from "../../db";
import { DB_User } from "../../models";
import { isEncryptedEqual } from "../../utils";
import { InvalidLogin, UserDoesntExist } from "./errors";

const tableName = "users";

export const getUser = async (options: Partial<DB_User>): Promise<DB_User> => {
  const rows: DB_User[] = await new QueryBuilder()
    .select("*")
    .from(tableName)
    .where(options)
    .execute();

  return rows[0];
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
