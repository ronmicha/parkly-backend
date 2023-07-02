import { DB_User, User } from "../../models";
import { encrypt } from "../../utils";
import { QueryBuilder } from "../../db";

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
