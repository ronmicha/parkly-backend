import { DB_User } from "./user.model";

export type DB_UserVehicles = {
  user_id: DB_User["id"];
  vehicle_id: string;
};
