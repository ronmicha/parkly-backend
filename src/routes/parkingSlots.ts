import express, { Request, Response } from "express";
import { PgErrorCodes, QueryBuilder } from "../db";
import { ParkingSlot } from "../models";
import { DatabaseError } from "pg";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  type Row = Omit<ParkingSlot, "parking_area_id">;

  const parkingAreaId = req.query.parkingAreaId as string;

  if (!parkingAreaId) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Parameter 'parkingAreaId' is missing" });
    return;
  }

  try {
    const rows: Row[] = await new QueryBuilder()
      .select("id", "slot_number", "slot_floor", "slot_type", "vehicle_id")
      .from("parking_slots")
      .where({ parking_area_id: parkingAreaId })
      .execute();

    res.json({ parkingSlots: rows });
  } catch (e) {
    console.error(e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (e as Error).message });
  }
});

router.post("/update-status", async (req: Request, res: Response) => {
  const { slotId, vehicleId } = req.body;

  try {
    await new QueryBuilder()
      .update("parking_slots", { vehicle_id: vehicleId })
      .where({ id: slotId })
      .execute();

    res.sendStatus(StatusCodes.OK);
  } catch (e) {
    console.error(e);
    const error = e as DatabaseError;

    const status =
      error.code === PgErrorCodes.UNIQUE_VIOLATION
        ? StatusCodes.BAD_REQUEST
        : StatusCodes.INTERNAL_SERVER_ERROR;

    res.status(status).json({ error: error.message });
  }
});

export default router;
