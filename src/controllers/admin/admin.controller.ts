import { DB_Customer, DB_User, DB_UserVehicles } from "../../models";
import { encrypt } from "../../utils";
import { QueryBuilder, Transaction } from "../../db";
import { INITIAL_PASSWORD } from "./consts";
import { CreateUserData, CustomerUser, UpdateUserData } from "./types";

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
      QueryBuilder.raw("ARRAY_AGG(user_vehicles.vehicle_id) as vehicle_ids")
    )
    .from("users")
    .leftJoin("user_vehicles", "users.id", "user_vehicles.user_id")
    .where({ customer_id: customerId })
    .groupBy("users.id")
    .execute<CustomerUser[]>();
};

const insertUserToDB = async (
  userData: CreateUserData,
  trx?: Transaction
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

  const insertedRows = await new QueryBuilder(trx)
    .insert({
      tableName: "users",
      data: userToInsert,
    })
    .execute<DB_User[]>();

  return insertedRows[0];
};

const insertUserVehiclesToDB = async (
  userId: DB_User["id"],
  vehicleIds: Array<DB_UserVehicles["vehicle_id"]>,
  trx?: Transaction
): Promise<void> => {
  const data = vehicleIds.map((id) => ({
    user_id: userId,
    vehicle_id: id,
  }));

  await new QueryBuilder(trx)
    .insert({ tableName: "user_vehicles", data })
    .execute<DB_UserVehicles[]>();
};

export const createUser = async (
  userData: CreateUserData
): Promise<DB_User> => {
  return await QueryBuilder.transaction<DB_User>(async (trx) => {
    const insertedUser = await insertUserToDB(userData, trx);

    if (userData.vehicleIds) {
      await insertUserVehiclesToDB(insertedUser.id, userData.vehicleIds, trx);
    }

    return insertedUser;
  });
};

const updateUserInDB = async (
  userData: UpdateUserData,
  trx?: Transaction
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

  const updatedRows = await new QueryBuilder(trx)
    .update({
      tableName: "users",
      data: userToUpdate,
    })
    .where({ id: userData.id })
    .execute<DB_User[]>();

  return updatedRows[0];
};

export const updateUser = async (
  userData: UpdateUserData
): Promise<DB_User> => {
  return await QueryBuilder.transaction<DB_User>(async (trx) => {
    await updateUserInDB(userData, trx);

    if (userData.vehicleIds) {
      await new QueryBuilder(trx)
        .delete()
        .from("user_vehicles")
        .where({ user_id: userData.id })
        .execute<DB_UserVehicles[]>();

      await insertUserVehiclesToDB(userData.id, userData.vehicleIds, trx);
    }
  });
};
