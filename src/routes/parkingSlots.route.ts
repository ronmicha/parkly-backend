import express, { Request, Response } from "express";
import { DatabaseError, PgErrorCodes } from "../db";
import { StatusCodes } from "http-status-codes";
import { parkingSlotsController } from "../controllers";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const parkingAreaId = req.query.parkingAreaId as string;

  if (!parkingAreaId) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Parameter 'parkingAreaId' is missing" });
    return;
  }

  try {
    const parkingSlots = await parkingSlotsController.getParkingSlots(
      parkingAreaId
    );
    res.json({ parkingSlots });
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
    await parkingSlotsController.updateSlotStatus(slotId, vehicleId);
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
