import { QueryBuilder } from "../../db";
import {
  DB_ParkingArea,
  DB_ParkingSlot,
  DB_User,
  DB_UserVehicles,
} from "../../models";

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
  await QueryBuilder.transaction<DB_User>(async (trx) => {
    const rows = await new QueryBuilder(trx)
      .select("*")
      .from(tableName)
      .where({ id: slotId })
      .execute<DB_ParkingSlot[]>();

    const slot: DB_ParkingSlot = rows[0];
    const existingVehicleId = slot.vehicle_id;

    if (vehicleId && existingVehicleId) {
      throw new Error(
        `Slot status could not be changed. This slot is already taken by vehicle '${existingVehicleId}'`
      );
    }

    await new QueryBuilder(trx)
      .update({ tableName, data: { vehicle_id: vehicleId } })
      .where({ id: slotId })
      .execute<DB_ParkingSlot[]>();
  });
};
