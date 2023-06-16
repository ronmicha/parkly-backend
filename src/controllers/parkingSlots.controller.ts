import { QueryBuilder } from "../db";
import { ParkingArea, ParkingSlot, UserVehicles } from "../models";

export const getParkingSlots = async (
  parkingAreaId: ParkingArea["id"]
): Promise<ParkingSlot[]> => {
  return new QueryBuilder()
    .select(
      "id",
      "parking_area_id",
      "slot_number",
      "slot_floor",
      "slot_type",
      "vehicle_id"
    )
    .from("parking_slots")
    .where({ parking_area_id: parkingAreaId })
    .execute();
};

export const updateSlotStatus = async (
  slotId: ParkingSlot["id"],
  vehicleId: UserVehicles["vehicle_id"] | null
): Promise<void> => {
  await new QueryBuilder()
    .update("parking_slots", { vehicle_id: vehicleId })
    .where({ id: slotId })
    .execute();
};
