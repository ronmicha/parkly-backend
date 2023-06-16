import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getCustomerParkingAreas } from "../controllers/customerParkingAreas.controller";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const customerId = req.query.customerId as string;

  if (!customerId) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Parameter 'customerId' is missing" });
    return;
  }

  try {
    const parkingAreas = await getCustomerParkingAreas(customerId);
    res.json({ parkingAreas });
  } catch (e) {
    console.error(e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (e as Error).message });
  }
});

export default router;
