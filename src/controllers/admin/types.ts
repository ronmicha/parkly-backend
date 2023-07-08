import { DB_User, DB_UserVehicles, User } from "../../models";

export type CustomerUser = Pick<
  DB_User,
  "id" | "first_name" | "last_name" | "phone_number" | "email" | "role"
> & { vehicle_ids: Array<DB_UserVehicles["vehicle_id"]> };

export type CreateUserData = Omit<
  User,
  "id" | "password" | "activeVehicleId"
> & {
  vehicleIds?: string[];
};

export type UpdateUserData = Pick<User, "id"> &
  Partial<
    Omit<User, "id" | "password" | "activeVehicleId"> & {
      vehicleIds?: string[];
    }
  >;
