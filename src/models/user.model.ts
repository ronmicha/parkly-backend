import { DB_Customer } from "./customer.model";
import { DB_UserVehicles } from "./userVehicles.model";
import { Camelize } from "./types";

export type DB_User = {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  customer_id: DB_Customer["id"];
  active_vehicle_id: DB_UserVehicles["vehicle_id"];
};

export type User = Camelize<DB_User>;
