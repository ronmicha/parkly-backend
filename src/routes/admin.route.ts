import express, { Request, Response } from "express";
import { adminController } from "../controllers";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.post("/create-user", async (req: Request, res: Response) => {
  // ToDo: validate that all relevant fields exist in req.body

  try {
    const userData = await adminController.upsertUser(req.body);
    res.json({ userData });
  } catch (e) {
    console.error(e);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (e as Error).message });
  }
});

export default router;
