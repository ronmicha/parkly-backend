import { User } from "../../models";

export type UserWithoutPassword = Omit<User, "password">;

export type UpsertUserData = {
  id?: User["id"];
  firstName?: User["first_name"];
  lastName?: User["last_name"];
  phoneNumber?: User["phone_number"];
  email?: User["email"];
  password?: User["password"];
  vehicleIds?: string[];
  activeVehicleId?: User["active_vehicle_id"];
};
