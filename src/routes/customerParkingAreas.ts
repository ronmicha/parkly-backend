import express, { Request, Response } from "express";
import { QueryBuilder } from "../db";
import { ParkingArea } from "../models";
import { StatusCodes } from "http-status-codes";

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
    const rows: ParkingArea[] = await new QueryBuilder()
      .select("id", "name", "street_address", "city")
      .from("parking_areas")
      .innerJoin(
        "customer_parking_areas",
        "parking_areas.id",
        "customer_parking_areas.parking_area_id"
      )
      .where({ customer_id: customerId })
      .execute();

    res.json({ parkingAreas: rows });
  } catch (e) {
    console.error(e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (e as Error).message });
  }
});

export default router;
