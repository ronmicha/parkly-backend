import { ParkingArea } from "./parkingArea.model";
import { UserVehicles } from "./userVehicles.model";

export type ParkingSlot = {
  id: string;
  slot_number: number;
  slot_floor: number;
  slot_type: "single" | "blocked" | "blocking";
  parking_area_id: ParkingArea["id"];
  vehicle_id: UserVehicles["vehicle_id"] | null;
};
