import { DB_Customer, DB_User, DB_UserVehicles, User } from "../../models";
import { encrypt } from "../../utils";
import { QueryBuilder } from "../../db";
import { INITIAL_PASSWORD } from "./consts";
import { dbClient } from "../../db/client";

type CustomerUser = Pick<
  DB_User,
  "id" | "first_name" | "last_name" | "phone_number" | "email" | "role"
> & { vehicle_ids: Array<DB_UserVehicles["vehicle_id"]> };

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

type CreateUserData = Omit<User, "id" | "password" | "activeVehicleId"> & {
  vehicleIds?: string[];
};

// ToDo - the create/updateUser functions should be wrapped in a transaction

export const createUser = async (
  userData: CreateUserData
): Promise<DB_User> => {
  const userToInsert: Omit<DB_User, "id"> = {
    first_name: userData.firstName,
    last_name: userData.lastName,
    phone_number: userData.phoneNumber,
    email: userData.email,
    role: userData.role,
    password: await encrypt(INITIAL_PASSWORD),
    customer_id: userData.customerId,
    active_vehicle_id:
      userData.vehicleIds?.length === 1 ? userData.vehicleIds[0] : null,
  };

  const insertedRows = await new QueryBuilder()
    .insert({
      tableName: "users",
      data: userToInsert,
    })
    .execute();

  const insertedUser: DB_User = insertedRows[0];

  if (userData.vehicleIds) {
    const data = userData.vehicleIds.map((id) => ({
      user_id: insertedUser.id,
      vehicle_id: id,
    }));

    await new QueryBuilder()
      .insert({ tableName: "user_vehicles", data })
      .execute();
  }

  return insertedUser;
};

type UpdateUserData = Partial<
  Omit<User, "password" | "activeVehicleId"> & { vehicleIds?: string[] }
>;

export const updateUser = async (
  userData: UpdateUserData
): Promise<DB_User> => {
  const userToUpdate: Partial<
    Omit<DB_User, "id" | "password" | "activeVehicleId">
  > = {
    first_name: userData.firstName,
    last_name: userData.lastName,
    phone_number: userData.phoneNumber,
    email: userData.email,
    role: userData.role,
    customer_id: userData.customerId,
  };

  const updatedRows = await new QueryBuilder()
    .update({
      tableName: "users",
      data: userToUpdate,
    })
    .where({ id: userData.id })
    .execute();

  const updatedUser: DB_User = updatedRows[0];

  if (userData.vehicleIds) {
    const data = userData.vehicleIds.map((id) => ({
      user_id: updatedUser.id,
      vehicle_id: id,
    }));

    await new QueryBuilder()
      .update({ tableName: "user_vehicles", data })
      .execute();
  }

  return updatedUser;
};
