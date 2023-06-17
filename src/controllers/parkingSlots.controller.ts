import { QueryBuilder } from "../db";
import { ParkingArea, ParkingSlot, UserVehicles } from "../models";

const tableName = "parking_slots";

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
    .from(tableName)
    .where({ parking_area_id: parkingAreaId })
    .execute();
};

export const updateSlotStatus = async (
  slotId: ParkingSlot["id"],
  vehicleId: UserVehicles["vehicle_id"] | null
): Promise<void> => {
  await new QueryBuilder()
    .update({ tableName, data: { vehicle_id: vehicleId } })
    .where({ id: slotId })
    .execute();
};
