import { DB_Customer, DB_User, User } from "../../models";
import { encrypt } from "../../utils";
import { QueryBuilder } from "../../db";
import { INITIAL_PASSWORD } from "./consts";
import { dbClient } from "../../db/client";

type CustomerUser = DB_User & { vehicleIds: string[] };

export const getCustomerUsers = async (
  customerId: DB_Customer["id"]
): Promise<CustomerUser[]> => {
  return await new QueryBuilder()
    .select(
      "id",
      "first_name",
      "last_name",
      "phone_number",
      "email",
      "role",
      dbClient.raw("ARRAY_AGG(user_vehicles.vehicle_id) as vehicle_ids")
    )
    .from("users")
    .leftJoin("user_vehicles", "users.id", "user_vehicles.user_id")
    .where({ customer_id: customerId })
    .groupBy("users.id")
    .execute();
};

type CreateUserData = Omit<User, "id" | "password" | "activeVehicleId">;

export const createUser = async (
  userData: CreateUserData
): Promise<DB_User> => {
  const dataToInsert: Omit<DB_User, "id"> = {
    first_name: userData.firstName,
    last_name: userData.lastName,
    phone_number: userData.phoneNumber,
    email: userData.email,
    role: userData.role,
    password: await encrypt(INITIAL_PASSWORD),
    customer_id: userData.customerId,
    active_vehicle_id: "",
  };

  const insertedRows = await new QueryBuilder()
    .insert({
      tableName: "users",
      data: dataToInsert,
    })
    .execute();

  return insertedRows[0];
};

type UpsertData = Partial<User & { vehicleIds: string[] }>;

// ToDo - this function should be wrapped in a transaction
export const upsertUser = async (user: UpsertData): Promise<DB_User> => {
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
      tableName: "users",
      data: dataToUpsert,
      conflictingColumnNames: ["id"],
    })
    .execute();

  const upsertedUser = upsertedRows[0];

  if (user.vehicleIds) {
    const data = user.vehicleIds.map((vehicleId) => ({
      user_id: upsertedUser.id,
      vehicle_id: vehicleId,
    }));

    await new QueryBuilder()
      .upsert({
        tableName: "user_vehicles",
        data,
        conflictingColumnNames: ["vehicle_id"],
      })
      .execute();
  }

  return upsertedUser;
};
