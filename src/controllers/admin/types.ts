import { DB_User, DB_UserVehicles, ParkingSlot, User } from "../../models";

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

export type CreateParkingSlotData = Omit<ParkingSlot, "id" | "vehicleId">;

export type UpdateParkingSlotData = Pick<ParkingSlot, "id"> &
  Partial<Omit<ParkingSlot, "id" | "vehicleId">>;
