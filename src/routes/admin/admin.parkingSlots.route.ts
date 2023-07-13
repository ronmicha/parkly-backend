import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { adminParkingSlotsController } from "../../controllers";
import { ParkingSlot } from "../../models";

const router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  try {
    const insertedSlot = await adminParkingSlotsController.createParkingSlot(
      req.body
    );
    res.json({ slot: insertedSlot });
  } catch (e) {
    console.error(e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (e as Error).message });
  }
});

router.post("/update", async (req: Request, res: Response) => {
  try {
    const updatedSlot = await adminParkingSlotsController.updateParkingSlot(
      req.body
    );
    res.json({ slot: updatedSlot });
  } catch (e) {
    console.error(e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (e as Error).message });
  }
});

router.post("/delete", async (req: Request, res: Response) => {
  const slotIds = req.body.slotIds as Array<ParkingSlot["id"]>;

  if (!slotIds) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Parameter 'slotIds' is missing" });
    return;
  }

  try {
    await adminParkingSlotsController.deleteParkingSlots(slotIds);
    res.sendStatus(StatusCodes.OK);
  } catch (e) {
    console.error(e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (e as Error).message });
  }
});

export default router;
