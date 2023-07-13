import { DB_ParkingSlot, ParkingSlot } from "../../models";
import { QueryBuilder } from "../../db";
import { CreateParkingSlotData, UpdateParkingSlotData } from "./types";

export const createParkingSlot = async (
  createSlotData: CreateParkingSlotData
): Promise<DB_ParkingSlot> => {
  const slotToInsert: Omit<DB_ParkingSlot, "id" | "vehicle_id"> = {
    slot_number: createSlotData.slotNumber,
    slot_floor: createSlotData.slotFloor,
    slot_type: createSlotData.slotType,
    parking_area_id: createSlotData.parkingAreaId,
  };

  const insertedRows = await new QueryBuilder()
    .insert({
      tableName: "parking_slots",
      data: slotToInsert,
    })
    .execute<DB_ParkingSlot>();

  return insertedRows[0];
};

export const updateParkingSlot = async (
  updateSlotData: UpdateParkingSlotData
): Promise<DB_ParkingSlot> => {
  const slotToUpdate: Partial<Omit<DB_ParkingSlot, "id" | "vehicle_id">> = {
    slot_number: updateSlotData.slotNumber,
    slot_floor: updateSlotData.slotFloor,
    slot_type: updateSlotData.slotType,
    parking_area_id: updateSlotData.parkingAreaId,
  };

  const rows = await new QueryBuilder()
    .update({
      tableName: "parking_slots",
      data: slotToUpdate,
    })
    .where({ id: updateSlotData.id })
    .execute<DB_ParkingSlot[]>();

  return rows[0];
};

export const deleteParkingSlots = async (slotIds: Array<ParkingSlot["id"]>) => {
  await new QueryBuilder()
    .delete()
    .from("parking_slots")
    .whereIn("id", slotIds)
    .execute<DB_ParkingSlot[]>();
};
