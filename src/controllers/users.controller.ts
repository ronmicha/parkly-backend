import { QueryBuilder } from "../db";
import { Customer, User } from "../models";
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

const emailDomainToCustomerName: Record<string, string> = {
  "viz.ai": "Viz.ai",
};

const getCustomerIdByEmail = async (email: string): Promise<Customer["id"]> => {
  const emailDomain = email.substring(email.indexOf("@") + 1);
  const customerName = emailDomainToCustomerName[emailDomain];

  if (!customerName) {
    throw new Error(`No customer is associated to email '${email}'`);
  }

  const rows: Array<Pick<Customer, "id">> = await new QueryBuilder()
    .select("id")
    .from("customers")
    .where({ name: customerName })
    .execute();

  return rows[0].id;
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
