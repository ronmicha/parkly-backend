import { User } from "./user.model";

export type UserVehicles = {
  user_id: User["id"];
  vehicle_id: string;
};
