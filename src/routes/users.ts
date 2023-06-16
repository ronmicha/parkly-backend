import express, { Request, Response } from "express";
import { QueryBuilder } from "../db";
import { User } from "../models";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.get("/user", async (req: Request, res: Response) => {
  const userId = req.header("User-Id") as string;

  if (!userId) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "'User-Id' header is missing" });
    return;
  }

  try {
    const rows: User[] = await new QueryBuilder()
      .select(
        "id",
        "first_name",
        "last_name",
        "phone_number",
        "customer_id",
        "active_vehicle_id"
      )
      .from("users")
      .where({ id: userId })
      .execute();

    if (rows.length > 1) {
      res.status(StatusCodes.BAD_REQUEST).json({
        details: "Found multiple users that match the provided userId",
        userId,
      });
      return;
    }

    const userData = rows[0];

    res.json({ userData });
  } catch (e) {
    console.error(e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (e as Error).message });
  }
});

export default router;
