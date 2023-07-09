import { QueryBuilder } from "../../db";
import { DB_ParkingArea, DB_ParkingSlot, DB_UserVehicles } from "../../models";

const tableName = "parking_slots";

export const getParkingSlots = async (
  parkingAreaId: DB_ParkingArea["id"]
): Promise<DB_ParkingSlot[]> => {
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
    .execute<DB_ParkingSlot[]>();
};

export const updateSlotStatus = async (
  slotId: DB_ParkingSlot["id"],
  vehicleId: DB_UserVehicles["vehicle_id"] | null
): Promise<void> => {
  await new QueryBuilder()
    .update({ tableName, data: { vehicle_id: vehicleId } })
    .where({ id: slotId })
    .execute<DB_ParkingSlot[]>();
};
