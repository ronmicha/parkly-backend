import { Customer } from "./customer.model";
import { UserVehicles } from "./userVehicles.model";

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  customer_id: Customer["id"];
  active_vehicle_id: UserVehicles["vehicle_id"];
};
