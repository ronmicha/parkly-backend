import { DB_ParkingArea } from "./parkingArea.model";
import { DB_UserVehicles } from "./userVehicles.model";
import { Camelize } from "./types";

export type DB_ParkingSlot = {
  id: string;
  slot_number: number;
  slot_floor: number;
  slot_type: "single" | "blocked" | "blocking";
  parking_area_id: DB_ParkingArea["id"];
  vehicle_id: DB_UserVehicles["vehicle_id"] | null;
};

export type ParkingSlot = Camelize<DB_ParkingSlot>;
